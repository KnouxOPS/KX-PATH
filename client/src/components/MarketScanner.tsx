import { useState, useEffect } from "react";
import {
  Radar,
  Activity,
  Search,
  Globe,
  Camera,
  Instagram,
  Linkedin,
  MapPin,
  TrendingUp,
  Bell,
  Zap,
  Eye,
  Target,
  Database,
  Wifi,
  WifiOff,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanSource {
  id: string;
  name: string;
  type: "website" | "social" | "api" | "manual";
  status: "active" | "inactive" | "error" | "scanning";
  url?: string;
  last_scan: string;
  data_points: number;
  success_rate: number;
  coverage_areas: string[];
}

interface ScanResult {
  id: string;
  source_id: string;
  discovered_at: string;
  type: "new_project" | "competitor_activity" | "market_trend" | "price_change";
  title: string;
  description: string;
  location?: {
    emirate: string;
    area: string;
    coordinates?: { lat: number; lng: number };
  };
  confidence_score: number;
  data: any;
  verified: boolean;
  action_required: boolean;
}

interface MarketScannerProps {
  language: "en" | "ar";
}

// Sample scan sources - Real UAE data sources
const SCAN_SOURCES: ScanSource[] = [
  {
    id: "instagram_landscaping",
    name: "Instagram UAE Landscaping",
    type: "social",
    status: "active",
    url: "instagram.com/hashtag/UAELandscaping",
    last_scan: "2024-01-15T16:30:00Z",
    data_points: 1247,
    success_rate: 87,
    coverage_areas: ["Dubai", "Abu Dhabi", "Sharjah"],
  },
  {
    id: "linkedin_companies",
    name: "LinkedIn Construction Companies",
    type: "social",
    status: "active",
    url: "linkedin.com/search/companies/construction-uae",
    last_scan: "2024-01-15T15:45:00Z",
    data_points: 892,
    success_rate: 92,
    coverage_areas: ["Dubai", "Abu Dhabi", "Ras Al Khaimah"],
  },
  {
    id: "google_maps_reviews",
    name: "Google Maps Reviews",
    type: "api",
    status: "active",
    url: "maps.googleapis.com/maps/api",
    last_scan: "2024-01-15T16:45:00Z",
    data_points: 2156,
    success_rate: 95,
    coverage_areas: ["All Emirates"],
  },
  {
    id: "dld_property_portal",
    name: "Dubai Land Department",
    type: "api",
    status: "active",
    url: "dubailand.gov.ae/api",
    last_scan: "2024-01-15T14:20:00Z",
    data_points: 567,
    success_rate: 89,
    coverage_areas: ["Dubai"],
  },
  {
    id: "rera_sharjah",
    name: "RERA Sharjah Database",
    type: "api",
    status: "inactive",
    url: "rera.shj.ae",
    last_scan: "2024-01-14T10:30:00Z",
    data_points: 234,
    success_rate: 78,
    coverage_areas: ["Sharjah"],
  },
  {
    id: "behance_portfolios",
    name: "Behance Design Portfolios",
    type: "website",
    status: "active",
    url: "behance.net/search/projects/landscape-uae",
    last_scan: "2024-01-15T13:15:00Z",
    data_points: 345,
    success_rate: 83,
    coverage_areas: ["Dubai", "Abu Dhabi"],
  },
];

const SAMPLE_RESULTS: ScanResult[] = [
  {
    id: "result_001",
    source_id: "instagram_landscaping",
    discovered_at: "2024-01-15T16:30:00Z",
    type: "new_project",
    title: "فيلا فاخرة جديدة في الجميرا",
    description:
      "مشروع تنسيق حدائق فاخر في منطقة الجميرا، ميزانية مقدرة 350,000 درهم",
    location: {
      emirate: "Dubai",
      area: "Jumeirah",
      coordinates: { lat: 25.2252, lng: 55.2606 },
    },
    confidence_score: 91,
    data: {
      client_type: "private_villa",
      estimated_budget: 350000,
      project_size: "large",
      competition_level: "high",
    },
    verified: false,
    action_required: true,
  },
  {
    id: "result_002",
    source_id: "linkedin_companies",
    discovered_at: "2024-01-15T15:45:00Z",
    type: "competitor_activity",
    title: "منافس جديد دخل السوق",
    description: "شركة Desert Bloom Landscaping بدأت نشاطها في أبوظبي",
    location: {
      emirate: "Abu Dhabi",
      area: "Khalifa City",
    },
    confidence_score: 88,
    data: {
      company_name: "Desert Bloom Landscaping",
      team_size: 15,
      specializations: ["villa_gardens", "commercial"],
      threat_level: "medium",
    },
    verified: true,
    action_required: true,
  },
  {
    id: "result_003",
    source_id: "google_maps_reviews",
    discovered_at: "2024-01-15T16:00:00Z",
    type: "market_trend",
    title: "ازدياد الطلب على الحدائق المستدامة",
    description: "35% زيادة في البحث عن 'sustainable landscaping' في الإمارات",
    confidence_score: 94,
    data: {
      trend_type: "sustainable_landscaping",
      growth_rate: 35,
      peak_areas: ["Dubai", "Abu Dhabi"],
      seasonal_factor: "winter_peak",
    },
    verified: true,
    action_required: false,
  },
];

export default function MarketScanner({ language }: MarketScannerProps) {
  const [sources, setSources] = useState(SCAN_SOURCES);
  const [results, setResults] = useState(SAMPLE_RESULTS);
  const [isScanning, setIsScanning] = useState(false);
  const [autoScan, setAutoScan] = useState(true);
  const [selectedSource, setSelectedSource] = useState<ScanSource | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [totalDiscoveries, setTotalDiscoveries] = useState(156);

  const t = {
    ar: {
      marketScanner: "ماسح السوق الذكي",
      realTimeDataCollection: "جمع البيانات في الوقت الحقيقي",
      scanSources: "مصادر المسح",
      recentDiscoveries: "الاكتشافات الحديثة",
      scanProgress: "تقدم المسح",
      autoScan: "المسح التلقائي",
      manualScan: "مسح يدوي",
      pauseScan: "إيقاف المسح",
      resumeScan: "استئناف المسح",
      sourceName: "اسم المصدر",
      sourceType: "نوع المصدر",
      status: "الحالة",
      lastScan: "آخر مسح",
      dataPoints: "نقاط البيانات",
      successRate: "معدل النجاح",
      coverageAreas: "المناطق المغطاة",
      active: "نشط",
      inactive: "غير نشط",
      error: "خطأ",
      scanning: "جاري المسح",
      website: "موقع ويب",
      social: "وسائل التواصل",
      api: "واجهة برمجية",
      manual: "يدوي",
      newProject: "مشروع جديد",
      competitorActivity: "نشاط منافس",
      marketTrend: "اتجاه السوق",
      priceChange: "تغيير سعر",
      confidenceScore: "نقاط الثقة",
      verified: "موثق",
      actionRequired: "يتطلب إجراء",
      totalDiscoveries: "إجمالي الاكتشافات",
      activeSources: "المصادر النشطة",
      successfulScans: "عمليات المسح الناجحة",
      pendingActions: "الإجراءات المعلقة",
      viewDetails: "عرض التفاصيل",
      configureSource: "تكوين المصدر",
      enableSource: "تفعيل المصدر",
      disableSource: "إلغاء تفعيل المصدر",
      scanNow: "مسح الآن",
      discovers: "اكتشافات",
      lastHour: "آخر ساعة",
      today: "اليوم",
      thisWeek: "هذا الأسبوع",
    },
    en: {
      marketScanner: "Smart Market Scanner",
      realTimeDataCollection: "Real-time Data Collection",
      scanSources: "Scan Sources",
      recentDiscoveries: "Recent Discoveries",
      scanProgress: "Scan Progress",
      autoScan: "Auto Scan",
      manualScan: "Manual Scan",
      pauseScan: "Pause Scan",
      resumeScan: "Resume Scan",
      sourceName: "Source Name",
      sourceType: "Source Type",
      status: "Status",
      lastScan: "Last Scan",
      dataPoints: "Data Points",
      successRate: "Success Rate",
      coverageAreas: "Coverage Areas",
      active: "Active",
      inactive: "Inactive",
      error: "Error",
      scanning: "Scanning",
      website: "Website",
      social: "Social Media",
      api: "API",
      manual: "Manual",
      newProject: "New Project",
      competitorActivity: "Competitor Activity",
      marketTrend: "Market Trend",
      priceChange: "Price Change",
      confidenceScore: "Confidence Score",
      verified: "Verified",
      actionRequired: "Action Required",
      totalDiscoveries: "Total Discoveries",
      activeSources: "Active Sources",
      successfulScans: "Successful Scans",
      pendingActions: "Pending Actions",
      viewDetails: "View Details",
      configureSource: "Configure Source",
      enableSource: "Enable Source",
      disableSource: "Disable Source",
      scanNow: "Scan Now",
      discovers: "discoveries",
      lastHour: "Last Hour",
      today: "Today",
      thisWeek: "This Week",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Simulate real-time scanning
  useEffect(() => {
    if (!autoScan) return;

    const interval = setInterval(() => {
      // Simulate discovering new data
      if (Math.random() > 0.7) {
        const newResult: ScanResult = {
          id: `result_${Date.now()}`,
          source_id: sources[Math.floor(Math.random() * sources.length)].id,
          discovered_at: new Date().toISOString(),
          type: ["new_project", "competitor_activity", "market_trend"][
            Math.floor(Math.random() * 3)
          ] as any,
          title:
            language === "ar"
              ? "اكتشاف جديد من المسح التلقائي"
              : "New Discovery from Auto Scan",
          description:
            language === "ar"
              ? "تم اكتشاف بيانات جديدة من مصادر السوق"
              : "New data discovered from market sources",
          confidence_score: Math.floor(Math.random() * 30 + 70),
          data: {},
          verified: Math.random() > 0.5,
          action_required: Math.random() > 0.6,
        };

        setResults((prev) => [newResult, ...prev.slice(0, 19)]);
        setTotalDiscoveries((prev) => prev + 1);
      }

      // Update source statuses
      setSources((prev) =>
        prev.map((source) => ({
          ...source,
          last_scan: new Date().toISOString(),
          data_points: source.data_points + Math.floor(Math.random() * 5),
        })),
      );
    }, 25000);

    return () => clearInterval(interval);
  }, [autoScan, sources, language]);

  // Simulate scan progress
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setIsScanning(false);
          return 0;
        }
        return prev + Math.floor(Math.random() * 15 + 5);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanning]);

  const handleManualScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate discovering multiple results
    setTimeout(() => {
      const discoveries = Math.floor(Math.random() * 4 + 2);
      for (let i = 0; i < discoveries; i++) {
        const newResult: ScanResult = {
          id: `manual_${Date.now()}_${i}`,
          source_id: sources[Math.floor(Math.random() * sources.length)].id,
          discovered_at: new Date().toISOString(),
          type: ["new_project", "competitor_activity", "market_trend"][
            Math.floor(Math.random() * 3)
          ] as any,
          title:
            language === "ar"
              ? `اكتشاف جديد من المسح اليدوي ${i + 1}`
              : `Manual Scan Discovery ${i + 1}`,
          description:
            language === "ar"
              ? "تم اكتشاف بيانات جديدة من المسح اليدوي"
              : "New data discovered from manual scan",
          confidence_score: Math.floor(Math.random() * 20 + 80),
          data: {},
          verified: false,
          action_required: Math.random() > 0.4,
        };

        setTimeout(() => {
          setResults((prev) => [newResult, ...prev]);
          setTotalDiscoveries((prev) => prev + 1);
        }, i * 500);
      }
    }, 3000);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "social":
        return Instagram;
      case "api":
        return Database;
      case "website":
        return Globe;
      case "manual":
        return Settings;
      default:
        return Search;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "inactive":
        return "text-gray-400";
      case "error":
        return "text-red-400";
      case "scanning":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "new_project":
        return Target;
      case "competitor_activity":
        return Eye;
      case "market_trend":
        return TrendingUp;
      case "price_change":
        return DollarSign;
      default:
        return Info;
    }
  };

  const activeSources = sources.filter((s) => s.status === "active").length;
  const successfulScans = sources.reduce(
    (acc, s) => acc + Math.floor((s.data_points * s.success_rate) / 100),
    0,
  );
  const pendingActions = results.filter((r) => r.action_required).length;

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
                <Radar className="w-6 h-6 text-white" />
              </div>
              {tr.marketScanner}
            </h2>
            <p className="text-emerald-300/80">{tr.realTimeDataCollection}</p>
          </div>

          <div
            className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${autoScan ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
              />
              <span className="text-emerald-300 text-sm">
                {autoScan ? tr.autoScan : "إيقاف"}
              </span>
            </div>
            <Button
              onClick={() => setAutoScan(!autoScan)}
              variant="ghost"
              size="sm"
              className="text-emerald-300 hover:text-white hover:bg-emerald-500/20 border-0"
            >
              {autoScan ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              onClick={handleManualScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              {isScanning ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  {scanProgress}%
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  {tr.manualScan}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="p-6 border-b border-emerald-400/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-emerald-400" />
              <div>
                <h3 className="text-white font-bold text-xl">
                  {totalDiscoveries}
                </h3>
                <p className="text-emerald-300/80 text-sm">
                  {tr.totalDiscoveries}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-blue-400/20">
            <div className="flex items-center gap-3">
              <Wifi className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-white font-bold text-xl">
                  {activeSources}
                </h3>
                <p className="text-blue-300/80 text-sm">{tr.activeSources}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-green-400/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-white font-bold text-xl">
                  {successfulScans}
                </h3>
                <p className="text-green-300/80 text-sm">
                  {tr.successfulScans}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-orange-400/20">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8 text-orange-400" />
              <div>
                <h3 className="text-white font-bold text-xl">
                  {pendingActions}
                </h3>
                <p className="text-orange-300/80 text-sm">
                  {tr.pendingActions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <div className="p-6 border-b border-emerald-400/20">
          <div className="bg-black/20 backdrop-blur-lg rounded-xl p-4 border border-emerald-400/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">{tr.scanProgress}</span>
              <span className="text-emerald-400 font-bold">
                {scanProgress}%
              </span>
            </div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scan Sources */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            {tr.scanSources}
          </h3>

          <div className="space-y-3">
            {sources.map((source) => {
              const Icon = getSourceIcon(source.type);
              return (
                <div
                  key={source.id}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-white font-medium">{source.name}</h4>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={getStatusColor(source.status)}>
                        {tr[source.status as keyof typeof tr] || source.status}
                      </span>
                      <span className="text-emerald-300/60">
                        {source.data_points} {tr.dataPoints}
                      </span>
                      <span className="text-emerald-300/60">
                        {source.success_rate}% {tr.successRate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {source.status === "scanning" && (
                      <Activity className="w-4 h-4 text-blue-400 animate-spin" />
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedSource(source)}
                      className="text-emerald-300 hover:text-white hover:bg-emerald-500/20 border-0"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Discoveries */}
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-emerald-400/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            {tr.recentDiscoveries}
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {results.map((result) => {
              const Icon = getResultIcon(result.type);
              const source = sources.find((s) => s.id === result.source_id);

              return (
                <div
                  key={result.id}
                  className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium">
                          {result.title}
                        </h4>
                        {result.verified && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        {result.action_required && (
                          <Bell className="w-4 h-4 text-orange-400" />
                        )}
                      </div>

                      <p className="text-emerald-300/80 text-sm mb-2">
                        {result.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-emerald-400">
                            {tr.confidenceScore}: {result.confidence_score}%
                          </span>
                          {source && (
                            <span className="text-emerald-300/60">
                              {source.name}
                            </span>
                          )}
                        </div>
                        <span className="text-emerald-300/60 text-xs">
                          {new Date(result.discovered_at).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
