import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Cpu,
  Camera,
  Upload,
  Download,
  Zap,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Image,
  Video,
  Palette,
  Layers,
  Sun,
  Cloud,
  Droplets,
  Thermometer,
  Wind,
  TreePine,
  Flower,
  Leaf,
  Shrub,
  Mountain,
  Waves,
  Building2,
  Home,
  MapPin,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  Eye,
  Target,
  Activity,
  BarChart3,
  TrendingUp,
  Volume2,
  Maximize,
  Share,
  Save,
  RefreshCw,
  Magic,
  Sparkles,
  Wand2,
  Lightbulb,
  Brain,
  Scan,
  Search,
  Filter,
  Grid,
  Move3d,
  Ruler,
  PaintBucket,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Comprehensive UAE Plant Database with AI Recommendations
const UAE_PLANT_DATABASE = {
  native_plants: [
    {
      id: "ghaf_tree",
      name_ar: "شجرة الغاف",
      name_en: "Ghaf Tree",
      scientific_name: "Prosopis cineraria",
      category: "trees",
      water_requirement: "low",
      sun_exposure: "full",
      soil_type: ["sandy", "clay", "rocky"],
      mature_height: "8-12m",
      mature_width: "10-15m",
      growth_rate: "slow",
      maintenance: "low",
      climate_suitability: "excellent",
      cost_per_unit: 850,
      availability: "high",
      seasonal_features: {
        spring: "New leaf growth",
        summer: "Full shade canopy",
        autumn: "Seed pods",
        winter: "Drought resistance",
      },
      benefits: [
        "Shade",
        "Wind resistance",
        "Cultural significance",
        "Wildlife habitat",
      ],
      ideal_locations: ["courtyards", "parking_areas", "property_boundaries"],
      companion_plants: ["desert_rose", "bougainvillea"],
    },
    {
      id: "date_palm",
      name_ar: "نخلة التمر",
      name_en: "Date Palm",
      scientific_name: "Phoenix dactylifera",
      category: "palms",
      water_requirement: "medium",
      sun_exposure: "full",
      soil_type: ["sandy", "well_drained"],
      mature_height: "15-25m",
      mature_width: "6-10m",
      growth_rate: "slow",
      maintenance: "medium",
      climate_suitability: "excellent",
      cost_per_unit: 2500,
      availability: "high",
      seasonal_features: {
        spring: "New fronds",
        summer: "Date formation",
        autumn: "Date harvest",
        winter: "Minimal care",
      },
      benefits: [
        "Iconic appearance",
        "Fruit production",
        "Cultural value",
        "Windbreak",
      ],
      ideal_locations: ["entrance_gates", "focal_points", "pool_areas"],
      companion_plants: ["ornamental_grass", "colorful_shrubs"],
    },
    {
      id: "bougainvillea",
      name_ar: "الجهنمية",
      name_en: "Bougainvillea",
      scientific_name: "Bougainvillea spectabilis",
      category: "flowering_shrubs",
      water_requirement: "low",
      sun_exposure: "full",
      soil_type: ["sandy", "well_drained"],
      mature_height: "2-8m",
      mature_width: "2-6m",
      growth_rate: "fast",
      maintenance: "low",
      climate_suitability: "excellent",
      cost_per_unit: 185,
      availability: "very_high",
      seasonal_features: {
        spring: "Heavy blooming",
        summer: "Continuous flowers",
        autumn: "Color variety",
        winter: "Reduced flowering",
      },
      colors: ["magenta", "pink", "white", "orange", "red", "purple"],
      benefits: [
        "Year-round color",
        "Low water",
        "Privacy screen",
        "Thorny security",
      ],
      ideal_locations: ["walls", "fences", "pergolas", "containers"],
      companion_plants: ["ghaf_tree", "desert_rose"],
    },
  ],
  design_themes: [
    {
      id: "modern_minimalist",
      name_ar: "عصري بسيط",
      name_en: "Modern Minimalist",
      description_ar: "تصميم نظيف مع خطوط بسيطة ونباتات محدودة",
      description_en:
        "Clean design with simple lines and limited plant palette",
      characteristics: [
        "geometric_shapes",
        "limited_colors",
        "structured_layout",
      ],
      recommended_plants: ["ghaf_tree", "ornamental_grass", "succulents"],
      hardscape_elements: [
        "concrete_planters",
        "steel_pergola",
        "modern_lighting",
      ],
      maintenance_level: "low",
      cost_range: { min: 150, max: 300 },
      suitable_properties: ["contemporary_villas", "commercial_buildings"],
    },
    {
      id: "traditional_arabic",
      name_ar: "عربي تقليدي",
      name_en: "Traditional Arabic",
      description_ar: "تصميم يعكس التراث العربي مع النباتات المحلية",
      description_en: "Design reflecting Arabic heritage with native plants",
      characteristics: [
        "curved_pathways",
        "water_features",
        "shade_structures",
      ],
      recommended_plants: ["date_palm", "ghaf_tree", "jasmine", "roses"],
      hardscape_elements: ["natural_stone", "arabic_patterns", "fountain"],
      maintenance_level: "medium",
      cost_range: { min: 200, max: 500 },
      suitable_properties: ["traditional_villas", "luxury_estates"],
    },
    {
      id: "desert_oasis",
      name_ar: "واحة صحراوية",
      name_en: "Desert Oasis",
      description_ar: "تصميم يحاكي الواحة الطبيعية مع النباتات الصحراوية",
      description_en: "Design mimicking natural oasis with desert plants",
      characteristics: [
        "drought_tolerant",
        "natural_groupings",
        "rocky_elements",
      ],
      recommended_plants: ["date_palm", "ghaf_tree", "desert_rose", "aloe"],
      hardscape_elements: ["natural_rocks", "gravel_paths", "shade_sails"],
      maintenance_level: "very_low",
      cost_range: { min: 100, max: 250 },
      suitable_properties: [
        "desert_properties",
        "eco_conscious",
        "low_maintenance",
      ],
    },
  ],
};

// AI Design Generation Parameters
interface DesignProject {
  id: string;
  name: string;
  description: string;
  location: {
    emirate: string;
    district: string;
    coordinates: { lat: number; lng: number };
  };
  property_details: {
    type: "villa" | "apartment" | "commercial" | "public";
    size_sqm: number;
    budget_range: { min: number; max: number };
    style_preference: string;
    special_requirements: string[];
  };
  site_analysis: {
    soil_type: string;
    sun_exposure: string;
    wind_patterns: string;
    existing_vegetation: string[];
    topography: string;
  };
  climate_data: {
    avg_temperature: number;
    humidity: number;
    rainfall: number;
    sun_hours: number;
  };
  ai_recommendations: {
    theme: string;
    plant_list: any[];
    hardscape_features: string[];
    irrigation_system: string;
    lighting_plan: string;
    estimated_cost: number;
    maintenance_schedule: string;
  };
  design_images: string[];
  status: "analyzing" | "generating" | "reviewing" | "completed";
  progress: number;
  created_at: string;
  completion_date?: string;
}

interface NooxAIDesignHubProps {
  language: "en" | "ar";
}

export default function NooxAIDesignHub({ language }: NooxAIDesignHubProps) {
  const [currentProject, setCurrentProject] = useState<DesignProject | null>(
    null,
  );
  const [designMode, setDesignMode] = useState<
    "create" | "analyze" | "generate" | "review"
  >("create");
  const [analysisPhase, setAnalysisPhase] = useState<
    "site" | "climate" | "preferences" | "ai_processing"
  >("site");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [siteImages, setSiteImages] = useState<string[]>([]);
  const [generated3DViews, setGenerated3DViews] = useState<string[]>([]);
  const [costEstimate, setCostEstimate] = useState<any>(null);
  const [plantRecommendations, setPlantRecommendations] = useState<any[]>([]);
  const [designHistory, setDesignHistory] = useState<DesignProject[]>([]);
  const [nooxVoice, setNooxVoice] = useState(true);
  const [aiPersonality, setAiPersonality] = useState<
    "professional" | "creative" | "analytical"
  >("creative");

  const t = {
    ar: {
      nooxDesignHub: "مركز التصميم الذكي - نوكس",
      aiLandscapeDesigner: "مصمم المناظر الطبيعية الذكي",
      createNewProject: "إنشاء مشروع جديد",
      analyzeProject: "تحليل المشروع",
      generateDesign: "توليد التصميم",
      reviewResults: "مراجعة النتائج",
      siteAnalysis: "تحليل الموقع",
      climateAnalysis: "تحليل المناخ",
      preferences: "التفضيلات",
      aiProcessing: "المعالجة الذكية",
      uploadSiteImages: "رفع صور الموقع",
      projectLocation: "موقع المشروع",
      propertyType: "نوع العقار",
      budgetRange: "نطاق الميزانية",
      designTheme: "موضوع التصميم",
      specialRequirements: "متطلبات خاصة",
      generateDesignNow: "توليد التصميم الآن",
      nooxIsAnalyzing: "نوكس يحلل...",
      nooxIsGenerating: "نوكس ينتج التصميم...",
      climateCompatible: "متوافق مع المناخ",
      waterEfficient: "موفر للمياه",
      lowMaintenance: "صيانة قليلة",
      costEstimate: "تقدير التكلفة",
      plantRecommendations: "توصيات النباتات",
      irrigationPlan: "خطة الري",
      lightingDesign: "تصميم الإضاءة",
      maintenanceSchedule: "جدول الصيانة",
      downloadPlan: "تحميل المخطط",
      sharePlan: "مشاركة المخطط",
      modify: "تعديل",
      approve: "موافقة",
      villa: "فيلا",
      apartment: "ش��ة",
      commercial: "تجاري",
      public: "عام",
      modernMinimalist: "عصري بسيط",
      traditionalArabic: "عربي تقليدي",
      desertOasis: "واحة صحراوية",
      tropicalLuxury: "استوائي فاخر",
      nooxSpeaking: "نوكس يتحدث...",
      voiceEnabled: "تفعيل الصوت",
      aiPersonality: "شخصية الذكاء الاصطناعي",
      professional: "مهني",
      creative: "إبداعي",
      analytical: "تحليلي",
    },
    en: {
      nooxDesignHub: "Noox AI Design Hub",
      aiLandscapeDesigner: "AI Landscape Designer",
      createNewProject: "Create New Project",
      analyzeProject: "Analyze Project",
      generateDesign: "Generate Design",
      reviewResults: "Review Results",
      siteAnalysis: "Site Analysis",
      climateAnalysis: "Climate Analysis",
      preferences: "Preferences",
      aiProcessing: "AI Processing",
      uploadSiteImages: "Upload Site Images",
      projectLocation: "Project Location",
      propertyType: "Property Type",
      budgetRange: "Budget Range",
      designTheme: "Design Theme",
      specialRequirements: "Special Requirements",
      generateDesignNow: "Generate Design Now",
      nooxIsAnalyzing: "Noox is analyzing...",
      nooxIsGenerating: "Noox is generating design...",
      climateCompatible: "Climate Compatible",
      waterEfficient: "Water Efficient",
      lowMaintenance: "Low Maintenance",
      costEstimate: "Cost Estimate",
      plantRecommendations: "Plant Recommendations",
      irrigationPlan: "Irrigation Plan",
      lightingDesign: "Lighting Design",
      maintenanceSchedule: "Maintenance Schedule",
      downloadPlan: "Download Plan",
      sharePlan: "Share Plan",
      modify: "Modify",
      approve: "Approve",
      villa: "Villa",
      apartment: "Apartment",
      commercial: "Commercial",
      public: "Public",
      modernMinimalist: "Modern Minimalist",
      traditionalArabic: "Traditional Arabic",
      desertOasis: "Desert Oasis",
      tropicalLuxury: "Tropical Luxury",
      nooxSpeaking: "Noox is speaking...",
      voiceEnabled: "Voice Enabled",
      aiPersonality: "AI Personality",
      professional: "Professional",
      creative: "Creative",
      analytical: "Analytical",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // AI Design Generation Simulation
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          setIsGenerating(false);

          // Simulate generating design recommendations
          const mockRecommendations = UAE_PLANT_DATABASE.native_plants
            .slice(0, 6)
            .map((plant) => ({
              ...plant,
              recommended_quantity: Math.floor(Math.random() * 10 + 1),
              placement_areas: ["front_garden", "side_area", "pool_area"][
                Math.floor(Math.random() * 3)
              ],
            }));

          setPlantRecommendations(mockRecommendations);

          // Generate cost estimate
          const totalCost = mockRecommendations.reduce(
            (sum, plant) =>
              sum + plant.cost_per_unit * plant.recommended_quantity,
            0,
          );

          setCostEstimate({
            plants: totalCost,
            hardscape: totalCost * 0.6,
            installation: totalCost * 0.4,
            irrigation: totalCost * 0.3,
            lighting: totalCost * 0.2,
            total: totalCost * 2.5,
          });

          // Generate mock 3D views
          setGenerated3DViews([
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
            "/api/placeholder/400/300",
          ]);

          setDesignMode("review");
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 5);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // Noox Voice Simulation
  useEffect(() => {
    if (!nooxVoice) return;

    const phrases = [
      language === "ar"
        ? "جاري تحليل الموقع..."
        : "Analyzing site conditions...",
      language === "ar"
        ? "تقييم المناخ المحلي..."
        : "Evaluating local climate...",
      language === "ar"
        ? "اختيار النباتات المناسبة..."
        : "Selecting suitable plants...",
      language === "ar" ? "تحسين التصميم..." : "Optimizing design...",
    ];

    let currentPhrase = 0;
    const speechInterval = setInterval(() => {
      if (isGenerating && currentPhrase < phrases.length) {
        console.log(`Noox: ${phrases[currentPhrase]}`);
        currentPhrase++;
      } else {
        currentPhrase = 0;
      }
    }, 3000);

    return () => clearInterval(speechInterval);
  }, [nooxVoice, isGenerating, language]);

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setDesignMode("generate");
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files) {
      const newImages = Array.from(files).map(() => `/api/placeholder/300/200`);
      setSiteImages((prev) => [...prev, ...newImages]);
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "site":
        return MapPin;
      case "climate":
        return Sun;
      case "preferences":
        return Palette;
      case "ai_processing":
        return Brain;
      default:
        return Activity;
    }
  };

  const getPersonalityColor = (personality: string) => {
    switch (personality) {
      case "professional":
        return "text-blue-400";
      case "creative":
        return "text-purple-400";
      case "analytical":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-blue-900/20 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Noox AI Header */}
      <div
        className={`p-6 border-b border-white/10 bg-black/30 backdrop-blur-xl ${isRTL ? "text-right" : "text-left"}`}
      >
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="flex items-center gap-4">
            {/* Noox Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center">
                <Brain
                  className={`w-8 h-8 text-purple-400 ${isGenerating ? "animate-pulse" : ""}`}
                />
              </div>
              {isGenerating && (
                <div className="absolute -inset-1 rounded-2xl border-2 border-purple-400 animate-ping opacity-60"></div>
              )}
              {nooxVoice && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                  <Volume2 className="w-2 h-2 text-white" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {tr.nooxDesignHub}
              </h2>
              <p className="text-purple-300/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse" />
                {tr.aiLandscapeDesigner}
              </p>
              {isGenerating && (
                <p
                  className={`text-cyan-300 text-sm mt-1 ${getPersonalityColor(aiPersonality)}`}
                >
                  {aiPersonality === "creative" && tr.nooxIsGenerating}
                  {aiPersonality === "professional" && tr.nooxIsAnalyzing}
                  {aiPersonality === "analytical" && "Processing data..."}
                </p>
              )}
            </div>
          </div>

          {/* Noox Controls */}
          <div className="flex items-center gap-3">
            <select
              value={aiPersonality}
              onChange={(e) => setAiPersonality(e.target.value as any)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-purple-400"
            >
              <option value="creative" className="text-black">
                {tr.creative}
              </option>
              <option value="professional" className="text-black">
                {tr.professional}
              </option>
              <option value="analytical" className="text-black">
                {tr.analytical}
              </option>
            </select>

            <Button
              variant={nooxVoice ? "default" : "ghost"}
              size="sm"
              onClick={() => setNooxVoice(!nooxVoice)}
              className={
                nooxVoice
                  ? "bg-green-500 text-white border-0"
                  : "text-green-300 hover:text-white hover:bg-green-500/20 border-0"
              }
            >
              <Volume2 className="w-4 h-4 mr-2" />
              {tr.voiceEnabled}
            </Button>
          </div>
        </div>
      </div>

      {/* Design Process Navigation */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2">
          {[
            { key: "create", icon: PlusCircle, label: tr.createNewProject },
            { key: "analyze", icon: Scan, label: tr.analyzeProject },
            { key: "generate", icon: Magic, label: tr.generateDesign },
            { key: "review", icon: Eye, label: tr.reviewResults },
          ].map(({ key, icon: Icon, label }) => (
            <Button
              key={key}
              variant={designMode === key ? "default" : "ghost"}
              onClick={() => setDesignMode(key as any)}
              className={`flex-1 ${
                designMode === key
                  ? "bg-purple-500 text-white border-0"
                  : "text-purple-300 hover:text-white hover:bg-purple-500/20 border-0"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Main Design Canvas */}
        <div className="flex-1 p-6">
          {/* Create Project Mode */}
          {designMode === "create" && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Start New Design Project
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Details */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-400" />
                    Project Details
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="text-blue-300 text-sm font-medium mb-2 block">
                        {tr.projectLocation}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400">
                          <option value="dubai" className="text-black">
                            Dubai
                          </option>
                          <option value="abudhabi" className="text-black">
                            Abu Dhabi
                          </option>
                          <option value="sharjah" className="text-black">
                            Sharjah
                          </option>
                          <option value="ajman" className="text-black">
                            Ajman
                          </option>
                        </select>
                        <input
                          type="text"
                          placeholder="District/Area"
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-purple-300 text-sm font-medium mb-2 block">
                        {tr.propertyType}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: "villa", label: tr.villa, icon: Home },
                          {
                            key: "apartment",
                            label: tr.apartment,
                            icon: Building2,
                          },
                          {
                            key: "commercial",
                            label: tr.commercial,
                            icon: Briefcase,
                          },
                          { key: "public", label: tr.public, icon: Users },
                        ].map(({ key, label, icon: Icon }) => (
                          <Button
                            key={key}
                            variant="ghost"
                            className="text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-400/30"
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-green-300 text-sm font-medium mb-2 block">
                        {tr.budgetRange}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          placeholder="Min (AED)"
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400"
                        />
                        <input
                          type="number"
                          placeholder="Max (AED)"
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-green-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Site Images Upload */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-cyan-400" />
                    {tr.uploadSiteImages}
                  </h4>

                  <div className="border-2 border-dashed border-cyan-400/30 rounded-xl p-8 text-center hover:border-cyan-400/60 transition-colors cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                      id="site-images"
                    />
                    <label htmlFor="site-images" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                      <p className="text-white font-medium">
                        Drop site images here
                      </p>
                      <p className="text-cyan-300/60 text-sm">
                        or click to browse
                      </p>
                    </label>
                  </div>

                  {siteImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {siteImages.map((image, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={image}
                            alt={`Site ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-1 right-1 w-6 h-6 p-0 bg-red-500/80 hover:bg-red-600 text-white"
                            onClick={() =>
                              setSiteImages((prev) =>
                                prev.filter((_, i) => i !== idx),
                              )
                            }
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Design Themes */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  {tr.designTheme}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {UAE_PLANT_DATABASE.design_themes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedTheme === theme.id
                          ? "border-pink-400 bg-pink-500/20"
                          : "border-white/20 bg-white/5 hover:border-pink-400/50"
                      }`}
                    >
                      <h5 className="text-white font-semibold mb-2">
                        {theme[`name_${language}` as keyof typeof theme]}
                      </h5>
                      <p className="text-pink-300/80 text-sm mb-3">
                        {theme[`description_${language}` as keyof typeof theme]}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 text-sm font-bold">
                          {theme.cost_range.min}K - {theme.cost_range.max}K AED
                        </span>
                        <span className="text-blue-400 text-xs">
                          {theme.maintenance_level} maintenance
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  onClick={handleStartGeneration}
                  disabled={!selectedTheme || siteImages.length === 0}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-3 text-lg font-bold border-0 shadow-lg"
                >
                  <Magic className="w-5 h-5 mr-2" />
                  {tr.generateDesignNow}
                </Button>
              </div>
            </div>
          )}

          {/* Generate Mode */}
          {designMode === "generate" && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center space-y-6">
                {/* Noox Animation */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/30 via-blue-500/30 to-cyan-500/30 backdrop-blur-lg border-4 border-white/30 flex items-center justify-center animate-pulse">
                    <Brain className="w-16 h-16 text-purple-400 animate-bounce" />
                  </div>
                  <div className="absolute -inset-2 rounded-full border-4 border-purple-400 animate-ping opacity-40"></div>
                  <div
                    className="absolute -inset-4 rounded-full border-2 border-cyan-400 animate-ping opacity-20"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>

                <h3 className="text-3xl font-bold text-white">
                  {tr.nooxIsGenerating}
                </h3>

                {/* Progress Bar */}
                <div className="w-80 bg-white/20 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 transition-all duration-1000 relative"
                    style={{ width: `${generationProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-purple-300 text-lg">
                  {generationProgress}% Complete
                </p>

                {/* Generation Phases */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { phase: "site", label: "Site Analysis", icon: MapPin },
                    {
                      phase: "climate",
                      label: "Climate Assessment",
                      icon: Sun,
                    },
                    {
                      phase: "plants",
                      label: "Plant Selection",
                      icon: TreePine,
                    },
                    {
                      phase: "design",
                      label: "Design Generation",
                      icon: Palette,
                    },
                  ].map(({ phase, label, icon: Icon }) => {
                    const isActive =
                      generationProgress >
                      ["site", "climate", "plants", "design"].indexOf(phase) *
                        25;
                    return (
                      <div
                        key={phase}
                        className={`flex items-center gap-3 p-3 rounded-xl ${isActive ? "bg-green-500/20 text-green-300" : "bg-white/5 text-white/60"}`}
                      >
                        <Icon
                          className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`}
                        />
                        <span className="font-medium">{label}</span>
                        {isActive && (
                          <CheckCircle className="w-4 h-4 ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Review Mode */}
          {designMode === "review" && costEstimate && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                AI Generated Design Plan
              </h3>

              {/* 3D Views */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Move3d className="w-5 h-5 text-cyan-400" />
                  3D Design Views
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {generated3DViews.map((view, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={view}
                        alt={`3D View ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white/20 text-white border-0"
                        >
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    {tr.costEstimate}
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(costEstimate).map(([category, amount]) => (
                      <div
                        key={category}
                        className="flex justify-between items-center p-2 bg-white/5 rounded-lg"
                      >
                        <span className="text-green-300 capitalize">
                          {category.replace("_", " ")}
                        </span>
                        <span className="text-white font-bold">
                          {typeof amount === "number"
                            ? amount.toLocaleString()
                            : amount}{" "}
                          AED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plant Recommendations */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <TreePine className="w-5 h-5 text-green-400" />
                    {tr.plantRecommendations}
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {plantRecommendations.map((plant, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TreePine className="w-4 h-4 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            {plant[`name_${language}`]}
                          </p>
                          <p className="text-green-300/60 text-xs">
                            Qty: {plant.recommended_quantity}
                          </p>
                        </div>
                        <span className="text-green-400 font-bold text-sm">
                          {(
                            plant.cost_per_unit * plant.recommended_quantity
                          ).toLocaleString()}{" "}
                          AED
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white border-0">
                  <Download className="w-4 h-4 mr-2" />
                  {tr.downloadPlan}
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white border-0">
                  <Share className="w-4 h-4 mr-2" />
                  {tr.sharePlan}
                </Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white border-0">
                  <Settings className="w-4 h-4 mr-2" />
                  {tr.modify}
                </Button>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white border-0">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {tr.approve}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Panel */}
        <div className="w-80 bg-black/40 backdrop-blur-lg border-l border-white/10">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Brain
                className={`w-5 h-5 text-purple-400 ${isGenerating ? "animate-pulse" : ""}`}
              />
              Noox AI Assistant
            </h3>
            <p className="text-purple-300/60 text-sm">
              {aiPersonality === "creative" &&
                "Creative landscape design partner"}
              {aiPersonality === "professional" &&
                "Professional design consultant"}
              {aiPersonality === "analytical" && "Data-driven design optimizer"}
            </p>
          </div>

          <div className="h-full overflow-y-auto p-4 space-y-4">
            {/* AI Insights */}
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-400/20">
              <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Smart Insights
              </h4>
              <ul className="space-y-1 text-sm text-purple-300/80">
                <li>• Climate analysis suggests drought-resistant plants</li>
                <li>• Soil composition favors deep-rooted species</li>
                <li>• Optimal planting season: October - March</li>
                <li>• Water-efficient irrigation recommended</li>
              </ul>
            </div>

            {/* Featured Plants */}
            <div className="bg-green-500/10 rounded-xl p-4 border border-green-400/20">
              <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
                <TreePine className="w-4 h-4" />
                Featured Plants
              </h4>
              <div className="space-y-2">
                {UAE_PLANT_DATABASE.native_plants
                  .slice(0, 3)
                  .map((plant, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center">
                        <TreePine className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-xs font-medium">
                          {plant[`name_${language}`]}
                        </p>
                        <p className="text-green-300/60 text-xs">
                          {plant.water_requirement} water
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Design Tips */}
            <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/20">
              <h4 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                <Star className="w-4 h-4" />
                Design Tips
              </h4>
              <ul className="space-y-1 text-sm text-blue-300/80">
                <li>• Group plants by water requirements</li>
                <li>• Use native species for sustainability</li>
                <li>• Consider mature plant sizes</li>
                <li>• Plan for seasonal color changes</li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <Button className="w-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/30">
                <Camera className="w-4 h-4 mr-2" />
                Analyze New Images
              </Button>
              <Button className="w-full bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border border-pink-400/30">
                <Palette className="w-4 h-4 mr-2" />
                Change Theme
              </Button>
              <Button className="w-full bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-400/30">
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate Design
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
