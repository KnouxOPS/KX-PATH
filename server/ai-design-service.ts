import { Request, Response } from "express";

// Types for AI Design Generation
interface DesignRequest {
  prompt: string;
  style: "realistic" | "artistic" | "cinematic" | "architectural";
  scene_type: "garden" | "pool" | "seating" | "mixed";
  area_sqm: number;
  colors: string[];
  preset_id?: string;
  model_id: string;
  settings: {
    guidance_scale: number;
    num_inference_steps: number;
    seed?: number;
    use_random_seed: boolean;
  };
}

interface AIModel {
  id: string;
  name: string;
  provider: "huggingface" | "replicate" | "local";
  model_path: string;
  api_endpoint?: string;
  api_key?: string;
  free_tier_limit: number;
  usage_count: number;
}

// Mock AI Models Configuration (في الواقع، هذه ستكون من قاعدة البيانات)
const aiModels: AIModel[] = [
  {
    id: "sdxl-base",
    name: "Stable Diffusion XL",
    provider: "huggingface",
    model_path: "stabilityai/stable-diffusion-xl-base-1.0",
    api_endpoint:
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    api_key: process.env.HUGGINGFACE_API_KEY,
    free_tier_limit: 100,
    usage_count: 0,
  },
  {
    id: "sd-1.5",
    name: "Stable Diffusion 1.5",
    provider: "huggingface",
    model_path: "runwayml/stable-diffusion-v1-5",
    api_endpoint:
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    api_key: process.env.HUGGINGFACE_API_KEY,
    free_tier_limit: 200,
    usage_count: 0,
  },
  {
    id: "replicate-sdxl",
    name: "Replicate SDXL",
    provider: "replicate",
    model_path: "stability-ai/sdxl",
    api_endpoint: "https://api.replicate.com/v1/predictions",
    api_key: process.env.REPLICATE_API_TOKEN,
    free_tier_limit: 20,
    usage_count: 0,
  },
];

// Scene Presets with Enhanced Prompts
const scenePresets = {
  "infinity-pool": {
    template:
      "Ultra-realistic 3D render of an infinity pool with {description}, surrounded by date palms, smart LED lighting, cinematic lighting, HDR, 8K resolution, architectural photography style",
    negative_prompt: "low quality, blurry, distorted, cartoon, anime, painting",
  },
  "garden-lounge": {
    template:
      "A luxurious outdoor seating area with {description}, lush greenery, ambient LED lighting, photo-realistic, cinematic composition, golden hour lighting",
    negative_prompt: "indoor, dark, low quality, blurry, cartoon",
  },
  "desert-oasis": {
    template:
      "Desert oasis landscape featuring {description}, native desert plants, sustainable design, sand dunes backdrop, warm sunset lighting, ultra-realistic rendering",
    negative_prompt: "tropical, snow, winter, low quality, blurry",
  },
  "modern-terrace": {
    template:
      "Modern rooftop terrace with {description}, sleek furniture, city skyline view, contemporary design, dramatic lighting, architectural visualization",
    negative_prompt: "old, rustic, rural, low quality, blurry",
  },
  "water-features": {
    template:
      "Landscape design with multiple water features including {description}, fountains, waterfalls, reflecting pools, zen garden style, peaceful atmosphere",
    negative_prompt: "dry, desert, no water, low quality, blurry",
  },
};

// Style Modifiers
const styleModifiers = {
  realistic:
    "ultra-realistic, photo-realistic, 8K resolution, professional photography",
  artistic:
    "artistic interpretation, painterly style, vibrant colors, creative composition",
  cinematic:
    "cinematic lighting, dramatic composition, film photography, movie-like atmosphere",
  architectural:
    "architectural visualization, technical precision, clean lines, professional rendering",
};

/**
 * Generate AI Design using HuggingFace Inference API
 */
async function generateWithHuggingFace(
  model: AIModel,
  prompt: string,
  settings: any,
): Promise<Buffer> {
  if (!model.api_key) {
    throw new Error("HuggingFace API key not configured");
  }

  const response = await fetch(model.api_endpoint!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${model.api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        guidance_scale: settings.guidance_scale,
        num_inference_steps: settings.num_inference_steps,
        seed: settings.use_random_seed ? undefined : settings.seed,
        width: 1024,
        height: 1024,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HuggingFace API error: ${error}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

/**
 * Generate AI Design using Replicate API
 */
async function generateWithReplicate(
  model: AIModel,
  prompt: string,
  settings: any,
): Promise<string> {
  if (!model.api_key) {
    throw new Error("Replicate API key not configured");
  }

  const response = await fetch(model.api_endpoint!, {
    method: "POST",
    headers: {
      Authorization: `Token ${model.api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
        "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      input: {
        prompt: prompt,
        guidance_scale: settings.guidance_scale,
        num_inference_steps: settings.num_inference_steps,
        seed: settings.use_random_seed ? undefined : settings.seed,
        width: 1024,
        height: 1024,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Replicate API error: ${error}`);
  }

  const result = await response.json();
  return result.urls.get; // Returns the prediction URL
}

/**
 * Build Enhanced Prompt
 */
function buildPrompt(request: DesignRequest): string {
  let prompt = request.prompt;

  // Apply preset template if selected
  if (
    request.preset_id &&
    scenePresets[request.preset_id as keyof typeof scenePresets]
  ) {
    const preset = scenePresets[request.preset_id as keyof typeof scenePresets];
    prompt = preset.template.replace("{description}", request.prompt);
  }

  // Add style modifiers
  prompt += `, ${styleModifiers[request.style]}`;

  // Add color preferences
  if (request.colors.length > 0) {
    prompt += `, color palette: ${request.colors.join(", ")}`;
  }

  // Add UAE-specific context
  prompt +=
    ", UAE landscape design, Middle Eastern architecture, desert climate appropriate";

  // Add quality enhancers
  prompt +=
    ", professional landscape architecture, high-end design, luxury finish";

  return prompt;
}

/**
 * Generate Negative Prompt
 */
function buildNegativePrompt(request: DesignRequest): string {
  let negativePrompt =
    "low quality, blurry, distorted, cartoon, anime, painting, sketch, draft";

  // Add preset-specific negative prompts
  if (
    request.preset_id &&
    scenePresets[request.preset_id as keyof typeof scenePresets]
  ) {
    const preset = scenePresets[request.preset_id as keyof typeof scenePresets];
    negativePrompt += `, ${preset.negative_prompt}`;
  }

  // Add climate-inappropriate elements
  negativePrompt +=
    ", snow, winter, temperate climate, non-desert plants, inappropriate vegetation";

  return negativePrompt;
}

/**
 * API Endpoint: Generate Design
 */
export async function generateDesign(req: Request, res: Response) {
  try {
    const designRequest: DesignRequest = req.body;

    // Validate request
    if (!designRequest.prompt || !designRequest.model_id) {
      return res.status(400).json({
        error: "Missing required fields: prompt and model_id",
      });
    }

    // Find selected model
    const selectedModel = aiModels.find((m) => m.id === designRequest.model_id);
    if (!selectedModel) {
      return res.status(400).json({
        error: "Invalid model_id",
      });
    }

    // Check usage limits
    if (selectedModel.usage_count >= selectedModel.free_tier_limit) {
      return res.status(429).json({
        error: "Model usage limit exceeded",
        limit: selectedModel.free_tier_limit,
        usage: selectedModel.usage_count,
      });
    }

    // Build enhanced prompt
    const enhancedPrompt = buildPrompt(designRequest);
    const negativePrompt = buildNegativePrompt(designRequest);

    console.log("Generating design with prompt:", enhancedPrompt);

    // Generate design based on provider
    let imageData: Buffer | string;
    const startTime = Date.now();

    switch (selectedModel.provider) {
      case "huggingface":
        imageData = await generateWithHuggingFace(
          selectedModel,
          enhancedPrompt,
          designRequest.settings,
        );
        break;

      case "replicate":
        imageData = await generateWithReplicate(
          selectedModel,
          enhancedPrompt,
          designRequest.settings,
        );
        break;

      case "local":
        // For local models, you would implement your own generation logic
        throw new Error("Local model generation not implemented yet");

      default:
        throw new Error("Unsupported provider");
    }

    const generationTime = (Date.now() - startTime) / 1000;

    // Update usage count
    selectedModel.usage_count++;

    // For demo purposes, return mock data
    // In production, you would save the image and return the URL
    const response = {
      success: true,
      design: {
        id: `design_${Date.now()}`,
        title: `${designRequest.scene_type} design`,
        prompt: enhancedPrompt,
        negative_prompt: negativePrompt,
        image_url: `/generated/design_${Date.now()}.jpg`, // Mock URL
        style: designRequest.style,
        scene_type: designRequest.scene_type,
        area_sqm: designRequest.area_sqm,
        colors: designRequest.colors,
        timestamp: new Date().toISOString(),
        status: "completed",
        ai_model: selectedModel.name,
        generation_time: generationTime,
        settings: designRequest.settings,
      },
      model_usage: {
        model_id: selectedModel.id,
        usage_count: selectedModel.usage_count,
        limit: selectedModel.free_tier_limit,
        remaining: selectedModel.free_tier_limit - selectedModel.usage_count,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Design generation error:", error);
    res.status(500).json({
      error: "Failed to generate design",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * API Endpoint: Get Available Models
 */
export async function getAvailableModels(req: Request, res: Response) {
  try {
    const modelsWithStatus = aiModels.map((model) => ({
      id: model.id,
      name: model.name,
      provider: model.provider,
      description: `${model.name} - ${model.provider}`,
      free_tier_limit: model.free_tier_limit,
      usage_count: model.usage_count,
      remaining: model.free_tier_limit - model.usage_count,
      status: model.usage_count >= model.free_tier_limit ? "limited" : "online",
      speed: model.id.includes("1.5")
        ? "fast"
        : model.id.includes("sdxl")
          ? "medium"
          : "slow",
      quality:
        model.id.includes("sdxl") || model.id.includes("replicate")
          ? "high"
          : "standard",
    }));

    res.json({
      models: modelsWithStatus,
      total_models: modelsWithStatus.length,
      online_models: modelsWithStatus.filter((m) => m.status === "online")
        .length,
    });
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({
      error: "Failed to fetch models",
    });
  }
}

/**
 * API Endpoint: Get Scene Presets
 */
export async function getScenePresets(req: Request, res: Response) {
  try {
    const presets = Object.entries(scenePresets).map(([id, preset]) => ({
      id,
      template: preset.template,
      category: id.includes("pool")
        ? "pool"
        : id.includes("garden")
          ? "garden"
          : id.includes("terrace")
            ? "seating"
            : "mixed",
    }));

    res.json({ presets });
  } catch (error) {
    console.error("Error fetching presets:", error);
    res.status(500).json({
      error: "Failed to fetch presets",
    });
  }
}

/**
 * API Endpoint: Reset Model Usage (for development)
 */
export async function resetModelUsage(req: Request, res: Response) {
  try {
    aiModels.forEach((model) => {
      model.usage_count = 0;
    });

    res.json({
      message: "Model usage counters reset",
      models: aiModels.map((m) => ({
        id: m.id,
        name: m.name,
        usage_count: m.usage_count,
      })),
    });
  } catch (error) {
    console.error("Error resetting usage:", error);
    res.status(500).json({
      error: "Failed to reset usage",
    });
  }
}
