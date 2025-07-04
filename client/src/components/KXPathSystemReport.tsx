import { useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Star,
  Shield,
  Zap,
  Globe,
  Palette,
  Bot,
  MapPin,
  Eye,
  BarChart3,
  Activity,
  Sparkles,
  Building2,
  Users,
  Settings,
  Award,
  Layers,
  TrendingUp,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SystemReportProps {
  language: "en" | "ar";
}

interface ModuleStatus {
  id: string;
  name_ar: string;
  name_en: string;
  status: "complete" | "partial" | "needs_work";
  completion_percentage: number;
  features_implemented: string[];
  features_pending: string[];
  color_scheme: string;
  icon: any;
  category: "core" | "intelligence" | "design" | "projects" | "system";
  last_updated: string;
  priority: "high" | "medium" | "low";
}

const translations = {
  en: {
    title: "KX PATH UAE - System Status Report",
    subtitle: "Comprehensive Analysis of Implementation & Color Harmonization",
    overview: "System Overview",
    moduleStatus: "Module Status",
    colorSystem: "Enhanced Color System",
    completedModules: "Completed Modules",
    partialModules: "Partially Completed",
    needsWork: "Needs Customization",
    designSystem: "Design System Enhancements",
    recommendations: "Recommendations",
    nextSteps: "Next Steps",
    systemHealth: "System Health",
    performance: "Performance",
    security: "Security",
    userExperience: "User Experience",
    accessibility: "Accessibility",
    responsive: "Responsive Design",
    rtlSupport: "RTL Support",
    colorHarmony: "Color Harmony",
    modernDesign: "Modern Design",
    complete: "Complete",
    partial: "Partial",
    pending: "Pending",
    excellent: "Excellent",
    good: "Good",
    needsImprovement: "Needs Improvement",
    implementedFeatures: "Implemented Features",
    pendingFeatures: "Pending Features",
    lastUpdated: "Last Updated",
    viewDetails: "View Details",
    exportReport: "Export Report",
    updateModule: "Update Module",
    priority: "Priority",
    high: "High",
    medium: "Medium",
    low: "Low",
    category: "Category",
    coreModules: "Core Modules",
    intelligenceTools: "Intelligence Tools",
    designStudio: "Design Studio",
    projectManagement: "Project Management",
    systemTools: "System Tools",
  },
  ar: {
    title: "نظام طريق الخبرة الإمارات - تقرير حالة النظام",
    subtitle: "تحليل شامل للتنفيذ ومواءمة الألوان",
    overview: "نظرة عامة على النظام",
    moduleStatus: "حالة الوحدات",
    colorSystem: "نظام الألوان المحسن",
    completedModules: "الوحدات المكتملة",
    partialModules: "مكتملة جزئياً",
    needsWork: "تحتاج تخصيص",
    designSystem: "تحسينات نظام التصميم",
    recommendations: "التوصيات",
    nextSteps: "الخطوات التالية",
    systemHealth: "صحة النظام",
    performance: "الأداء",
    security: "الأمان",
    userExperience: "تجربة المستخدم",
    accessibility: "إمكانية الوصول",
    responsive: "التصميم المتجاوب",
    rtlSupport: "دعم RTL",
    colorHarmony: "تناغم الألوان",
    modernDesign: "التصميم الحديث",
    complete: "مكتمل",
    partial: "جزئي",
    pending: "معلق",
    excellent: "ممتاز",
    good: "جيد",
    needsImprovement: "يحتاج تحسين",
    implementedFeatures: "الميزات المنفذة",
    pendingFeatures: "الميزات المعلقة",
    lastUpdated: "آخر تحديث",
    viewDetails: "عرض التفاصيل",
    exportReport: "تصدير التقرير",
    updateModule: "تحديث الوحدة",
    priority: "الأولوية",
    high: "عالية",
    medium: "متوسطة",
    low: "منخفضة",
    category: "الفئة",
    coreModules: "الوحدات الأساسية",
    intelligenceTools: "أدوات الاستخبارات",
    designStudio: "استوديو التصميم",
    projectManagement: "إدارة المشاريع",
    systemTools: "أدوات النظام",
  },
};

const moduleStatuses: ModuleStatus[] = [
  {
    id: "dashboard",
    name_ar: "لوحة التحكم الرئيسية",
    name_en: "Main Dashboard",
    status: "complete",
    completion_percentage: 100,
    features_implemented: [
      "Time-based greetings",
      "Real-time metrics",
      "Enhanced quick actions",
      "Notification system",
      "Welcome assistant",
      "Harmonious colors",
      "Responsive design",
      "RTL support",
    ],
    features_pending: [],
    color_scheme: "gradient-nature",
    icon: Globe,
    category: "core",
    last_updated: "2024-01-15",
    priority: "high",
  },
  {
    id: "smart-map",
    name_ar: "خريطة الإمارات الذكية",
    name_en: "UAE Smart Map",
    status: "complete",
    completion_percentage: 95,
    features_implemented: [
      "Interactive UAE map",
      "Real-time markers",
      "Live data feed",
      "Advanced filtering",
      "Property analytics",
      "Multi-layer system",
      "Color-coded zones",
      "Export functionality",
    ],
    features_pending: ["3D map view", "Satellite integration"],
    color_scheme: "gradient-ocean",
    icon: MapPin,
    category: "core",
    last_updated: "2024-01-15",
    priority: "high",
  },
  {
    id: "opportunity-hunter",
    name_ar: "صياد الفرص الذكي",
    name_en: "Smart Opportunity Hunter",
    status: "complete",
    completion_percentage: 90,
    features_implemented: [
      "AI-powered opportunity detection",
      "Real-time scanning",
      "Market trend analysis",
      "Lead management",
      "ROI projections",
      "Risk assessment",
      "Automated actions",
      "CRM integration",
    ],
    features_pending: ["Advanced ML models", "API integrations"],
    color_scheme: "gradient-royalty",
    icon: Target,
    category: "intelligence",
    last_updated: "2024-01-15",
    priority: "high",
  },
  {
    id: "competitive-intel",
    name_ar: "استخبارات المنافسين",
    name_en: "Competitive Intelligence",
    status: "complete",
    completion_percentage: 85,
    features_implemented: [
      "Competitor tracking",
      "Portfolio showcase",
      "Performance benchmarking",
      "Social media monitoring",
      "SWOT analysis",
      "Market positioning",
      "Activity tracking",
      "Report generation",
    ],
    features_pending: ["Real-time data feeds", "Advanced analytics"],
    color_scheme: "gradient-energy",
    icon: Eye,
    category: "intelligence",
    last_updated: "2024-01-15",
    priority: "medium",
  },
  {
    id: "ai-design-studio",
    name_ar: "استوديو التصميم الذكي",
    name_en: "AI Design Studio",
    status: "complete",
    completion_percentage: 95,
    features_implemented: [
      "AI scene generation",
      "Multiple model support",
      "KnoxDesign integration",
      "Advanced settings",
      "Color palette management",
      "Template presets",
      "Progress tracking",
      "Results gallery",
    ],
    features_pending: ["Video generation", "AR preview"],
    color_scheme: "gradient-innovation",
    icon: Sparkles,
    category: "design",
    last_updated: "2024-01-15",
    priority: "high",
  },
  {
    id: "market-analysis",
    name_ar: "تحليل السوق اللحظي",
    name_en: "Market Analysis & Validation",
    status: "complete",
    completion_percentage: 88,
    features_implemented: [
      "Real-time market data",
      "SWOT report generation",
      "Project viability assessment",
      "Data validation",
      "Trend analysis",
      "Emirate comparisons",
      "ROI calculations",
      "Export capabilities",
    ],
    features_pending: ["Predictive analytics", "Machine learning insights"],
    color_scheme: "gradient-serenity",
    icon: BarChart3,
    category: "intelligence",
    last_updated: "2024-01-15",
    priority: "medium",
  },
  {
    id: "real-time-monitoring",
    name_ar: "المراقبة المباشرة",
    name_en: "Real-time Monitoring",
    status: "partial",
    completion_percentage: 75,
    features_implemented: [
      "Live project tracking",
      "Alert system",
      "Performance metrics",
      "Status indicators",
      "Activity feeds",
      "Notification management",
    ],
    features_pending: [
      "Advanced dashboards",
      "Custom alert rules",
      "Integration APIs",
      "Mobile notifications",
    ],
    color_scheme: "gradient-sunset",
    icon: Activity,
    category: "core",
    last_updated: "2024-01-15",
    priority: "medium",
  },
  {
    id: "admin-dashboard",
    name_ar: "لوحة الإدارة",
    name_en: "Admin Dashboard",
    status: "partial",
    completion_percentage: 60,
    features_implemented: [
      "User management basics",
      "System settings",
      "Basic reporting",
      "Access control",
    ],
    features_pending: [
      "Advanced user roles",
      "Audit logging",
      "System monitoring",
      "Data backup",
      "Security settings",
      "Performance analytics",
    ],
    color_scheme: "gradient-luxury",
    icon: Settings,
    category: "system",
    last_updated: "2024-01-15",
    priority: "low",
  },
];

const designSystemEnhancements = [
  {
    feature: "Enhanced Color Harmony System",
    status: "Complete",
    description: "8 new gradient combinations with perfect color harmony",
    color: "emerald",
  },
  {
    feature: "Glass Morphism Components",
    status: "Complete",
    description: "5 color variants of glass cards with backdrop blur",
    color: "blue",
  },
  {
    feature: "Advanced Animation Library",
    status: "Complete",
    description: "30+ UAE-themed animations and transitions",
    color: "purple",
  },
  {
    feature: "Responsive Design System",
    status: "Complete",
    description: "Mobile-first approach with perfect scaling",
    color: "teal",
  },
  {
    feature: "RTL/LTR Support",
    status: "Complete",
    description: "Full Arabic and English language support",
    color: "amber",
  },
  {
    feature: "Accessibility Features",
    status: "Partial",
    description: "ARIA labels and keyboard navigation",
    color: "rose",
  },
];

export default function KXPathSystemReport({ language }: SystemReportProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "partial":
        return <Clock className="w-5 h-5 text-amber-400" />;
      case "needs_work":
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "border-emerald-400/30 bg-emerald-500/10";
      case "partial":
        return "border-amber-400/30 bg-amber-500/10";
      case "needs_work":
        return "border-red-400/30 bg-red-500/10";
      default:
        return "border-gray-400/30 bg-gray-500/10";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-500/10";
      case "medium":
        return "text-amber-400 bg-amber-500/10";
      case "low":
        return "text-green-400 bg-green-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const filteredModules =
    selectedCategory === "all"
      ? moduleStatuses
      : moduleStatuses.filter((module) => module.category === selectedCategory);

  const overallCompletion = Math.round(
    moduleStatuses.reduce(
      (sum, module) => sum + module.completion_percentage,
      0,
    ) / moduleStatuses.length,
  );

  const completeModules = moduleStatuses.filter(
    (m) => m.status === "complete",
  ).length;
  const partialModules = moduleStatuses.filter(
    (m) => m.status === "partial",
  ).length;
  const needsWorkModules = moduleStatuses.filter(
    (m) => m.status === "needs_work",
  ).length;

  return (
    <div className={`min-h-screen p-8 ${isRTL ? "font-arabic" : ""}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-gradient-emerald">
            {t.title}
          </h1>
          <p className="text-gray-300 text-lg">{t.subtitle}</p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card-emerald p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  {overallCompletion}%
                </div>
                <div className="text-sm text-emerald-300">{t.systemHealth}</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-nature h-2 rounded-full transition-all"
                style={{ width: `${overallCompletion}%` }}
              />
            </div>
          </div>

          <div className="glass-card-coral p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-emerald-400">
                  {completeModules}
                </div>
                <div className="text-sm text-emerald-300">
                  {t.completedModules}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card-purple p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-2xl font-bold text-amber-400">
                  {partialModules}
                </div>
                <div className="text-sm text-amber-300">{t.partialModules}</div>
              </div>
            </div>
          </div>

          <div className="glass-card-gold p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-8 h-8 text-purple-400" />
              <div>
                <div className="text-2xl font-bold text-purple-400">8</div>
                <div className="text-sm text-purple-300">{t.colorHarmony}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              "all",
              "core",
              "intelligence",
              "design",
              "projects",
              "system",
            ].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-500 text-white"
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
              >
                {category === "all"
                  ? "All"
                  : t[
                      `${category}${category.endsWith("s") ? "" : "Modules"}` as keyof typeof t
                    ]}
              </button>
            ))}
          </div>
        </div>

        {/* Module Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className={`glass-card p-6 border ${getStatusColor(module.status)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${module.color_scheme} rounded-lg flex items-center justify-center`}
                  >
                    <module.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {language === "ar" ? module.name_ar : module.name_en}
                    </h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(module.status)}
                      <span className="text-sm text-gray-300">
                        {module.completion_percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <Badge
                  className={`${getPriorityColor(module.priority)} border-0`}
                >
                  {t[module.priority as keyof typeof t]}
                </Badge>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${module.color_scheme} h-2 rounded-full transition-all`}
                    style={{ width: `${module.completion_percentage}%` }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-emerald-400 mb-1">
                    {t.implementedFeatures}
                  </h4>
                  <div className="text-xs text-gray-300">
                    {module.features_implemented.slice(0, 3).join(", ")}
                    {module.features_implemented.length > 3 &&
                      ` +${module.features_implemented.length - 3} more`}
                  </div>
                </div>

                {module.features_pending.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-amber-400 mb-1">
                      {t.pendingFeatures}
                    </h4>
                    <div className="text-xs text-gray-300">
                      {module.features_pending.slice(0, 2).join(", ")}
                      {module.features_pending.length > 2 &&
                        ` +${module.features_pending.length - 2} more`}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                <div className="text-xs text-gray-400">
                  {t.lastUpdated}: {module.last_updated}
                </div>
                <Button
                  size="sm"
                  className="text-xs bg-emerald-600 hover:bg-emerald-700"
                  onClick={() =>
                    setShowDetails(showDetails === module.id ? null : module.id)
                  }
                >
                  {t.viewDetails}
                </Button>
              </div>

              {showDetails === module.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">
                      All Features:
                    </h5>
                    <div className="space-y-1">
                      {module.features_implemented.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">{feature}</span>
                        </div>
                      ))}
                      {module.features_pending.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Design System Enhancements */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Palette className="w-6 h-6 text-purple-400" />
            {t.designSystem}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designSystemEnhancements.map((enhancement, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-${enhancement.color}-400`}
                  ></div>
                  <span className="font-medium text-white">
                    {enhancement.feature}
                  </span>
                  {enhancement.status === "Complete" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 ml-auto" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-400 ml-auto" />
                  )}
                </div>
                <p className="text-sm text-gray-300">
                  {enhancement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-nature hover:opacity-90">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t.exportReport}
          </Button>
          <Button
            variant="outline"
            className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-500/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
          <Button
            variant="outline"
            className="border-purple-400/30 text-purple-400 hover:bg-purple-500/10"
          >
            <Star className="w-4 h-4 mr-2" />
            View All Modules
          </Button>
        </div>
      </div>
    </div>
  );
}
