import { useState, useEffect } from "react";
import {
  Target,
  Zap,
  Send,
  Eye,
  Download,
  MapPin,
  DollarSign,
  Calendar,
  TrendingUp,
  Sparkles,
  Bot,
  Search,
  Filter,
  Bell,
  Activity,
  BarChart3,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Radar,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SmartOpportunityHunterEnhancedProps {
  language: "en" | "ar";
}

interface OpportunityLead {
  id: string;
  source: "bayut" | "propertyfinder" | "municipality" | "ai_scout";
  title_ar: string;
  title_en: string;
  location: {
    emirate: string;
    area: string;
    coordinates: { lat: number; lng: number };
  };
  property: {
    type: "villa" | "apartment" | "commercial" | "land";
    size_sqm: number;
    price: number;
    status: "for_sale" | "under_construction" | "planning" | "permit_issued";
  };
  ai_analysis: {
    opportunity_score: number;
    market_potential: "high" | "medium" | "low";
    competition_level: number;
    roi_projection: number;
    risk_assessment: "low" | "medium" | "high";
    recommended_approach: string;
  };
  timeline: {
    discovered: string;
    last_updated: string;
    estimated_decision_window: string;
  };
  contact_info: {
    type: "owner" | "developer" | "agent";
    name: string;
    phone?: string;
    email?: string;
    preference: "call" | "email" | "whatsapp";
  };
  automated_actions: {
    design_generated: boolean;
    proposal_ready: boolean;
    follow_up_scheduled: boolean;
  };
}

interface MarketTrend {
  area: string;
  change_percentage: number;
  trend_direction: "up" | "down" | "stable";
  avg_price_per_sqm: number;
  demand_level: "high" | "medium" | "low";
  supply_level: "high" | "medium" | "low";
}

const translations = {
  en: {
    title: "Smart Opportunity Hunter",
    subtitle: "AI-Powered Investment Detection & Lead Generation",
    dashboard: "Opportunity Dashboard",
    leads: "Active Leads",
    analytics: "Market Analytics",
    automation: "AI Automation",
    filters: "Smart Filters",
    source: "Data Source",
    allSources: "All Sources",
    bayut: "Bayut",
    propertyfinder: "PropertyFinder",
    municipality: "Municipality",
    aiScout: "AI Scout",
    emirate: "Emirate",
    propertyType: "Property Type",
    priceRange: "Price Range",
    opportunityScore: "Opportunity Score",
    marketPotential: "Market Potential",
    riskLevel: "Risk Level",
    roiProjection: "ROI Projection",
    discovered: "Discovered",
    lastUpdated: "Last Updated",
    viewDetails: "View Details",
    generateProposal: "Generate AI Proposal",
    scheduleCall: "Schedule Call",
    sendEmail: "Send Email",
    createDesign: "Create Design",
    totalLeads: "Total Leads",
    highValue: "High Value",
    automated: "Automated",
    pending: "Pending Review",
    marketTrends: "Market Trends",
    aiInsights: "AI Insights",
    competitorActivity: "Competitor Activity",
    realTimeAlerts: "Real-time Alerts",
    bulkActions: "Bulk Actions",
    exportLeads: "Export Leads",
    automation: "Automation",
    setupAlerts: "Setup Alerts",
    high: "High",
    medium: "Medium",
    low: "Low",
    villa: "Villa",
    apartment: "Apartment",
    commercial: "Commercial",
    land: "Land",
    aed: "AED",
    sqm: "sqm",
    ago: "ago",
    minutes: "minutes",
    hours: "hours",
    days: "days",
    aiScore: "AI Score",
    contactOwner: "Contact Owner",
    recommendations: "AI Recommendations",
    similarOpportunities: "Similar Opportunities",
  },
  ar: {
    title: "صياد الفرص الذكي",
    subtitle: "كشف الاستثمارات وتوليد العملاء المحتملين بالذكاء الاصطناعي",
    dashboard: "لوحة الفرص",
    leads: "العملاء النشطون",
    analytics: "تحليل السوق",
    automation: "الأتمتة الذكية",
    filters: "المرشحات الذكية",
    source: "مصدر البيانات",
    allSources: "كل المصادر",
    bayut: "بيوت",
    propertyfinder: "باحث العقارات",
    municipality: "البلدية",
    aiScout: "كشاف الذكاء الاصطناعي",
    emirate: "الإمارة",
    propertyType: "نوع العقار",
    priceRange: "نطاق السعر",
    opportunityScore: "نقاط الفرصة",
    marketPotential: "إمكانية السوق",
    riskLevel: "مستوى الم��اطر",
    roiProjection: "توقع العائد",
    discovered: "مُكتشف",
    lastUpdated: "آخر تحديث",
    viewDetails: "عرض التفاصيل",
    generateProposal: "إنتاج عرض ذكي",
    scheduleCall: "جدولة مكالمة",
    sendEmail: "إرسال إيميل",
    createDesign: "إنشاء تصميم",
    totalLeads: "إجمالي العملاء",
    highValue: "عالي القيمة",
    automated: "مؤتمت",
    pending: "قيد المراجعة",
    marketTrends: "اتجاهات السوق",
    aiInsights: "رؤى الذكاء الاصطناعي",
    competitorActivity: "نشاط المنافسين",
    realTimeAlerts: "التنبيهات المباشرة",
    bulkActions: "الإجراءات المجمعة",
    exportLeads: "تصدير العملاء",
    automation: "الأتمتة",
    setupAlerts: "إعداد التنبيهات",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    villa: "فيلا",
    apartment: "شقة",
    commercial: "تجاري",
    land: "أرض",
    aed: "درهم",
    sqm: "متر مربع",
    ago: "مضت",
    minutes: "دقائق",
    hours: "ساعات",
    days: "أيام",
    aiScore: "نقاط ال��كاء الاصطناعي",
    contactOwner: "اتصال بالمالك",
    recommendations: "توصيات الذكاء الاصطناعي",
    similarOpportunities: "فرص مشابهة",
  },
};

// Sample opportunity data
const sampleOpportunities: OpportunityLead[] = [
  {
    id: "1",
    source: "bayut",
    title_ar: "فيلا فاخرة للبيع - دبي هيلز",
    title_en: "Luxury Villa for Sale - Dubai Hills",
    location: {
      emirate: "Dubai",
      area: "Dubai Hills Estate",
      coordinates: { lat: 25.2048, lng: 55.2708 },
    },
    property: {
      type: "villa",
      size_sqm: 850,
      price: 4800000,
      status: "for_sale",
    },
    ai_analysis: {
      opportunity_score: 94,
      market_potential: "high",
      competition_level: 3,
      roi_projection: 25.5,
      risk_assessment: "low",
      recommended_approach:
        "Premium landscaping with smart irrigation and outdoor entertainment area",
    },
    timeline: {
      discovered: "2024-01-15T10:30:00Z",
      last_updated: "2024-01-15T14:22:00Z",
      estimated_decision_window: "7 days",
    },
    contact_info: {
      type: "owner",
      name: "Ahmed Al Mansoori",
      phone: "+971-50-123-4567",
      email: "ahmed.mansoori@email.com",
      preference: "whatsapp",
    },
    automated_actions: {
      design_generated: true,
      proposal_ready: true,
      follow_up_scheduled: false,
    },
  },
  {
    id: "2",
    source: "ai_scout",
    title_ar: "مشروع تطوير جديد - الشارقة",
    title_en: "New Development Project - Sharjah",
    location: {
      emirate: "Sharjah",
      area: "Al Majaz",
      coordinates: { lat: 25.3463, lng: 55.4209 },
    },
    property: {
      type: "commercial",
      size_sqm: 1200,
      price: 8500000,
      status: "under_construction",
    },
    ai_analysis: {
      opportunity_score: 87,
      market_potential: "high",
      competition_level: 2,
      roi_projection: 32.8,
      risk_assessment: "medium",
      recommended_approach:
        "Corporate landscape design with sustainable features and employee recreation areas",
    },
    timeline: {
      discovered: "2024-01-14T16:45:00Z",
      last_updated: "2024-01-15T09:15:00Z",
      estimated_decision_window: "14 days",
    },
    contact_info: {
      type: "developer",
      name: "Sharjah Investment Authority",
      email: "projects@sia.gov.ae",
      preference: "email",
    },
    automated_actions: {
      design_generated: false,
      proposal_ready: false,
      follow_up_scheduled: true,
    },
  },
  {
    id: "3",
    source: "municipality",
    title_ar: "تصريح بناء فيلا جديدة - أبوظبي",
    title_en: "New Villa Building Permit - Abu Dhabi",
    location: {
      emirate: "Abu Dhabi",
      area: "Khalifa City",
      coordinates: { lat: 24.4539, lng: 54.3773 },
    },
    property: {
      type: "villa",
      size_sqm: 750,
      price: 5200000,
      status: "permit_issued",
    },
    ai_analysis: {
      opportunity_score: 91,
      market_potential: "high",
      competition_level: 1,
      roi_projection: 28.3,
      risk_assessment: "low",
      recommended_approach:
        "Traditional Arabic design with modern smart features and water-efficient landscaping",
    },
    timeline: {
      discovered: "2024-01-15T08:20:00Z",
      last_updated: "2024-01-15T12:30:00Z",
      estimated_decision_window: "5 days",
    },
    contact_info: {
      type: "agent",
      name: "Sarah Williams",
      phone: "+971-55-987-6543",
      email: "sarah@premiumrealty.ae",
      preference: "call",
    },
    automated_actions: {
      design_generated: true,
      proposal_ready: false,
      follow_up_scheduled: true,
    },
  },
];

const marketTrends: MarketTrend[] = [
  {
    area: "Dubai Hills",
    change_percentage: 12.5,
    trend_direction: "up",
    avg_price_per_sqm: 5650,
    demand_level: "high",
    supply_level: "medium",
  },
  {
    area: "Sharjah Al Majaz",
    change_percentage: 8.3,
    trend_direction: "up",
    avg_price_per_sqm: 7080,
    demand_level: "high",
    supply_level: "low",
  },
  {
    area: "Abu Dhabi Khalifa City",
    change_percentage: -2.1,
    trend_direction: "down",
    avg_price_per_sqm: 6930,
    demand_level: "medium",
    supply_level: "high",
  },
];

export default function SmartOpportunityHunterEnhanced({
  language,
}: SmartOpportunityHunterEnhancedProps) {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "leads" | "analytics" | "automation"
  >("dashboard");
  const [opportunities, setOpportunities] =
    useState<OpportunityLead[]>(sampleOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<OpportunityLead | null>(null);
  const [filters, setFilters] = useState({
    source: "all",
    emirate: "all",
    propertyType: "all",
    priceRange: "all",
    opportunityScore: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [realTimeUpdates, setRealTimeUpdates] = useState<string[]>([]);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const updates = [
        `New high-value opportunity discovered in ${marketTrends[0].area}`,
        `AI generated proposal for ${opportunities[0].title_en}`,
        `Market trend alert: Price increase detected in ${marketTrends[1].area}`,
        `Competitor activity: New project announced in Dubai Marina`,
      ];
      const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
      setRealTimeUpdates((prev) => [randomUpdate, ...prev.slice(0, 4)]);
    }, 12000);

    return () => clearInterval(interval);
  }, [opportunities]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90)
      return "bg-green-500/20 text-green-400 border-green-400/30";
    if (score >= 70)
      return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
    return "bg-red-500/20 text-red-400 border-red-400/30";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 60) return `${diffInMinutes} ${t.minutes} ${t.ago}`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} ${t.hours} ${t.ago}`;
    return `${Math.floor(diffInMinutes / 1440)} ${t.days} ${t.ago}`;
  };

  const dashboardStats = {
    total: opportunities.length,
    highValue: opportunities.filter(
      (o) => o.ai_analysis.opportunity_score >= 90,
    ).length,
    automated: opportunities.filter((o) => o.automated_actions.proposal_ready)
      .length,
    pending: opportunities.filter((o) => !o.automated_actions.proposal_ready)
      .length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 text-white p-6">
      {/* Header */}
      <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <p className="text-emerald-300 text-xl opacity-90">{t.subtitle}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-xl rounded-xl p-2 border border-white/20">
        {[
          { id: "dashboard", label: t.dashboard, icon: BarChart3 },
          { id: "leads", label: t.leads, icon: Users },
          { id: "analytics", label: t.analytics, icon: TrendingUp },
          { id: "automation", label: t.automation, icon: Bot },
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

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats.total}
                  </div>
                  <div className="text-sm text-gray-300">{t.totalLeads}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats.highValue}
                  </div>
                  <div className="text-sm text-gray-300">{t.highValue}</div>
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
                    {dashboardStats.automated}
                  </div>
                  <div className="text-sm text-gray-300">{t.automated}</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dashboardStats.pending}
                  </div>
                  <div className="text-sm text-gray-300">{t.pending}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Updates */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              {t.realTimeAlerts}
            </h3>
            <div className="space-y-2">
              {realTimeUpdates.map((update, index) => (
                <div
                  key={index}
                  className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-sm animate-pulse"
                >
                  {update}
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends Preview */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">{t.marketTrends}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{trend.area}</h4>
                    <Badge
                      className={`${
                        trend.trend_direction === "up"
                          ? "bg-green-500/20 text-green-400"
                          : trend.trend_direction === "down"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {trend.change_percentage > 0 ? "+" : ""}
                      {trend.change_percentage}%
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-300">
                    <div>
                      {trend.avg_price_per_sqm.toLocaleString()} {t.aed}/{t.sqm}
                    </div>
                    <div>Demand: {t[trend.demand_level as keyof typeof t]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leads Tab */}
      {activeTab === "leads" && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <select
                value={filters.emirate}
                onChange={(e) =>
                  setFilters({ ...filters, emirate: e.target.value })
                }
                className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2"
              >
                <option value="all">All Emirates</option>
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
                <option value="all">All Types</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="commercial">Commercial</option>
              </select>

              <select
                value={filters.source}
                onChange={(e) =>
                  setFilters({ ...filters, source: e.target.value })
                }
                className="bg-white/10 border border-white/20 rounded-lg text-white px-3 py-2"
              >
                <option value="all">All Sources</option>
                <option value="bayut">Bayut</option>
                <option value="propertyfinder">PropertyFinder</option>
                <option value="ai_scout">AI Scout</option>
              </select>

              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all cursor-pointer"
                onClick={() => setSelectedOpportunity(opportunity)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {language === "ar"
                          ? opportunity.title_ar
                          : opportunity.title_en}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {opportunity.location.area}
                      </p>
                    </div>
                    <Badge
                      className={getScoreBadge(
                        opportunity.ai_analysis.opportunity_score,
                      )}
                    >
                      {opportunity.ai_analysis.opportunity_score}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">
                        {opportunity.property.price.toLocaleString()} {t.aed}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">
                        {opportunity.property.size_sqm} {t.sqm}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">
                        {opportunity.ai_analysis.roi_projection}% ROI
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${getRiskColor(opportunity.ai_analysis.risk_assessment)}`}
                      />
                      <span
                        className={`text-sm ${getRiskColor(opportunity.ai_analysis.risk_assessment)}`}
                      >
                        {
                          t[
                            opportunity.ai_analysis
                              .risk_assessment as keyof typeof t
                          ]
                        }{" "}
                        Risk
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      {getTimeAgo(opportunity.timeline.discovered)}
                    </div>
                    <div className="flex gap-1">
                      {opportunity.automated_actions.design_generated && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                      {opportunity.automated_actions.proposal_ready && (
                        <Sparkles className="w-4 h-4 text-purple-400" />
                      )}
                      {opportunity.automated_actions.follow_up_scheduled && (
                        <Bell className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      {t.viewDetails}
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Bot className="w-4 h-4 mr-1" />
                      AI Proposal
                    </Button>
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
            <h3 className="text-xl font-semibold mb-4">{t.marketTrends}</h3>
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium text-lg">{trend.area}</h4>
                      <Badge
                        className={`mt-1 ${
                          trend.trend_direction === "up"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trend.change_percentage > 0 ? "+" : ""}
                        {trend.change_percentage}%
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">
                        Avg Price per sqm
                      </div>
                      <div className="text-lg font-semibold">
                        {trend.avg_price_per_sqm.toLocaleString()} {t.aed}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Demand Level</div>
                      <Badge
                        className={`${
                          trend.demand_level === "high"
                            ? "bg-green-500/20 text-green-400"
                            : trend.demand_level === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {t[trend.demand_level as keyof typeof t]}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-300">Supply Level</div>
                      <Badge
                        className={`${
                          trend.supply_level === "low"
                            ? "bg-green-500/20 text-green-400"
                            : trend.supply_level === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {t[trend.supply_level as keyof typeof t]}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Automation Tab */}
      {activeTab === "automation" && (
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4">
              {t.automation} {t.setupAlerts}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium mb-3">Opportunity Score Alerts</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Get notified when high-scoring opportunities are detected
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Bell className="w-4 h-4 mr-2" />
                  Setup Score Alerts
                </Button>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium mb-3">Market Trend Notifications</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Monitor price changes and market movements
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Setup Trend Alerts
                </Button>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium mb-3">Auto Proposal Generation</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Automatically generate AI proposals for qualified leads
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Bot className="w-4 h-4 mr-2" />
                  Enable Auto Proposals
                </Button>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-medium mb-3">Competitor Monitoring</h4>
                <p className="text-sm text-gray-300 mb-4">
                  Track competitor activities and new projects
                </p>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Radar className="w-4 h-4 mr-2" />
                  Monitor Competitors
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Opportunity Details Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {language === "ar"
                  ? selectedOpportunity.title_ar
                  : selectedOpportunity.title_en}
              </h2>
              <button
                onClick={() => setSelectedOpportunity(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Property Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span>{selectedOpportunity.location.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{selectedOpportunity.property.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{selectedOpportunity.property.size_sqm} sqm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className="text-green-400 font-semibold">
                        {selectedOpportunity.property.price.toLocaleString()}{" "}
                        AED
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span>{selectedOpportunity.property.status}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span>{selectedOpportunity.contact_info.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{selectedOpportunity.contact_info.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Preference:</span>
                      <span>{selectedOpportunity.contact_info.preference}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">AI Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Opportunity Score:</span>
                      <Badge
                        className={getScoreBadge(
                          selectedOpportunity.ai_analysis.opportunity_score,
                        )}
                      >
                        {selectedOpportunity.ai_analysis.opportunity_score}/100
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Market Potential:</span>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        {selectedOpportunity.ai_analysis.market_potential}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>ROI Projection:</span>
                      <span className="text-green-400 font-semibold">
                        {selectedOpportunity.ai_analysis.roi_projection}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Risk Level:</span>
                      <span
                        className={getRiskColor(
                          selectedOpportunity.ai_analysis.risk_assessment,
                        )}
                      >
                        {selectedOpportunity.ai_analysis.risk_assessment}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">AI Recommendations</h3>
                  <p className="text-sm text-gray-300">
                    {selectedOpportunity.ai_analysis.recommended_approach}
                  </p>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Automated Actions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Design Generated:</span>
                      {selectedOpportunity.automated_actions
                        .design_generated ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Proposal Ready:</span>
                      {selectedOpportunity.automated_actions.proposal_ready ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Follow-up Scheduled:</span>
                      {selectedOpportunity.automated_actions
                        .follow_up_scheduled ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Eye className="w-4 h-4 mr-2" />
                View Full Details
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Bot className="w-4 h-4 mr-2" />
                Generate Proposal
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4 mr-2" />
                Contact Owner
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Sparkles className="w-4 h-4 mr-2" />
                Create Design
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
