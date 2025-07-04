import { useState, useEffect, useRef } from "react";
import {
  Activity,
  BarChart3,
  Cpu,
  Target,
  FolderOpen,
  Video,
  CreditCard,
  Crown,
  BookOpen,
  Users,
  Settings,
  MapPin,
  Radar,
  Zap,
  Building2,
  Globe,
  Eye,
  Search,
  Bell,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Star,
  Award,
  Shield,
  Home,
  Briefcase,
  Camera,
  Phone,
  Mail,
  MessageCircle,
  Upload,
  Download,
  Share,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  Maximize,
  Grid,
  List,
  Filter,
  Sort,
  Layers,
  Navigation,
  Satellite,
  Thermometer,
  Wind,
  Sun,
  Cloud,
  Droplets,
  Brain,
  Magic,
  Lightbulb,
  Sparkles,
  Bot,
  Info,
  Timer,
  Battery,
  Wifi,
  Signal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Comprehensive System Status Interface
interface SystemModule {
  id: string;
  name_ar: string;
  name_en: string;
  status: "online" | "offline" | "maintenance" | "updating";
  health_score: number;
  last_update: string;
  active_users: number;
  data_points: number;
  alerts_count: number;
  performance_metrics: {
    response_time: number;
    uptime: number;
    success_rate: number;
  };
  component: string;
}

interface LiveMetrics {
  total_projects: number;
  active_opportunities: number;
  monthly_revenue: number;
  client_satisfaction: number;
  system_health: number;
  ai_predictions: number;
  real_time_alerts: number;
  processing_speed: number;
}

interface AlertItem {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  priority: "urgent" | "high" | "medium" | "low";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  module: string;
  timestamp: string;
  action_required: boolean;
  auto_resolve: boolean;
}

interface MasterControlCenterProps {
  language: "en" | "ar";
  onModuleSelect: (moduleId: string) => void;
}

export default function MasterControlCenter({
  language,
  onModuleSelect,
}: MasterControlCenterProps) {
  const [systemModules] = useState<SystemModule[]>([
    {
      id: "smart-territory",
      name_ar: "الحيّ الذكي",
      name_en: "Smart Territory",
      status: "online",
      health_score: 98,
      last_update: "2024-01-15T16:45:00Z",
      active_users: 127,
      data_points: 15847,
      alerts_count: 23,
      performance_metrics: {
        response_time: 145,
        uptime: 99.8,
        success_rate: 97.5,
      },
      component: "SmartTerritoryIntelligence",
    },
    {
      id: "noox-ai",
      name_ar: "نوكس الذكي",
      name_en: "Noox AI Hub",
      status: "online",
      health_score: 95,
      last_update: "2024-01-15T16:30:00Z",
      active_users: 89,
      data_points: 8934,
      alerts_count: 5,
      performance_metrics: {
        response_time: 230,
        uptime: 99.5,
        success_rate: 96.2,
      },
      component: "NooxAIDesignHub",
    },
    {
      id: "competitive-intelligence",
      name_ar: "ذكاء المنافسين",
      name_en: "Competitive Intelligence",
      status: "online",
      health_score: 92,
      last_update: "2024-01-15T16:20:00Z",
      active_users: 45,
      data_points: 5632,
      alerts_count: 12,
      performance_metrics: {
        response_time: 180,
        uptime: 99.2,
        success_rate: 94.8,
      },
      component: "CompetitiveIntelligence",
    },
    {
      id: "market-scanner",
      name_ar: "ماسح السوق",
      name_en: "Market Scanner",
      status: "updating",
      health_score: 88,
      last_update: "2024-01-15T15:45:00Z",
      active_users: 67,
      data_points: 12456,
      alerts_count: 8,
      performance_metrics: {
        response_time: 195,
        uptime: 98.9,
        success_rate: 95.1,
      },
      component: "MarketScanner",
    },
    {
      id: "live-projects",
      name_ar: "المشاريع المباشرة",
      name_en: "Live Projects",
      status: "online",
      health_score: 96,
      last_update: "2024-01-15T16:50:00Z",
      active_users: 156,
      data_points: 2847,
      alerts_count: 3,
      performance_metrics: {
        response_time: 120,
        uptime: 99.9,
        success_rate: 98.3,
      },
      component: "ProjectManagement",
    },
    {
      id: "client-portal",
      name_ar: "بوابة العملاء",
      name_en: "Client Portal",
      status: "online",
      health_score: 94,
      last_update: "2024-01-15T16:35:00Z",
      active_users: 234,
      data_points: 4521,
      alerts_count: 7,
      performance_metrics: {
        response_time: 165,
        uptime: 99.6,
        success_rate: 96.8,
      },
      component: "ClientPortal",
    },
  ]);

  const [liveMetrics, setLiveMetrics] = useState<LiveMetrics>({
    total_projects: 1247,
    active_opportunities: 567,
    monthly_revenue: 8500000,
    client_satisfaction: 94.5,
    system_health: 96.2,
    ai_predictions: 23,
    real_time_alerts: 51,
    processing_speed: 98.7,
  });

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: "alert_001",
      type: "critical",
      priority: "urgent",
      title_ar: "🚨 فرصة استثمارية عاجلة",
      title_en: "🚨 Urgent Investment Opportunity",
      description_ar: "مجمع سكني جديد في عجمان بقيمة 25 مليون درهم",
      description_en: "New residential complex in Ajman worth 25M AED",
      module: "smart-territory",
      timestamp: "2024-01-15T16:45:00Z",
      action_required: true,
      auto_resolve: false,
    },
    {
      id: "alert_002",
      type: "warning",
      priority: "high",
      title_ar: "⚠️ منافس جديد في السوق",
      title_en: "⚠️ New Competitor in Market",
      description_ar: "شركة جديدة بدأت نشاطها في دبي",
      description_en: "New company started operations in Dubai",
      module: "competitive-intelligence",
      timestamp: "2024-01-15T15:30:00Z",
      action_required: true,
      auto_resolve: false,
    },
    {
      id: "alert_003",
      type: "success",
      priority: "medium",
      title_ar: "✅ تم إنجاز مشروع بنجاح",
      title_en: "✅ Project Completed Successfully",
      description_ar: "مشروع فيلا الشارقة تم تسليمه في الموعد",
      description_en: "Sharjah villa project delivered on time",
      module: "live-projects",
      timestamp: "2024-01-15T14:15:00Z",
      action_required: false,
      auto_resolve: true,
    },
  ]);

  const [activeView, setActiveView] = useState<
    "dashboard" | "modules" | "alerts" | "analytics"
  >("dashboard");
  const [refreshing, setRefreshing] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const t = {
    ar: {
      masterControl: "مركز التحكم الشامل",
      realTimeOperation: "العمليات في الوقت الحقيقي",
      systemOverview: "نظرة عامة على النظام",
      moduleStatus: "حالة الوحدات",
      liveAlerts: "التنبيهات المباشرة",
      analyticsHub: "مركز التحليلات",
      totalProjects: "إجمالي المشاريع",
      activeOpportunities: "الفرص النشطة",
      monthlyRevenue: "الإيرادات الشهرية",
      clientSatisfaction: "رضا العملاء",
      systemHealth: "صحة النظام",
      aiPredictions: "تنبؤات الذكاء الاصطناعي",
      realTimeAlerts: "التنبيهات المباشرة",
      processingSpeed: "سرعة المعالجة",
      moduleHealth: "صحة الوحدة",
      lastUpdate: "آخر تحديث",
      activeUsers: "المستخدمون النشطون",
      dataPoints: "نقاط البيانات",
      alertsCount: "عدد التنبيهات",
      responseTime: "وقت الاستجابة",
      uptime: "وقت التشغيل",
      successRate: "معدل النجاح",
      online: "متصل",
      offline: "غير متصل",
      maintenance: "صيانة",
      updating: "جاري التحديث",
      critical: "حرج",
      warning: "تحذير",
      info: "معلومات",
      success: "نجح",
      urgent: "عاجل",
      high: "عالي",
      medium: "متوسط",
      low: "منخفض",
      actionRequired: "يتطلب إجراء",
      autoResolve: "حل تلقائي",
      refreshData: "تحديث البيانات",
      autoUpdate: "التحديث التلقائي",
      exportReport: "تصدير التقرير",
      viewModule: "عرض الوحدة",
      resolveAlert: "حل التن��يه",
      acknowledgeAlert: "إقرار التنبيه",
      systemMetrics: "مقاييس النظام",
      performanceKPI: "مؤشرات الأداء الرئيسية",
    },
    en: {
      masterControl: "Master Control Center",
      realTimeOperation: "Real-time Operations Management",
      systemOverview: "System Overview",
      moduleStatus: "Module Status",
      liveAlerts: "Live Alerts",
      analyticsHub: "Analytics Hub",
      totalProjects: "Total Projects",
      activeOpportunities: "Active Opportunities",
      monthlyRevenue: "Monthly Revenue",
      clientSatisfaction: "Client Satisfaction",
      systemHealth: "System Health",
      aiPredictions: "AI Predictions",
      realTimeAlerts: "Real-time Alerts",
      processingSpeed: "Processing Speed",
      moduleHealth: "Module Health",
      lastUpdate: "Last Update",
      activeUsers: "Active Users",
      dataPoints: "Data Points",
      alertsCount: "Alerts Count",
      responseTime: "Response Time",
      uptime: "Uptime",
      successRate: "Success Rate",
      online: "Online",
      offline: "Offline",
      maintenance: "Maintenance",
      updating: "Updating",
      critical: "Critical",
      warning: "Warning",
      info: "Info",
      success: "Success",
      urgent: "Urgent",
      high: "High",
      medium: "Medium",
      low: "Low",
      actionRequired: "Action Required",
      autoResolve: "Auto Resolve",
      refreshData: "Refresh Data",
      autoUpdate: "Auto Update",
      exportReport: "Export Report",
      viewModule: "View Module",
      resolveAlert: "Resolve Alert",
      acknowledgeAlert: "Acknowledge Alert",
      systemMetrics: "System Metrics",
      performanceKPI: "Performance KPIs",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Real-time data updates
  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        ...prev,
        active_opportunities:
          prev.active_opportunities + Math.floor(Math.random() * 3 - 1),
        real_time_alerts: prev.real_time_alerts + Math.floor(Math.random() * 2),
        processing_speed: 95 + Math.random() * 5,
        system_health: 94 + Math.random() * 4,
      }));

      // Simulate new alerts
      if (Math.random() > 0.8) {
        const newAlert: AlertItem = {
          id: `alert_${Date.now()}`,
          type: ["info", "warning", "success"][
            Math.floor(Math.random() * 3)
          ] as any,
          priority: ["medium", "high"][Math.floor(Math.random() * 2)] as any,
          title_ar: "🔔 تنبيه جديد من النظام",
          title_en: "🔔 New System Alert",
          description_ar: "تم اكتشاف نشاط جديد في النظام",
          description_en: "New activity detected in the system",
          module:
            systemModules[Math.floor(Math.random() * systemModules.length)].id,
          timestamp: new Date().toISOString(),
          action_required: Math.random() > 0.5,
          auto_resolve: Math.random() > 0.7,
        };
        setAlerts((prev) => [newAlert, ...prev.slice(0, 19)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [autoUpdate, systemModules]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Simulate data refresh
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-400";
      case "offline":
        return "text-red-400";
      case "maintenance":
        return "text-yellow-400";
      case "updating":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-500 bg-red-500/10";
      case "warning":
        return "border-yellow-500 bg-yellow-500/10";
      case "info":
        return "border-blue-500 bg-blue-500/10";
      case "success":
        return "border-green-500 bg-green-500/10";
      default:
        return "border-gray-500 bg-gray-500/10";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return Info;
      case "info":
        return Bell;
      case "success":
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Master Control Header */}
      <div
        className={`p-6 border-b border-white/10 bg-black/30 backdrop-blur-xl ${isRTL ? "text-right" : "text-left"}`}
      >
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="flex items-center gap-4">
            {/* Central Control Hub Icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/30 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center">
                <Activity
                  className={`w-8 h-8 text-cyan-400 ${autoUpdate ? "animate-pulse" : ""}`}
                />
              </div>
              {autoUpdate && (
                <div className="absolute -inset-1 rounded-2xl border-2 border-cyan-400 animate-ping opacity-60"></div>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {tr.masterControl}
              </h2>
              <p className="text-cyan-300/80 flex items-center gap-2">
                <Zap className="w-4 h-4 animate-pulse" />
                {tr.realTimeOperation}
              </p>
            </div>
          </div>

          {/* Control Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/20">
              <div
                className={`w-2 h-2 rounded-full ${autoUpdate ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
              />
              <span className="text-white text-sm">
                {autoUpdate ? "Live" : "Paused"}
              </span>
            </div>

            <Button
              onClick={() => setAutoUpdate(!autoUpdate)}
              variant={autoUpdate ? "default" : "ghost"}
              size="sm"
              className={
                autoUpdate
                  ? "bg-green-500 text-white border-0"
                  : "text-green-300 hover:text-white hover:bg-green-500/20 border-0"
              }
            >
              {autoUpdate ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              className="bg-blue-500 hover:bg-blue-600 text-white border-0"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              {tr.refreshData}
            </Button>

            <Button className="bg-purple-500 hover:bg-purple-600 text-white border-0">
              <Download className="w-4 h-4 mr-2" />
              {tr.exportReport}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex gap-2">
          {[
            { key: "dashboard", icon: BarChart3, label: tr.systemOverview },
            { key: "modules", icon: Grid, label: tr.moduleStatus },
            { key: "alerts", icon: Bell, label: tr.liveAlerts },
            { key: "analytics", icon: TrendingUp, label: tr.analyticsHub },
          ].map(({ key, icon: Icon, label }) => (
            <Button
              key={key}
              variant={activeView === key ? "default" : "ghost"}
              onClick={() => setActiveView(key as any)}
              className={`flex-1 ${
                activeView === key
                  ? "bg-cyan-500 text-white border-0"
                  : "text-cyan-300 hover:text-white hover:bg-cyan-500/20 border-0"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Dashboard View */}
        {activeView === "dashboard" && (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  key: "projects",
                  value: liveMetrics.total_projects,
                  label: tr.totalProjects,
                  icon: FolderOpen,
                  color: "emerald",
                  trend: "+12%",
                },
                {
                  key: "opportunities",
                  value: liveMetrics.active_opportunities,
                  label: tr.activeOpportunities,
                  icon: Target,
                  color: "blue",
                  trend: "+8%",
                },
                {
                  key: "revenue",
                  value: formatNumber(liveMetrics.monthly_revenue),
                  label: tr.monthlyRevenue,
                  icon: DollarSign,
                  color: "green",
                  trend: "+23%",
                  suffix: "AED",
                },
                {
                  key: "satisfaction",
                  value: `${liveMetrics.client_satisfaction}%`,
                  label: tr.clientSatisfaction,
                  icon: Star,
                  color: "yellow",
                  trend: "+5%",
                },
                {
                  key: "health",
                  value: `${liveMetrics.system_health.toFixed(1)}%`,
                  label: tr.systemHealth,
                  icon: Shield,
                  color: "purple",
                  trend: "+2%",
                },
                {
                  key: "predictions",
                  value: liveMetrics.ai_predictions,
                  label: tr.aiPredictions,
                  icon: Brain,
                  color: "pink",
                  trend: "+15%",
                },
                {
                  key: "alerts",
                  value: liveMetrics.real_time_alerts,
                  label: tr.realTimeAlerts,
                  icon: Bell,
                  color: "orange",
                  trend: "+3%",
                },
                {
                  key: "speed",
                  value: `${liveMetrics.processing_speed.toFixed(1)}%`,
                  label: tr.processingSpeed,
                  icon: Zap,
                  color: "cyan",
                  trend: "+1%",
                },
              ].map(
                ({ key, value, label, icon: Icon, color, trend, suffix }) => (
                  <div
                    key={key}
                    className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`${isRTL ? "text-right" : "text-left"}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-${color}-500/20 flex items-center justify-center`}
                          >
                            <Icon className={`w-5 h-5 text-${color}-400`} />
                          </div>
                          <h3 className="text-white/80 text-sm font-medium">
                            {label}
                          </h3>
                        </div>
                        <p className="text-2xl font-bold text-white mb-2">
                          {value}{" "}
                          {suffix && (
                            <span className="text-sm text-emerald-300">
                              {suffix}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-green-400" />
                          <span className="text-green-400 text-sm font-semibold">
                            {trend}
                          </span>
                          <span className="text-emerald-300/60 text-xs ml-1">
                            vs last month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* System Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  {tr.systemMetrics}
                </h3>
                <div className="space-y-4">
                  {systemModules.slice(0, 4).map((module) => (
                    <div
                      key={module.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            module.status === "online"
                              ? "bg-green-400"
                              : module.status === "updating"
                                ? "bg-blue-400 animate-pulse"
                                : module.status === "maintenance"
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                          }`}
                        />
                        <span className="text-white font-medium">
                          {module[`name_${language}` as keyof typeof module]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 text-sm font-bold">
                          {module.health_score}%
                        </span>
                        <Button
                          size="sm"
                          onClick={() => onModuleSelect(module.id)}
                          className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border-0"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  {tr.performanceKPI}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-300">Response Time</span>
                      <span className="text-white font-bold">145ms</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-blue-400 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-300">System Uptime</span>
                      <span className="text-white font-bold">99.8%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-green-400 rounded-full"
                        style={{ width: "99%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-300">Success Rate</span>
                      <span className="text-white font-bold">97.2%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-purple-400 rounded-full"
                        style={{ width: "97%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-cyan-300">Data Processing</span>
                      <span className="text-white font-bold">98.7%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modules View */}
        {activeView === "modules" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {systemModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {module[`name_${language}` as keyof typeof module]}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            module.status === "online"
                              ? "bg-green-400"
                              : module.status === "updating"
                                ? "bg-blue-400 animate-pulse"
                                : module.status === "maintenance"
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                          }`}
                        />
                        <span className={getStatusColor(module.status)}>
                          {tr[module.status as keyof typeof tr]}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        {module.health_score}%
                      </p>
                      <p className="text-emerald-300/60 text-sm">
                        {tr.moduleHealth}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-blue-300 text-sm">{tr.activeUsers}</p>
                      <p className="text-white font-bold">
                        {module.active_users}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-green-300 text-sm">{tr.dataPoints}</p>
                      <p className="text-white font-bold">
                        {formatNumber(module.data_points)}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-yellow-300 text-sm">
                        {tr.alertsCount}
                      </p>
                      <p className="text-white font-bold">
                        {module.alerts_count}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-purple-300 text-sm">
                        {tr.responseTime}
                      </p>
                      <p className="text-white font-bold">
                        {module.performance_metrics.response_time}ms
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => onModuleSelect(module.id)}
                      className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white border-0"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {tr.viewModule}
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/10 border border-white/20"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alerts View */}
        {activeView === "alerts" && (
          <div className="space-y-4">
            {alerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <div
                  key={alert.id}
                  className={`rounded-2xl p-6 border-2 ${getAlertTypeColor(alert.type)} backdrop-blur-lg`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        alert.type === "critical"
                          ? "bg-red-500/20"
                          : alert.type === "warning"
                            ? "bg-yellow-500/20"
                            : alert.type === "info"
                              ? "bg-blue-500/20"
                              : "bg-green-500/20"
                      }`}
                    >
                      <AlertIcon
                        className={`w-5 h-5 ${
                          alert.type === "critical"
                            ? "text-red-400"
                            : alert.type === "warning"
                              ? "text-yellow-400"
                              : alert.type === "info"
                                ? "text-blue-400"
                                : "text-green-400"
                        }`}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-white font-bold">
                          {alert[`title_${language}` as keyof typeof alert]}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            alert.priority === "urgent"
                              ? "bg-red-500/20 text-red-300"
                              : alert.priority === "high"
                                ? "bg-orange-500/20 text-orange-300"
                                : alert.priority === "medium"
                                  ? "bg-yellow-500/20 text-yellow-300"
                                  : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {tr[alert.priority as keyof typeof tr]}
                        </span>
                      </div>

                      <p className="text-white/80 mb-3">
                        {alert[`description_${language}` as keyof typeof alert]}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-cyan-300">
                            Module: {alert.module}
                          </span>
                          <span className="text-emerald-300">
                            {new Date(alert.timestamp).toLocaleString()}
                          </span>
                          {alert.action_required && (
                            <span className="text-orange-300 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {tr.actionRequired}
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white border-0"
                          >
                            {tr.acknowledgeAlert}
                          </Button>
                          {alert.action_required && (
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white border-0"
                            >
                              {tr.resolveAlert}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Analytics View */}
        {activeView === "analytics" && (
          <div className="space-y-6">
            <div className="text-center py-20">
              <BarChart3 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Advanced Analytics Dashboard
              </h3>
              <p className="text-cyan-300/60">
                Comprehensive analytics and reporting tools coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
