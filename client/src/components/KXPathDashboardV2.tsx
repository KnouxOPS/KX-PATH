import { useState, useEffect } from "react";
import {
  BarChart3,
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
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  Settings,
  Sparkles,
  Globe,
  Building2,
  Home,
  Target,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  RefreshCw,
  PlayCircle,
  MessageSquare,
  Star,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface KXPathDashboardV2Props {
  language: "en" | "ar";
  userRole: "admin" | "client" | "premium" | "field" | "researcher";
}

interface DashboardMetric {
  id: string;
  title_ar: string;
  title_en: string;
  value: string | number;
  change_percentage: number;
  trend: "up" | "down" | "stable";
  icon: any;
  color: string;
  description_ar: string;
  description_en: string;
  priority: "high" | "medium" | "low";
}

interface QuickAction {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon: any;
  color: string;
  action: string;
  category: "ai" | "map" | "analysis" | "project";
}

interface NotificationItem {
  id: string;
  type: "opportunity" | "project" | "alert" | "system";
  title_ar: string;
  title_en: string;
  message_ar: string;
  message_en: string;
  timestamp: string;
  priority: "high" | "medium" | "low";
  read: boolean;
  action_required: boolean;
}

interface WelcomeAssistantSuggestion {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  action: string;
  icon: any;
  estimated_time: string;
}

const translations = {
  en: {
    welcome: "Welcome to KX PATH UAE",
    subtitle: "Smart Landscape Operating System v2.0",
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon",
    goodEvening: "Good Evening",
    dashboardOverview: "Dashboard Overview",
    systemMetrics: "System Metrics",
    quickActions: "Quick Actions",
    notifications: "Notifications",
    welcomeAssistant: "Welcome Assistant",
    recentActivity: "Recent Activity",
    marketInsights: "Market Insights",
    projectStatus: "Project Status",
    aiInsights: "AI Insights",
    liveMonitoring: "Live Monitoring",
    viewAll: "View All",
    getStarted: "Get Started",
    configure: "Configure",
    analyze: "Analyze",
    monitor: "Monitor",
    totalProjects: "Total Projects",
    activeOpportunities: "Active Opportunities",
    aiGenerations: "AI Generations",
    clientSatisfaction: "Client Satisfaction",
    marketGrowth: "Market Growth",
    systemHealth: "System Health",
    dataAccuracy: "Data Accuracy",
    responseTime: "Response Time",
    projectsCompleted: "Projects Completed",
    newLeads: "New Leads",
    revenue: "Revenue",
    efficiency: "Team Efficiency",
    generateAIDesign: "Generate AI Design",
    exploreSmartMap: "Explore Smart Map",
    huntOpportunities: "Hunt Opportunities",
    analyzeCompetitors: "Analyze Competitors",
    validateMarket: "Validate Market",
    monitorLive: "Monitor Live",
    createProject: "Create Project",
    exportReport: "Export Report",
    newOpportunityDetected: "New Opportunity Detected",
    projectUpdateAvailable: "Project Update Available",
    marketAlertTriggered: "Market Alert Triggered",
    systemMaintenanceScheduled: "System Maintenance Scheduled",
    aiModelUpdated: "AI Model Updated",
    competitorActivityDetected: "Competitor Activity Detected",
    markAsRead: "Mark as Read",
    takeAction: "Take Action",
    dismiss: "Dismiss",
    startWithSmartMap: "Start with Smart Map",
    exploreUAEOpportunities:
      "Explore UAE investment opportunities on our interactive map",
    generateFirstDesign: "Generate Your First Design",
    useAIToCreateStunningLandscapes:
      "Use AI to create stunning landscape designs in minutes",
    analyzeMarketTrends: "Analyze Market Trends",
    getInsightsFromRealTimeData:
      "Get insights from real-time market data and competitor analysis",
    setupLiveMonitoring: "Setup Live Monitoring",
    trackProjectProgressRealTime:
      "Track project progress and market changes in real-time",
    estimatedTime: "Estimated time",
    minutes: "minutes",
    lessThanMinute: "Less than 1 minute",
    online: "Online",
    optimal: "Optimal",
    excellent: "Excellent",
    good: "Good",
    moderate: "Moderate",
    high: "High",
    medium: "Medium",
    low: "Low",
    aed: "AED",
    percentage: "%",
    projects: "Projects",
    opportunities: "Opportunities",
    generations: "Generations",
    ms: "ms",
    lastUpdated: "Last updated",
    minutesAgo: "minutes ago",
    hoursAgo: "hours ago",
    now: "now",
    systemStatus: "System Status",
    allSystemsOperational: "All systems operational",
    dataStreamsActive: "Data streams active",
    aiModelsOnline: "AI models online",
    marketDataLive: "Market data live",
  },
  ar: {
    welcome: "مرحباً بك في طريق الخبرة الإمارات",
    subtitle: "نظام تشغيل المناظر الطبيعية الذكي v2.0",
    goodMorning: "صباح الخير",
    goodAfternoon: "مساء الخير",
    goodEvening: "مساء الخير",
    dashboardOverview: "نظرة عامة على لوحة التحكم",
    systemMetrics: "مقاييس النظام",
    quickActions: "الإجراءات السريعة",
    notifications: "الإشعارات",
    welcomeAssistant: "مساعد الترحيب",
    recentActivity: "النشاط الحديث",
    marketInsights: "رؤى السوق",
    projectStatus: "حالة المشاريع",
    aiInsights: "رؤى الذكاء الاصطناعي",
    liveMonitoring: "المراقبة المباشرة",
    viewAll: "عرض الكل",
    getStarted: "البدء",
    configure: "تكوين",
    analyze: "تحليل",
    monitor: "مراقبة",
    totalProjects: "إجمالي المشاريع",
    activeOpportunities: "الفرص النشطة",
    aiGenerations: "إنتاجات الذكاء الاصطناعي",
    clientSatisfaction: "رضا العملاء",
    marketGrowth: "نمو السوق",
    systemHealth: "صحة النظام",
    dataAccuracy: "دقة البيانات",
    responseTime: "وقت الاستجابة",
    projectsCompleted: "المشاريع المكتملة",
    newLeads: "عملاء محتملون جدد",
    revenue: "الإيرادات",
    efficiency: "كفاءة الفريق",
    generateAIDesign: "إنتاج تصميم ذكي",
    exploreSmartMap: "استكشاف الخريطة الذكية",
    huntOpportunities: "صيد الفرص",
    analyzeCompetitors: "تحليل المنافسين",
    validateMarket: "تقييم السوق",
    monitorLive: "المراقبة المباشرة",
    createProject: "إنشاء مشروع",
    exportReport: "تصدير التقرير",
    newOpportunityDetected: "تم اكتشاف فرصة جديدة",
    projectUpdateAvailable: "تحديث المشروع متاح",
    marketAlertTriggered: "تم تفعيل تنبيه السوق",
    systemMaintenanceScheduled: "صيانة النظام مجدولة",
    aiModelUpdated: "تم تحديث نموذج الذكاء الاصطناعي",
    competitorActivityDetected: "تم اكتشاف نشاط منافس",
    markAsRead: "تعيين كمقروء",
    takeAction: "اتخاذ إجراء",
    dismiss: "تجاهل",
    startWithSmartMap: "ابدأ بالخريطة الذكية",
    exploreUAEOpportunities:
      "استكشف الفرص الاستثمارية في الإمارات على خريطتنا التفاعلية",
    generateFirstDesign: "إن��ج تصميمك الأول",
    useAIToCreateStunningLandscapes:
      "استخدم الذكاء الاصطناعي لإنشاء تصاميم مناظر طبيعية مذهلة خلال دقائق",
    analyzeMarketTrends: "تحليل اتجاهات السوق",
    getInsightsFromRealTimeData:
      "احصل على رؤى من بيانات السوق المباشرة وتحليل المنافسين",
    setupLiveMonitoring: "إعداد المراقبة المباشرة",
    trackProjectProgressRealTime:
      "تتبع تقدم المشاريع وتغيرات السوق في الوقت الفعلي",
    estimatedTime: "الوقت المقدر",
    minutes: "دقائق",
    lessThanMinute: "أقل من دقيقة",
    online: "متصل",
    optimal: "مثلى",
    excellent: "ممتاز",
    good: "جيد",
    moderate: "متوسط",
    high: "عالي",
    medium: "متوسط",
    low: "منخفض",
    aed: "درهم",
    percentage: "%",
    projects: "مشاريع",
    opportunities: "فرص",
    generations: "إنتاجات",
    ms: "مللي ثانية",
    lastUpdated: "آخر تحديث",
    minutesAgo: "دقائق مضت",
    hoursAgo: "ساعات مضت",
    now: "الآن",
    systemStatus: "حالة النظام",
    allSystemsOperational: "جميع الأنظمة تعمل",
    dataStreamsActive: "تدفق البيانات نشط",
    aiModelsOnline: "نماذج الذكاء الاصطناعي متصلة",
    marketDataLive: "بيانات السوق مباشرة",
  },
};

// Sample Dashboard Metrics with UAE context
const dashboardMetrics: DashboardMetric[] = [
  {
    id: "1",
    title_ar: "إجمالي المشاريع",
    title_en: "Total Projects",
    value: 247,
    change_percentage: 12.5,
    trend: "up",
    icon: Building2,
    color: "emerald",
    description_ar: "مشاريع ��لتنسيق النشطة في الإمارات",
    description_en: "Active landscaping projects across UAE",
    priority: "high",
  },
  {
    id: "2",
    title_ar: "الفرص النشطة",
    title_en: "Active Opportunities",
    value: 89,
    change_percentage: 8.3,
    trend: "up",
    icon: Target,
    color: "blue",
    description_ar: "فرص استثمارية مكتشفة بالذكاء الاصطناعي",
    description_en: "Investment opportunities detected by AI",
    priority: "high",
  },
  {
    id: "3",
    title_ar: "إنتاجات الذكاء الاصطناعي",
    title_en: "AI Generations",
    value: 1843,
    change_percentage: 23.7,
    trend: "up",
    icon: Bot,
    color: "purple",
    description_ar: "تصاميم منتجة بالذكاء الاصطناعي",
    description_en: "AI-generated landscape designs",
    priority: "medium",
  },
  {
    id: "4",
    title_ar: "رضا العملاء",
    title_en: "Client Satisfaction",
    value: "94.8%",
    change_percentage: 2.1,
    trend: "up",
    icon: Star,
    color: "gold",
    description_ar: "معدل رضا العملاء الإجمالي",
    description_en: "Overall client satisfaction rate",
    priority: "high",
  },
  {
    id: "5",
    title_ar: "نمو السوق",
    title_en: "Market Growth",
    value: "15.8%",
    change_percentage: 4.2,
    trend: "up",
    icon: TrendingUp,
    color: "green",
    description_ar: "نمو سوق التنسيق في الإمارات",
    description_en: "UAE landscaping market growth",
    priority: "medium",
  },
  {
    id: "6",
    title_ar: "صحة النظام",
    title_en: "System Health",
    value: "99.2%",
    change_percentage: 0.3,
    trend: "stable",
    icon: Activity,
    color: "emerald",
    description_ar: "أداء النظام الإجمالي",
    description_en: "Overall system performance",
    priority: "medium",
  },
];

// Quick Actions with Enhanced Harmonious Colors
const quickActions: QuickAction[] = [
  {
    id: "1",
    title_ar: "إنتاج تصميم ذكي",
    title_en: "Generate AI Design",
    description_ar: "إنشاء تصاميم مناظر طبيعية مخصصة",
    description_en: "Create custom landscape designs",
    icon: Sparkles,
    color: "gradient-innovation",
    action: "ai-design",
    category: "ai",
  },
  {
    id: "2",
    title_ar: "استكشاف الخريطة الذكية",
    title_en: "Explore Smart Map",
    description_ar: "تصفح الفرص في الإمارات",
    description_en: "Browse opportunities across UAE",
    icon: MapPin,
    color: "gradient-ocean",
    action: "smart-map",
    category: "map",
  },
  {
    id: "3",
    title_ar: "صيد الف��ص",
    title_en: "Hunt Opportunities",
    description_ar: "البحث عن استثمارات جديدة",
    description_en: "Search for new investments",
    icon: Radar,
    color: "gradient-royalty",
    action: "opportunity-hunter",
    category: "analysis",
  },
  {
    id: "4",
    title_ar: "تحليل المنافسين",
    title_en: "Analyze Competitors",
    description_ar: "رؤى حول المنافسين في السوق",
    description_en: "Insights on market competitors",
    icon: Eye,
    color: "gradient-energy",
    action: "competitive-intel",
    category: "analysis",
  },
  {
    id: "5",
    title_ar: "تقييم السوق",
    title_en: "Validate Market",
    description_ar: "تحليل وتقييم البيانات",
    description_en: "Analyze and validate data",
    icon: BarChart3,
    color: "gradient-nature",
    action: "market-analysis",
    category: "analysis",
  },
  {
    id: "6",
    title_ar: "المراقبة المباشرة",
    title_en: "Monitor Live",
    description_ar: "تتبع المشاريع في الوقت الفعلي",
    description_en: "Track projects in real-time",
    icon: Activity,
    color: "gradient-sunset",
    action: "real-time-monitoring",
    category: "project",
  },
  {
    id: "7",
    title_ar: "نماذج الذكاء الاصطناعي",
    title_en: "Free AI Models",
    description_ar: "مكتبة نماذج الذكاء الاصطناعي",
    description_en: "AI models library access",
    icon: Bot,
    color: "gradient-serenity",
    action: "ai-models",
    category: "ai",
  },
  {
    id: "8",
    title_ar: "لوحة الإدارة",
    title_en: "Admin Dashboard",
    description_ar: "إدارة النظام والمستخدمين",
    description_en: "System and user management",
    icon: Settings,
    color: "gradient-luxury",
    action: "admin",
    category: "project",
  },
];

// Sample notifications
const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "opportunity",
    title_ar: "فرصة جديدة مكتشفة",
    title_en: "New Opportunity Detected",
    message_ar: "فيلا فاخرة في دبي هيلز - قيمة المشروع 4.8M درهم",
    message_en: "Luxury villa in Dubai Hills - Project value 4.8M AED",
    timestamp: "2024-01-15T14:30:00Z",
    priority: "high",
    read: false,
    action_required: true,
  },
  {
    id: "2",
    type: "project",
    title_ar: "تحديث المشروع متاح",
    title_en: "Project Update Available",
    message_ar: "مشروع الحديقة الملكية - 85% مكتمل",
    message_en: "Royal Garden Project - 85% completed",
    timestamp: "2024-01-15T13:15:00Z",
    priority: "medium",
    read: false,
    action_required: false,
  },
  {
    id: "3",
    type: "alert",
    title_ar: "تنبيه السوق مفعل",
    title_en: "Market Alert Triggered",
    message_ar: "ارتفاع في أسعار العقارات في الشارقة بنسبة 8%",
    message_en: "Property prices in Sharjah increased by 8%",
    timestamp: "2024-01-15T12:45:00Z",
    priority: "medium",
    read: true,
    action_required: false,
  },
];

// Welcome Assistant Suggestions
const welcomeSuggestions: WelcomeAssistantSuggestion[] = [
  {
    id: "1",
    title_ar: "ابدأ بالخريطة الذكية",
    title_en: "Start with Smart Map",
    description_ar:
      "استكشف الفرص الاستثمارية في الإمارات على خريطتنا ا��تفاعلية",
    description_en:
      "Explore UAE investment opportunities on our interactive map",
    action: "smart-map",
    icon: MapPin,
    estimated_time: "2",
  },
  {
    id: "2",
    title_ar: "إنتج تصميمك الأول",
    title_en: "Generate Your First Design",
    description_ar:
      "استخدم الذكاء الاصطناعي لإنشاء تصاميم مناظر طبيعية مذهلة خلال دقائق",
    description_en: "Use AI to create stunning landscape designs in minutes",
    action: "ai-design",
    icon: Sparkles,
    estimated_time: "5",
  },
  {
    id: "3",
    title_ar: "تحليل اتجاهات السوق",
    title_en: "Analyze Market Trends",
    description_ar: "احصل على رؤى من بيانات السوق المباشرة وتحليل المنافسين",
    description_en:
      "Get insights from real-time market data and competitor analysis",
    action: "market-analysis",
    icon: BarChart3,
    estimated_time: "3",
  },
  {
    id: "4",
    title_ar: "إعداد المراقبة المباشرة",
    title_en: "Setup Live Monitoring",
    description_ar: "تتبع تقدم المشاريع وتغيرات السوق في الوقت الفعلي",
    description_en: "Track project progress and market changes in real-time",
    action: "real-time-monitoring",
    icon: Activity,
    estimated_time: "1",
  },
];

export default function KXPathDashboardV2({
  language,
  userRole,
}: KXPathDashboardV2Props) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedMetrics, setAnimatedMetrics] = useState(
    dashboardMetrics.map(() => 0),
  );
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(sampleNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  const t = translations[language];
  const isRTL = language === "ar";

  // Get time-based greeting
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return t.goodMorning;
    if (hour < 18) return t.goodAfternoon;
    return t.goodEvening;
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate metrics on load
    dashboardMetrics.forEach((metric, index) => {
      const numericValue =
        typeof metric.value === "string"
          ? parseFloat(metric.value.replace(/[^\d.]/g, ""))
          : metric.value;
      let current = 0;
      const increment = numericValue / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }
        setAnimatedMetrics((prev) => {
          const newMetrics = [...prev];
          newMetrics[index] = current;
          return newMetrics;
        });
      }, 30);
    });

    // Count unread notifications
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      emerald: "from-emerald-400 to-emerald-600",
      blue: "from-blue-400 to-blue-600",
      purple: "from-purple-400 to-purple-600",
      gold: "from-yellow-400 to-orange-500",
      green: "from-green-400 to-green-600",
      orange: "from-orange-400 to-red-500",
      teal: "from-teal-400 to-cyan-500",
      red: "from-red-400 to-pink-500",
      coral: "from-red-400 to-rose-500",
      rose: "from-pink-400 to-rose-500",
      indigo: "from-indigo-400 to-purple-500",
      amber: "from-amber-400 to-orange-500",
      // New gradient combinations
      "gradient-sunset": "from-amber-400 via-red-500 to-rose-600",
      "gradient-ocean": "from-blue-400 via-teal-500 to-emerald-600",
      "gradient-royalty": "from-purple-400 via-indigo-500 to-blue-600",
      "gradient-nature": "from-emerald-400 via-teal-500 to-amber-400",
      "gradient-luxury": "from-amber-400 via-yellow-500 to-rose-500",
      "gradient-innovation": "from-purple-400 via-red-500 to-amber-500",
      "gradient-serenity": "from-teal-300 via-blue-400 to-indigo-500",
      "gradient-energy": "from-red-400 via-amber-500 to-yellow-600",
    };
    return colorMap[color] || "from-gray-400 to-gray-600";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-400 bg-red-400/10";
      case "medium":
        return "border-l-yellow-400 bg-yellow-400/10";
      case "low":
        return "border-l-green-400 bg-green-400/10";
      default:
        return "border-l-gray-400 bg-gray-400/10";
    }
  };

  const formatMetricValue = (
    metric: DashboardMetric,
    animatedValue: number,
  ) => {
    if (typeof metric.value === "string") {
      if (metric.value.includes("%")) {
        return `${animatedValue.toFixed(1)}%`;
      }
      return metric.value;
    }
    return Math.floor(animatedValue).toLocaleString();
  };

  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return t.now;
    if (diffInMinutes < 60) return `${diffInMinutes} ${t.minutesAgo}`;
    return `${Math.floor(diffInMinutes / 60)} ${t.hoursAgo}`;
  };

  return (
    <div
      className={`space-y-8 font-system ${isRTL ? "font-arabic" : "font-english"}`}
    >
      {/* Welcome Header with Time-based Greeting */}
      <div
        className={`${isRTL ? "text-right" : "text-left"} animate-fade-in-up`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 emerald-gradient rounded-2xl flex items-center justify-center animate-pulse-emerald">
            <Home className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-display-md text-gradient-emerald mb-2">
              {getGreeting()}, {userRole}
            </h1>
            <p className="text-xl text-emerald-300 opacity-90">{t.welcome}</p>
            <p className="text-sm text-gray-400">{t.subtitle}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="text-emerald-300 text-lg font-medium">
              {currentTime.toLocaleDateString(
                language === "ar" ? "ar-SA" : "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </div>
            <div className="text-emerald-400 text-2xl font-bold">
              {currentTime.toLocaleTimeString(
                language === "ar" ? "ar-SA" : "en-US",
                { hour: "2-digit", minute: "2-digit", second: "2-digit" },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Status Bar */}
      <div
        className="glass-card p-4 border-gradient-emerald animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-emerald" />
              <span className="text-sm font-medium">
                {t.systemStatus}: {t.allSystemsOperational}
              </span>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-4">
              <span>🌐 {t.dataStreamsActive}</span>
              <span>🤖 {t.aiModelsOnline}</span>
              <span>📊 {t.marketDataLive}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400">
              {t.optimal}
            </Badge>
            <Button size="sm" variant="ghost" className="hover-glow">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Section: Metrics + Quick Actions */}
        <div className="xl:col-span-3 space-y-8">
          {/* System Metrics Grid */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3
              className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.systemMetrics}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardMetrics.map((metric, index) => (
                <div
                  key={metric.id}
                  className="glass-card p-6 interactive-card hover-scale"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${getColorClasses(metric.color)} rounded-xl flex items-center justify-center`}
                      >
                        <metric.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(metric.trend)}
                        <span
                          className={`text-sm font-medium ${
                            metric.trend === "up"
                              ? "text-green-400"
                              : metric.trend === "down"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }`}
                        >
                          {metric.change_percentage > 0 ? "+" : ""}
                          {metric.change_percentage}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-white mb-1">
                        {formatMetricValue(metric, animatedMetrics[index])}
                      </div>
                      <div className="text-sm font-medium text-gray-300">
                        {language === "ar" ? metric.title_ar : metric.title_en}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {language === "ar"
                          ? metric.description_ar
                          : metric.description_en}
                      </div>
                    </div>

                    {/* Progress indicator for some metrics */}
                    {metric.id === "4" && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${animatedMetrics[index]}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h3
              className={`text-xl font-semibold text-white mb-6 ${isRTL ? "text-right" : "text-left"}`}
            >
              {t.quickActions}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => (
                <div
                  key={action.id}
                  className="glass-card p-4 interactive-card cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${getColorClasses(action.color)} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">
                        {language === "ar" ? action.title_ar : action.title_en}
                      </div>
                      <div className="text-xs text-gray-400">
                        {language === "ar"
                          ? action.description_ar
                          : action.description_en}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Notifications + Welcome Assistant */}
        <div className="space-y-8">
          {/* Notifications Panel */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-400" />
                  {t.notifications}
                </h3>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-400/30">
                    {unreadCount}
                  </Badge>
                )}
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto hide-scrollbar">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                      !notification.read ? "bg-white/5" : "opacity-70"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-white text-sm">
                        {language === "ar"
                          ? notification.title_ar
                          : notification.title_en}
                      </div>
                      {notification.action_required && (
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse-emerald" />
                      )}
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      {language === "ar"
                        ? notification.message_ar
                        : notification.message_en}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        {getTimeAgo(notification.timestamp)}
                      </div>
                      {notification.action_required && (
                        <Button
                          size="sm"
                          className="text-xs px-2 py-1 h-auto bg-emerald-600 hover:bg-emerald-700"
                        >
                          {t.takeAction}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                {t.viewAll}
              </Button>
            </div>
          </div>

          {/* Welcome Assistant */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                {t.welcomeAssistant}
              </h3>

              <div className="space-y-3">
                {welcomeSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <suggestion.icon className="w-4 h-4 text-emerald-400" />
                      <div className="font-medium text-white text-sm">
                        {language === "ar"
                          ? suggestion.title_ar
                          : suggestion.title_en}
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 mb-2">
                      {language === "ar"
                        ? suggestion.description_ar
                        : suggestion.description_en}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-emerald-400">
                        {t.estimatedTime}: {suggestion.estimated_time}{" "}
                        {t.minutes}
                      </div>
                      <PlayCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        className="glass-card p-4 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-300">{t.dataAccuracy}: 98.7%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-gray-300">{t.responseTime}: 240ms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="text-gray-300">AI Models: 7 {t.online}</span>
            </div>
          </div>
          <div className="text-gray-400">
            {t.lastUpdated}: {getTimeAgo(new Date().toISOString())}
          </div>
        </div>
      </div>
    </div>
  );
}
