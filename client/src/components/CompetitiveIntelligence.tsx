import { useState, useEffect, useRef } from "react";
import {
  Search,
  Filter,
  Eye,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Camera,
  Video,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  BarChart3,
  Award,
  Building2,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  Activity,
  Bell,
  Settings,
  Download,
  Share,
  BookOpen,
  Lightbulb,
  Radar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Competitor Intelligence Data Structure
interface Competitor {
  id: string;
  name_ar: string;
  name_en: string;
  type: "company" | "individual" | "agency";
  location: {
    emirate: string;
    city: string;
    area: string;
    coordinates: { lat: number; lng: number };
  };
  specializations: string[];
  years_experience: number;
  team_size: number;
  rating: number;
  total_projects: number;
  recent_projects: number;
  market_share: number;
  growth_rate: number;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    instagram?: string;
    linkedin?: string;
  };
  strengths: string[];
  weaknesses: string[];
  pricing_level: "budget" | "mid-range" | "premium" | "luxury";
  last_updated: string;
  threat_level: "low" | "medium" | "high" | "critical";
  opportunity_score: number;
  activity_status: "very_active" | "active" | "moderate" | "inactive";
}

interface CompetitorProject {
  id: string;
  competitor_id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  project_type: string;
  location: {
    emirate: string;
    area: string;
    coordinates: { lat: number; lng: number };
  };
  budget_range: { min: number; max: number };
  completion_date: string;
  images: string[];
  videos?: string[];
  client_rating: number;
  project_size: "small" | "medium" | "large" | "mega";
  sustainability_features: string[];
  technologies_used: string[];
  recognition: string[];
  source: "website" | "instagram" | "linkedin" | "direct" | "ai_discovery";
  verified: boolean;
}

interface MarketInsight {
  id: string;
  type: "trend" | "opportunity" | "threat" | "innovation";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  impact_level: "low" | "medium" | "high" | "critical";
  affected_competitors: string[];
  recommended_actions: string[];
  deadline?: string;
  confidence_score: number;
  detected_at: string;
}

// Sample Competitor Data - Real UAE Landscape Companies
const COMPETITORS_DATA: Competitor[] = [
  {
    id: "green_gardens_uae",
    name_ar: "حدائق الخضراء الإمارات",
    name_en: "Green Gardens UAE",
    type: "company",
    location: {
      emirate: "Dubai",
      city: "Dubai",
      area: "Al Quoz",
      coordinates: { lat: 25.1372, lng: 55.2047 },
    },
    specializations: [
      "villa_gardens",
      "commercial_landscaping",
      "irrigation_systems",
    ],
    years_experience: 8,
    team_size: 25,
    rating: 4.3,
    total_projects: 156,
    recent_projects: 23,
    market_share: 15.8,
    growth_rate: 22.5,
    contact: {
      phone: "+971 4 556 7890",
      email: "info@greengardensuae.com",
      website: "https://greengardensuae.com",
      instagram: "@greengardensuae",
    },
    strengths: [
      "Fast delivery",
      "Competitive pricing",
      "Strong social media presence",
    ],
    weaknesses: ["Limited premium projects", "Basic design capabilities"],
    pricing_level: "mid-range",
    last_updated: "2024-01-15T14:30:00Z",
    threat_level: "medium",
    opportunity_score: 75,
    activity_status: "very_active",
  },
  {
    id: "oasis_landscape_design",
    name_ar: "تصميم واحة المناظر الطبيعية",
    name_en: "Oasis Landscape Design",
    type: "company",
    location: {
      emirate: "Abu Dhabi",
      city: "Abu Dhabi",
      area: "Khalifa City",
      coordinates: { lat: 24.4187, lng: 54.5574 },
    },
    specializations: [
      "luxury_villas",
      "pool_landscaping",
      "outdoor_lighting",
      "smart_irrigation",
    ],
    years_experience: 12,
    team_size: 45,
    rating: 4.7,
    total_projects: 289,
    recent_projects: 34,
    market_share: 28.3,
    growth_rate: 18.2,
    contact: {
      phone: "+971 2 789 1234",
      email: "contact@oasislandscape.ae",
      website: "https://oasislandscape.ae",
      instagram: "@oasislandscapeae",
      linkedin: "oasis-landscape-design",
    },
    strengths: [
      "Premium quality",
      "Award-winning designs",
      "Strong client relationships",
    ],
    weaknesses: ["Higher pricing", "Longer delivery times"],
    pricing_level: "luxury",
    last_updated: "2024-01-15T16:45:00Z",
    threat_level: "high",
    opportunity_score: 85,
    activity_status: "very_active",
  },
  {
    id: "emirates_green_solutions",
    name_ar: "حلول الإمارات الخضراء",
    name_en: "Emirates Green Solutions",
    type: "company",
    location: {
      emirate: "Sharjah",
      city: "Sharjah",
      area: "Al Rashidiya",
      coordinates: { lat: 25.3421, lng: 55.4652 },
    },
    specializations: [
      "sustainable_landscaping",
      "vertical_gardens",
      "water_conservation",
    ],
    years_experience: 6,
    team_size: 18,
    rating: 4.1,
    total_projects: 98,
    recent_projects: 15,
    market_share: 8.7,
    growth_rate: 35.4,
    contact: {
      phone: "+971 6 543 2109",
      email: "hello@emiratesgreen.com",
      instagram: "@emiratesgreensolutions",
    },
    strengths: ["Eco-friendly focus", "Innovative solutions", "Fast growth"],
    weaknesses: ["Limited experience", "Small team"],
    pricing_level: "mid-range",
    last_updated: "2024-01-15T12:20:00Z",
    threat_level: "medium",
    opportunity_score: 68,
    activity_status: "active",
  },
];

const SAMPLE_PROJECTS: CompetitorProject[] = [
  {
    id: "proj_001",
    competitor_id: "oasis_landscape_design",
    title_ar: "فيلا الجميرا الفاخرة",
    title_en: "Luxury Jumeirah Villa",
    description_ar: "تصميم حديقة فاخرة بمسبح لا متناهي ونظام إضاءة ذكي",
    description_en:
      "Luxury garden design with infinity pool and smart lighting system",
    project_type: "luxury_villa_garden",
    location: {
      emirate: "Dubai",
      area: "Jumeirah",
      coordinates: { lat: 25.2252, lng: 55.2606 },
    },
    budget_range: { min: 450000, max: 650000 },
    completion_date: "2024-01-10",
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    client_rating: 4.8,
    project_size: "large",
    sustainability_features: [
      "Water recycling",
      "Native plants",
      "Solar lighting",
    ],
    technologies_used: ["Smart irrigation", "LED lighting", "Pool automation"],
    recognition: ["Best Villa Garden 2024", "Sustainability Award"],
    source: "instagram",
    verified: true,
  },
  {
    id: "proj_002",
    competitor_id: "green_gardens_uae",
    title_ar: "مجمع النخيل السكني",
    title_en: "Palm Residential Complex",
    description_ar: "تنسيق مناظر طبيعية لمجمع سكني بـ 50 فيلا",
    description_en: "Landscaping for residential complex with 50 villas",
    project_type: "residential_complex",
    location: {
      emirate: "Dubai",
      area: "Dubai Investment Park",
      coordinates: { lat: 25.0424, lng: 55.1677 },
    },
    budget_range: { min: 1200000, max: 1800000 },
    completion_date: "2023-12-15",
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    client_rating: 4.2,
    project_size: "mega",
    sustainability_features: [
      "Drought-resistant plants",
      "Efficient irrigation",
    ],
    technologies_used: ["Drip irrigation", "Landscape lighting"],
    recognition: [],
    source: "website",
    verified: true,
  },
];

const MARKET_INSIGHTS: MarketInsight[] = [
  {
    id: "insight_001",
    type: "trend",
    title_ar: "اتجاه متزايد للحدائق الذكية",
    title_en: "Growing Trend of Smart Gardens",
    description_ar:
      "ازداد الطلب على أنظمة الري الذكية والحدائق المؤتمتة بنسبة 45% في الربع الأخير",
    description_en:
      "Demand for smart irrigation and automated gardens increased by 45% in the last quarter",
    impact_level: "high",
    affected_competitors: [
      "oasis_landscape_design",
      "emirates_green_solutions",
    ],
    recommended_actions: [
      "Develop smart garden packages",
      "Partner with IoT companies",
      "Train team on smart technologies",
    ],
    confidence_score: 92,
    detected_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "insight_002",
    type: "opportunity",
    title_ar: "فجوة في السوق: الحدائق العمودية",
    title_en: "Market Gap: Vertical Gardens",
    description_ar:
      "قلة المنافسين المتخصصين في الحدائق العمودية رغم الطلب المتزايد",
    description_en:
      "Few specialized competitors in vertical gardens despite growing demand",
    impact_level: "medium",
    affected_competitors: ["emirates_green_solutions"],
    recommended_actions: [
      "Develop vertical garden expertise",
      "Create specialized packages",
      "Target high-rise buildings",
    ],
    confidence_score: 78,
    detected_at: "2024-01-14T15:30:00Z",
  },
];

interface CompetitiveIntelligenceProps {
  language: "en" | "ar";
}

export default function CompetitiveIntelligence({
  language,
}: CompetitiveIntelligenceProps) {
  const [selectedView, setSelectedView] = useState<
    "overview" | "competitors" | "projects" | "insights" | "monitoring"
  >("overview");
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<Competitor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterThreat, setFilterThreat] = useState<string>("all");
  const [isScanning, setIsScanning] = useState(false);
  const [realtimeUpdates, setRealtimeUpdates] = useState(true);
  const [competitors, setCompetitors] = useState(COMPETITORS_DATA);
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [insights, setInsights] = useState(MARKET_INSIGHTS);

  const t = {
    ar: {
      competitiveIntelligence: "ذكاء المنافسين ومعرض المشاريع",
      liveMonitoring: "المراقبة المباشرة",
      overview: "نظرة عامة",
      competitors: "المنافسون",
      projects: "معرض المشاريع",
      insights: "رؤى السوق",
      monitoring: "المراقبة",
      searchCompetitors: "البحث في المنافسين...",
      threatLevel: "مستوى التهديد",
      allThreats: "جميع المستويات",
      lowThreat: "تهديد منخفض",
      mediumThreat: "تهديد متوسط",
      highThreat: "تهديد عالي",
      criticalThreat: "تهديد حرج",
      scanMarket: "مسح السوق",
      liveUpdates: "التحديثات المباشرة",
      viewProfile: "عرض الملف",
      marketShare: "حصة السوق",
      recentProjects: "مشاريع حديثة",
      growthRate: "معدل النمو",
      opportunityScore: "نقاط ا��فرصة",
      teamSize: "حجم الفريق",
      experience: "سنوات الخبرة",
      rating: "التقييم",
      strengths: "نقاط القوة",
      weaknesses: "نقاط الضعف",
      contactInfo: "معلومات التواصل",
      recentActivity: "النشاط الحديث",
      projectGallery: "معرض المشاريع",
      projectType: "نوع المشروع",
      budget: "الميزانية",
      completedOn: "تم الإنجاز في",
      clientRating: "تقييم العميل",
      sustainability: "الاستدامة",
      technologies: "التقنيات المستخدمة",
      recognition: "التقديرات",
      marketInsights: "رؤى السوق",
      trendAlert: "تنبيه اتجاه",
      opportunity: "فرصة",
      threat: "تهديد",
      innovation: "ابتكار",
      recommendedActions: "الإجراءات المقترحة",
      confidenceScore: "نقاط الثقة",
      detectedAt: "تم الاكتشاف في",
      noCompetitors: "لا توجد منافسون",
      exportReport: "تصدير التقرير",
      shareInsights: "مشاركة الرؤى",
    },
    en: {
      competitiveIntelligence: "Competitive Intelligence & Portfolio Showcase",
      liveMonitoring: "Live Monitoring",
      overview: "Overview",
      competitors: "Competitors",
      projects: "Project Gallery",
      insights: "Market Insights",
      monitoring: "Monitoring",
      searchCompetitors: "Search competitors...",
      threatLevel: "Threat Level",
      allThreats: "All Levels",
      lowThreat: "Low Threat",
      mediumThreat: "Medium Threat",
      highThreat: "High Threat",
      criticalThreat: "Critical Threat",
      scanMarket: "Scan Market",
      liveUpdates: "Live Updates",
      viewProfile: "View Profile",
      marketShare: "Market Share",
      recentProjects: "Recent Projects",
      growthRate: "Growth Rate",
      opportunityScore: "Opportunity Score",
      teamSize: "Team Size",
      experience: "Years Experience",
      rating: "Rating",
      strengths: "Strengths",
      weaknesses: "Weaknesses",
      contactInfo: "Contact Info",
      recentActivity: "Recent Activity",
      projectGallery: "Project Gallery",
      projectType: "Project Type",
      budget: "Budget",
      completedOn: "Completed On",
      clientRating: "Client Rating",
      sustainability: "Sustainability",
      technologies: "Technologies Used",
      recognition: "Recognition",
      marketInsights: "Market Insights",
      trendAlert: "Trend Alert",
      opportunity: "Opportunity",
      threat: "Threat",
      innovation: "Innovation",
      recommendedActions: "Recommended Actions",
      confidenceScore: "Confidence Score",
      detectedAt: "Detected At",
      noCompetitors: "No competitors found",
      exportReport: "Export Report",
      shareInsights: "Share Insights",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Real-time market scanning simulation
  useEffect(() => {
    if (!realtimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate discovering new competitor activity
      if (Math.random() > 0.8) {
        const randomCompetitor =
          competitors[Math.floor(Math.random() * competitors.length)];
        const updatedCompetitors = competitors.map((comp) =>
          comp.id === randomCompetitor.id
            ? {
                ...comp,
                recent_projects: comp.recent_projects + 1,
                last_updated: new Date().toISOString(),
                activity_status: "very_active" as const,
              }
            : comp,
        );
        setCompetitors(updatedCompetitors);

        // Add new insight
        const newInsight: MarketInsight = {
          id: `insight_${Date.now()}`,
          type: "trend",
          title_ar: "نشاط جديد للمنافس",
          title_en: "New Competitor Activity",
          description_ar: `${randomCompetitor.name_ar} بدأ مشروع جديد`,
          description_en: `${randomCompetitor.name_en} started a new project`,
          impact_level: "medium",
          affected_competitors: [randomCompetitor.id],
          recommended_actions: ["Monitor closely", "Analyze strategy"],
          confidence_score: 85,
          detected_at: new Date().toISOString(),
        };
        setInsights((prev) => [newInsight, ...prev.slice(0, 9)]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [realtimeUpdates, competitors]);

  const handleMarketScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Simulate discovering new projects or competitors
      const discoveries = Math.floor(Math.random() * 3 + 1);
      for (let i = 0; i < discoveries; i++) {
        const newInsight: MarketInsight = {
          id: `scan_${Date.now()}_${i}`,
          type: "opportunity",
          title_ar: "اكتشاف جديد من المسح الذكي",
          title_en: "New Discovery from Smart Scan",
          description_ar: "تم اكتشاف فرصة سوقية جديدة أو نشاط منافس",
          description_en:
            "New market opportunity or competitor activity discovered",
          impact_level: "medium",
          affected_competitors: [],
          recommended_actions: ["Investigate further", "Assess opportunity"],
          confidence_score: Math.floor(Math.random() * 20 + 70),
          detected_at: new Date().toISOString(),
        };
        setInsights((prev) => [newInsight, ...prev]);
      }
    }, 3000);
  };

  const filteredCompetitors = competitors.filter((comp) => {
    const matchesSearch =
      comp.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.name_ar.includes(searchQuery);
    const matchesThreat =
      filterThreat === "all" || comp.threat_level === filterThreat;
    return matchesSearch && matchesThreat;
  });

  const getThreatColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-orange-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return TrendingUp;
      case "opportunity":
        return Target;
      case "threat":
        return AlertTriangle;
      case "innovation":
        return Lightbulb;
      default:
        return Activity;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-emerald-400" />
            <div>
              <h3 className="text-white font-bold text-2xl">
                {competitors.length}
              </h3>
              <p className="text-emerald-300/80">{tr.competitors}</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-white font-bold text-2xl">
                {projects.length}
              </h3>
              <p className="text-blue-300/80">{tr.projects}</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-white font-bold text-2xl">
                {insights.length}
              </h3>
              <p className="text-purple-300/80">{tr.insights}</p>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-8 h-8 text-orange-400" />
            <div>
              <h3 className="text-white font-bold text-2xl">
                {
                  competitors.filter((c) => c.activity_status === "very_active")
                    .length
                }
              </h3>
              <p className="text-orange-300/80">{tr.recentActivity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Insights */}
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Radar className="w-5 h-5 text-emerald-400" />
          {tr.marketInsights}
        </h3>
        <div className="space-y-3">
          {insights.slice(0, 3).map((insight) => {
            const Icon = getInsightIcon(insight.type);
            return (
              <div
                key={insight.id}
                className="flex items-start gap-3 p-4 bg-white/5 rounded-xl"
              >
                <Icon className="w-5 h-5 text-emerald-400 mt-1" />
                <div className="flex-1">
                  <h4 className="text-white font-medium">
                    {insight[`title_${language}` as keyof typeof insight]}
                  </h4>
                  <p className="text-emerald-300/80 text-sm mt-1">
                    {insight[`description_${language}` as keyof typeof insight]}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${insight.confidence_score}%` }}
                      />
                    </div>
                    <span className="text-emerald-400 text-xs">
                      {insight.confidence_score}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderCompetitors = () => (
    <div className="space-y-6">
      {/* Competitor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompetitors.map((competitor) => (
          <div
            key={competitor.id}
            className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">
                  {competitor[`name_${language}` as keyof typeof competitor]}
                </h3>
                <p className="text-emerald-300/80">
                  {competitor.location.emirate} • {competitor.location.area}
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getThreatColor(competitor.threat_level)}`}
              >
                {competitor.threat_level.toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-emerald-300/60 text-sm">{tr.marketShare}</p>
                <p className="text-white font-semibold">
                  {competitor.market_share}%
                </p>
              </div>
              <div>
                <p className="text-emerald-300/60 text-sm">
                  {tr.recentProjects}
                </p>
                <p className="text-white font-semibold">
                  {competitor.recent_projects}
                </p>
              </div>
              <div>
                <p className="text-emerald-300/60 text-sm">{tr.growthRate}</p>
                <p className="text-green-400 font-semibold">
                  +{competitor.growth_rate}%
                </p>
              </div>
              <div>
                <p className="text-emerald-300/60 text-sm">{tr.rating}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold">
                    {competitor.rating}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {competitor.specializations.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full"
                >
                  {spec}
                </span>
              ))}
            </div>

            <Button
              onClick={() => setSelectedCompetitor(competitor)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border-0"
            >
              {tr.viewProfile}
            </Button>
          </div>
        ))}
      </div>

      {filteredCompetitors.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-emerald-400/40 mx-auto mb-4" />
          <p className="text-emerald-300/60 text-lg">{tr.noCompetitors}</p>
        </div>
      )}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const competitor = competitors.find(
            (c) => c.id === project.competitor_id,
          );
          return (
            <div
              key={project.id}
              className="bg-black/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-emerald-400/20 hover:border-emerald-400/40 transition-colors"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-emerald-600/20 to-teal-600/20 relative overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project[`title_${language}` as keyof typeof project]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-semibold">
                      {project.client_rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {project[`title_${language}` as keyof typeof project]}
                </h3>
                <p className="text-emerald-300/80 text-sm mb-3">
                  {project[`description_${language}` as keyof typeof project]}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60 text-sm">
                      {tr.budget}:
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      {(project.budget_range.min / 1000).toFixed(0)}K -{" "}
                      {(project.budget_range.max / 1000).toFixed(0)}K AED
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60 text-sm">
                      {tr.completedOn}:
                    </span>
                    <span className="text-white">
                      {new Date(project.completion_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-300/60 text-sm">
                      المنافس:
                    </span>
                    <span className="text-white">
                      {
                        competitor?.[
                          `name_${language}` as keyof typeof competitor
                        ]
                      }
                    </span>
                  </div>
                </div>

                {project.recognition.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.recognition.map((award, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        {award}
                      </span>
                    ))}
                  </div>
                )}

                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0">
                  <Eye className="w-4 h-4 mr-2" />
                  {tr.viewProfile}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-green-900/20 backdrop-blur-xl rounded-3xl border border-emerald-400/20 overflow-hidden">
      {/* Header */}
      <div
        className={`p-6 border-b border-emerald-400/20 ${isRTL ? "text-right" : "text-left"}`}
      >
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              {tr.competitiveIntelligence}
            </h2>
            <p className="text-emerald-300/80">{tr.liveMonitoring}</p>
          </div>

          <div
            className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${realtimeUpdates ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
              />
              <span className="text-emerald-300 text-sm">{tr.liveUpdates}</span>
            </div>
            <Button
              onClick={handleMarketScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              {isScanning ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  جاري المسح...
                </>
              ) : (
                <>
                  <Radar className="w-4 h-4 mr-2" />
                  {tr.scanMarket}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-1 p-4 border-b border-emerald-400/20">
        {[
          { key: "overview", label: tr.overview, icon: BarChart3 },
          { key: "competitors", label: tr.competitors, icon: Users },
          { key: "projects", label: tr.projectGallery, icon: Camera },
          { key: "insights", label: tr.insights, icon: Lightbulb },
          { key: "monitoring", label: tr.monitoring, icon: Activity },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={selectedView === key ? "default" : "ghost"}
            onClick={() => setSelectedView(key as any)}
            className={
              selectedView === key
                ? "bg-emerald-500 text-white border-0"
                : "text-emerald-300 hover:text-white hover:bg-emerald-500/20 border-0"
            }
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      {(selectedView === "competitors" || selectedView === "projects") && (
        <div className="p-4 border-b border-emerald-400/20">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <input
                type="text"
                placeholder={tr.searchCompetitors}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-emerald-400/30 rounded-xl text-white placeholder-emerald-300/60 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {selectedView === "competitors" && (
              <select
                value={filterThreat}
                onChange={(e) => setFilterThreat(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="all" className="text-black">
                  {tr.allThreats}
                </option>
                <option value="low" className="text-black">
                  {tr.lowThreat}
                </option>
                <option value="medium" className="text-black">
                  {tr.mediumThreat}
                </option>
                <option value="high" className="text-black">
                  {tr.highThreat}
                </option>
                <option value="critical" className="text-black">
                  {tr.criticalThreat}
                </option>
              </select>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {selectedView === "overview" && renderOverview()}
        {selectedView === "competitors" && renderCompetitors()}
        {selectedView === "projects" && renderProjects()}
        {selectedView === "insights" && (
          <div className="space-y-4">
            {insights.map((insight) => {
              const Icon = getInsightIcon(insight.type);
              return (
                <div
                  key={insight.id}
                  className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-bold">
                          {insight[`title_${language}` as keyof typeof insight]}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            insight.impact_level === "high"
                              ? "bg-red-500/20 text-red-300"
                              : insight.impact_level === "medium"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {insight.impact_level.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-emerald-300/80 mb-4">
                        {
                          insight[
                            `description_${language}` as keyof typeof insight
                          ]
                        }
                      </p>

                      {insight.recommended_actions.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-emerald-300 font-semibold mb-2">
                            {tr.recommendedActions}:
                          </h4>
                          <ul className="space-y-1">
                            {insight.recommended_actions.map((action, idx) => (
                              <li
                                key={idx}
                                className="text-emerald-300/80 text-sm flex items-center gap-2"
                              >
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-300/60 text-sm">
                            {tr.confidenceScore}:
                          </span>
                          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-400 rounded-full"
                              style={{ width: `${insight.confidence_score}%` }}
                            />
                          </div>
                          <span className="text-emerald-400 text-sm font-semibold">
                            {insight.confidence_score}%
                          </span>
                        </div>
                        <span className="text-emerald-300/60 text-sm">
                          {new Date(insight.detected_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
