import { useState, useEffect } from "react";
import {
  Users,
  Settings,
  Shield,
  Database,
  Activity,
  Bell,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Zap,
  Target,
  Award,
  Crown,
  Star,
  Layers,
  RefreshCw,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdvancedAdminDashboardProps {
  language: "en" | "ar";
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "client" | "premium" | "field" | "researcher";
  status: "active" | "inactive" | "suspended";
  last_login: string;
  created_date: string;
  location?: {
    emirate: string;
    city: string;
  };
  permissions: string[];
  subscription: {
    type: "free" | "premium" | "enterprise";
    expires: string;
    features: string[];
  };
  activity: {
    login_count: number;
    modules_used: string[];
    last_action: string;
  };
}

interface SystemMetric {
  id: string;
  name_ar: string;
  name_en: string;
  value: number;
  unit: string;
  change_percentage: number;
  trend: "up" | "down" | "stable";
  status: "healthy" | "warning" | "critical";
  icon: any;
  color: string;
  description_ar: string;
  description_en: string;
}

interface AuditLog {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  module: string;
  timestamp: string;
  ip_address: string;
  details: string;
  severity: "low" | "medium" | "high";
}

interface SystemSettings {
  general: {
    system_name: string;
    default_language: "en" | "ar";
    timezone: string;
    maintenance_mode: boolean;
    max_users: number;
  };
  security: {
    password_policy: {
      min_length: number;
      require_uppercase: boolean;
      require_numbers: boolean;
      require_symbols: boolean;
    };
    session_timeout: number;
    two_factor_enabled: boolean;
    ip_whitelist: string[];
  };
  notifications: {
    email_enabled: boolean;
    sms_enabled: boolean;
    push_enabled: boolean;
    admin_alerts: boolean;
  };
  integrations: {
    ai_models_enabled: boolean;
    map_services: string[];
    payment_gateways: string[];
    backup_services: string[];
  };
}

const translations = {
  en: {
    title: "Advanced Admin Dashboard",
    subtitle: "Complete System Management & Control Center",
    overview: "System Overview",
    userManagement: "User Management",
    systemSettings: "System Settings",
    auditLogs: "Audit Logs",
    dataBackup: "Data Backup",
    systemHealth: "System Health",
    securityCenter: "Security Center",
    analytics: "Advanced Analytics",
    notifications: "Notification Center",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    systemUptime: "System Uptime",
    dataStorage: "Data Storage",
    apiCalls: "API Calls",
    errorRate: "Error Rate",
    responseTime: "Response Time",
    securityAlerts: "Security Alerts",
    users: "Users",
    addUser: "Add User",
    editUser: "Edit User",
    deleteUser: "Delete User",
    suspendUser: "Suspend User",
    activateUser: "Activate User",
    name: "Name",
    email: "Email",
    phone: "Phone",
    role: "Role",
    status: "Status",
    lastLogin: "Last Login",
    created: "Created",
    actions: "Actions",
    permissions: "Permissions",
    subscription: "Subscription",
    location: "Location",
    active: "Active",
    inactive: "Inactive",
    suspended: "Suspended",
    admin: "Administrator",
    client: "Client",
    premium: "Premium",
    field: "Field Team",
    researcher: "Researcher",
    settings: "Settings",
    general: "General",
    security: "Security",
    integrations: "Integrations",
    maintenance: "Maintenance",
    systemName: "System Name",
    defaultLanguage: "Default Language",
    timezone: "Timezone",
    maintenanceMode: "Maintenance Mode",
    maxUsers: "Maximum Users",
    passwordPolicy: "Password Policy",
    sessionTimeout: "Session Timeout",
    twoFactor: "Two Factor Authentication",
    ipWhitelist: "IP Whitelist",
    emailNotifications: "Email Notifications",
    smsNotifications: "SMS Notifications",
    pushNotifications: "Push Notifications",
    adminAlerts: "Admin Alerts",
    aiModels: "AI Models",
    mapServices: "Map Services",
    paymentGateways: "Payment Gateways",
    backupServices: "Backup Services",
    auditLog: "Audit Log",
    action: "Action",
    module: "Module",
    timestamp: "Timestamp",
    ipAddress: "IP Address",
    details: "Details",
    severity: "Severity",
    low: "Low",
    medium: "Medium",
    high: "High",
    backup: "Backup",
    restore: "Restore",
    export: "Export",
    import: "Import",
    download: "Download",
    upload: "Upload",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    filter: "Filter",
    refresh: "Refresh",
    enabled: "Enabled",
    disabled: "Disabled",
    healthy: "Healthy",
    warning: "Warning",
    critical: "Critical",
    viewDetails: "View Details",
    systemPerformance: "System Performance",
    userActivity: "User Activity",
    securityStatus: "Security Status",
    backupStatus: "Backup Status",
    lastBackup: "Last Backup",
    nextScheduled: "Next Scheduled",
    backupSize: "Backup Size",
    retention: "Retention",
    createBackup: "Create Backup",
    scheduleBackup: "Schedule Backup",
    restoreFromBackup: "Restore from Backup",
    downloadBackup: "Download Backup",
  },
  ar: {
    title: "لوحة الإدارة المتقدمة",
    subtitle: "مركز الإدارة والتحكم الكامل في النظام",
    overview: "نظرة عامة على النظام",
    userManagement: "إدارة المستخدمين",
    systemSettings: "إعدادات النظام",
    auditLogs: "سجلات المراجعة",
    dataBackup: "النسخ الاحتياطي للبيانات",
    systemHealth: "صحة النظام",
    securityCenter: "مركز الأمان",
    analytics: "التحليلات المتقدمة",
    notifications: "مركز الإشعارات",
    totalUsers: "إجمالي المستخدمين",
    activeUsers: "المستخدمون النشطون",
    systemUptime: "وقت تشغيل النظام",
    dataStorage: "تخزين البيانات",
    apiCalls: "استدعاءات API",
    errorRate: "معدل الأخطاء",
    responseTime: "وقت الاستجابة",
    securityAlerts: "تنبيهات الأمان",
    users: "المستخدمون",
    addUser: "إضافة مستخدم",
    editUser: "تعديل مستخدم",
    deleteUser: "حذف مستخدم",
    suspendUser: "تعليق مستخدم",
    activateUser: "تفعيل مستخدم",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    role: "الدور",
    status: "الحالة",
    lastLogin: "آخر تسجيل دخول",
    created: "تاريخ الإنشاء",
    actions: "الإجراءات",
    permissions: "الصلاحيات",
    subscription: "الاشتراك",
    location: "الموقع",
    active: "نشط",
    inactive: "غير نشط",
    suspended: "معلق",
    admin: "مدير",
    client: "عميل",
    premium: "مميز",
    field: "فريق ميداني",
    researcher: "باحث",
    settings: "الإعدادات",
    general: "عام",
    security: "الأمان",
    integrations: "التكاملات",
    maintenance: "الصيانة",
    systemName: "اسم النظام",
    defaultLanguage: "اللغة الافتراضية",
    timezone: "المنطقة الزمنية",
    maintenanceMode: "وضع الصيانة",
    maxUsers: "الحد الأقصى للمستخدمين",
    passwordPolicy: "سياسة كلمة المرور",
    sessionTimeout: "انتهاء مهلة الجلسة",
    twoFactor: "المصادقة الثنائية",
    ipWhitelist: "القائمة البيضاء للـ IP",
    emailNotifications: "إشعارات البريد الإلكتروني",
    smsNotifications: "الرسائل النصية",
    pushNotifications: "الإشعارات الفورية",
    adminAlerts: "تنبيهات الإدارة",
    aiModels: "نماذج الذكاء الاصطناعي",
    mapServices: "خدمات الخرائط",
    paymentGateways: "بوابات الدفع",
    backupServices: "خدمات النسخ الاحتياطي",
    auditLog: "سجل المراجعة",
    action: "الإجراء",
    module: "الوحدة",
    timestamp: "الوقت والتاريخ",
    ipAddress: "عنوان IP",
    details: "التفاصيل",
    severity: "الخطورة",
    low: "منخفض",
    medium: "متوسط",
    high: "عالي",
    backup: "نسخة احتياطية",
    restore: "استعادة",
    export: "تصدير",
    import: "استيراد",
    download: "تنزيل",
    upload: "رفع",
    save: "حفظ",
    cancel: "إلغاء",
    search: "بحث",
    filter: "تصفية",
    refresh: "تحدي��",
    enabled: "مفعل",
    disabled: "معطل",
    healthy: "سليم",
    warning: "تحذير",
    critical: "حرج",
    viewDetails: "عرض التفاصيل",
    systemPerformance: "أداء النظام",
    userActivity: "نشاط المستخدمين",
    securityStatus: "حالة الأمان",
    backupStatus: "حالة النسخ الاحتياطي",
    lastBackup: "آخر نسخة احتياطية",
    nextScheduled: "المجدول القادم",
    backupSize: "حجم النسخة الاحتياطية",
    retention: "فترة الاحتفاظ",
    createBackup: "إنشاء نسخة احتياطية",
    scheduleBackup: "جدولة النسخ الاحتياطي",
    restoreFromBackup: "استعادة من النسخة الاحتياطية",
    downloadBackup: "تنزيل النسخة الاحتياطية",
  },
};

// Mock Data
const systemMetrics: SystemMetric[] = [
  {
    id: "users",
    name_ar: "إجمالي المستخدمين",
    name_en: "Total Users",
    value: 1247,
    unit: "",
    change_percentage: 12.5,
    trend: "up",
    status: "healthy",
    icon: Users,
    color: "gradient-nature",
    description_ar: "العدد الكلي للمستخدمين المسجلين",
    description_en: "Total number of registered users",
  },
  {
    id: "active",
    name_ar: "المستخدمون النشطون",
    name_en: "Active Users",
    value: 892,
    unit: "",
    change_percentage: 8.3,
    trend: "up",
    status: "healthy",
    icon: Activity,
    color: "gradient-ocean",
    description_ar: "المستخدمون النشطون خلال آخر 24 ساعة",
    description_en: "Active users in the last 24 hours",
  },
  {
    id: "uptime",
    name_ar: "وقت التشغيل",
    name_en: "System Uptime",
    value: 99.9,
    unit: "%",
    change_percentage: 0.1,
    trend: "stable",
    status: "healthy",
    icon: Zap,
    color: "gradient-energy",
    description_ar: "نسبة تشغيل النظام بدون انقطاع",
    description_en: "System uptime percentage",
  },
  {
    id: "storage",
    name_ar: "التخزين المستخدم",
    name_en: "Storage Used",
    value: 68.4,
    unit: "%",
    change_percentage: 5.2,
    trend: "up",
    status: "warning",
    icon: Database,
    color: "gradient-sunset",
    description_ar: "نسبة استخدام مساحة التخزين",
    description_en: "Storage utilization percentage",
  },
  {
    id: "api",
    name_ar: "است��عاءات API",
    name_en: "API Calls",
    value: 24567,
    unit: "/day",
    change_percentage: 15.7,
    trend: "up",
    status: "healthy",
    icon: Globe,
    color: "gradient-royalty",
    description_ar: "عدد استدعاءات API اليومية",
    description_en: "Daily API calls count",
  },
  {
    id: "errors",
    name_ar: "معدل الأخطاء",
    name_en: "Error Rate",
    value: 0.2,
    unit: "%",
    change_percentage: -2.1,
    trend: "down",
    status: "healthy",
    icon: AlertTriangle,
    color: "gradient-serenity",
    description_ar: "نسبة الأخطاء في النظام",
    description_en: "System error rate percentage",
  },
];

const sampleUsers: SystemUser[] = [
  {
    id: "1",
    name: "أحمد محمد العلي",
    email: "ahmed.ali@kxpath.ae",
    phone: "+971501234567",
    role: "admin",
    status: "active",
    last_login: "2024-01-15T14:30:00Z",
    created_date: "2023-06-15T10:00:00Z",
    location: { emirate: "Dubai", city: "Dubai Marina" },
    permissions: ["all"],
    subscription: {
      type: "enterprise",
      expires: "2024-12-31T23:59:59Z",
      features: ["all_modules", "unlimited_users", "priority_support"],
    },
    activity: {
      login_count: 245,
      modules_used: [
        "dashboard",
        "ai-design",
        "smart-map",
        "opportunity-hunter",
      ],
      last_action: "Generated AI design for villa project",
    },
  },
  {
    id: "2",
    name: "فاطمة سالم النعيمي",
    email: "fatima.naimi@gmail.com",
    phone: "+971507654321",
    role: "premium",
    status: "active",
    last_login: "2024-01-15T12:15:00Z",
    created_date: "2023-08-20T14:30:00Z",
    location: { emirate: "Abu Dhabi", city: "Khalifa City" },
    permissions: ["view_all", "create_projects", "access_ai"],
    subscription: {
      type: "premium",
      expires: "2024-08-20T23:59:59Z",
      features: ["ai_design", "smart_map", "analytics"],
    },
    activity: {
      login_count: 89,
      modules_used: ["ai-design", "market-analysis"],
      last_action: "Analyzed market data for Sharjah",
    },
  },
  {
    id: "3",
    name: "محمد خالد الزعابي",
    email: "mohamed.zabi@company.ae",
    phone: "+971509876543",
    role: "client",
    status: "active",
    last_login: "2024-01-14T16:45:00Z",
    created_date: "2023-11-10T09:20:00Z",
    location: { emirate: "Sharjah", city: "Al Qasba" },
    permissions: ["view_own", "create_basic"],
    subscription: {
      type: "free",
      expires: "2024-12-31T23:59:59Z",
      features: ["basic_map", "limited_ai"],
    },
    activity: {
      login_count: 34,
      modules_used: ["dashboard", "smart-map"],
      last_action: "Viewed properties in Al Ain",
    },
  },
];

const sampleAuditLogs: AuditLog[] = [
  {
    id: "1",
    user_id: "1",
    user_name: "أحمد محمد العلي",
    action: "User Login",
    module: "Authentication",
    timestamp: "2024-01-15T14:30:00Z",
    ip_address: "192.168.1.100",
    details: "Successful admin login from Dubai",
    severity: "low",
  },
  {
    id: "2",
    user_id: "2",
    user_name: "فاطمة سالم النعيمي",
    action: "Generated AI Design",
    module: "AI Design Studio",
    timestamp: "2024-01-15T13:45:00Z",
    ip_address: "192.168.1.105",
    details: "Generated villa landscape design using Stable Diffusion XL",
    severity: "medium",
  },
  {
    id: "3",
    user_id: "1",
    user_name: "أحمد محمد العلي",
    action: "System Settings Modified",
    module: "Admin Panel",
    timestamp: "2024-01-15T11:20:00Z",
    ip_address: "192.168.1.100",
    details: "Updated security settings: enabled 2FA requirement",
    severity: "high",
  },
];

export default function AdvancedAdminDashboard({
  language,
}: AdvancedAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    general: {
      system_name: "KX PATH UAE v2.0",
      default_language: "ar",
      timezone: "Asia/Dubai",
      maintenance_mode: false,
      max_users: 5000,
    },
    security: {
      password_policy: {
        min_length: 8,
        require_uppercase: true,
        require_numbers: true,
        require_symbols: false,
      },
      session_timeout: 30,
      two_factor_enabled: true,
      ip_whitelist: [],
    },
    notifications: {
      email_enabled: true,
      sms_enabled: true,
      push_enabled: true,
      admin_alerts: true,
    },
    integrations: {
      ai_models_enabled: true,
      map_services: ["Google Maps", "OpenStreetMap"],
      payment_gateways: ["Stripe", "PayPal"],
      backup_services: ["AWS S3", "Google Drive"],
    },
  });

  const t = translations[language];
  const isRTL = language === "ar";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-400/30";
      case "warning":
        return "text-amber-400 bg-amber-500/10 border-amber-400/30";
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-400/30";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-400 bg-red-500/10";
      case "premium":
        return "text-amber-400 bg-amber-500/10";
      case "client":
        return "text-blue-400 bg-blue-500/10";
      case "field":
        return "text-green-400 bg-green-500/10";
      case "researcher":
        return "text-purple-400 bg-purple-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400 bg-emerald-500/10";
      case "inactive":
        return "text-gray-400 bg-gray-500/10";
      case "suspended":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-gray-400 bg-gray-500/10";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      case "stable":
        return <TrendingUp className="w-4 h-4 text-gray-400 rotate-90" />;
      default:
        return null;
    }
  };

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "ar" ? "ar-AE" : "en-AE",
    );
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString(
      language === "ar" ? "ar-AE" : "en-AE",
    );
  };

  const tabs = [
    {
      id: "overview",
      label_ar: "نظرة عامة",
      label_en: "Overview",
      icon: BarChart3,
    },
    { id: "users", label_ar: "المستخدمون", label_en: "Users", icon: Users },
    {
      id: "settings",
      label_ar: "الإعدادات",
      label_en: "Settings",
      icon: Settings,
    },
    {
      id: "audit",
      label_ar: "سجل المراجعة",
      label_en: "Audit Logs",
      icon: FileText,
    },
    {
      id: "backup",
      label_ar: "النسخ الاحتياطي",
      label_en: "Data Backup",
      icon: Database,
    },
    { id: "security", label_ar: "الأمان", label_en: "Security", icon: Shield },
  ];

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

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-white/5 p-2 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{language === "ar" ? tab.label_ar : tab.label_en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className={`glass-card p-6 border ${getStatusColor(metric.status)}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center`}
                    >
                      <metric.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(metric.trend)}
                      <span
                        className={`text-sm ${
                          metric.trend === "up"
                            ? "text-emerald-400"
                            : metric.trend === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {metric.change_percentage > 0 ? "+" : ""}
                        {metric.change_percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="text-2xl font-bold text-white">
                      {metric.value}
                      {metric.unit}
                    </div>
                    <div className="text-sm text-gray-300">
                      {language === "ar" ? metric.name_ar : metric.name_en}
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    {language === "ar"
                      ? metric.description_ar
                      : metric.description_en}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-gradient-nature hover:opacity-90 h-20 flex-col">
                  <Plus className="w-6 h-6 mb-2" />
                  {t.addUser}
                </Button>
                <Button className="bg-gradient-ocean hover:opacity-90 h-20 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  {t.backup}
                </Button>
                <Button className="bg-gradient-energy hover:opacity-90 h-20 flex-col">
                  <RefreshCw className="w-6 h-6 mb-2" />
                  {t.refresh}
                </Button>
                <Button className="bg-gradient-royalty hover:opacity-90 h-20 flex-col">
                  <Settings className="w-6 h-6 mb-2" />
                  {t.settings}
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="glass-card p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white mb-4 md:mb-0">
                  {t.userManagement}
                </h3>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addUser}
                </Button>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">{t.admin}</option>
                  <option value="premium">{t.premium}</option>
                  <option value="client">{t.client}</option>
                  <option value="field">{t.field}</option>
                  <option value="researcher">{t.researcher}</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="all">All Status</option>
                  <option value="active">{t.active}</option>
                  <option value="inactive">{t.inactive}</option>
                  <option value="suspended">{t.suspended}</option>
                </select>

                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t.filter}
                </Button>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="pb-3 text-gray-300">{t.name}</th>
                      <th className="pb-3 text-gray-300">{t.email}</th>
                      <th className="pb-3 text-gray-300">{t.role}</th>
                      <th className="pb-3 text-gray-300">{t.status}</th>
                      <th className="pb-3 text-gray-300">{t.lastLogin}</th>
                      <th className="pb-3 text-gray-300">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-gray-800 hover:bg-white/5"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-medium">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {user.name}
                              </div>
                              {user.location && (
                                <div className="text-xs text-gray-400">
                                  {user.location.emirate}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-gray-300">{user.email}</td>
                        <td className="py-4">
                          <Badge
                            className={`${getRoleColor(user.role)} border-0`}
                          >
                            {t[user.role as keyof typeof t]}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge
                            className={`${getUserStatusColor(user.status)} border-0`}
                          >
                            {t[user.status as keyof typeof t]}
                          </Badge>
                        </td>
                        <td className="py-4 text-gray-300 text-sm">
                          {formatDateTime(user.last_login)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-600 text-gray-300"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Settings */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-400" />
                  {t.general}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.systemName}
                    </label>
                    <input
                      type="text"
                      value={systemSettings.general.system_name}
                      className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.defaultLanguage}
                    </label>
                    <select
                      value={systemSettings.general.default_language}
                      className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.maxUsers}
                    </label>
                    <input
                      type="number"
                      value={systemSettings.general.max_users}
                      className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      {t.maintenanceMode}
                    </label>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        systemSettings.general.maintenance_mode
                          ? "bg-emerald-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          systemSettings.general.maintenance_mode
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  {t.security}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password Min Length
                    </label>
                    <input
                      type="number"
                      value={systemSettings.security.password_policy.min_length}
                      className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.sessionTimeout} (minutes)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.security.session_timeout}
                      className="w-full px-4 py-2 bg-white/10 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      {t.twoFactor}
                    </label>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        systemSettings.security.two_factor_enabled
                          ? "bg-emerald-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          systemSettings.security.two_factor_enabled
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                      Require Uppercase
                    </label>
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        systemSettings.security.password_policy
                          .require_uppercase
                          ? "bg-emerald-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          systemSettings.security.password_policy
                            .require_uppercase
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Save className="w-4 h-4 mr-2" />
                {t.save}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              {t.auditLog}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-3 text-gray-300">{t.timestamp}</th>
                    <th className="pb-3 text-gray-300">User</th>
                    <th className="pb-3 text-gray-300">{t.action}</th>
                    <th className="pb-3 text-gray-300">{t.module}</th>
                    <th className="pb-3 text-gray-300">{t.severity}</th>
                    <th className="pb-3 text-gray-300">{t.details}</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleAuditLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-gray-800 hover:bg-white/5"
                    >
                      <td className="py-4 text-gray-300 text-sm">
                        {formatDateTime(log.timestamp)}
                      </td>
                      <td className="py-4 text-white">{log.user_name}</td>
                      <td className="py-4 text-gray-300">{log.action}</td>
                      <td className="py-4 text-gray-300">{log.module}</td>
                      <td className="py-4">
                        <Badge
                          className={`${
                            log.severity === "high"
                              ? "text-red-400 bg-red-500/10"
                              : log.severity === "medium"
                                ? "text-amber-400 bg-amber-500/10"
                                : "text-green-400 bg-green-500/10"
                          } border-0`}
                        >
                          {t[log.severity as keyof typeof t]}
                        </Badge>
                      </td>
                      <td className="py-4 text-gray-400 text-sm max-w-xs truncate">
                        {log.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "backup" && (
          <div className="space-y-6">
            {/* Backup Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card-emerald p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                  <div>
                    <div className="text-lg font-bold text-emerald-400">
                      Healthy
                    </div>
                    <div className="text-sm text-emerald-300">
                      {t.backupStatus}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card-teal p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-teal-400" />
                  <div>
                    <div className="text-lg font-bold text-teal-400">
                      2 hours ago
                    </div>
                    <div className="text-sm text-teal-300">{t.lastBackup}</div>
                  </div>
                </div>
              </div>

              <div className="glass-card-purple p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-lg font-bold text-purple-400">
                      Daily 2:00 AM
                    </div>
                    <div className="text-sm text-purple-300">
                      {t.nextScheduled}
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card-gold p-6">
                <div className="flex items-center gap-3">
                  <Database className="w-8 h-8 text-amber-400" />
                  <div>
                    <div className="text-lg font-bold text-amber-400">
                      2.4 GB
                    </div>
                    <div className="text-sm text-amber-300">{t.backupSize}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backup Actions */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Backup Management
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="bg-gradient-nature hover:opacity-90 h-16 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  {t.createBackup}
                </Button>
                <Button className="bg-gradient-ocean hover:opacity-90 h-16 flex-col">
                  <Calendar className="w-6 h-6 mb-2" />
                  {t.scheduleBackup}
                </Button>
                <Button className="bg-gradient-energy hover:opacity-90 h-16 flex-col">
                  <Upload className="w-6 h-6 mb-2" />
                  {t.restoreFromBackup}
                </Button>
                <Button className="bg-gradient-royalty hover:opacity-90 h-16 flex-col">
                  <ExternalLink className="w-6 h-6 mb-2" />
                  {t.downloadBackup}
                </Button>
              </div>
            </div>

            {/* Backup History */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Backup History
              </h3>
              <div className="space-y-3">
                {[
                  {
                    date: "2024-01-15T02:00:00Z",
                    size: "2.4 GB",
                    status: "completed",
                  },
                  {
                    date: "2024-01-14T02:00:00Z",
                    size: "2.3 GB",
                    status: "completed",
                  },
                  {
                    date: "2024-01-13T02:00:00Z",
                    size: "2.2 GB",
                    status: "completed",
                  },
                  {
                    date: "2024-01-12T02:00:00Z",
                    size: "2.1 GB",
                    status: "failed",
                  },
                  {
                    date: "2024-01-11T02:00:00Z",
                    size: "2.0 GB",
                    status: "completed",
                  },
                ].map((backup, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          backup.status === "completed"
                            ? "bg-emerald-400"
                            : "bg-red-400"
                        }`}
                      />
                      <div>
                        <div className="text-white font-medium">
                          {formatDateTime(backup.date)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {backup.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${
                          backup.status === "completed"
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-red-400 bg-red-500/10"
                        } border-0`}
                      >
                        {backup.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            {/* Security Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card-emerald p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-emerald-400" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">
                      Secure
                    </div>
                    <div className="text-sm text-emerald-300">
                      Security Status
                    </div>
                  </div>
                </div>
                <div className="text-xs text-emerald-300">
                  All security measures are active and functioning properly.
                </div>
              </div>

              <div className="glass-card-amber p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-amber-400" />
                  <div>
                    <div className="text-2xl font-bold text-amber-400">3</div>
                    <div className="text-sm text-amber-300">
                      Security Alerts
                    </div>
                  </div>
                </div>
                <div className="text-xs text-amber-300">
                  Review pending security recommendations.
                </div>
              </div>

              <div className="glass-card-teal p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8 text-teal-400" />
                  <div>
                    <div className="text-2xl font-bold text-teal-400">847</div>
                    <div className="text-sm text-teal-300">Active Sessions</div>
                  </div>
                </div>
                <div className="text-xs text-teal-300">
                  Currently active user sessions across all modules.
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Security Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">
                        Two-Factor Authentication
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-emerald-400 bg-emerald-500/10 border-0">
                        Enabled
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">SSL Certificate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-emerald-400 bg-emerald-500/10 border-0">
                        Valid
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">Audit Logging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-emerald-400 bg-emerald-500/10 border-0">
                        Active
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-amber-400" />
                      <span className="text-white">IP Restriction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-amber-400 bg-amber-500/10 border-0">
                        Partial
                      </Badge>
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">Data Encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-emerald-400 bg-emerald-500/10 border-0">
                        AES-256
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-emerald-400" />
                      <span className="text-white">Auto Backup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-emerald-400 bg-emerald-500/10 border-0">
                        Daily
                      </Badge>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
