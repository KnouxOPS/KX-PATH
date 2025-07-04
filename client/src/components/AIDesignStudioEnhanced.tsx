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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import KnoxDesignGenerator from "@/components/KnoxDesignGenerator";

interface AIDesignStudioEnhancedProps {
  language: "en" | "ar";
}

interface DesignProject {
  id: string;
  title: string;
  client: string;
  status: "concept" | "design" | "pricing" | "approved" | "in_progress";
  created_date: string;
  project_type: "villa" | "apartment" | "commercial" | "public_space";
  location: {
    emirate: string;
    area: string;
    coordinates?: { lat: number; lng: number };
  };
  site_analysis: {
    area_sqm: number;
    soil_type: string;
    climate_zone: string;
    water_availability: string;
    sun_exposure: string;
  };
  ai_design: {
    style: string;
    theme: string;
    plant_recommendations: PlantRecommendation[];
    smart_features: string[];
    sustainability_score: number;
    maintenance_level: "low" | "medium" | "high";
  };
  pricing: {
    design_cost: number;
    material_cost: number;
    labor_cost: number;
    total_cost: number;
    roi_projection: number;
  };
  generated_assets: {
    images: string[];
    video_walkthrough?: string;
    ar_preview?: string;
    technical_drawings: string[];
  };
  client_preferences: {
    budget_range: { min: number; max: number };
    style_preference: string[];
    must_have_features: string[];
    color_palette: string[];
  };
}

interface PlantRecommendation {
  name_en: string;
  name_ar: string;
  scientific_name: string;
  category: "tree" | "shrub" | "flower" | "grass" | "succulent";
  care_level: "easy" | "moderate" | "difficult";
  water_needs: "low" | "medium" | "high";
  sun_requirement: "full_sun" | "partial_shade" | "shade";
  uae_native: boolean;
  drought_tolerant: boolean;
  price_per_unit: number;
  quantity_needed: number;
}

const translations = {
  en: {
    title: "AI Design Studio",
    subtitle: "Smart Production & Intelligent Design Generation",
    knoxDesign: "KnoxDesign",
    knoxPrice: "KnoxPrice",
    knoxPlants: "KnoxPlants",
    knoxSuggest: "KnoxSuggest",
    newProject: "New Project",
    myProjects: "My Projects",
    templates: "Templates",
    aiTools: "AI Tools",
    createFromDescription: "Create from Description",
    uploadSitePhoto: "Upload Site Photo",
    selectTemplate: "Select Template",
    projectDetails: "Project Details",
    clientName: "Client Name",
    projectType: "Project Type",
    location: "Location",
    budget: "Budget Range",
    stylePreference: "Style Preference",
    generateDesign: "Generate AI Design",
    analyzesite: "Analyze Site",
    smartPricing: "Smart Pricing",
    plantRecommendations: "Plant Recommendations",
    sustainabilityScore: "Sustainability Score",
    maintenanceLevel: "Maintenance Level",
    designCost: "Design Cost",
    materialCost: "Material Cost",
    laborCost: "Labor Cost",
    totalCost: "Total Cost",
    roiProjection: "ROI Projection",
    downloadAssets: "Download Assets",
    shareDesign: "Share Design",
    previewAR: "Preview in AR",
    videoWalkthrough: "Video Walkthrough",
    technicalDrawings: "Technical Drawings",
    villa: "Villa",
    apartment: "Apartment",
    commercial: "Commercial",
    publicSpace: "Public Space",
    modern: "Modern",
    traditional: "Traditional",
    mediterranean: "Mediterranean",
    tropical: "Tropical",
    minimalist: "Minimalist",
    luxury: "Luxury",
    sustainable: "Sustainable",
    concept: "Concept",
    design: "Design",
    pricing: "Pricing",
    approved: "Approved",
    inProgress: "In Progress",
    low: "Low",
    medium: "Medium",
    high: "High",
    easy: "Easy",
    moderate: "Moderate",
    difficult: "Difficult",
    tree: "Tree",
    shrub: "Shrub",
    flower: "Flower",
    grass: "Grass",
    succulent: "Succulent",
    uaeNative: "UAE Native",
    droughtTolerant: "Drought Tolerant",
    waterNeeds: "Water Needs",
    sunRequirement: "Sun Requirement",
    fullSun: "Full Sun",
    partialShade: "Partial Shade",
    shade: "Shade",
    pricePerUnit: "Price per Unit",
    quantityNeeded: "Quantity Needed",
    aed: "AED",
    sqm: "sqm",
    projectsCompleted: "Projects Completed",
    activeProjects: "Active Projects",
    aiGenerations: "AI Generations",
    clientSatisfaction: "Client Satisfaction",
    enterDescription: "Describe your vision...",
    generating: "Generating AI Design...",
    analyzing: "Analyzing Site Conditions...",
    pricing: "Calculating Smart Pricing...",
    selectAll: "Select All",
    clearAll: "Clear All",
    applyRecommendations: "Apply Recommendations",
    viewDetails: "View Details",
    editDesign: "Edit Design",
    duplicateProject: "Duplicate Project",
    archiveProject: "Archive Project",
    smartFeatures: "Smart Features",
    innovativeElements: "Innovative Elements",
    sustainabilityFeatures: "Sustainability Features",
    maintenanceplan: "Maintenance Plan",
    irrigationSystem: "Smart Irrigation System",
    lightingDesign: "LED Lighting Design",
    outdoorSound: "Outdoor Sound System",
    securityFeatures: "Security Features",
    climateControl: "Climate Control Zones",
    energyEfficient: "Energy Efficient Solutions",
    rainwaterHarvesting: "Rainwater Harvesting",
    solarPowered: "Solar Powered Features",
    nativeSpecies: "Native Plant Species",
    xerophyticGarden: "Xerophytic Garden Design",
    smartSensors: "Smart Environmental Sensors",
    mobileApp: "Mobile App Control",
    recommendation: "AI Recommendation",
    generating3d: "Generating 3D Visualization...",
    processingAr: "Processing AR Preview...",
    optimizingCosts: "Optimizing Cost Structure...",
    analyzingEnvironment: "Analyzing Environmental Factors...",
  },
  ar: {
    title: "استوديو التصميم الذكي",
    subtitle: "الإنتاج الذكي وتوليد التصاميم بالذكاء الاصطناعي",
    knoxDesign: "نوكس ديزاين",
    knoxPrice: "نوكس برايس",
    knoxPlants: "نوكس بلانتس",
    knoxSuggest: "نوكس ساجست",
    newProject: "مشروع جديد",
    myProjects: "مشاريعي",
    templates: "القوالب",
    aiTools: "أدوات الذكاء الاصطناعي",
    createFromDescription: "إنشاء من الوصف",
    uploadSitePhoto: "رفع صورة الموقع",
    selectTemplate: "اختيار قالب",
    projectDetails: "تفاصيل المشروع",
    clientName: "اسم العميل",
    projectType: "نوع المشروع",
    location: "الموقع",
    budget: "نطاق الميزانية",
    stylePreference: "تفضيل الأسلوب",
    generateDesign: "إنتاج التصميم الذكي",
    analyzesite: "تحليل الموقع",
    smartPricing: "التسعير الذكي",
    plantRecommendations: "توصيات النباتات",
    sustainabilityScore: "نقاط الاستدامة",
    maintenanceLevel: "مستوى الصيانة",
    designCost: "تكلفة التصميم",
    materialCost: "تكلفة المواد",
    laborCost: "تكلفة العمالة",
    totalCost: "التكلفة الإجمالية",
    roiProjection: "توقع العائد",
    downloadAssets: "تحميل الملفات",
    shareDesign: "مشاركة التصميم",
    previewAR: "معاينة الواقع المعزز",
    videoWalkthrough: "جولة فيديو",
    technicalDrawings: "الرسوم التقنية",
    villa: "فيلا",
    apartment: "شقة",
    commercial: "تجاري",
    publicSpace: "مساحة عامة",
    modern: "عصري",
    traditional: "تقليدي",
    mediterranean: "متوسطي",
    tropical: "استوائي",
    minimalist: "بسيط",
    luxury: "فاخر",
    sustainable: "مستدام",
    concept: "مفهوم",
    design: "تصميم",
    pricing: "تسعير",
    approved: "موافق عليه",
    inProgress: "قيد التنفيذ",
    low: "منخفض",
    medium: "متوسط",
    high: "عالي",
    easy: "سهل",
    moderate: "متوسط",
    difficult: "صعب",
    tree: "شجرة",
    shrub: "شجيرة",
    flower: "زهرة",
    grass: "عشب",
    succulent: "نبات عصاري",
    uaeNative: "محلي إماراتي",
    droughtTolerant: "مقاوم للجفاف",
    waterNeeds: "احتياجات المياه",
    sunRequirement: "متطلبات الشمس",
    fullSun: "شمس كاملة",
    partialShade: "ظل جزئي",
    shade: "ظل",
    pricePerUnit: "السعر للوحدة",
    quantityNeeded: "الكمية المطلوبة",
    aed: "درهم",
    sqm: "متر مربع",
    projectsCompleted: "المشاريع المكتملة",
    activeProjects: "المشاريع النشطة",
    aiGenerations: "إنتاجات الذكاء الاصطناعي",
    clientSatisfaction: "رضا العملاء",
    enterDescription: "صف رؤيتك...",
    generating: "إنتاج التصميم الذكي...",
    analyzing: "تحليل ظروف الموقع...",
    pricing: "حساب التسعير الذكي...",
    selectAll: "تحديد الكل",
    clearAll: "إلغاء التحديد",
    applyRecommendations: "تطبيق التوصيات",
    viewDetails: "عرض التفاصيل",
    editDesign: "تعديل التصميم",
    duplicateProject: "نسخ المشروع",
    archiveProject: "أرشفة المشروع",
    smartFeatures: "الميزات الذكية",
    innovativeElements: "العناصر المبتكرة",
    sustainabilityFeatures: "ميزات الاستدامة",
    maintenanceplan: "خطة الصيانة",
    irrigationSystem: "نظام الري الذكي",
    lightingDesign: "تصميم الإضاءة LED",
    outdoorSound: "نظام الصوت الخارجي",
    securityFeatures: "ميزات الأمان",
    climateControl: "مناطق التحكم في المناخ",
    energyEfficient: "حلول موفرة للطاقة",
    rainwaterHarvesting: "ح��اد مياه الأمطار",
    solarPowered: "ميزات تعمل بالطاقة الشمسية",
    nativeSpecies: "أنواع النباتات المحلية",
    xerophyticGarden: "تصميم حديقة جافة",
    smartSensors: "أجهزة الاستشعار البيئية الذكية",
    mobileApp: "التحكم عبر التطبيق المحمول",
    recommendation: "توصية الذكاء الاصطناعي",
    generating3d: "إنتاج المشهد ثلاثي الأبعاد...",
    processingAr: "معالجة معاينة الواقع المعزز...",
    optimizingCosts: "تحسين هيكل التكلفة...",
    analyzingEnvironment: "تحليل العوامل البيئية...",
  },
};

// Sample plant recommendations
const samplePlants: PlantRecommendation[] = [
  {
    name_en: "Date Palm",
    name_ar: "نخيل التمر",
    scientific_name: "Phoenix dactylifera",
    category: "tree",
    care_level: "easy",
    water_needs: "medium",
    sun_requirement: "full_sun",
    uae_native: true,
    drought_tolerant: true,
    price_per_unit: 850,
    quantity_needed: 4,
  },
  {
    name_en: "Bougainvillea",
    name_ar: "جهنمية",
    scientific_name: "Bougainvillea spectabilis",
    category: "shrub",
    care_level: "easy",
    water_needs: "low",
    sun_requirement: "full_sun",
    uae_native: false,
    drought_tolerant: true,
    price_per_unit: 45,
    quantity_needed: 12,
  },
  {
    name_en: "Desert Rose",
    name_ar: "وردة الصحراء",
    scientific_name: "Adenium obesum",
    category: "succulent",
    care_level: "easy",
    water_needs: "low",
    sun_requirement: "full_sun",
    uae_native: false,
    drought_tolerant: true,
    price_per_unit: 75,
    quantity_needed: 6,
  },
  {
    name_en: "Arabian Jasmine",
    name_ar: "الياسمين العربي",
    scientific_name: "Jasminum sambac",
    category: "flower",
    care_level: "moderate",
    water_needs: "medium",
    sun_requirement: "partial_shade",
    uae_native: true,
    drought_tolerant: false,
    price_per_unit: 35,
    quantity_needed: 8,
  },
  {
    name_en: "Bermuda Grass",
    name_ar: "عشب برمودا",
    scientific_name: "Cynodon dactylon",
    category: "grass",
    care_level: "moderate",
    water_needs: "high",
    sun_requirement: "full_sun",
    uae_native: false,
    drought_tolerant: false,
    price_per_unit: 25,
    quantity_needed: 150,
  },
];

// Sample projects
const sampleProjects: DesignProject[] = [
  {
    id: "1",
    title: "Royal Villa Garden - Dubai Hills",
    client: "Ahmed Al Mansoori",
    status: "approved",
    created_date: "2024-01-10",
    project_type: "villa",
    location: {
      emirate: "Dubai",
      area: "Dubai Hills Estate",
      coordinates: { lat: 25.2048, lng: 55.2708 },
    },
    site_analysis: {
      area_sqm: 850,
      soil_type: "Sandy loam",
      climate_zone: "Desert",
      water_availability: "Municipal supply",
      sun_exposure: "8-10 hours daily",
    },
    ai_design: {
      style: "Modern Arabic",
      theme: "Luxury Oasis",
      plant_recommendations: samplePlants,
      smart_features: [
        "Smart irrigation system",
        "LED pathway lighting",
        "Outdoor sound system",
        "Security cameras integration",
        "Climate control zones",
      ],
      sustainability_score: 87,
      maintenance_level: "medium",
    },
    pricing: {
      design_cost: 25000,
      material_cost: 145000,
      labor_cost: 85000,
      total_cost: 255000,
      roi_projection: 32.5,
    },
    generated_assets: {
      images: ["villa_1.jpg", "villa_2.jpg", "villa_3.jpg"],
      video_walkthrough: "villa_walkthrough.mp4",
      ar_preview: "villa_ar.usdz",
      technical_drawings: ["plan_1.pdf", "elevation_1.pdf"],
    },
    client_preferences: {
      budget_range: { min: 200000, max: 300000 },
      style_preference: ["modern", "luxury", "sustainable"],
      must_have_features: [
        "outdoor dining",
        "swimming pool area",
        "children's play zone",
      ],
      color_palette: ["#2C5F2D", "#97BC62", "#F4E4BC", "#FFFFFF"],
    },
  },
];

export default function AIDesignStudioEnhanced({
  language,
}: AIDesignStudioEnhancedProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "new" | "projects" | "tools"
  >("overview");
  const [projects, setProjects] = useState<DesignProject[]>(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<DesignProject | null>(
    null,
  );
  const [newProjectData, setNewProjectData] = useState({
    clientName: "",
    projectType: "villa",
    location: "",
    budget: { min: 50000, max: 200000 },
    stylePreference: [] as string[],
    description: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [designDescription, setDesignDescription] = useState("");
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  const t = translations[language];
  const isRTL = language === "ar";

  const handleGenerateDesign = async () => {
    setIsGenerating(true);

    // Simulate AI generation process
    const steps = [
      t.analyzingEnvironment,
      t.generating3d,
      t.optimizingCosts,
      t.processingAr,
    ];

    for (let i = 0; i < steps.length; i++) {
      setGenerationStep(steps[i]);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    setIsGenerating(false);
    setGenerationStep("");
    setActiveTab("projects");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concept":
        return "bg-gray-500/20 text-gray-400";
      case "design":
        return "bg-blue-500/20 text-blue-400";
      case "pricing":
        return "bg-yellow-500/20 text-yellow-400";
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "in_progress":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tree":
        return "text-green-400";
      case "shrub":
        return "text-blue-400";
      case "flower":
        return "text-pink-400";
      case "grass":
        return "text-emerald-400";
      case "succulent":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  const overviewStats = {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === "in_progress").length,
    completedProjects: projects.filter((p) => p.status === "approved").length,
    aiGenerations: 234,
    avgSustainability: Math.round(
      projects.reduce((sum, p) => sum + p.ai_design.sustainability_score, 0) /
        projects.length,
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-green-900 text-white p-6">
      {/* Header */}
      <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          {t.title}
        </h1>
        <p className="text-emerald-300 text-xl opacity-90">{t.subtitle}</p>
      </div>

      {/* AI Tools Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            id: "knox-design",
            label: t.knoxDesign,
            icon: Wand2,
            color: "from-purple-400 to-purple-600",
            description: "2D/3D Design Generation",
          },
          {
            id: "knox-price",
            label: t.knoxPrice,
            icon: Calculator,
            color: "from-blue-400 to-blue-600",
            description: "Smart Pricing & ROI",
          },
          {
            id: "knox-plants",
            label: t.knoxPlants,
            icon: TreePine,
            color: "from-green-400 to-green-600",
            description: "Plant Recommendations",
          },
          {
            id: "knox-suggest",
            label: t.knoxSuggest,
            icon: Lightbulb,
            color: "from-yellow-400 to-orange-500",
            description: "AI Suggestions",
          },
        ].map((tool) => (
          <div
            key={tool.id}
            className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 hover:border-emerald-400/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{tool.label}</h3>
                <p className="text-xs text-gray-300">{tool.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-xl rounded-xl p-2 border border-white/20">
        {[
          { id: "overview", label: t.overview, icon: BarChart3 },
          { id: "new", label: t.newProject, icon: Sparkles },
          { id: "projects", label: t.myProjects, icon: Home },
          { id: "tools", label: t.aiTools, icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-emerald-500 text-white"
                : "hover:bg-white/10"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.totalProjects}
                  </div>
                  <div className="text-sm text-gray-300">{t.totalProjects}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.activeProjects}
                  </div>
                  <div className="text-sm text-gray-300">
                    {t.activeProjects}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.completedProjects}
                  </div>
                  <div className="text-sm text-gray-300">
                    {t.projectsCompleted}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.aiGenerations}
                  </div>
                  <div className="text-sm text-gray-300">{t.aiGenerations}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.avgSustainability}%
                  </div>
                  <div className="text-sm text-gray-300">
                    {t.sustainabilityScore}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Recent Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 6).map((project) => (
                <div
                  key={project.id}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{project.title}</h4>
                      <Badge className={getStatusColor(project.status)}>
                        {t[project.status as keyof typeof t]}
                      </Badge>
                    </div>

                    <div className="text-sm text-gray-300">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4" />
                        <span>{project.client}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location.area}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {(project.pricing.total_cost / 1000).toFixed(0)}K{" "}
                          {t.aed}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {new Date(project.created_date).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-emerald-400">
                        {project.ai_design.sustainability_score}% Sustainable
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Project Tab */}
      {activeTab === "new" && (
        <div className="space-y-6">
          {/* Creation Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all cursor-pointer group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Edit className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">
                  {t.createFromDescription}
                </h3>
                <p className="text-sm text-gray-300">
                  Describe your vision and let AI create the design
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all cursor-pointer group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{t.uploadSitePhoto}</h3>
                <p className="text-sm text-gray-300">
                  Upload site photos for AI analysis and design
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all cursor-pointer group">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{t.selectTemplate}</h3>
                <p className="text-sm text-gray-300">
                  Start with pre-designed templates and customize
                </p>
              </div>
            </div>
          </div>

          {/* Project Details Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-6">{t.projectDetails}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.clientName}
                  </label>
                  <input
                    type="text"
                    value={newProjectData.clientName}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        clientName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.projectType}
                  </label>
                  <select
                    value={newProjectData.projectType}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        projectType: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="villa">{t.villa}</option>
                    <option value="apartment">{t.apartment}</option>
                    <option value="commercial">{t.commercial}</option>
                    <option value="public_space">{t.publicSpace}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.location}
                  </label>
                  <input
                    type="text"
                    value={newProjectData.location}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Emirates, Area"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.stylePreference}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "modern",
                      "traditional",
                      "luxury",
                      "sustainable",
                      "minimalist",
                      "tropical",
                    ].map((style) => (
                      <button
                        key={style}
                        onClick={() => {
                          const isSelected =
                            newProjectData.stylePreference.includes(style);
                          setNewProjectData({
                            ...newProjectData,
                            stylePreference: isSelected
                              ? newProjectData.stylePreference.filter(
                                  (s) => s !== style,
                                )
                              : [...newProjectData.stylePreference, style],
                          });
                        }}
                        className={`p-2 rounded-lg text-sm transition-all ${
                          newProjectData.stylePreference.includes(style)
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 hover:bg-white/20"
                        }`}
                      >
                        {t[style as keyof typeof t]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.budget}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={newProjectData.budget.min}
                      onChange={(e) =>
                        setNewProjectData({
                          ...newProjectData,
                          budget: {
                            ...newProjectData.budget,
                            min: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={newProjectData.budget.max}
                      onChange={(e) =>
                        setNewProjectData({
                          ...newProjectData,
                          budget: {
                            ...newProjectData.budget,
                            max: parseInt(e.target.value) || 0,
                          },
                        })
                      }
                      className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Design Description
              </label>
              <textarea
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder={t.enterDescription}
              />
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                onClick={handleGenerateDesign}
                disabled={isGenerating}
                className="bg-emerald-600 hover:bg-emerald-700 flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {generationStep || t.generating}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t.generateDesign}
                  </>
                )}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                {t.uploadSitePhoto}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <Badge className={getStatusColor(project.status)}>
                      {t[project.status as keyof typeof t]}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      <span>{t[project.project_type as keyof typeof t]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TreePine className="w-4 h-4" />
                      <span>
                        {project.site_analysis.area_sqm} {t.sqm}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-400">
                        {(project.pricing.total_cost / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-gray-300">{t.totalCost}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-emerald-400">
                        {project.ai_design.sustainability_score}%
                      </div>
                      <div className="text-xs text-gray-300">
                        {t.sustainabilityScore}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools Tab - KnoxDesign Generator */}
      {activeTab === "tools" && <KnoxDesignGenerator language={language} />}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Design Preview */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Design Preview</h3>
                  <div className="aspect-video bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-green-400 mx-auto mb-2" />
                      <p className="text-green-300">3D Visualization</p>
                    </div>
                  </div>
                </div>

                {/* Smart Features */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{t.smartFeatures}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProject.ai_design.smart_features.map(
                      (feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span>{feature}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Plant Recommendations */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">
                    {t.plantRecommendations}
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.ai_design.plant_recommendations
                      .slice(0, 5)
                      .map((plant, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white/5 rounded-lg p-2"
                        >
                          <div>
                            <span className="font-medium">
                              {language === "ar"
                                ? plant.name_ar
                                : plant.name_en}
                            </span>
                            <Badge
                              className={`ml-2 ${getCategoryColor(plant.category)} bg-white/10`}
                            >
                              {t[plant.category as keyof typeof t]}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-300">
                            {plant.quantity_needed}x {plant.price_per_unit}{" "}
                            {t.aed}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Project Info */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Project Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Client:</span>
                      <span>{selectedProject.client}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>
                        {t[selectedProject.project_type as keyof typeof t]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{selectedProject.location.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Area:</span>
                      <span>
                        {selectedProject.site_analysis.area_sqm} {t.sqm}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge className={getStatusColor(selectedProject.status)}>
                        {t[selectedProject.status as keyof typeof t]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Pricing Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.designCost}:</span>
                      <span>
                        {selectedProject.pricing.design_cost.toLocaleString()}{" "}
                        {t.aed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.materialCost}:</span>
                      <span>
                        {selectedProject.pricing.material_cost.toLocaleString()}{" "}
                        {t.aed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.laborCost}:</span>
                      <span>
                        {selectedProject.pricing.labor_cost.toLocaleString()}{" "}
                        {t.aed}
                      </span>
                    </div>
                    <div className="border-t border-white/20 pt-2 flex justify-between font-semibold">
                      <span>{t.totalCost}:</span>
                      <span className="text-green-400">
                        {selectedProject.pricing.total_cost.toLocaleString()}{" "}
                        {t.aed}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.roiProjection}:</span>
                      <span className="text-emerald-400">
                        {selectedProject.pricing.roi_projection}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">AI Analysis</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{t.sustainabilityScore}</span>
                        <span>
                          {selectedProject.ai_design.sustainability_score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-emerald-400 h-2 rounded-full"
                          style={{
                            width: `${selectedProject.ai_design.sustainability_score}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t.maintenanceLevel}:</span>
                      <Badge
                        className={`${
                          selectedProject.ai_design.maintenance_level === "low"
                            ? "bg-green-500/20 text-green-400"
                            : selectedProject.ai_design.maintenance_level ===
                                "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {
                          t[
                            selectedProject.ai_design
                              .maintenance_level as keyof typeof t
                          ]
                        }
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="w-4 h-4 mr-2" />
                {t.downloadAssets}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Share2 className="w-4 h-4 mr-2" />
                {t.shareDesign}
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                {t.previewAR}
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Play className="w-4 h-4 mr-2" />
                {t.videoWalkthrough}
              </Button>
              <Button className="bg-gray-600 hover:bg-gray-700">
                <Edit className="w-4 h-4 mr-2" />
                {t.editDesign}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
