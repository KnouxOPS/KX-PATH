import { useState, useEffect } from "react";
import {
  Sparkles,
  Bot,
  Wand2,
  Camera,
  Download,
  Share2,
  Palette,
  TreePine,
  Home,
  Calculator,
  Lightbulb,
  Target,
  Eye,
  Zap,
  Settings,
  Upload,
  MapPin,
  DollarSign,
  Clock,
  Users,
  Award,
  Layers,
  Maximize,
  Minimize,
  RefreshCw,
  Save,
  Edit,
  Play,
  Pause,
  Volume2,
  ImageIcon,
  Droplets,
  Armchair,
  Plus,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KnoxDesignGeneratorProps {
  language: "en" | "ar";
}

interface ScenePreset {
  id: string;
  name_ar: string;
  name_en: string;
  icon: any;
  prompt_template: string;
  category: "pool" | "garden" | "seating" | "mixed";
  thumbnail: string;
  description_ar: string;
  description_en: string;
}

interface GeneratedDesign {
  id: string;
  title: string;
  prompt: string;
  image_url: string;
  style: string;
  scene_type: string;
  area_sqm: number;
  colors: string[];
  timestamp: string;
  status: "generating" | "completed" | "approved" | "rejected";
  ai_model: string;
  generation_time: number;
  settings: {
    guidance_scale: number;
    num_inference_steps: number;
    seed?: number;
  };
}

interface AIModel {
  id: string;
  name: string;
  provider: "huggingface" | "replicate" | "local";
  model_path: string;
  description: string;
  free_tier_limit: number;
  speed: "fast" | "medium" | "slow";
  quality: "standard" | "high" | "ultra";
}

const translations = {
  en: {
    title: "KnoxDesign - AI Scene Generator",
    subtitle: "Create stunning landscape designs from descriptions",
    sceneType: "Scene Type",
    detailedDescription: "Detailed Description",
    areaSize: "Area Size (sqm)",
    preferredColors: "Preferred Colors",
    generateDesign: "Generate AI Design",
    quickAI: "🎨 Quick AI",
    scenePresets: "Scene Presets",
    customDescription: "Custom Description",
    myDesigns: "My Generated Designs",
    aiModels: "AI Models",
    generationSettings: "Generation Settings",
    garden: "Garden",
    pool: "Pool",
    seating: "Seating Area",
    mixed: "Mixed Scene",
    infinityPool: "Infinity Pool",
    gardenLounge: "Garden Lounge",
    desertOasis: "Desert Oasis",
    modernVilla: "Modern Villa Exterior",
    luxuryTerrace: "Luxury Terrace",
    waterFeatures: "Water Features",
    enterDescription: "Describe your vision in detail...",
    exampleDescription:
      "Example: Infinity pool surrounded by date palms, smart LED lighting under starry sky, outdoor seating area with water fountain",
    addColor: "Add Color",
    removeColor: "Remove Color",
    guidanceScale: "Guidance Scale",
    inferenceSteps: "Inference Steps",
    randomSeed: "Random Seed",
    useRandomSeed: "Use Random Seed",
    generating: "Generating Design...",
    analyzing: "Analyzing Description...",
    optimizing: "Optimizing AI Parameters...",
    rendering: "Rendering 3D Scene...",
    finalizing: "Finalizing Design...",
    generationComplete: "Generation Complete!",
    approveDesign: "Approve Design",
    rejectDesign: "Reject Design",
    regenerate: "Regenerate",
    downloadHD: "Download HD",
    shareDesign: "Share Design",
    editPrompt: "Edit Prompt",
    viewDetails: "View Details",
    generationTime: "Generation Time",
    aiModel: "AI Model",
    resolution: "Resolution",
    style: "Style",
    realistic: "Realistic",
    artistic: "Artistic",
    cinematic: "Cinematic",
    architectural: "Architectural",
    seconds: "seconds",
    minutes: "minutes",
    selectPreset: "Select a preset to get started quickly",
    orCustom: "Or describe your custom vision",
    freeModels: "Free AI Models",
    premiumModels: "Premium Models",
    localModels: "Local Models",
    apiStatus: "API Status",
    online: "Online",
    offline: "Offline",
    limited: "Limited",
    quota: "Quota",
    remaining: "remaining",
    upgradeForMore: "Upgrade for more generations",
    processingQueue: "Processing Queue",
    position: "Position",
    estimatedTime: "Estimated Time",
    cancel: "Cancel",
    retry: "Retry",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
  },
  ar: {
    title: "نوكس ديزاين - مولد المشاهد الذكي",
    subtitle: "إنشاء تصاميم مناظر طبيعية مذهلة من الأوصاف",
    sceneType: "نوع المشهد",
    detailedDescription: "الوصف التفصيلي",
    areaSize: "حجم المساحة (متر مربع)",
    preferredColors: "الألوان المفضلة",
    generateDesign: "إنتاج التصميم الذكي",
    quickAI: "🎨 تصميم فوري",
    scenePresets: "قوالب المشاهد",
    customDescription: "وصف مخصص",
    myDesigns: "تصاميمي المُنتجة",
    aiModels: "نماذج الذكاء الاصطناعي",
    generationSettings: "إعدادات التوليد",
    garden: "حديقة",
    pool: "مسبح",
    seating: "منطقة جلوس",
    mixed: "مشهد مختلط",
    infinityPool: "مسبح لا نهائي",
    gardenLounge: "صالة الحديقة",
    desertOasis: "واحة صحراوية",
    modernVilla: "فيلا عصرية خارجية",
    luxuryTerrace: "تراس فاخر",
    waterFeatures: "مرافق مائية",
    enterDescription: "صف رؤيتك بالتفصيل...",
    exampleDescription:
      "مثال: مسبح لا نهائي محاط بأشجار النخيل، إضاءة LED ذكية تحت سماء مليئة بالنجوم، منطقة جلوس خارجية مع نافورة مائية",
    addColor: "إضافة لون",
    removeColor: "إزالة لون",
    guidanceScale: "مقياس التوجيه",
    inferenceSteps: "خطوات الاستنتاج",
    randomSeed: "بذرة عشوائية",
    useRandomSeed: "استخدم بذرة عشوائية",
    generating: "��نتاج التصميم...",
    analyzing: "تحليل الوصف...",
    optimizing: "تحسين معاملات الذكاء الاصطناعي...",
    rendering: "عرض المشهد ثلاثي الأبعاد...",
    finalizing: "وضع اللمسات الأخيرة للتصميم...",
    generationComplete: "اكتمل التوليد!",
    approveDesign: "اعتماد التصميم",
    rejectDesign: "رفض التصميم",
    regenerate: "إعادة توليد",
    downloadHD: "تحميل عالي الدقة",
    shareDesign: "مشاركة التصميم",
    editPrompt: "تحرير المحث",
    viewDetails: "عرض التفاصيل",
    generationTime: "وقت التوليد",
    aiModel: "نموذج الذكاء الاصطناعي",
    resolution: "الدقة",
    style: "النمط",
    realistic: "واقعي",
    artistic: "فني",
    cinematic: "سينمائي",
    architectural: "معماري",
    seconds: "ثانية",
    minutes: "دقيقة",
    selectPreset: "اختر قالباً للبدء بسرعة",
    orCustom: "أو صف رؤيتك المخصصة",
    freeModels: "نماذج ذكاء اصطناعي مجانية",
    premiumModels: "نماذج متميزة",
    localModels: "نماذج محلية",
    apiStatus: "حالة API",
    online: "متصل",
    offline: "غير متصل",
    limited: "محدود",
    quota: "الحصة",
    remaining: "متبقية",
    upgradeForMore: "ترقية لمزيد من التوليدات",
    processingQueue: "طابور المعالجة",
    position: "الموضع",
    estimatedTime: "الوقت المتوقع",
    cancel: "إلغاء",
    retry: "إعادة المحاولة",
    error: "خطأ",
    success: "نجح",
    warning: "تحذير",
    info: "معلومات",
  },
};

// Scene Presets with Templates
const scenePresets: ScenePreset[] = [
  {
    id: "infinity-pool",
    name_ar: "مسبح لا نهائي",
    name_en: "Infinity Pool",
    icon: Droplets,
    category: "pool",
    thumbnail: "/presets/infinity-pool.jpg",
    description_ar: "مسبح لا نهائي مع إطلالة خلابة",
    description_en: "Infinity pool with stunning views",
    prompt_template:
      "Ultra-realistic 3D render of an infinity pool with {description}, surrounded by date palms, smart LED lighting, cinematic lighting, HDR, 8K resolution, architectural photography style",
  },
  {
    id: "garden-lounge",
    name_ar: "صالة الحديقة",
    name_en: "Garden Lounge",
    icon: TreePine,
    category: "garden",
    thumbnail: "/presets/garden-lounge.jpg",
    description_ar: "منطقة جلوس فاخرة في الحديقة",
    description_en: "Luxurious outdoor seating area",
    prompt_template:
      "A luxurious outdoor seating area with {description}, lush greenery, ambient LED lighting, photo-realistic, cinematic composition, golden hour lighting",
  },
  {
    id: "desert-oasis",
    name_ar: "واحة صحراوية",
    name_en: "Desert Oasis",
    icon: Home,
    category: "mixed",
    thumbnail: "/presets/desert-oasis.jpg",
    description_ar: "واحة صحراوية مع مرافق حديثة",
    description_en: "Desert oasis with modern amenities",
    prompt_template:
      "Desert oasis landscape featuring {description}, native desert plants, sustainable design, sand dunes backdrop, warm sunset lighting, ultra-realistic rendering",
  },
  {
    id: "modern-terrace",
    name_ar: "تراس عصري",
    name_en: "Modern Terrace",
    icon: Armchair,
    category: "seating",
    thumbnail: "/presets/modern-terrace.jpg",
    description_ar: "تراس عصري مع أثاث أنيق",
    description_en: "Modern terrace with elegant furniture",
    prompt_template:
      "Modern rooftop terrace with {description}, sleek furniture, city skyline view, contemporary design, dramatic lighting, architectural visualization",
  },
  {
    id: "water-features",
    name_ar: "مرافق مائية",
    name_en: "Water Features",
    icon: Droplets,
    category: "mixed",
    thumbnail: "/presets/water-features.jpg",
    description_ar: "تصميم مع مرافق مائية متنوعة",
    description_en: "Design with various water features",
    prompt_template:
      "Landscape design with multiple water features including {description}, fountains, waterfalls, reflecting pools, zen garden style, peaceful atmosphere",
  },
];

// AI Models Configuration
const aiModels: AIModel[] = [
  {
    id: "sdxl-base",
    name: "Stable Diffusion XL",
    provider: "huggingface",
    model_path: "stabilityai/stable-diffusion-xl-base-1.0",
    description: "High-quality image generation",
    free_tier_limit: 100,
    speed: "medium",
    quality: "high",
  },
  {
    id: "sd-1.5",
    name: "Stable Diffusion 1.5",
    provider: "huggingface",
    model_path: "runwayml/stable-diffusion-v1-5",
    description: "Fast and reliable generation",
    free_tier_limit: 200,
    speed: "fast",
    quality: "standard",
  },
  {
    id: "controlnet-depth",
    name: "ControlNet Depth",
    provider: "huggingface",
    model_path: "lllyasviel/sd-controlnet-depth",
    description: "Precise depth control",
    free_tier_limit: 50,
    speed: "slow",
    quality: "ultra",
  },
  {
    id: "replicate-sdxl",
    name: "Replicate SDXL",
    provider: "replicate",
    model_path: "stability-ai/sdxl",
    description: "Commercial grade quality",
    free_tier_limit: 20,
    speed: "medium",
    quality: "ultra",
  },
];

// Color Palette
const defaultColors = [
  "#2C5F2D",
  "#97BC62",
  "#F4E4BC",
  "#FFFFFF",
  "#8B4513",
  "#228B22",
  "#4169E1",
  "#FFD700",
  "#FF6347",
  "#9370DB",
  "#20B2AA",
  "#F0E68C",
];

export default function KnoxDesignGenerator({
  language,
}: KnoxDesignGeneratorProps) {
  const [activeStep, setActiveStep] = useState<
    "setup" | "generating" | "results"
  >("setup");
  const [selectedPreset, setSelectedPreset] = useState<ScenePreset | null>(
    null,
  );
  const [formData, setFormData] = useState({
    sceneType: "mixed",
    description: "",
    areaSqm: 100,
    colors: [] as string[],
    style: "realistic",
  });
  const [generationSettings, setGenerationSettings] = useState({
    guidanceScale: 7.5,
    inferenceSteps: 30,
    seed: Math.floor(Math.random() * 1000000),
    useRandomSeed: true,
    selectedModel: "sdxl-base",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [generatedDesigns, setGeneratedDesigns] = useState<GeneratedDesign[]>(
    [],
  );
  const [selectedDesign, setSelectedDesign] = useState<GeneratedDesign | null>(
    null,
  );
  const [newColor, setNewColor] = useState("#2C5F2D");

  const t = translations[language];
  const isRTL = language === "ar";

  // Simulate AI Generation Process
  const generateDesign = async () => {
    setIsGenerating(true);
    setActiveStep("generating");

    const steps = [t.analyzing, t.optimizing, t.rendering, t.finalizing];

    let finalPrompt = formData.description;
    if (selectedPreset) {
      finalPrompt = selectedPreset.prompt_template.replace(
        "{description}",
        formData.description,
      );
    }

    // Add style modifiers
    const styleModifiers = {
      realistic: "ultra-realistic, photo-realistic, 8K resolution",
      artistic: "artistic interpretation, painterly style, vibrant colors",
      cinematic: "cinematic lighting, dramatic composition, film photography",
      architectural:
        "architectural visualization, technical precision, clean lines",
    };

    finalPrompt += `, ${styleModifiers[formData.style as keyof typeof styleModifiers]}`;

    // Add color preferences
    if (formData.colors.length > 0) {
      finalPrompt += `, color palette: ${formData.colors.join(", ")}`;
    }

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise((resolve) =>
        setTimeout(resolve, 1500 + Math.random() * 1000),
      );
    }

    // Create mock generated design
    const newDesign: GeneratedDesign = {
      id: Date.now().toString(),
      title: selectedPreset
        ? language === "ar"
          ? selectedPreset.name_ar
          : selectedPreset.name_en
        : `Custom ${formData.sceneType} design`,
      prompt: finalPrompt,
      image_url: `/generated/design-${Date.now()}.jpg`, // This would be actual generated image
      style: formData.style,
      scene_type: formData.sceneType,
      area_sqm: formData.areaSqm,
      colors: formData.colors,
      timestamp: new Date().toISOString(),
      status: "completed",
      ai_model:
        aiModels.find((m) => m.id === generationSettings.selectedModel)?.name ||
        "Unknown",
      generation_time: 15 + Math.random() * 10,
      settings: {
        guidance_scale: generationSettings.guidanceScale,
        num_inference_steps: generationSettings.inferenceSteps,
        seed: generationSettings.useRandomSeed
          ? Math.floor(Math.random() * 1000000)
          : generationSettings.seed,
      },
    };

    setGeneratedDesigns((prev) => [newDesign, ...prev]);
    setSelectedDesign(newDesign);
    setIsGenerating(false);
    setActiveStep("results");
    setGenerationStep("");
  };

  const addColor = () => {
    if (!formData.colors.includes(newColor)) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor],
      }));
    }
  };

  const removeColor = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  const resetForm = () => {
    setSelectedPreset(null);
    setFormData({
      sceneType: "mixed",
      description: "",
      areaSqm: 100,
      colors: [],
      style: "realistic",
    });
    setActiveStep("setup");
  };

  const selectedModel = aiModels.find(
    (m) => m.id === generationSettings.selectedModel,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900 text-white p-6">
      {/* Header */}
      <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          {t.title}
        </h1>
        <p className="text-emerald-300 text-xl opacity-90">{t.subtitle}</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[
            { id: "setup", icon: Settings, label: "Setup" },
            { id: "generating", icon: Bot, label: "AI Generation" },
            { id: "results", icon: ImageIcon, label: "Results" },
          ].map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  activeStep === step.id
                    ? "bg-emerald-500 border-emerald-400 text-white"
                    : index <
                        ["setup", "generating", "results"].indexOf(activeStep)
                      ? "bg-emerald-600 border-emerald-500 text-white"
                      : "border-gray-400 text-gray-400"
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              {index < 2 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    index <
                    ["setup", "generating", "results"].indexOf(activeStep)
                      ? "bg-emerald-500"
                      : "bg-gray-400"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Setup Step */}
      {activeStep === "setup" && (
        <div className="space-y-8">
          {/* Scene Presets */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.scenePresets}</h3>
            <p className="text-emerald-300 mb-6">{t.selectPreset}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {scenePresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setFormData((prev) => ({
                      ...prev,
                      sceneType: preset.category,
                    }));
                  }}
                  className={`cursor-pointer rounded-xl p-4 border-2 transition-all hover:scale-105 ${
                    selectedPreset?.id === preset.id
                      ? "border-emerald-400 bg-emerald-500/20"
                      : "border-white/20 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <div className="text-center space-y-3">
                    <div
                      className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto ${
                        selectedPreset?.id === preset.id
                          ? "bg-emerald-500"
                          : "bg-gradient-to-br from-blue-400 to-purple-600"
                      }`}
                    >
                      <preset.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-medium">
                      {language === "ar" ? preset.name_ar : preset.name_en}
                    </h4>
                    <p className="text-xs text-gray-300">
                      {language === "ar"
                        ? preset.description_ar
                        : preset.description_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Description Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              {t.customDescription}
            </h3>
            <p className="text-emerald-300 mb-6">{t.orCustom}</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* Scene Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.sceneType}
                  </label>
                  <select
                    value={formData.sceneType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sceneType: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="garden">{t.garden}</option>
                    <option value="pool">{t.pool}</option>
                    <option value="seating">{t.seating}</option>
                    <option value="mixed">{t.mixed}</option>
                  </select>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.detailedDescription}
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={t.enterDescription}
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    {t.exampleDescription}
                  </p>
                </div>

                {/* Area Size */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.areaSize}
                  </label>
                  <input
                    type="number"
                    value={formData.areaSqm}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        areaSqm: parseInt(e.target.value) || 100,
                      }))
                    }
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    min="10"
                    max="10000"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.style}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "realistic",
                      "artistic",
                      "cinematic",
                      "architectural",
                    ].map((style) => (
                      <button
                        key={style}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, style }))
                        }
                        className={`p-3 rounded-lg text-sm transition-all ${
                          formData.style === style
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {t[style as keyof typeof t]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Colors */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.preferredColors}
                  </label>

                  {/* Color Input */}
                  <div className="flex gap-2 mb-3">
                    <input
                      type="color"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="w-12 h-10 rounded-lg border border-white/20 bg-white/10"
                    />
                    <input
                      type="text"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="#2C5F2D"
                    />
                    <Button
                      onClick={addColor}
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Default Colors */}
                  <div className="grid grid-cols-6 gap-2 mb-3">
                    {defaultColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          if (!formData.colors.includes(color)) {
                            setFormData((prev) => ({
                              ...prev,
                              colors: [...prev.colors, color],
                            }));
                          }
                        }}
                        className="w-10 h-10 rounded-lg border-2 border-white/20 hover:border-white/40 transition-all"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>

                  {/* Selected Colors */}
                  {formData.colors.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-300 mb-2">
                        Selected Colors:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.colors.map((color) => (
                          <div
                            key={color}
                            className="flex items-center bg-white/10 rounded-lg p-2 gap-2"
                          >
                            <div
                              className="w-6 h-6 rounded border border-white/20"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-sm">{color}</span>
                            <button
                              onClick={() => removeColor(color)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Model Selection & Settings */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.aiModels}</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.aiModel}
                </label>
                <div className="space-y-3">
                  {aiModels.map((model) => (
                    <div
                      key={model.id}
                      onClick={() =>
                        setGenerationSettings((prev) => ({
                          ...prev,
                          selectedModel: model.id,
                        }))
                      }
                      className={`cursor-pointer p-4 rounded-lg border transition-all ${
                        generationSettings.selectedModel === model.id
                          ? "border-emerald-400 bg-emerald-500/20"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{model.name}</h4>
                        <div className="flex gap-2">
                          <Badge
                            className={`${
                              model.provider === "huggingface"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : model.provider === "replicate"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {model.provider}
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-400">
                            {model.free_tier_limit} {t.remaining}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">
                        {model.description}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>Speed: {model.speed}</span>
                        <span>Quality: {model.quality}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generation Settings */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.generationSettings}
                </label>
                <div className="space-y-4">
                  {/* Guidance Scale */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      {t.guidanceScale}: {generationSettings.guidanceScale}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={generationSettings.guidanceScale}
                      onChange={(e) =>
                        setGenerationSettings((prev) => ({
                          ...prev,
                          guidanceScale: parseFloat(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Inference Steps */}
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      {t.inferenceSteps}: {generationSettings.inferenceSteps}
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={generationSettings.inferenceSteps}
                      onChange={(e) =>
                        setGenerationSettings((prev) => ({
                          ...prev,
                          inferenceSteps: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Seed */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={generationSettings.useRandomSeed}
                        onChange={(e) =>
                          setGenerationSettings((prev) => ({
                            ...prev,
                            useRandomSeed: e.target.checked,
                          }))
                        }
                        className="w-4 h-4"
                      />
                      <label className="text-sm text-gray-300">
                        {t.useRandomSeed}
                      </label>
                    </div>
                    {!generationSettings.useRandomSeed && (
                      <input
                        type="number"
                        value={generationSettings.seed}
                        onChange={(e) =>
                          setGenerationSettings((prev) => ({
                            ...prev,
                            seed: parseInt(e.target.value) || 0,
                          }))
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Random seed"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={generateDesign}
              disabled={!formData.description.trim()}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-4 text-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {t.generateDesign}
            </Button>
            <Button
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  description: selectedPreset
                    ? `${selectedPreset.description_en} with smart features and LED lighting`
                    : "Infinity pool surrounded by date palms, smart LED lighting under starry sky, outdoor seating area with water fountain",
                }));
                generateDesign();
              }}
              className="bg-purple-600 hover:bg-purple-700 py-4"
            >
              {t.quickAI}
            </Button>
          </div>
        </div>
      )}

      {/* Generating Step */}
      {activeStep === "generating" && (
        <div className="bg-white/10 backdrop-blur-xl rounded-xl p-8 border border-white/20 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Bot className="w-10 h-10 text-white animate-spin" />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">{t.generating}</h3>
              <p className="text-emerald-300 text-lg">{generationStep}</p>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full animate-pulse"
                style={{ width: "75%" }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="font-medium">{t.aiModel}</div>
                <div className="text-emerald-400">{selectedModel?.name}</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="font-medium">{t.inferenceSteps}</div>
                <div className="text-emerald-400">
                  {generationSettings.inferenceSteps}
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="font-medium">{t.guidanceScale}</div>
                <div className="text-emerald-400">
                  {generationSettings.guidanceScale}
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setIsGenerating(false);
                setActiveStep("setup");
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              {t.cancel}
            </Button>
          </div>
        </div>
      )}

      {/* Results Step */}
      {activeStep === "results" && (
        <div className="space-y-6">
          {/* Generated Design Display */}
          {selectedDesign && (
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Design Preview */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    {selectedDesign.title}
                  </h3>
                  <div className="aspect-video bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-lg flex items-center justify-center border border-emerald-400/30">
                    <div className="text-center">
                      <ImageIcon className="w-16 h-16 text-emerald-400 mx-auto mb-2" />
                      <p className="text-emerald-300">
                        Generated Design Preview
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        {selectedDesign.image_url}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <Check className="w-4 h-4 mr-2" />
                      {t.approveDesign}
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <X className="w-4 h-4 mr-2" />
                      {t.rejectDesign}
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      {t.downloadHD}
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      {t.shareDesign}
                    </Button>
                  </div>
                </div>

                {/* Design Details */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Generation Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>{t.aiModel}:</span>
                        <span className="text-emerald-400">
                          {selectedDesign.ai_model}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.generationTime}:</span>
                        <span className="text-emerald-400">
                          {selectedDesign.generation_time.toFixed(1)}{" "}
                          {t.seconds}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.style}:</span>
                        <span className="text-emerald-400">
                          {selectedDesign.style}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.resolution}:</span>
                        <span className="text-emerald-400">1024x1024</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Prompt Used</h4>
                    <p className="text-sm text-gray-300 break-words">
                      {selectedDesign.prompt}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Settings</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Guidance Scale:</span>
                        <span className="text-emerald-400">
                          {selectedDesign.settings.guidance_scale}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inference Steps:</span>
                        <span className="text-emerald-400">
                          {selectedDesign.settings.num_inference_steps}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Seed:</span>
                        <span className="text-emerald-400">
                          {selectedDesign.settings.seed}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedDesign.colors.length > 0 && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        {t.preferredColors}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDesign.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded border border-white/20"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Generated Designs Gallery */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.myDesigns}</h3>

            {generatedDesigns.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No designs generated yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {generatedDesigns.map((design) => (
                  <div
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className={`cursor-pointer rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedDesign?.id === design.id
                        ? "border-emerald-400 bg-emerald-500/20"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <div className="aspect-square bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-t-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-1">
                        {design.title}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        {design.ai_model}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`text-xs ${
                            design.status === "completed"
                              ? "bg-green-500/20 text-green-400"
                              : design.status === "approved"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {design.status}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {design.generation_time.toFixed(1)}s
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={resetForm}
              className="bg-emerald-600 hover:bg-emerald-700 flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              Generate New Design
            </Button>
            <Button
              onClick={() => generateDesign()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.regenerate}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
