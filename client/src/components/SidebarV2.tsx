import { useState } from "react";
import {
  Home,
  MapPin,
  Target,
  Eye,
  Bot,
  BarChart3,
  Activity,
  Sparkles,
  Building2,
  FolderOpen,
  Video,
  CreditCard,
  Crown,
  BookOpen,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Zap,
  Globe,
  Layers,
  TrendingUp,
  Radar,
  FileText,
  Calendar,
  Bell,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SidebarV2Props {
  language: "en" | "ar";
  activeModule: string;
  onModuleChange: (module: string) => void;
  appType?: "crypto" | "landscape" | "kxpath";
  userRole?: "admin" | "client" | "premium" | "field" | "researcher";
}

interface ModuleGroup {
  id: string;
  title_ar: string;
  title_en: string;
  modules: SidebarModule[];
}

interface SidebarModule {
  id: string;
  name_ar: string;
  name_en: string;
  icon: any;
  color: string;
  roles: string[];
  highlight?: boolean;
  description_ar?: string;
  description_en?: string;
  badge?: string;
  isNew?: boolean;
  isUpgraded?: boolean;
}

const translations = {
  en: {
    kxPathOS: "KX PATH OS",
    version: "v2.0",
    coreModules: "Core Modules",
    intelligenceTools: "Intelligence Tools",
    designStudio: "Design Studio",
    projectManagement: "Project Management",
    systemTools: "System Tools",
    settings: "Settings",
    help: "Help & Support",
    logout: "Logout",
    collapse: "Collapse",
    expand: "Expand",
    comingSoon: "Coming Soon",
    new: "New",
    upgraded: "Upgraded",
    premium: "Premium",
    beta: "Beta",
    mainDashboard: "Main Dashboard",
    smartMapUAE: "UAE Smart Map",
    opportunityHunter: "Opportunity Hunter",
    competitiveIntel: "Competitive Intelligence",
    aiDesignStudio: "AI Design Studio",
    marketAnalysis: "Market Analysis",
    realTimeMonitoring: "Real-time Monitoring",
    freeAiModels: "Free AI Models",
    servicesHub: "Services Hub",
    projectManagement: "Project Management",
    liveFeed: "Live Site Feed",
    financeContracts: "Finance & Contracts",
    premiumZone: "Premium Zone",
    researchHub: "Research Hub",
    fieldTeams: "Field Teams",
    systemSettings: "System Settings",
    userManagement: "User Management",
    dataBackup: "Data Backup",
    notifications: "Notifications",
    documentation: "Documentation",
    tutorials: "Tutorials",
    supportTickets: "Support Tickets",
    systemStatus: "System Status",
  },
  ar: {
    kxPathOS: "نظام طريق الخبرة",
    version: "v2.0",
    coreModules: "الوحدات الأساسية",
    intelligenceTools: "أدوات الاستخبارات",
    designStudio: "استوديو التصميم",
    projectManagement: "إدارة المشاريع",
    systemTools: "أدوات النظام",
    settings: "الإعدادات",
    help: "المساعدة والدعم",
    logout: "تسجيل الخروج",
    collapse: "طي",
    expand: "توسيع",
    comingSoon: "قريباً",
    new: "جديد",
    upgraded: "محدث",
    premium: "مميز",
    beta: "تجريبي",
    mainDashboard: "لوحة التحكم الرئيسية",
    smartMapUAE: "خريطة الإمارات الذكية",
    opportunityHunter: "صياد الفرص",
    competitiveIntel: "استخبارات المنافسين",
    aiDesignStudio: "استوديو التصميم الذكي",
    marketAnalysis: "تحليل السوق",
    realTimeMonitoring: "المراقبة المباشرة",
    freeAiModels: "نماذج الذكاء الاصطناعي المجانية",
    servicesHub: "مركز الخدمات",
    projectManagement: "إدارة المشاريع",
    liveFeed: "البث المباشر",
    financeContracts: "المالية والعقود",
    premiumZone: "��لمنطقة المميزة",
    researchHub: "مركز الأبحاث",
    fieldTeams: "الفرق الميدانية",
    systemSettings: "إعدادات النظام",
    userManagement: "إدارة المستخدمين",
    dataBackup: "نسخ احتياطي للبيانات",
    notifications: "الإشعارات",
    documentation: "التوثيق",
    tutorials: "دروس تعليمية",
    supportTickets: "تذاكر الدعم",
    systemStatus: "حالة النظام",
  },
};

// Enhanced KX PATH UAE modules organized by groups
const moduleGroups: ModuleGroup[] = [
  {
    id: "core",
    title_ar: "الوحدات الأساسية",
    title_en: "Core Modules",
    modules: [
      {
        id: "dashboard",
        name_ar: "لوحة التحكم الرئيسية",
        name_en: "Main Dashboard",
        icon: Home,
        color: "emerald",
        roles: ["admin", "client", "premium", "field", "researcher"],
        description_ar: "نظرة عامة شاملة على النظام",
        description_en: "Comprehensive system overview",
      },
      {
        id: "smart-map",
        name_ar: "خريطة الإمارات الذكية",
        name_en: "UAE Smart Map",
        icon: MapPin,
        color: "teal",
        roles: ["admin", "field", "premium"],
        highlight: true,
        description_ar: "خريطة تفاعلية مع بيانات مباشرة",
        description_en: "Interactive map with real-time data",
        isUpgraded: true,
      },
      {
        id: "opportunity-hunter",
        name_ar: "صياد الفرص الذكي",
        name_en: "Smart Opportunity Hunter",
        icon: Target,
        color: "coral",
        roles: ["admin", "premium"],
        highlight: true,
        description_ar: "كشف الاستثمارات بالذكاء الاصطناعي",
        description_en: "AI-powered investment detection",
        isNew: true,
      },
    ],
  },
  {
    id: "intelligence",
    title_ar: "أدوات الاستخبارات",
    title_en: "Intelligence Tools",
    modules: [
      {
        id: "competitive-intel",
        name_ar: "استخبارات المنافسين",
        name_en: "Competitive Intelligence",
        icon: Eye,
        color: "purple",
        roles: ["admin", "premium"],
        highlight: true,
        description_ar: "تحليل السوق ومعرض المشاريع",
        description_en: "Market analysis & portfolio showcase",
        isNew: true,
      },
      {
        id: "market-analysis",
        name_ar: "تحليل السوق اللحظي",
        name_en: "Real-time Market Analysis",
        icon: BarChart3,
        color: "indigo",
        roles: ["admin", "researcher", "premium"],
        highlight: true,
        description_ar: "تقييم السوق والتحقق من البيانات",
        description_en: "Market validation & data verification",
        isUpgraded: true,
      },
      {
        id: "real-time-monitoring",
        name_ar: "المراقبة والتنبيهات",
        name_en: "Live Monitoring & Alerts",
        icon: Activity,
        color: "rose",
        roles: ["admin", "field"],
        highlight: true,
        description_ar: "مراقبة مباشرة وتنبيهات فورية",
        description_en: "Real-time monitoring & instant alerts",
        isNew: true,
      },
    ],
  },
  {
    id: "design",
    title_ar: "استوديو التصميم",
    title_en: "Design Studio",
    modules: [
      {
        id: "ai-design",
        name_ar: "استوديو التصميم الذكي",
        name_en: "AI Design Studio",
        icon: Sparkles,
        color: "amber",
        roles: ["admin", "premium"],
        highlight: true,
        description_ar: "تصميم وإنتاج ذكي بالذكاء الاصطناعي",
        description_en: "Smart AI design & production",
        isUpgraded: true,
      },
      {
        id: "ai-hub",
        name_ar: "مكتبة النماذج المجانية",
        name_en: "Free AI Models Library",
        icon: Bot,
        color: "emerald",
        roles: ["admin", "premium"],
        highlight: true,
        description_ar: "نماذج مجانية وإجراءات سريعة",
        description_en: "Free models & quick actions",
        isNew: true,
      },
    ],
  },
  {
    id: "projects",
    title_ar: "إدارة المشاريع",
    title_en: "Project Management",
    modules: [
      {
        id: "services",
        name_ar: "مركز الخدمات",
        name_en: "Services Hub",
        icon: Building2,
        color: "cyan",
        roles: ["admin", "client", "premium"],
        description_ar: "كتالوج الخدمات والحلول",
        description_en: "Services catalog & solutions",
      },
      {
        id: "projects",
        name_ar: "إدارة المشاريع",
        name_en: "Project Management",
        icon: FolderOpen,
        color: "orange",
        roles: ["admin", "client", "premium", "field"],
        description_ar: "تتبع وإدارة المشاريع",
        description_en: "Project tracking & management",
      },
      {
        id: "live-feed",
        name_ar: "البث المباشر للمواقع",
        name_en: "Live Site Feed",
        icon: Video,
        color: "red",
        roles: ["admin", "client", "premium", "field"],
        description_ar: "مراقبة المواقع في الوقت الفعلي",
        description_en: "Real-time site monitoring",
      },
    ],
  },
  {
    id: "system",
    title_ar: "أدوات النظام",
    title_en: "System Tools",
    modules: [
      {
        id: "finance",
        name_ar: "المالية والعقود",
        name_en: "Finance & Contracts",
        icon: CreditCard,
        color: "emerald",
        roles: ["admin"],
        description_ar: "إدارة مالية ونظام العقود",
        description_en: "Financial management & contracts",
      },
      {
        id: "premium",
        name_ar: "المنطقة المميزة",
        name_en: "Premium Zone",
        icon: Crown,
        color: "gold",
        roles: ["admin", "premium"],
        badge: "Premium",
        description_ar: "خدمات وأدوات متقدمة",
        description_en: "Advanced services & tools",
      },
      {
        id: "research",
        name_ar: "مركز الأبحاث",
        name_en: "Research Hub",
        icon: BookOpen,
        color: "purple",
        roles: ["admin", "researcher"],
        description_ar: "أدوات البحث والتحليل",
        description_en: "Research & analysis tools",
      },
      {
        id: "field",
        name_ar: "الفرق الميدانية",
        name_en: "Field Teams",
        icon: Users,
        color: "blue",
        roles: ["admin", "field"],
        description_ar: "إدارة الفرق الميدانية",
        description_en: "Field team management",
      },
    ],
  },
  {
    id: "system",
    title_ar: "أدوات النظام",
    title_en: "System Tools",
    modules: [
      {
        id: "system-report",
        name_ar: "تقرير حالة النظام",
        name_en: "System Status Report",
        icon: BarChart3,
        color: "indigo",
        roles: ["admin"],
        highlight: true,
        description_ar: "تقرير شامل عن حالة النظام والوحدات",
        description_en: "Comprehensive system and module status report",
        isNew: true,
      },
      {
        id: "settings",
        name_ar: "الإعدادات",
        name_en: "Settings",
        icon: Settings,
        color: "gray",
        roles: ["admin"],
        description_ar: "إعدادات النظام والمستخدمين",
        description_en: "System and user settings",
      },
    ],
  },
];

export default function SidebarV2({
  language,
  activeModule,
  onModuleChange,
  appType = "kxpath",
  userRole = "admin",
}: SidebarV2Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; border: string; glow: string }
    > = {
      emerald: {
        bg: isActive ? "bg-emerald-500/20" : "hover:bg-emerald-500/10",
        text: isActive ? "text-emerald-400" : "text-emerald-300",
        border: "border-emerald-400/30",
        glow: "shadow-emerald-400/20",
      },
      blue: {
        bg: isActive ? "bg-blue-500/20" : "hover:bg-blue-500/10",
        text: isActive ? "text-blue-400" : "text-blue-300",
        border: "border-blue-400/30",
        glow: "shadow-blue-400/20",
      },
      purple: {
        bg: isActive ? "bg-purple-500/20" : "hover:bg-purple-500/10",
        text: isActive ? "text-purple-400" : "text-purple-300",
        border: "border-purple-400/30",
        glow: "shadow-purple-400/20",
      },
      indigo: {
        bg: isActive ? "bg-indigo-500/20" : "hover:bg-indigo-500/10",
        text: isActive ? "text-indigo-400" : "text-indigo-300",
        border: "border-indigo-400/30",
        glow: "shadow-indigo-400/20",
      },
      teal: {
        bg: isActive ? "bg-teal-500/20" : "hover:bg-teal-500/10",
        text: isActive ? "text-teal-400" : "text-teal-300",
        border: "border-teal-400/30",
        glow: "shadow-teal-400/20",
      },
      red: {
        bg: isActive ? "bg-red-500/20" : "hover:bg-red-500/10",
        text: isActive ? "text-red-400" : "text-red-300",
        border: "border-red-400/30",
        glow: "shadow-red-400/20",
      },
      pink: {
        bg: isActive ? "bg-pink-500/20" : "hover:bg-pink-500/10",
        text: isActive ? "text-pink-400" : "text-pink-300",
        border: "border-pink-400/30",
        glow: "shadow-pink-400/20",
      },
      green: {
        bg: isActive ? "bg-green-500/20" : "hover:bg-green-500/10",
        text: isActive ? "text-green-400" : "text-green-300",
        border: "border-green-400/30",
        glow: "shadow-green-400/20",
      },
      cyan: {
        bg: isActive ? "bg-cyan-500/20" : "hover:bg-cyan-500/10",
        text: isActive ? "text-cyan-400" : "text-cyan-300",
        border: "border-cyan-400/30",
        glow: "shadow-cyan-400/20",
      },
      orange: {
        bg: isActive ? "bg-orange-500/20" : "hover:bg-orange-500/10",
        text: isActive ? "text-orange-400" : "text-orange-300",
        border: "border-orange-400/30",
        glow: "shadow-orange-400/20",
      },
      gold: {
        bg: isActive ? "bg-yellow-500/20" : "hover:bg-yellow-500/10",
        text: isActive ? "text-yellow-400" : "text-yellow-300",
        border: "border-yellow-400/30",
        glow: "shadow-yellow-400/20",
      },
      coral: {
        bg: isActive ? "bg-red-500/20" : "hover:bg-red-500/10",
        text: isActive ? "text-red-400" : "text-red-300",
        border: "border-red-400/30",
        glow: "shadow-red-400/20",
      },
      rose: {
        bg: isActive ? "bg-rose-500/20" : "hover:bg-rose-500/10",
        text: isActive ? "text-rose-400" : "text-rose-300",
        border: "border-rose-400/30",
        glow: "shadow-rose-400/20",
      },
      amber: {
        bg: isActive ? "bg-amber-500/20" : "hover:bg-amber-500/10",
        text: isActive ? "text-amber-400" : "text-amber-300",
        border: "border-amber-400/30",
        glow: "shadow-amber-400/20",
      },
    };
    return colorMap[color] || colorMap.emerald;
  };

  const filteredGroups = moduleGroups
    .map((group) => ({
      ...group,
      modules: group.modules.filter((module) =>
        module.roles.includes(userRole),
      ),
    }))
    .filter((group) => group.modules.length > 0);

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-slate-900/95 backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-50 ${
        isCollapsed ? "w-20" : "w-80"
      } ${isRTL ? "right-0 left-auto border-l border-r-0" : ""}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className={`${isRTL ? "text-right" : "text-left"}`}>
              <h1 className="text-xl font-bold text-gradient-emerald">
                {t.kxPathOS}
              </h1>
              <p className="text-sm text-emerald-400">{t.version}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:bg-white/10"
          >
            {isCollapsed ? (
              isRTL ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )
            ) : isRTL ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
        <div className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="space-y-2">
              {!isCollapsed && (
                <h3
                  className={`text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {language === "ar" ? group.title_ar : group.title_en}
                </h3>
              )}

              <div className="space-y-1">
                {group.modules.map((module) => {
                  const isActive = activeModule === module.id;
                  const colors = getColorClasses(module.color, isActive);

                  return (
                    <div
                      key={module.id}
                      className={`relative group cursor-pointer transition-all duration-200 ${
                        isActive
                          ? `${colors.bg} ${colors.border} border-l-4 ${isRTL ? "border-r-4 border-l-0" : ""}`
                          : colors.bg
                      } rounded-lg ${isActive ? `shadow-lg ${colors.glow}` : ""}`}
                      onClick={() => onModuleChange(module.id)}
                      onMouseEnter={() => setHoveredModule(module.id)}
                      onMouseLeave={() => setHoveredModule(null)}
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div
                          className={`w-10 h-10 ${isActive ? colors.bg : "bg-white/5"} rounded-lg flex items-center justify-center transition-all group-hover:scale-110`}
                        >
                          <module.icon className={`w-5 h-5 ${colors.text}`} />
                        </div>

                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div
                                className={`font-medium text-white text-sm ${isRTL ? "text-right" : "text-left"}`}
                              >
                                {language === "ar"
                                  ? module.name_ar
                                  : module.name_en}
                              </div>
                              <div className="flex items-center gap-1">
                                {module.isNew && (
                                  <Badge className="bg-green-500/20 text-green-400 text-xs px-1 py-0.5">
                                    {t.new}
                                  </Badge>
                                )}
                                {module.isUpgraded && (
                                  <Badge className="bg-blue-500/20 text-blue-400 text-xs px-1 py-0.5">
                                    {t.upgraded}
                                  </Badge>
                                )}
                                {module.badge && (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 text-xs px-1 py-0.5">
                                    {module.badge}
                                  </Badge>
                                )}
                                {module.highlight && (
                                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-emerald" />
                                )}
                              </div>
                            </div>
                            {module.description_ar && module.description_en && (
                              <div className="text-xs text-gray-400 mt-1">
                                {language === "ar"
                                  ? module.description_ar
                                  : module.description_en}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && hoveredModule === module.id && (
                        <div
                          className={`absolute ${isRTL ? "right-full mr-2" : "left-full ml-2"} top-0 z-50 glass-card p-3 rounded-lg shadow-xl border border-white/20 min-w-64`}
                        >
                          <div className="font-medium text-white text-sm mb-1">
                            {language === "ar"
                              ? module.name_ar
                              : module.name_en}
                          </div>
                          {module.description_ar && module.description_en && (
                            <div className="text-xs text-gray-300">
                              {language === "ar"
                                ? module.description_ar
                                : module.description_en}
                            </div>
                          )}
                          {(module.isNew ||
                            module.isUpgraded ||
                            module.badge) && (
                            <div className="flex gap-1 mt-2">
                              {module.isNew && (
                                <Badge className="bg-green-500/20 text-green-400 text-xs">
                                  {t.new}
                                </Badge>
                              )}
                              {module.isUpgraded && (
                                <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                                  {t.upgraded}
                                </Badge>
                              )}
                              {module.badge && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                                  {module.badge}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!isCollapsed ? (
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-white/10 text-gray-300"
              onClick={() => {
                /* Handle settings */
              }}
            >
              <Settings className="w-4 h-4 mr-3" />
              {t.settings}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-white/10 text-gray-300"
              onClick={() => {
                /* Handle help */
              }}
            >
              <HelpCircle className="w-4 h-4 mr-3" />
              {t.help}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-red-500/10 text-red-400"
              onClick={() => {
                /* Handle logout */
              }}
            >
              <LogOut className="w-4 h-4 mr-3" />
              {t.logout}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full hover:bg-white/10"
              onClick={() => {
                /* Handle settings */
              }}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full hover:bg-white/10"
              onClick={() => {
                /* Handle help */
              }}
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full hover:bg-red-500/10 text-red-400"
              onClick={() => {
                /* Handle logout */
              }}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* System Status Indicator */}
      <div className="absolute bottom-4 right-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-emerald" />
      </div>
    </div>
  );
}
