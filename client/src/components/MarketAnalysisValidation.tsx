import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Building2,
  Home,
  Users,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Share2,
  Zap,
  Eye,
  Layers,
  Activity,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  Filter,
  Search,
  FileText,
  PieChart,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MarketAnalysisValidationProps {
  language: "en" | "ar";
}

interface MarketData {
  emirate: string;
  property_type: "villa" | "apartment" | "commercial" | "land";
  avg_price_per_sqm: number;
  price_change_percentage: number;
  trend_direction: "up" | "down" | "stable";
  demand_level: "high" | "medium" | "low";
  supply_level: "high" | "medium" | "low";
  construction_permits: number;
  completed_projects: number;
  active_listings: number;
  avg_days_on_market: number;
  last_updated: string;
}

interface ProjectAnalysis {
  id: string;
  project_name: string;
  location: string;
  project_type: string;
  size_sqm: number;
  estimated_cost: number;
  market_viability: "high" | "medium" | "low";
  roi_projection: number;
  risk_factors: string[];
  opportunities: string[];
  competitive_advantage: string[];
  market_positioning: string;
  swot_analysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  validation_score: number;
  created_date: string;
}

interface SWOTReport {
  id: string;
  project_id: string;
  analysis_date: string;
  strengths: {
    item: string;
    impact: "high" | "medium" | "low";
    score: number;
  }[];
  weaknesses: {
    item: string;
    impact: "high" | "medium" | "low";
    score: number;
  }[];
  opportunities: {
    item: string;
    probability: "high" | "medium" | "low";
    score: number;
  }[];
  threats: {
    item: string;
    likelihood: "high" | "medium" | "low";
    score: number;
  }[];
  overall_score: number;
  recommendations: string[];
  next_actions: string[];
}

const translations = {
  en: {
    title: "Market Analysis & Validation",
    subtitle: "Real-time Market Intelligence & SWOT Analysis",
    marketOverview: "Market Overview",
    projectAnalysis: "Project Analysis",
    swotReports: "SWOT Reports",
    dataValidation: "Data Validation",
    realTimeData: "Real-time Market Data",
    priceAnalysis: "Price Analysis",
    demandSupply: "Demand & Supply",
    constructionActivity: "Construction Activity",
    marketTrends: "Market Trends",
    emirate: "Emirate",
    propertyType: "Property Type",
    avgPriceSqm: "Avg Price/sqm",
    priceChange: "Price Change",
    demandLevel: "Demand Level",
    supplyLevel: "Supply Level",
    constructionPermits: "Construction Permits",
    completedProjects: "Completed Projects",
    activeListings: "Active Listings",
    daysOnMarket: "Avg Days on Market",
    villa: "Villa",
    apartment: "Apartment",
    commercial: "Commercial",
    land: "Land",
    high: "High",
    medium: "Medium",
    low: "Low",
    up: "Rising",
    down: "Declining",
    stable: "Stable",
    aed: "AED",
    days: "days",
    permits: "permits",
    projects: "projects",
    listings: "listings",
    lastUpdated: "Last Updated",
    refreshData: "Refresh Data",
    exportReport: "Export Report",
    shareAnalysis: "Share Analysis",
    generateSwot: "Generate SWOT",
    projectViability: "Project Viability",
    roiProjection: "ROI Projection",
    riskFactors: "Risk Factors",
    opportunities: "Opportunities",
    competitiveAdvantage: "Competitive Advantage",
    marketPositioning: "Market Positioning",
    validationScore: "Validation Score",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    threats: "Threats",
    swotAnalysis: "SWOT Analysis",
    overallScore: "Overall Score",
    recommendations: "Recommendations",
    nextActions: "Next Actions",
    impact: "Impact",
    probability: "Probability",
    likelihood: "Likelihood",
    score: "Score",
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
    viewDetails: "View Details",
    editAnalysis: "Edit Analysis",
    duplicateReport: "Duplicate Report",
    archiveReport: "Archive Report",
    marketInsights: "Market Insights",
    keyIndicators: "Key Indicators",
    performanceMetrics: "Performance Metrics",
    businessIntelligence: "Business Intelligence",
    dataSource: "Data Source",
    confidence: "Confidence Level",
    accuracy: "Data Accuracy",
    updateFrequency: "Update Frequency",
    realTime: "Real-time",
    hourly: "Hourly",
    daily: "Daily",
    weekly: "Weekly",
    searchProjects: "Search projects...",
    filterBy: "Filter by",
    sortBy: "Sort by",
    allEmirates: "All Emirates",
    allTypes: "All Types",
    latestFirst: "Latest First",
    scoreHigh: "Score High to Low",
    costHigh: "Cost High to Low",
    createNewAnalysis: "Create New Analysis",
    bulkActions: "Bulk Actions",
    selectedItems: "Selected Items",
  },
  ar: {
    title: "تحليل وتقييم السوق",
    subtitle: "الاستخبارات السوقية الفورية وتحليل SWOT",
    marketOverview: "نظرة عامة على السوق",
    projectAnalysis: "تحليل المشاريع",
    swotReports: "تقارير SWOT",
    dataValidation: "تقييم البيانات",
    realTimeData: "بيانات السوق المباشرة",
    priceAnalysis: "تحليل الأسعار",
    demandSupply: "العرض والطلب",
    constructionActivity: "النشاط الإنشائي",
    marketTrends: "اتجاهات السوق",
    emirate: "الإمارة",
    propertyType: "نوع العقار",
    avgPriceSqm: "متوسط السعر/متر مربع",
    priceChange: "تغيير السعر",
    demandLevel: "مستوى الطلب",
    supplyLevel: "مستوى العرض",
    constructionPermits: "تصاريح البناء",
    completedProjects: "المشاريع المكتملة",
    activeListings: "الإعلانات النشطة",
    daysOnMarket: "متوسط الأيام في السوق",
    villa: "فيلا",
    apartment: "شقة",
    commercial: "تجاري",
    land: "أرض",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    up: "صاعد",
    down: "هابط",
    stable: "مستقر",
    aed: "درهم",
    days: "يوم",
    permits: "تصاريح",
    projects: "مشاريع",
    listings: "إعلانات",
    lastUpdated: "آخر تحديث",
    refreshData: "تحديث البيانات",
    exportReport: "تصدير التقرير",
    shareAnalysis: "مشاركة التحليل",
    generateSwot: "إنتاج SWOT",
    projectViability: "جدوى المشروع",
    roiProjection: "توقع العائد",
    riskFactors: "عوامل المخاطرة",
    opportunities: "الفر��",
    competitiveAdvantage: "الميزة التنافسية",
    marketPositioning: "الموقف في السوق",
    validationScore: "نقاط التقييم",
    strengths: "نقاط القوة",
    weaknesses: "نقاط الضعف",
    threats: "التهديدات",
    swotAnalysis: "تحليل SWOT",
    overallScore: "النتيجة الإجمالية",
    recommendations: "التوصيات",
    nextActions: "الخطوات التالية",
    impact: "التأثير",
    probability: "الاحتمالية",
    likelihood: "الاحتمال",
    score: "النقاط",
    excellent: "ممتاز",
    good: "جيد",
    fair: "متوسط",
    poor: "ضعيف",
    viewDetails: "عرض التفاصيل",
    editAnalysis: "تحرير التحليل",
    duplicateReport: "نسخ التقرير",
    archiveReport: "أرشفة التقرير",
    marketInsights: "رؤى السوق",
    keyIndicators: "المؤشرات الرئيسية",
    performanceMetrics: "مقاييس الأداء",
    businessIntelligence: "ذكاء الأعمال",
    dataSource: "مصدر البيانات",
    confidence: "مستوى الثقة",
    accuracy: "دقة البيانات",
    updateFrequency: "تكرار التحديث",
    realTime: "مباشر",
    hourly: "كل ساعة",
    daily: "يومي",
    weekly: "أسبوعي",
    searchProjects: "البحث في المشاريع...",
    filterBy: "تصفية حسب",
    sortBy: "ترتيب حسب",
    allEmirates: "كل الإمارات",
    allTypes: "كل الأنواع",
    latestFirst: "الأحدث أولاً",
    scoreHigh: "النقاط من الأعلى للأقل",
    costHigh: "التكلفة من الأعلى للأقل",
    createNewAnalysis: "إنشاء تحليل جديد",
    bulkActions: "إجراءات مجمعة",
    selectedItems: "العناصر المحددة",
  },
};

// Sample market data
const sampleMarketData: MarketData[] = [
  {
    emirate: "Dubai",
    property_type: "villa",
    avg_price_per_sqm: 8500,
    price_change_percentage: 12.5,
    trend_direction: "up",
    demand_level: "high",
    supply_level: "medium",
    construction_permits: 45,
    completed_projects: 23,
    active_listings: 156,
    avg_days_on_market: 45,
    last_updated: "2024-01-15T14:30:00Z",
  },
  {
    emirate: "Abu Dhabi",
    property_type: "villa",
    avg_price_per_sqm: 7200,
    price_change_percentage: 8.3,
    trend_direction: "up",
    demand_level: "high",
    supply_level: "low",
    construction_permits: 32,
    completed_projects: 18,
    active_listings: 89,
    avg_days_on_market: 38,
    last_updated: "2024-01-15T14:25:00Z",
  },
  {
    emirate: "Sharjah",
    property_type: "villa",
    avg_price_per_sqm: 4800,
    price_change_percentage: -2.1,
    trend_direction: "down",
    demand_level: "medium",
    supply_level: "high",
    construction_permits: 28,
    completed_projects: 15,
    active_listings: 134,
    avg_days_on_market: 62,
    last_updated: "2024-01-15T14:20:00Z",
  },
  {
    emirate: "Dubai",
    property_type: "apartment",
    avg_price_per_sqm: 12500,
    price_change_percentage: 15.8,
    trend_direction: "up",
    demand_level: "high",
    supply_level: "low",
    construction_permits: 78,
    completed_projects: 41,
    active_listings: 243,
    avg_days_on_market: 32,
    last_updated: "2024-01-15T14:35:00Z",
  },
];

// Sample project analysis
const sampleProjectAnalysis: ProjectAnalysis[] = [
  {
    id: "1",
    project_name: "Luxury Villa Complex - Dubai Hills",
    location: "Dubai Hills Estate",
    project_type: "Residential Villa",
    size_sqm: 2500,
    estimated_cost: 4500000,
    market_viability: "high",
    roi_projection: 28.5,
    risk_factors: [
      "Market volatility in luxury segment",
      "Construction material cost fluctuations",
      "Regulatory changes in foreign ownership",
    ],
    opportunities: [
      "Growing demand for luxury properties",
      "Proximity to business districts",
      "Strong rental market potential",
      "Government initiatives supporting real estate",
    ],
    competitive_advantage: [
      "Prime location with golf course views",
      "Smart home integration",
      "Sustainable design features",
      "Exclusive community amenities",
    ],
    market_positioning:
      "Premium luxury segment targeting high-net-worth individuals",
    swot_analysis: {
      strengths: ["Prime location", "Quality construction", "Brand reputation"],
      weaknesses: ["High initial investment", "Market dependency"],
      opportunities: ["Market growth", "Tourism expansion"],
      threats: ["Economic uncertainty", "Increased competition"],
    },
    validation_score: 87,
    created_date: "2024-01-10T09:00:00Z",
  },
  {
    id: "2",
    project_name: "Sustainable Community - Sharjah",
    location: "Al Majaz District",
    project_type: "Mixed Use Development",
    size_sqm: 5000,
    estimated_cost: 8200000,
    market_viability: "medium",
    roi_projection: 22.3,
    risk_factors: [
      "Lower demand in Sharjah market",
      "Infrastructure development dependencies",
      "Financing challenges for large projects",
    ],
    opportunities: [
      "Government focus on sustainability",
      "Growing population in Sharjah",
      "Affordable housing demand",
      "Green building incentives",
    ],
    competitive_advantage: [
      "Innovative sustainable design",
      "Affordable pricing strategy",
      "Community-focused amenities",
      "Government partnership potential",
    ],
    market_positioning:
      "Affordable sustainable living for middle-income families",
    swot_analysis: {
      strengths: [
        "Sustainability focus",
        "Affordable pricing",
        "Government support",
      ],
      weaknesses: ["Location perception", "Lower profit margins"],
      opportunities: ["Green initiatives", "Population growth"],
      threats: ["Economic slowdown", "Competition from Dubai"],
    },
    validation_score: 74,
    created_date: "2024-01-08T14:30:00Z",
  },
];

export default function MarketAnalysisValidation({
  language,
}: MarketAnalysisValidationProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "analysis" | "swot" | "validation"
  >("overview");
  const [marketData, setMarketData] = useState<MarketData[]>(sampleMarketData);
  const [projectAnalyses, setProjectAnalyses] = useState<ProjectAnalysis[]>(
    sampleProjectAnalysis,
  );
  const [selectedProject, setSelectedProject] =
    useState<ProjectAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    emirate: "all",
    propertyType: "all",
    viability: "all",
    sortBy: "latest",
  });
  const [realTimeUpdates, setRealTimeUpdates] = useState<string[]>([]);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Simulate real-time market updates
    const interval = setInterval(() => {
      const updates = [
        "Dubai villa prices increased by 2.3% in the last hour",
        "New construction permit issued in Abu Dhabi - Saadiyat Island",
        "Market demand surge detected in luxury apartment segment",
        "Sharjah commercial property listings decreased by 5%",
        "Construction material costs stabilized after 3-week increase",
      ];
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      setRealTimeUpdates((prev) => [randomUpdate, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const refreshMarketData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // In real implementation, this would fetch fresh data from API
    setMarketData([...marketData]);
    setIsLoading(false);
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return <ArrowUp className="w-4 h-4 text-green-400" />;
      case "down":
        return <ArrowDown className="w-4 h-4 text-red-400" />;
      case "stable":
        return <ArrowRight className="w-4 h-4 text-yellow-400" />;
      default:
        return <ArrowRight className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-green-400 bg-green-500/20";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20";
      case "low":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getViabilityColor = (viability: string) => {
    switch (viability) {
      case "high":
        return "text-green-400 bg-green-500/20 border-green-400/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-400/30";
      case "low":
        return "text-red-400 bg-red-500/20 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-400/30";
    }
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return t.excellent;
    if (score >= 70) return t.good;
    if (score >= 60) return t.fair;
    return t.poor;
  };

  const filteredProjects = projectAnalyses.filter((project) => {
    const matchesSearch =
      project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmirate =
      filters.emirate === "all" ||
      project.location.toLowerCase().includes(filters.emirate.toLowerCase());
    const matchesType =
      filters.propertyType === "all" ||
      project.project_type
        .toLowerCase()
        .includes(filters.propertyType.toLowerCase());
    const matchesViability =
      filters.viability === "all" ||
      project.market_viability === filters.viability;

    return matchesSearch && matchesEmirate && matchesType && matchesViability;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
      {/* Header */}
      <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          {t.title}
        </h1>
        <p className="text-blue-300 text-xl opacity-90">{t.subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-xl rounded-xl p-2 border border-white/20">
        {[
          { id: "overview", label: t.marketOverview, icon: BarChart3 },
          { id: "analysis", label: t.projectAnalysis, icon: Target },
          { id: "swot", label: t.swotReports, icon: FileText },
          { id: "validation", label: t.dataValidation, icon: CheckCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-blue-500 text-white"
                : "hover:bg-white/10"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Market Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Real-time Updates */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                {t.realTimeData}
              </h3>
              <Button
                onClick={refreshMarketData}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
                />
                {t.refreshData}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">{t.marketInsights}</h4>
                <div className="space-y-2">
                  {realTimeUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 text-sm animate-pulse"
                    >
                      {update}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">{t.keyIndicators}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">
                      +15.8%
                    </div>
                    <div className="text-xs text-gray-300">Market Growth</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-400">234</div>
                    <div className="text-xs text-gray-300">Active Projects</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-400">
                      87%
                    </div>
                    <div className="text-xs text-gray-300">
                      Confidence Level
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-2xl font-bold text-yellow-400">42</div>
                    <div className="text-xs text-gray-300">Days Avg Sale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Data Table */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.priceAnalysis}</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">{t.emirate}</th>
                    <th className="text-left py-3 px-4">{t.propertyType}</th>
                    <th className="text-left py-3 px-4">{t.avgPriceSqm}</th>
                    <th className="text-left py-3 px-4">{t.priceChange}</th>
                    <th className="text-left py-3 px-4">{t.demandLevel}</th>
                    <th className="text-left py-3 px-4">{t.supplyLevel}</th>
                    <th className="text-left py-3 px-4">{t.daysOnMarket}</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/10 hover:bg-white/5"
                    >
                      <td className="py-3 px-4">{data.emirate}</td>
                      <td className="py-3 px-4">
                        {t[data.property_type as keyof typeof t]}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-green-400">
                          {data.avg_price_per_sqm.toLocaleString()} {t.aed}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getTrendIcon(data.trend_direction)}
                          <span
                            className={`font-semibold ${
                              data.price_change_percentage > 0
                                ? "text-green-400"
                                : data.price_change_percentage < 0
                                  ? "text-red-400"
                                  : "text-yellow-400"
                            }`}
                          >
                            {data.price_change_percentage > 0 ? "+" : ""}
                            {data.price_change_percentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getLevelColor(data.demand_level)}>
                          {t[data.demand_level as keyof typeof t]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getLevelColor(data.supply_level)}>
                          {t[data.supply_level as keyof typeof t]}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-blue-400">
                          {data.avg_days_on_market} {t.days}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Construction Activity */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              {t.constructionActivity}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketData.slice(0, 3).map((data, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-medium mb-3">{data.emirate}</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">
                        {t.constructionPermits}
                      </span>
                      <span className="text-blue-400 font-semibold">
                        {data.construction_permits}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">
                        {t.completedProjects}
                      </span>
                      <span className="text-green-400 font-semibold">
                        {data.completed_projects}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-300">
                        {t.activeListings}
                      </span>
                      <span className="text-purple-400 font-semibold">
                        {data.active_listings}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Project Analysis Tab */}
      {activeTab === "analysis" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchProjects}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filters.emirate}
                onChange={(e) =>
                  setFilters({ ...filters, emirate: e.target.value })
                }
                className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2"
              >
                <option value="all">{t.allEmirates}</option>
                <option value="dubai">Dubai</option>
                <option value="abudhabi">Abu Dhabi</option>
                <option value="sharjah">Sharjah</option>
              </select>

              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
                className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2"
              >
                <option value="all">{t.allTypes}</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
              </select>

              <select
                value={filters.viability}
                onChange={(e) =>
                  setFilters({ ...filters, viability: e.target.value })
                }
                className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2"
              >
                <option value="all">All Viability</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <Button className="bg-blue-600 hover:bg-blue-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-blue-400/50 transition-all cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {project.project_name}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {project.location}
                      </p>
                    </div>
                    <Badge
                      className={getViabilityColor(project.market_viability)}
                    >
                      {t[project.market_viability as keyof typeof t]}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-green-400">
                        {(project.estimated_cost / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs text-gray-300">
                        Estimated Cost
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-400">
                        {project.roi_projection.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-300">
                        ROI Projection
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-300">
                        {t.validationScore}
                      </span>
                      <span className="text-sm font-semibold">
                        {project.validation_score}/100 -{" "}
                        {getScoreLabel(project.validation_score)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          project.validation_score >= 80
                            ? "bg-green-400"
                            : project.validation_score >= 70
                              ? "bg-yellow-400"
                              : project.validation_score >= 60
                                ? "bg-orange-400"
                                : "bg-red-400"
                        }`}
                        style={{ width: `${project.validation_score}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <FileText className="w-4 h-4" />
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

          {/* Create New Analysis Button */}
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              {t.createNewAnalysis}
            </Button>
          </div>
        </div>
      )}

      {/* SWOT Reports Tab */}
      {activeTab === "swot" && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.swotAnalysis}</h3>

            {selectedProject ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {/* Strengths */}
                  <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      {t.strengths}
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.swot_analysis.strengths.map(
                        (strength, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            {strength}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {t.opportunities}
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.swot_analysis.opportunities.map(
                        (opportunity, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            {opportunity}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Weaknesses */}
                  <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {t.weaknesses}
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.swot_analysis.weaknesses.map(
                        (weakness, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                            {weakness}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      {t.threats}
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.swot_analysis.threats.map(
                        (threat, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 flex items-center gap-2"
                          >
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            {threat}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select a project to view SWOT analysis</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Data Validation Tab */}
      {activeTab === "validation" && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.dataValidation}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">{t.dataSource}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Bayut API</span>
                    <span className="text-green-400">✓ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PropertyFinder</span>
                    <span className="text-green-400">✓ Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Government Data</span>
                    <span className="text-yellow-400">⚠ Limited</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Feeds</span>
                    <span className="text-green-400">✓ Real-time</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">{t.accuracy}</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Price Data</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: "94%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Market Trends</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: "87%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Predictions</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: "72%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">{t.updateFrequency}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Market Prices</span>
                    <span className="text-green-400">{t.realTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Construction Data</span>
                    <span className="text-blue-400">{t.daily}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Competitor Analysis</span>
                    <span className="text-yellow-400">{t.weekly}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Government Reports</span>
                    <span className="text-purple-400">Monthly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              {t.exportReport}
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Share2 className="w-4 h-4 mr-2" />
              {t.shareAnalysis}
            </Button>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {selectedProject.project_name}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{selectedProject.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{selectedProject.project_type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>
                        {selectedProject.size_sqm.toLocaleString()} sqm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Cost:</span>
                      <span className="text-green-400">
                        {(selectedProject.estimated_cost / 1000000).toFixed(1)}M
                        AED
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI Projection:</span>
                      <span className="text-blue-400">
                        {selectedProject.roi_projection}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{t.riskFactors}</h3>
                  <ul className="space-y-1">
                    {selectedProject.risk_factors.map((risk, index) => (
                      <li
                        key={index}
                        className="text-sm text-red-300 flex items-center gap-2"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">
                    {t.competitiveAdvantage}
                  </h3>
                  <ul className="space-y-1">
                    {selectedProject.competitive_advantage.map(
                      (advantage, index) => (
                        <li
                          key={index}
                          className="text-sm text-green-300 flex items-center gap-2"
                        >
                          <CheckCircle className="w-3 h-3" />
                          {advantage}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Market Positioning</h3>
                  <p className="text-sm text-gray-300">
                    {selectedProject.market_positioning}
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{t.opportunities}</h3>
                  <ul className="space-y-1">
                    {selectedProject.opportunities.map((opportunity, index) => (
                      <li
                        key={index}
                        className="text-sm text-blue-300 flex items-center gap-2"
                      >
                        <Target className="w-3 h-3" />
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Validation Score</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>{selectedProject.validation_score}/100</span>
                    <span className="text-sm">
                      {getScoreLabel(selectedProject.validation_score)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        selectedProject.validation_score >= 80
                          ? "bg-green-400"
                          : selectedProject.validation_score >= 70
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                      style={{ width: `${selectedProject.validation_score}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                {t.generateSwot}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Eye className="w-4 h-4 mr-2" />
                Full Analysis
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
