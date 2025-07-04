import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Layers,
  Satellite,
  Home,
  Building2,
  TreePine,
  Zap,
  Filter,
  Search,
  TrendingUp,
  Eye,
  Target,
  Activity,
  DollarSign,
  Calendar,
  Radar,
  Settings,
  Download,
  Share2,
  Bell,
  Maximize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UAEEnhancedMapProps {
  language: "en" | "ar";
}

interface LiveMarker {
  id: string;
  type: "construction" | "property" | "permit" | "opportunity";
  title_ar: string;
  title_en: string;
  coordinates: { lat: number; lng: number };
  price: number;
  completion: number;
  status: "active" | "pending" | "completed";
  priority: "high" | "medium" | "low";
  zone: string;
  details: {
    area_sqm: number;
    property_type: string;
    investor: string;
    timeline: string;
  };
  lastUpdated: string;
}

const translations = {
  en: {
    title: "UAE Smart Map",
    subtitle: "Real-time Intelligence & Opportunity Mapping",
    layers: "Map Layers",
    satellite: "Satellite View",
    terrain: "Terrain",
    heatmap: "Activity Heatmap",
    liveMarkers: "Live Markers",
    filters: "Smart Filters",
    search: "Search Areas",
    emirates: "Emirates",
    allEmirates: "All Emirates",
    dubai: "Dubai",
    abudhabi: "Abu Dhabi",
    sharjah: "Sharjah",
    ajman: "Ajman",
    rak: "Ras Al Khaimah",
    fujairah: "Fujairah",
    uaq: "Umm Al Quwain",
    propertyType: "Property Type",
    allTypes: "All Types",
    villa: "Villa",
    apartment: "Apartment",
    commercial: "Commercial",
    status: "Project Status",
    active: "Active",
    pending: "Pending",
    completed: "Completed",
    priceRange: "Price Range",
    construction: "🏗️ Construction Projects",
    property: "🏡 Properties for Sale",
    permit: "📋 New Permits",
    opportunity: "🚨 Investment Opportunities",
    liveFeed: "Live Data Feed",
    realTime: "Real-time Updates",
    analytics: "Map Analytics",
    totalMarkers: "Total Markers",
    activeProjects: "Active Projects",
    avgPrice: "Average Price",
    hotZones: "Hot Zones",
    viewDetails: "View Details",
    submitOffer: "Submit Offer",
    saveLocation: "Save Location",
    createAlert: "Create Alert",
    exportData: "Export Data",
    fullscreen: "Fullscreen",
    priceAED: "AED",
    completion: "completion",
    updated: "Updated",
    ago: "ago",
    notifications: "Live Notifications",
  },
  ar: {
    title: "خريطة الإمارات الذكية",
    subtitle: "الاستخبارات اللحظية ورسم الفرص",
    layers: "طبقات الخريطة",
    satellite: "عرض القمر الصناعي",
    terrain: "التضاريس",
    heatmap: "خريطة النشاط الحرارية",
    liveMarkers: "العلامات المباشرة",
    filters: "المرشحات الذكية",
    search: "البحث في المناطق",
    emirates: "الإمارات",
    allEmirates: "كل الإمارات",
    dubai: "دبي",
    abudhabi: "أبوظبي",
    sharjah: "الشارقة",
    ajman: "عجمان",
    rak: "رأس الخيمة",
    fujairah: "الفجيرة",
    uaq: "أم القيوين",
    propertyType: "نوع العقار",
    allTypes: "كل الأنواع",
    villa: "فيلا",
    apartment: "شقة",
    commercial: "تجاري",
    status: "حالة المشروع",
    active: "نشط",
    pending: "قيد الانتظار",
    completed: "مكتمل",
    priceRange: "نطاق السعر",
    construction: "🏗️ مشاريع البناء",
    property: "🏡 عقارات للبيع",
    permit: "📋 تصاريح جديدة",
    opportunity: "🚨 فرص استثمارية",
    liveFeed: "التغذية المباشرة",
    realTime: "التحديثات اللحظية",
    analytics: "تحليلات الخريطة",
    totalMarkers: "إجمالي العلامات",
    activeProjects: "المشاريع النشطة",
    avgPrice: "متوسط السعر",
    hotZones: "المناطق الساخنة",
    viewDetails: "عرض التفاصيل",
    submitOffer: "تقديم عرض",
    saveLocation: "حفظ الموقع",
    createAlert: "إنشاء تنبيه",
    exportData: "تصدير البيانات",
    fullscreen: "ملء الشاشة",
    priceAED: "درهم",
    completion: "مكتمل",
    updated: "محدث",
    ago: "مضت",
    notifications: "الإشعارات المباشرة",
  },
};

// Sample live data
const liveMarkers: LiveMarker[] = [
  {
    id: "1",
    type: "construction",
    title_ar: "مشروع فيلا ملكية - دبي هيلز",
    title_en: "Royal Villa Project - Dubai Hills",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    price: 4800000,
    completion: 84,
    status: "active",
    priority: "high",
    zone: "Dubai",
    details: {
      area_sqm: 850,
      property_type: "Luxury Villa",
      investor: "Emaar Properties",
      timeline: "6 months",
    },
    lastUpdated: "2 minutes ago",
  },
  {
    id: "2",
    type: "opportunity",
    title_ar: "فرصة استثمارية - شاطئ الجميرا",
    title_en: "Investment Opportunity - Jumeirah Beach",
    coordinates: { lat: 25.1972, lng: 55.2382 },
    price: 12500000,
    completion: 0,
    status: "pending",
    priority: "high",
    zone: "Dubai",
    details: {
      area_sqm: 1200,
      property_type: "Beachfront Villa",
      investor: "Private Investor",
      timeline: "12 months",
    },
    lastUpdated: "5 minutes ago",
  },
  {
    id: "3",
    type: "property",
    title_ar: "فيلا جاهزة للبيع - الشارقة",
    title_en: "Ready Villa for Sale - Sharjah",
    coordinates: { lat: 25.3463, lng: 55.4209 },
    price: 2800000,
    completion: 100,
    status: "completed",
    priority: "medium",
    zone: "Sharjah",
    details: {
      area_sqm: 650,
      property_type: "Family Villa",
      investor: "Al Ansari Group",
      timeline: "Ready",
    },
    lastUpdated: "12 minutes ago",
  },
  {
    id: "4",
    type: "permit",
    title_ar: "تصريح بناء جديد - أبوظبي",
    title_en: "New Building Permit - Abu Dhabi",
    coordinates: { lat: 24.4539, lng: 54.3773 },
    price: 6200000,
    completion: 15,
    status: "active",
    priority: "medium",
    zone: "Abu Dhabi",
    details: {
      area_sqm: 950,
      property_type: "Modern Villa",
      investor: "Aldar Properties",
      timeline: "18 months",
    },
    lastUpdated: "25 minutes ago",
  },
];

const mapLayers = [
  { id: "satellite", label: "satellite", icon: Satellite, active: true },
  { id: "terrain", label: "terrain", icon: MapPin, active: false },
  { id: "heatmap", label: "heatmap", icon: Activity, active: true },
  { id: "live", label: "liveMarkers", icon: Zap, active: true },
];

const emirates = [
  { id: "all", label: "allEmirates" },
  { id: "dubai", label: "dubai" },
  { id: "abudhabi", label: "abudhabi" },
  { id: "sharjah", label: "sharjah" },
  { id: "ajman", label: "ajman" },
  { id: "rak", label: "rak" },
  { id: "fujairah", label: "fujairah" },
  { id: "uaq", label: "uaq" },
];

export default function UAESmartMapEnhanced({ language }: UAEEnhancedMapProps) {
  const [selectedEmirate, setSelectedEmirate] = useState<string>("all");
  const [activeLayersState, setActiveLayersState] = useState(mapLayers);
  const [filteredMarkers, setFilteredMarkers] =
    useState<LiveMarker[]>(liveMarkers);
  const [selectedMarker, setSelectedMarker] = useState<LiveMarker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newNotification = `${t.updated}: ${liveMarkers[Math.floor(Math.random() * liveMarkers.length)].title_en}`;
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [t.updated]);

  const toggleLayer = (layerId: string) => {
    setActiveLayersState((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, active: !layer.active } : layer,
      ),
    );
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "construction":
        return "🏗️";
      case "property":
        return "🏡";
      case "permit":
        return "📋";
      case "opportunity":
        return "🚨";
      default:
        return "📍";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-400 bg-red-400/10";
      case "medium":
        return "border-yellow-400 bg-yellow-400/10";
      case "low":
        return "border-green-400 bg-green-400/10";
      default:
        return "border-gray-400 bg-gray-400/10";
    }
  };

  const mapStats = {
    totalMarkers: filteredMarkers.length,
    activeProjects: filteredMarkers.filter((m) => m.status === "active").length,
    avgPrice: Math.round(
      filteredMarkers.reduce((sum, m) => sum + m.price, 0) /
        filteredMarkers.length,
    ),
    hotZones: new Set(filteredMarkers.map((m) => m.zone)).size,
  };

  return (
    <div
      className={`h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 text-white relative overflow-hidden ${isFullscreen ? "fixed inset-0 z-50" : ""}`}
    >
      {/* Header */}
      <div
        className={`bg-white/10 backdrop-blur-xl border-b border-white/20 p-4 ${isRTL ? "text-right" : "text-left"}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t.title}</h1>
            <p className="text-emerald-300 opacity-90">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Maximize className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Download className="w-4 h-4 mr-2" />
              {t.exportData}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-white/5 backdrop-blur-xl border-r border-white/20 p-4 overflow-y-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Map Layers */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{t.layers}</h3>
            <div className="space-y-2">
              {activeLayersState.map((layer) => (
                <div
                  key={layer.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                    layer.active
                      ? "bg-emerald-500/20 border border-emerald-400"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => toggleLayer(layer.id)}
                >
                  <layer.icon className="w-5 h-5" />
                  <span>{t[layer.label as keyof typeof t]}</span>
                  <div
                    className={`ml-auto w-4 h-4 rounded-full ${layer.active ? "bg-emerald-400" : "bg-gray-400"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Emirates Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{t.emirates}</h3>
            <div className="grid grid-cols-2 gap-2">
              {emirates.map((emirate) => (
                <button
                  key={emirate.id}
                  onClick={() => setSelectedEmirate(emirate.id)}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    selectedEmirate === emirate.id
                      ? "bg-emerald-500 text-white"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  {t[emirate.label as keyof typeof t]}
                </button>
              ))}
            </div>
          </div>

          {/* Live Analytics */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{t.analytics}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-emerald-400">
                  {mapStats.totalMarkers}
                </div>
                <div className="text-xs text-gray-300">{t.totalMarkers}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-400">
                  {mapStats.activeProjects}
                </div>
                <div className="text-xs text-gray-300">{t.activeProjects}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-lg font-bold text-yellow-400">
                  {(mapStats.avgPrice / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-gray-300">{t.avgPrice}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">
                  {mapStats.hotZones}
                </div>
                <div className="text-xs text-gray-300">{t.hotZones}</div>
              </div>
            </div>
          </div>

          {/* Live Notifications */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              {t.notifications}
            </h3>
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-2 text-sm animate-pulse"
                >
                  {notification}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div
            ref={mapRef}
            className="w-full h-full bg-gradient-to-br from-blue-500/20 to-green-500/20 relative overflow-hidden"
          >
            {/* Map Background */}
            <div
              className={
                'absolute inset-0 bg-[url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.2" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>\')] opacity-30'
              }
            />

            {/* Markers */}
            {filteredMarkers.map((marker, index) => (
              <div
                key={marker.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getPriorityColor(marker.priority)} rounded-lg p-2 border backdrop-blur-lg hover:scale-110 transition-all animate-pulse`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${20 + (index % 3) * 25}%`,
                }}
                onClick={() => setSelectedMarker(marker)}
              >
                <div className="text-2xl">{getMarkerIcon(marker.type)}</div>
                <div className="text-xs font-medium text-center mt-1">
                  {marker.price > 1000000
                    ? `${(marker.price / 1000000).toFixed(1)}M`
                    : `${(marker.price / 1000).toFixed(0)}K`}
                </div>
              </div>
            ))}

            {/* Heat Map Overlay */}
            {activeLayersState.find((l) => l.id === "heatmap")?.active && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                <div
                  className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                />
                <div
                  className="absolute bottom-1/3 left-1/2 w-28 h-28 bg-green-500/15 rounded-full blur-xl animate-pulse"
                  style={{ animationDelay: "4s" }}
                />
              </div>
            )}

            {/* Real-time Indicator */}
            <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-lg rounded-lg p-3 border border-green-400/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{t.realTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Marker Details */}
        {selectedMarker && (
          <div className="w-80 bg-white/5 backdrop-blur-xl border-l border-white/20 p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {language === "ar"
                    ? selectedMarker.title_ar
                    : selectedMarker.title_en}
                </h3>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-xl font-bold text-green-400">
                    {selectedMarker.price.toLocaleString()} {t.priceAED}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span>
                    {selectedMarker.completion}% {t.completion}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>{selectedMarker.zone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  <span>{selectedMarker.details.timeline}</span>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <h4 className="font-semibold mb-2">Project Details</h4>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div>Area: {selectedMarker.details.area_sqm} sqm</div>
                    <div>Type: {selectedMarker.details.property_type}</div>
                    <div>Investor: {selectedMarker.details.investor}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Eye className="w-4 h-4 mr-2" />
                    {t.viewDetails}
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    {t.submitOffer}
                  </Button>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Bell className="w-4 h-4 mr-2" />
                    {t.createAlert}
                  </Button>
                </div>

                <div className="text-xs text-gray-400 text-center">
                  {t.updated}: {selectedMarker.lastUpdated}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
