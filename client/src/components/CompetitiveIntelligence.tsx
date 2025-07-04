import { useState, useEffect } from "react";
import {
  Users,
  Eye,
  TrendingUp,
  Award,
  MapPin,
  DollarSign,
  Calendar,
  Building2,
  Star,
  Target,
  Activity,
  BarChart3,
  Camera,
  Video,
  Globe,
  Linkedin,
  Instagram,
  Twitter,
  Share2,
  Download,
  Bell,
  Search,
  Filter,
  Zap,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CompetitiveIntelligenceProps {
  language: "en" | "ar";
}

interface Competitor {
  id: string;
  name: string;
  logo?: string;
  category: "local" | "regional" | "international";
  specialization: string[];
  market_presence: {
    emirates: string[];
    market_share: number;
    years_in_market: number;
  };
  portfolio: {
    total_projects: number;
    active_projects: number;
    completed_projects: number;
    avg_project_value: number;
  };
  performance_metrics: {
    client_satisfaction: number;
    delivery_speed: number;
    innovation_score: number;
    price_competitiveness: number;
  };
  recent_activities: CompetitorActivity[];
  social_media: {
    linkedin?: string;
    instagram?: string;
    website?: string;
    followers_count: number;
  };
  threat_level: "low" | "medium" | "high";
  trend_direction: "up" | "down" | "stable";
}

interface CompetitorActivity {
  id: string;
  type: "new_project" | "award" | "partnership" | "expansion" | "innovation";
  title: string;
  description: string;
  date: string;
  location?: string;
  value?: number;
  source: "linkedin" | "website" | "news" | "ai_scout";
}

interface ProjectShowcase {
  id: string;
  title: string;
  competitor: string;
  location: string;
  completion_date: string;
  project_value: number;
  images: string[];
  video_tour?: string;
  project_type: "residential" | "commercial" | "public" | "hospitality";
  key_features: string[];
  awards?: string[];
  client_testimonial?: string;
  innovation_highlights: string[];
}

const translations = {
  en: {
    title: "Competitive Intelligence",
    subtitle: "Market Analysis & Portfolio Showcase",
    competitors: "Competitors",
    portfolio: "Portfolio Showcase",
    analytics: "Market Analytics",
    alerts: "Intelligence Alerts",
    overview: "Overview",
    localCompetitors: "Local Competitors",
    regionalCompetitors: "Regional Competitors",
    internationalCompetitors: "International Competitors",
    allCategories: "All Categories",
    marketShare: "Market Share",
    yearsInMarket: "Years in Market",
    totalProjects: "Total Projects",
    activeProjects: "Active Projects",
    avgProjectValue: "Average Project Value",
    clientSatisfaction: "Client Satisfaction",
    deliverySpeed: "Delivery Speed",
    innovationScore: "Innovation Score",
    priceCompetitiveness: "Price Competitiveness",
    recentActivities: "Recent Activities",
    socialMedia: "Social Media",
    threatLevel: "Threat Level",
    viewProfile: "View Profile",
    analyzeCompetitor: "Analyze Competitor",
    trackActivity: "Track Activity",
    projectShowcase: "Project Showcase",
    residential: "Residential",
    commercial: "Commercial",
    public: "Public",
    hospitality: "Hospitality",
    completionDate: "Completion Date",
    projectValue: "Project Value",
    keyFeatures: "Key Features",
    awards: "Awards",
    innovations: "Innovation Highlights",
    clientTestimonial: "Client Testimonial",
    viewGallery: "View Gallery",
    watch360Tour: "Watch 360° Tour",
    newProject: "New Project",
    award: "Award",
    partnership: "Partnership",
    expansion: "Expansion",
    innovation: "Innovation",
    high: "High",
    medium: "Medium",
    low: "Low",
    aed: "AED",
    followers: "followers",
    searchCompetitors: "Search competitors...",
    filterByCategory: "Filter by category",
    marketIntelligence: "Market Intelligence Summary",
    competitorCount: "Competitors Tracked",
    avgThreatLevel: "Average Threat Level",
    marketGrowth: "Market Growth",
    newActivities: "New Activities",
    alertsToday: "Alerts Today",
    topPerformers: "Top Performers",
    risingStars: "Rising Stars",
    recentUpdates: "Recent Updates",
    benchmarkAnalysis: "Benchmark Analysis",
    strengthsWeaknesses: "Strengths & Weaknesses",
    marketPositioning: "Market Positioning",
    competitiveAdvantage: "Competitive Advantage",
    exportReport: "Export Report",
    setupAlerts: "Setup Alerts",
    viewFullAnalysis: "View Full Analysis",
  },
  ar: {
    title: "استخبارات المنافسين",
    subtitle: "تحليل السوق ومعرض المشاريع",
    competitors: "المنافسون",
    portfolio: "معرض المشاريع",
    analytics: "تحليلات السوق",
    alerts: "تنبيهات الاستخبارات",
    overview: "نظرة عامة",
    localCompetitors: "المنافسون المحليون",
    regionalCompetitors: "المنافسون الإقليميون",
    internationalCompetitors: "المنافسون الدوليون",
    allCategories: "كل الفئات",
    marketShare: "حصة السوق",
    yearsInMarket: "سنوات في السوق",
    totalProjects: "إجمالي المشاريع",
    activeProjects: "المشاريع النشطة",
    avgProjectValue: "متوسط قيمة المشروع",
    clientSatisfaction: "رضا العملاء",
    deliverySpeed: "سرعة التسليم",
    innovationScore: "نقاط الابتكار",
    priceCompetitiveness: "التنافسية السعرية",
    recentActivities: "الأنشطة الحديثة",
    socialMedia: "وسائل التواصل",
    threatLevel: "مستوى التهديد",
    viewProfile: "عرض الملف",
    analyzeCompetitor: "تحليل المنافس",
    trackActivity: "تتبع النشاط",
    projectShowcase: "معرض المشاريع",
    residential: "سكني",
    commercial: "تجاري",
    public: "عام",
    hospitality: "ضيافة",
    completionDate: "تاريخ الإنجاز",
    projectValue: "قيمة المشروع",
    keyFeatures: "الميزات الرئيسية",
    awards: "الجوائز",
    innovations: "أبرز الابتكارات",
    clientTestimonial: "شهادة العميل",
    viewGallery: "عرض المعرض",
    watch360Tour: "مشاهدة جولة 360°",
    newProject: "مشروع جديد",
    award: "جائزة",
    partnership: "شراكة",
    expansion: "توسع",
    innovation: "ابتكار",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    aed: "درهم",
    followers: "متابع",
    searchCompetitors: "البحث عن المنافسين...",
    filterByCategory: "تصفية حسب الفئة",
    marketIntelligence: "ملخص استخبارات السوق",
    competitorCount: "المنافسون المتتبعون",
    avgThreatLevel: "متوسط مستوى التهديد",
    marketGrowth: "نمو السوق",
    newActivities: "أنشطة جديدة",
    alertsToday: "تنبيهات اليوم",
    topPerformers: "الأفضل أداءً",
    risingStars: "النجوم الصاعدة",
    recentUpdates: "التحديثات الحديثة",
    benchmarkAnalysis: "تحليل المقارنة",
    strengthsWeaknesses: "نقاط القوة والضعف",
    marketPositioning: "الموقف في السوق",
    competitiveAdvantage: "الميزة التنافسية",
    exportReport: "تصدير التقرير",
    setupAlerts: "إعداد التنبيهات",
    viewFullAnalysis: "عرض التحليل الكامل",
  },
};

// Sample competitor data
const sampleCompetitors: Competitor[] = [
  {
    id: "1",
    name: "Green Valley Landscapes",
    category: "local",
    specialization: ["luxury_villas", "commercial_spaces", "smart_irrigation"],
    market_presence: {
      emirates: ["dubai", "abudhabi"],
      market_share: 15.5,
      years_in_market: 8,
    },
    portfolio: {
      total_projects: 342,
      active_projects: 28,
      completed_projects: 314,
      avg_project_value: 485000,
    },
    performance_metrics: {
      client_satisfaction: 92,
      delivery_speed: 88,
      innovation_score: 85,
      price_competitiveness: 78,
    },
    recent_activities: [
      {
        id: "1",
        type: "new_project",
        title: "Awarded Dubai Hills Villa Complex",
        description: "Major landscaping contract for 50 luxury villas",
        date: "2024-01-12",
        location: "Dubai Hills Estate",
        value: 12500000,
        source: "linkedin",
      },
      {
        id: "2",
        type: "award",
        title: "Best Sustainable Design Award 2024",
        description: "Recognition for eco-friendly landscaping solutions",
        date: "2024-01-10",
        source: "news",
      },
    ],
    social_media: {
      linkedin: "green-valley-landscapes-uae",
      instagram: "greenvalleyuae",
      website: "greenvalley.ae",
      followers_count: 12500,
    },
    threat_level: "high",
    trend_direction: "up",
  },
  {
    id: "2",
    name: "Desert Bloom Design Studio",
    category: "regional",
    specialization: ["desert_landscaping", "water_features", "outdoor_living"],
    market_presence: {
      emirates: ["dubai", "sharjah", "ajman"],
      market_share: 12.3,
      years_in_market: 6,
    },
    portfolio: {
      total_projects: 198,
      active_projects: 15,
      completed_projects: 183,
      avg_project_value: 325000,
    },
    performance_metrics: {
      client_satisfaction: 89,
      delivery_speed: 91,
      innovation_score: 82,
      price_competitiveness: 85,
    },
    recent_activities: [
      {
        id: "3",
        type: "partnership",
        title: "Partnership with Smart Home Solutions",
        description: "Integration of IoT technology in landscape design",
        date: "2024-01-08",
        source: "website",
      },
    ],
    social_media: {
      instagram: "desertbloomdesign",
      website: "desertbloom.com",
      followers_count: 8900,
    },
    threat_level: "medium",
    trend_direction: "up",
  },
  {
    id: "3",
    name: "Emirates Elite Gardens",
    category: "local",
    specialization: [
      "royal_palaces",
      "heritage_gardens",
      "premium_maintenance",
    ],
    market_presence: {
      emirates: ["abudhabi", "dubai"],
      market_share: 18.7,
      years_in_market: 12,
    },
    portfolio: {
      total_projects: 456,
      active_projects: 22,
      completed_projects: 434,
      avg_project_value: 750000,
    },
    performance_metrics: {
      client_satisfaction: 95,
      delivery_speed: 85,
      innovation_score: 78,
      price_competitiveness: 65,
    },
    recent_activities: [
      {
        id: "4",
        type: "expansion",
        title: "Opening New Branch in Sharjah",
        description: "Expanding operations to serve Northern Emirates",
        date: "2024-01-05",
        location: "Sharjah",
        source: "news",
      },
    ],
    social_media: {
      linkedin: "emirates-elite-gardens",
      website: "emirateselite.ae",
      followers_count: 15600,
    },
    threat_level: "high",
    trend_direction: "stable",
  },
];

const sampleProjectShowcase: ProjectShowcase[] = [
  {
    id: "1",
    title: "Royal Palace Gardens - Abu Dhabi",
    competitor: "Emirates Elite Gardens",
    location: "Abu Dhabi",
    completion_date: "2023-12-15",
    project_value: 15000000,
    images: ["palace1.jpg", "palace2.jpg", "palace3.jpg"],
    video_tour: "palace_360_tour.mp4",
    project_type: "residential",
    key_features: [
      "Traditional Arabic garden design",
      "Water conservation system",
      "Smart irrigation with sensors",
      "Heritage plant species",
      "Outdoor majlis areas",
    ],
    awards: ["Best Heritage Design 2023", "Sustainability Excellence Award"],
    client_testimonial:
      "Exceptional attention to detail and cultural authenticity.",
    innovation_highlights: [
      "AI-powered irrigation optimization",
      "Native species preservation program",
      "Solar-powered water features",
    ],
  },
  {
    id: "2",
    title: "Dubai Hills Corporate Campus",
    competitor: "Green Valley Landscapes",
    location: "Dubai Hills Estate",
    completion_date: "2023-11-20",
    project_value: 8500000,
    images: ["campus1.jpg", "campus2.jpg"],
    project_type: "commercial",
    key_features: [
      "Employee wellness gardens",
      "Vertical green walls",
      "Outdoor meeting spaces",
      "Sustainable plant selection",
    ],
    innovation_highlights: [
      "Biophilic design principles",
      "Air quality improvement zones",
      "Employee engagement features",
    ],
  },
];

export default function CompetitiveIntelligence({
  language,
}: CompetitiveIntelligenceProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "competitors" | "portfolio" | "analytics"
  >("overview");
  const [competitors, setCompetitors] =
    useState<Competitor[]>(sampleCompetitors);
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectShowcase, setProjectShowcase] = useState<ProjectShowcase[]>(
    sampleProjectShowcase,
  );
  const [intelligenceAlerts, setIntelligenceAlerts] = useState<string[]>([]);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Simulate real-time intelligence alerts
    const interval = setInterval(() => {
      const alerts = [
        `${competitors[0].name} announced a new major project in Dubai Marina`,
        `Market share shift detected: 3% increase in luxury segment`,
        `New competitor entry detected in Abu Dhabi market`,
        `${competitors[1].name} launched innovative IoT landscaping solution`,
        `Pricing trend alert: Average project values increased by 8%`,
      ];
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      setIntelligenceAlerts((prev) => [randomAlert, ...prev.slice(0, 4)]);
    }, 18000);

    return () => clearInterval(interval);
  }, [competitors]);

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "text-red-400 bg-red-500/20 border-red-400/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-400/30";
      case "low":
        return "text-green-400 bg-green-500/20 border-green-400/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-400/30";
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      case "stable":
        return "➡️";
      default:
        return "➡️";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "new_project":
        return "🏗️";
      case "award":
        return "🏆";
      case "partnership":
        return "🤝";
      case "expansion":
        return "🌍";
      case "innovation":
        return "💡";
      default:
        return "📋";
    }
  };

  const overviewStats = {
    totalCompetitors: competitors.length,
    avgThreatLevel:
      competitors.filter((c) => c.threat_level === "high").length /
      competitors.length,
    marketGrowth: 15.8,
    newActivities: competitors.reduce(
      (sum, c) => sum + c.recent_activities.length,
      0,
    ),
    alertsToday: 8,
  };

  const filteredCompetitors = competitors.filter((competitor) => {
    const matchesCategory =
      filterCategory === "all" || competitor.category === filterCategory;
    const matchesSearch =
      competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competitor.specialization.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white p-6">
      {/* Header */}
      <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-purple-300 text-xl opacity-90">{t.subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-xl rounded-xl p-2 border border-white/20">
        {[
          { id: "overview", label: t.overview, icon: BarChart3 },
          { id: "competitors", label: t.competitors, icon: Users },
          { id: "portfolio", label: t.portfolio, icon: Award },
          { id: "analytics", label: t.analytics, icon: TrendingUp },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-purple-500 text-white"
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
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.totalCompetitors}
                  </div>
                  <div className="text-sm text-gray-300">
                    {t.competitorCount}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(overviewStats.avgThreatLevel * 100)}%
                  </div>
                  <div className="text-sm text-gray-300">
                    {t.avgThreatLevel}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    +{overviewStats.marketGrowth}%
                  </div>
                  <div className="text-sm text-gray-300">{t.marketGrowth}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.newActivities}
                  </div>
                  <div className="text-sm text-gray-300">{t.newActivities}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {overviewStats.alertsToday}
                  </div>
                  <div className="text-sm text-gray-300">{t.alertsToday}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers and Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                {t.topPerformers}
              </h3>
              <div className="space-y-3">
                {competitors
                  .sort(
                    (a, b) =>
                      b.performance_metrics.client_satisfaction -
                      a.performance_metrics.client_satisfaction,
                  )
                  .slice(0, 3)
                  .map((competitor, index) => (
                    <div
                      key={competitor.id}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-gold to-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{competitor.name}</div>
                        <div className="text-sm text-gray-300">
                          {competitor.performance_metrics.client_satisfaction}%
                          satisfaction
                        </div>
                      </div>
                      <Badge
                        className={getThreatLevelColor(competitor.threat_level)}
                      >
                        {t[competitor.threat_level as keyof typeof t]}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-400" />
                {t.recentUpdates}
              </h3>
              <div className="space-y-2">
                {intelligenceAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 text-sm animate-pulse"
                  >
                    {alert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Market Intelligence Summary */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              {t.marketIntelligence}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-purple-300">
                  {t.strengthsWeaknesses}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Strong local market presence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>High client satisfaction rates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span>Price competitiveness challenges</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-purple-300">
                  {t.marketPositioning}
                </h4>
                <div className="text-sm text-gray-300">
                  <p>
                    Market leaders focus on luxury segments with premium pricing
                    strategies. Emerging trend towards sustainable and smart
                    technology integration.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-purple-300">
                  {t.competitiveAdvantage}
                </h4>
                <div className="text-sm text-gray-300">
                  <p>
                    AI-powered design capabilities and real-time market
                    intelligence provide significant opportunities for
                    differentiation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Competitors Tab */}
      {activeTab === "competitors" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.searchCompetitors}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2"
              >
                <option value="all">{t.allCategories}</option>
                <option value="local">{t.localCompetitors}</option>
                <option value="regional">{t.regionalCompetitors}</option>
                <option value="international">
                  {t.internationalCompetitors}
                </option>
              </select>

              <Button className="bg-purple-600 hover:bg-purple-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Competitors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCompetitors.map((competitor) => (
              <div
                key={competitor.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all cursor-pointer"
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {competitor.name}
                      </h3>
                      <p className="text-sm text-gray-300 capitalize">
                        {competitor.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {getTrendIcon(competitor.trend_direction)}
                      </span>
                      <Badge
                        className={getThreatLevelColor(competitor.threat_level)}
                      >
                        {t[competitor.threat_level as keyof typeof t]}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-sm text-gray-300">
                        {t.marketShare}
                      </div>
                      <div className="text-lg font-semibold text-purple-400">
                        {competitor.market_presence.market_share}%
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-sm text-gray-300">
                        {t.totalProjects}
                      </div>
                      <div className="text-lg font-semibold text-blue-400">
                        {competitor.portfolio.total_projects}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{t.clientSatisfaction}</span>
                      <span className="text-sm font-semibold text-green-400">
                        {competitor.performance_metrics.client_satisfaction}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{
                          width: `${competitor.performance_metrics.client_satisfaction}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      {t.recentActivities}
                    </div>
                    {competitor.recent_activities
                      .slice(0, 2)
                      .map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center gap-2 text-xs text-gray-400"
                        >
                          <span className="text-sm">
                            {getActivityIcon(activity.type)}
                          </span>
                          <span className="truncate">{activity.title}</span>
                        </div>
                      ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === "portfolio" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projectShowcase.map((project) => (
              <div
                key={project.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-gray-300">
                        {project.competitor}
                      </p>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      {t[project.project_type as keyof typeof t]}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-sm">
                        {(project.project_value / 1000000).toFixed(1)}M {t.aed}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">
                        {new Date(project.completion_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">
                        {project.key_features.length} features
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">{t.keyFeatures}</h4>
                    <div className="space-y-1">
                      {project.key_features
                        .slice(0, 3)
                        .map((feature, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-300 flex items-center gap-2"
                          >
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {project.awards && (
                    <div>
                      <h4 className="font-medium mb-2">{t.awards}</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.awards.map((award, index) => (
                          <Badge
                            key={index}
                            className="bg-yellow-500/20 text-yellow-400"
                          >
                            🏆 {award}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {t.viewGallery}
                    </Button>
                    {project.video_tour && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        360° Tour
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              {t.benchmarkAnalysis}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">
                  Performance Metrics Comparison
                </h4>
                <div className="space-y-3">
                  {competitors.map((competitor) => (
                    <div
                      key={competitor.id}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{competitor.name}</span>
                        <span className="text-sm text-gray-300">
                          {competitor.performance_metrics.client_satisfaction}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-400 h-2 rounded-full"
                          style={{
                            width: `${competitor.performance_metrics.client_satisfaction}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Market Share Distribution</h4>
                <div className="space-y-3">
                  {competitors.map((competitor) => (
                    <div
                      key={competitor.id}
                      className="bg-white/5 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{competitor.name}</span>
                        <span className="text-sm text-gray-300">
                          {competitor.market_presence.market_share}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-400 h-2 rounded-full"
                          style={{
                            width: `${competitor.market_presence.market_share * 2}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              {t.exportReport}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Bell className="w-4 h-4 mr-2" />
              {t.setupAlerts}
            </Button>
          </div>
        </div>
      )}

      {/* Competitor Details Modal */}
      {selectedCompetitor && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selectedCompetitor.name}</h2>
              <button
                onClick={() => setSelectedCompetitor(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Company Overview</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span className="capitalize">
                        {selectedCompetitor.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Share:</span>
                      <span>
                        {selectedCompetitor.market_presence.market_share}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years in Market:</span>
                      <span>
                        {selectedCompetitor.market_presence.years_in_market}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threat Level:</span>
                      <Badge
                        className={getThreatLevelColor(
                          selectedCompetitor.threat_level,
                        )}
                      >
                        {t[selectedCompetitor.threat_level as keyof typeof t]}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Performance Metrics</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedCompetitor.performance_metrics).map(
                      ([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">
                              {key.replace("_", " ")}
                            </span>
                            <span>{value}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-purple-400 h-2 rounded-full"
                              style={{ width: `${value}%` }}
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Portfolio Statistics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">
                        {selectedCompetitor.portfolio.total_projects}
                      </div>
                      <div className="text-xs text-gray-300">
                        Total Projects
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">
                        {selectedCompetitor.portfolio.active_projects}
                      </div>
                      <div className="text-xs text-gray-300">
                        Active Projects
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-lg font-bold text-purple-400">
                        {(
                          selectedCompetitor.portfolio.avg_project_value / 1000
                        ).toFixed(0)}
                        K
                      </div>
                      <div className="text-xs text-gray-300">
                        Avg Project Value
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="text-2xl font-bold text-yellow-400">
                        {selectedCompetitor.social_media.followers_count.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-300">
                        Social Followers
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Recent Activities</h3>
                  <div className="space-y-2">
                    {selectedCompetitor.recent_activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="bg-white/5 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {getActivityIcon(activity.type)}
                          </span>
                          <span className="font-medium text-sm">
                            {activity.title}
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          {activity.description}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Eye className="w-4 h-4 mr-2" />
                {t.viewFullAnalysis}
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Bell className="w-4 h-4 mr-2" />
                {t.trackActivity}
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
