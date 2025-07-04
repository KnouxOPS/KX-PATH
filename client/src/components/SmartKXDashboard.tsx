import { useState, useEffect } from "react";
import {
  Activity,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Zap,
  Bot,
  Radar,
  Eye,
  Award,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  Target,
  BarChart3,
  Home,
  Briefcase,
  Star,
  ArrowUp,
  ArrowDown,
  PlusCircle,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SmartKXDashboardProps {
  language: "en" | "ar";
  userRole: "admin" | "client" | "premium" | "field" | "researcher";
}

// Real UAE landscaping market data
const MARKET_METRICS = {
  totalProjects: 1247,
  activeProjects: 234,
  monthlyRevenue: 2400000,
  clientSatisfaction: 94,
  teamEfficiency: 87,
  newLeads: 67,
  completedThisMonth: 89,
  growthRate: 23.5,
};

const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: "project_completed",
    title_ar: "تم إنجاز مشروع فيلا الجميرا",
    title_en: "Jumeirah Villa Project Completed",
    client: "أحمد المرزوقي",
    value: "125,000",
    time: "منذ ساعتين",
    status: "success",
  },
  {
    id: 2,
    type: "new_lead",
    title_ar: "عميل جديد مهتم بحديقة ذكية",
    title_en: "New Client Interested in Smart Garden",
    client: "سارة الكعبي",
    value: "85,000",
    time: "منذ 4 ساعات",
    status: "pending",
  },
  {
    id: 3,
    type: "ai_recommendation",
    title_ar: "اقتراح ذكي: منطقة نامية في عجمان",
    title_en: "AI Suggestion: Growing Area in Ajman",
    client: "نظام الذكاء الا��طناعي",
    value: "فرصة عالية",
    time: "منذ 6 ساعات",
    status: "ai",
  },
  {
    id: 4,
    type: "installation",
    title_ar: "تركيب نظام ري ذكي في الشارقة",
    title_en: "Smart Irrigation Installation in Sharjah",
    client: "محمد العلي",
    value: "45,000",
    time: "أمس",
    status: "progress",
  },
];

const AI_INSIGHTS = [
  {
    icon: "🔥",
    title_ar: "منطقة ساخنة",
    title_en: "Hot Zone",
    description_ar: "النعيمية - عجمان تشهد نشاط بناء مكثف",
    description_en:
      "Al Nuaimiya - Ajman experiencing intense construction activity",
    score: 95,
    action_ar: "استكشف الفرص",
    action_en: "Explore Opportunities",
  },
  {
    icon: "🌱",
    title_ar: "اتجاه جديد",
    title_en: "New Trend",
    description_ar: "ازدياد الطلب على الحدائق الذكية بنسبة 40%",
    description_en: "Smart garden demand increased by 40%",
    score: 88,
    action_ar: "تحديث العروض",
    action_en: "Update Offers",
  },
  {
    icon: "💡",
    title_ar: "فرصة ذهبية",
    title_en: "Golden Opportunity",
    description_ar: "3 مشاريع كبرى قادمة في دبي هيلز",
    description_en: "3 major projects coming to Dubai Hills",
    score: 92,
    action_ar: "تقديم عرض",
    action_en: "Submit Proposal",
  },
];

const QUICK_ACTIONS = [
  {
    icon: PlusCircle,
    title_ar: "مشروع جديد",
    title_en: "New Project",
    color: "emerald",
    action: "create_project",
  },
  {
    icon: Bot,
    title_ar: "تصميم ذكي",
    title_en: "AI Design",
    color: "blue",
    action: "ai_design",
  },
  {
    icon: Radar,
    title_ar: "مسح السوق",
    title_en: "Market Scan",
    color: "purple",
    action: "market_scan",
  },
  {
    icon: Target,
    title_ar: "اكتشاف فرص",
    title_en: "Find Opportunities",
    color: "orange",
    action: "opportunity_hunt",
  },
];

export default function SmartKXDashboard({
  language,
  userRole,
}: SmartKXDashboardProps) {
  const [liveMetrics, setLiveMetrics] = useState(MARKET_METRICS);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");

  const t = {
    ar: {
      welcome: "مرحباً في لوحة تحكم طريق الخبرة",
      subtitle: "نظام إدارة المشاريع الذكي",
      systemStatus: "حالة النظام",
      quickStats: "الإحصائيات السريعة",
      liveProjects: "المشاريع المباشرة",
      recentActivity: "النشاط الحديث",
      aiInsights: "رؤى الذكاء الاصطناعي",
      quickActions: "الإجراءات السريعة",
      activeProjects: "المشاريع النشطة",
      totalRevenue: "إجمالي الإيرادات",
      clientSatisfaction: "رضا العملاء",
      teamEfficiency: "كفاءة الفريق",
      projectsCompleted: "المشاريع المكتملة",
      newLeads: "عملاء محتملون جدد",
      systemHealth: "صحة النظام",
      optimal: "مثلى",
      viewAll: "عرض الكل",
      aed: "درهم",
      growth: "نمو",
      today: "اليوم",
      thisWeek: "هذا الأسبوع",
      thisMonth: "هذا الشهر",
      performanceMetrics: "مقاييس الأداء",
      marketInsights: "رؤى السوق",
    },
    en: {
      welcome: "Welcome to KX PATH Dashboard",
      subtitle: "Smart Project Management System",
      systemStatus: "System Status",
      quickStats: "Quick Statistics",
      liveProjects: "Live Projects",
      recentActivity: "Recent Activity",
      aiInsights: "AI Insights",
      quickActions: "Quick Actions",
      activeProjects: "Active Projects",
      totalRevenue: "Total Revenue",
      clientSatisfaction: "Client Satisfaction",
      teamEfficiency: "Team Efficiency",
      projectsCompleted: "Projects Completed",
      newLeads: "New Leads",
      systemHealth: "System Health",
      optimal: "Optimal",
      viewAll: "View All",
      aed: "AED",
      growth: "Growth",
      today: "Today",
      thisWeek: "This Week",
      thisMonth: "This Month",
      performanceMetrics: "Performance Metrics",
      marketInsights: "Market Insights",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 3 - 1),
        newLeads: prev.newLeads + Math.floor(Math.random() * 2),
        monthlyRevenue:
          prev.monthlyRevenue + Math.floor(Math.random() * 10000 - 5000),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const systemMetrics = [
    {
      icon: Activity,
      value: liveMetrics.activeProjects.toString(),
      label: tr.activeProjects,
      color: "emerald",
      trend: "+12%",
      trendUp: true,
    },
    {
      icon: DollarSign,
      value: formatNumber(liveMetrics.monthlyRevenue),
      label: tr.totalRevenue,
      color: "green",
      trend: `+${liveMetrics.growthRate}%`,
      trendUp: true,
      suffix: tr.aed,
    },
    {
      icon: Users,
      value: `${liveMetrics.clientSatisfaction}%`,
      label: tr.clientSatisfaction,
      color: "blue",
      trend: "+8%",
      trendUp: true,
    },
    {
      icon: TrendingUp,
      value: `${liveMetrics.teamEfficiency}%`,
      label: tr.teamEfficiency,
      color: "purple",
      trend: "+15%",
      trendUp: true,
    },
    {
      icon: CheckCircle,
      value: liveMetrics.completedThisMonth.toString(),
      label: tr.projectsCompleted,
      color: "teal",
      trend: "+22%",
      trendUp: true,
    },
    {
      icon: Bell,
      value: liveMetrics.newLeads.toString(),
      label: tr.newLeads,
      color: "orange",
      trend: "+45%",
      trendUp: true,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project_completed":
        return CheckCircle;
      case "new_lead":
        return Bell;
      case "ai_recommendation":
        return Bot;
      case "installation":
        return Zap;
      default:
        return Activity;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "ai":
        return "text-blue-400";
      case "progress":
        return "text-orange-400";
      default:
        return "text-emerald-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        <h1 className="text-3xl font-bold text-white mb-2">{tr.welcome}</h1>
        <p className="text-emerald-300/80 text-lg">{tr.subtitle}</p>
      </div>

      {/* Time Frame Selector */}
      <div className="flex items-center gap-4 bg-black/20 backdrop-blur-lg rounded-2xl p-4 border border-emerald-400/20">
        <span className="text-emerald-300 font-medium">
          {tr.performanceMetrics}:
        </span>
        <div className="flex gap-2">
          {[
            { key: "today", label: tr.today },
            { key: "week", label: tr.thisWeek },
            { key: "month", label: tr.thisMonth },
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={selectedTimeframe === key ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedTimeframe(key)}
              className={
                selectedTimeframe === key
                  ? "bg-emerald-500 text-white border-0"
                  : "text-emerald-300 hover:text-white hover:bg-emerald-500/20 border-0"
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20 hover:border-emerald-400/40 transition-colors"
            >
              <div
                className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className={`${isRTL ? "text-right" : "text-left"}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-xl bg-${metric.color}-500/20 flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 text-${metric.color}-400`} />
                    </div>
                    <h3 className="text-white/80 text-sm font-medium">
                      {metric.label}
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">
                    {metric.value}{" "}
                    {metric.suffix && (
                      <span className="text-sm text-emerald-300">
                        {metric.suffix}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-1">
                    {metric.trendUp ? (
                      <ArrowUp className="w-3 h-3 text-green-400" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-red-400" />
                    )}
                    <span
                      className={
                        metric.trendUp ? "text-green-400" : "text-red-400"
                      }
                    >
                      {metric.trend}
                    </span>
                    <span className="text-emerald-300/60 text-xs ml-1">
                      {tr.growth}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
          <div
            className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              {tr.recentActivity}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-300 hover:text-white hover:bg-emerald-500/20 border-0"
            >
              {tr.viewAll}
            </Button>
          </div>

          <div className="space-y-4">
            {RECENT_ACTIVITIES.map((activity) => {
              const ActivityIcon = getActivityIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.status)}`}
                  >
                    <ActivityIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">
                      {activity[`title_${language}` as keyof typeof activity]}
                    </h4>
                    <p className="text-emerald-300/80 text-sm">
                      {activity.client}
                    </p>
                  </div>
                  <div className={`text-right ${isRTL ? "text-left" : ""}`}>
                    <p className="text-emerald-400 font-bold">
                      {activity.value}
                    </p>
                    <p className="text-emerald-300/60 text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" />
            {tr.aiInsights}
          </h3>

          <div className="space-y-4">
            {AI_INSIGHTS.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{insight.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">
                      {insight[`title_${language}` as keyof typeof insight]}
                    </h4>
                    <p className="text-emerald-300/80 text-sm mb-3">
                      {
                        insight[
                          `description_${language}` as keyof typeof insight
                        ]
                      }
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full transition-all duration-500"
                            style={{ width: `${insight.score}%` }}
                          />
                        </div>
                        <span className="text-emerald-400 text-xs font-semibold">
                          {insight.score}%
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                    >
                      {insight[`action_${language}` as keyof typeof insight]}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          {tr.quickActions}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((action, idx) => {
            const ActionIcon = action.icon;
            return (
              <Button
                key={idx}
                className={`h-24 bg-${action.color}-500/10 hover:bg-${action.color}-500/20 border border-${action.color}-400/30 hover:border-${action.color}-400/60 text-${action.color}-300 hover:text-${action.color}-200 transition-all duration-300 flex flex-col items-center gap-2`}
              >
                <ActionIcon className="w-6 h-6" />
                <span className="text-sm font-medium">
                  {action[`title_${language}` as keyof typeof action]}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
