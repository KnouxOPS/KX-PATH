import { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Layers,
  Satellite,
  Building2,
  TreePine,
  Zap,
  Filter,
  Search,
  TrendingUp,
  Bell,
  Eye,
  Target,
  Home,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  Radar,
  Navigation,
  Settings,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// UAE Emirates Data with real coordinates
const UAE_EMIRATES = {
  dubai: {
    name_ar: "دبي",
    name_en: "Dubai",
    center: { lat: 25.2048, lng: 55.2708 },
    color: "#DC2626",
    zones: [
      {
        name_ar: "دبي مارينا",
        name_en: "Dubai Marina",
        lat: 25.0814,
        lng: 55.1391,
        projects: 45,
        opportunities: 12,
      },
      {
        name_ar: "جميرا",
        name_en: "Jumeirah",
        lat: 25.2252,
        lng: 55.2606,
        projects: 67,
        opportunities: 23,
      },
      {
        name_ar: "داون تاون",
        name_en: "Downtown",
        lat: 25.1972,
        lng: 55.2744,
        projects: 89,
        opportunities: 8,
      },
      {
        name_ar: "دبي هيلز",
        name_en: "Dubai Hills",
        lat: 25.1108,
        lng: 55.2453,
        projects: 123,
        opportunities: 34,
      },
      {
        name_ar: "مدينة محمد بن راشد",
        name_en: "MBR City",
        lat: 25.0737,
        lng: 55.1815,
        projects: 156,
        opportunities: 67,
      },
    ],
  },
  abudhabi: {
    name_ar: "أبوظبي",
    name_en: "Abu Dhabi",
    center: { lat: 24.4539, lng: 54.3773 },
    color: "#059669",
    zones: [
      {
        name_ar: "مدينة زايد",
        name_en: "Zayed City",
        lat: 24.4648,
        lng: 54.3618,
        projects: 78,
        opportunities: 19,
      },
      {
        name_ar: "الياسات",
        name_en: "Al Yasat",
        lat: 24.501,
        lng: 54.3927,
        projects: 34,
        opportunities: 45,
      },
      {
        name_ar: "الريف",
        name_en: "Al Reef",
        lat: 24.4298,
        lng: 54.6063,
        projects: 91,
        opportunities: 28,
      },
      {
        name_ar: "الشاطئ",
        name_en: "Al Raha Beach",
        lat: 24.4419,
        lng: 54.6544,
        projects: 67,
        opportunities: 15,
      },
      {
        name_ar: "مدينة خليفة",
        name_en: "Khalifa City",
        lat: 24.4187,
        lng: 54.5574,
        projects: 145,
        opportunities: 52,
      },
    ],
  },
  sharjah: {
    name_ar: "الشارقة",
    name_en: "Sharjah",
    center: { lat: 25.3463, lng: 55.4209 },
    color: "#7C3AED",
    zones: [
      {
        name_ar: "الراشدية",
        name_en: "Al Rashidiya",
        lat: 25.3421,
        lng: 55.4652,
        projects: 89,
        opportunities: 67,
      },
      {
        name_ar: "المجرة",
        name_en: "Al Majarra",
        lat: 25.3738,
        lng: 55.3868,
        projects: 45,
        opportunities: 23,
      },
      {
        name_ar: "مويلح",
        name_en: "Muweilah",
        lat: 25.2847,
        lng: 55.4712,
        projects: 67,
        opportunities: 34,
      },
      {
        name_ar: "الناصرية",
        name_en: "Al Nasseriya",
        lat: 25.3021,
        lng: 55.3897,
        projects: 123,
        opportunities: 89,
      },
    ],
  },
  ajman: {
    name_ar: "عجمان",
    name_en: "Ajman",
    center: { lat: 25.4052, lng: 55.5136 },
    color: "#EA580C",
    zones: [
      {
        name_ar: "النعيمية",
        name_en: "Al Nuaimiya",
        lat: 25.4086,
        lng: 55.5342,
        projects: 234,
        opportunities: 123,
      },
      {
        name_ar: "الراشدية",
        name_en: "Al Rashidiya",
        lat: 25.3987,
        lng: 55.4876,
        projects: 156,
        opportunities: 89,
      },
      {
        name_ar: "الجرف",
        name_en: "Al Jurf",
        lat: 25.3845,
        lng: 55.4967,
        projects: 78,
        opportunities: 45,
      },
    ],
  },
  rak: {
    name_ar: "رأس الخيمة",
    name_en: "Ras Al Khaimah",
    center: { lat: 25.7889, lng: 55.9598 },
    color: "#0891B2",
    zones: [
      {
        name_ar: "الميناء",
        name_en: "Al Mina",
        lat: 25.7943,
        lng: 55.9756,
        projects: 67,
        opportunities: 34,
      },
      {
        name_ar: "الحمرا",
        name_en: "Al Hamra",
        lat: 25.7621,
        lng: 55.8234,
        projects: 89,
        opportunities: 56,
      },
    ],
  },
  fujairah: {
    name_ar: "الفجيرة",
    name_en: "Fujairah",
    center: { lat: 25.1208, lng: 56.3264 },
    color: "#BE185D",
    zones: [
      {
        name_ar: "دبا",
        name_en: "Dibba",
        lat: 25.6186,
        lng: 56.2533,
        projects: 45,
        opportunities: 67,
      },
      {
        name_ar: "الفجيرة",
        name_en: "Fujairah City",
        lat: 25.1267,
        lng: 56.3414,
        projects: 78,
        opportunities: 23,
      },
    ],
  },
  uaq: {
    name_ar: "أم القيوين",
    name_en: "Umm Al Quwain",
    center: { lat: 25.5641, lng: 55.6552 },
    color: "#16A34A",
    zones: [
      {
        name_ar: "الراشدية",
        name_en: "Al Rashidiya",
        lat: 25.5523,
        lng: 55.6734,
        projects: 34,
        opportunities: 89,
      },
    ],
  },
};

// Live Construction Alerts
const LIVE_ALERTS = [
  {
    id: 1,
    type: "new_construction",
    title_ar: "🏗️ فيلا جديدة قيد الإنشاء",
    title_en: "🏗️ New Villa Under Construction",
    description_ar: "فيلا بمساحة 1200م² في النعيمية - عجمان",
    description_en: "1200m² Villa in Al Nuaimiya - Ajman",
    lat: 25.4086,
    lng: 55.5342,
    value: "2.5M AED",
    opportunity_score: 95,
    created_at: "منذ ساعتين",
    tags: ["high_potential", "new_area"],
  },
  {
    id: 2,
    type: "property_sale",
    title_ar: "🏡 تم بيع أرض سكنية",
    title_en: "🏡 Residential Land Sold",
    description_ar: "أرض بمساحة 800م² في الراشدية - الشارقة",
    description_en: "800m² Land in Al Rashidiya - Sharjah",
    lat: 25.3421,
    lng: 55.4652,
    value: "1.8M AED",
    opportunity_score: 88,
    created_at: "منذ 4 ساعات",
    tags: ["hot_zone", "growing_area"],
  },
  {
    id: 3,
    type: "development_permit",
    title_ar: "📋 ترخيص مجمع جديد",
    title_en: "📋 New Complex Permit",
    description_ar: "مجمع 15 فيلا في مدينة خليفة - أبوظبي",
    description_en: "15-Villa Complex in Khalifa City - Abu Dhabi",
    lat: 24.4187,
    lng: 54.5574,
    value: "25M AED",
    opportunity_score: 92,
    created_at: "منذ 6 ساعات",
    tags: ["mega_project", "premium_area"],
  },
];

interface UAESmartTerrainProps {
  language: "en" | "ar";
}

export default function UAESmartTerrain({ language }: UAESmartTerrainProps) {
  const [selectedEmirate, setSelectedEmirate] = useState<string>("all");
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [mapView, setMapView] = useState<
    "satellite" | "terrain" | "opportunities" | "heatmap"
  >("satellite");
  const [showAlerts, setShowAlerts] = useState(true);
  const [showOpportunities, setShowOpportunities] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [liveData, setLiveData] = useState(LIVE_ALERTS);
  const [isScanning, setIsScanning] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const t = {
    ar: {
      smartTerrain: "الحيّ الذكي - كشف ذكي للفرص العمرانية",
      liveIntelligence: "الاستخبارات الحية",
      mapControls: "أدوات الخريطة",
      searchArea: "البحث في المنطقة...",
      allEmirates: "جميع الإمارات",
      satellite: "الأقمار الصناعية",
      terrain: "التضاريس",
      opportunities: "الفرص",
      heatmap: "الخريطة الحرارية",
      liveAlerts: "التنبيهات الحية",
      scanning: "جاري المسح الذكي...",
      newConstruction: "بناء جديد",
      propertySale: "بيع عقاري",
      developmentPermit: "ترخيص تطوير",
      opportunityScore: "نقاط الفرصة",
      viewDetails: "عرض التفاصيل",
      submitProposal: "تقديم عرض",
      zoneAnalysis: "تحليل المنطقة",
      projectsCount: "عدد المشاريع",
      opportunitiesCount: "الفرص المتاحة",
      averageValue: "القيمة المتوسطة",
      competitionLevel: "مستوى المنافسة",
      aiRecommendation: "توصية الذكاء الاصطناعي",
    },
    en: {
      smartTerrain: "Smart Terrain - Intelligent Urban Opportunity Discovery",
      liveIntelligence: "Live Intelligence",
      mapControls: "Map Controls",
      searchArea: "Search area...",
      allEmirates: "All Emirates",
      satellite: "Satellite",
      terrain: "Terrain",
      opportunities: "Opportunities",
      heatmap: "Heatmap",
      liveAlerts: "Live Alerts",
      scanning: "Smart scanning in progress...",
      newConstruction: "New Construction",
      propertySale: "Property Sale",
      developmentPermit: "Development Permit",
      opportunityScore: "Opportunity Score",
      viewDetails: "View Details",
      submitProposal: "Submit Proposal",
      zoneAnalysis: "Zone Analysis",
      projectsCount: "Projects Count",
      opportunitiesCount: "Available Opportunities",
      averageValue: "Average Value",
      competitionLevel: "Competition Level",
      aiRecommendation: "AI Recommendation",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Smart scanning simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          type: ["new_construction", "property_sale", "development_permit"][
            Math.floor(Math.random() * 3)
          ] as any,
          title_ar: "🚨 تنبيه جديد في المنطقة",
          title_en: "🚨 New Alert in Area",
          description_ar: "فرصة استثمارية جديدة",
          description_en: "New investment opportunity",
          lat: 25.2048 + (Math.random() - 0.5) * 0.8,
          lng: 55.2708 + (Math.random() - 0.5) * 0.8,
          value: `${(Math.random() * 5 + 1).toFixed(1)}M AED`,
          opportunity_score: Math.floor(Math.random() * 30 + 70),
          created_at: language === "ar" ? "الآن" : "now",
          tags: ["live_update"],
        };
        setLiveData((prev) => [newAlert, ...prev.slice(0, 9)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [language]);

  const getEmirateZones = () => {
    if (selectedEmirate === "all") {
      return Object.values(UAE_EMIRATES).flatMap((emirate) =>
        emirate.zones.map((zone) => ({ ...zone, emirate: emirate.name_en })),
      );
    }
    return (
      UAE_EMIRATES[selectedEmirate as keyof typeof UAE_EMIRATES]?.zones || []
    );
  };

  const handleSmartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Add new discovered opportunities
      const discoveries = Math.floor(Math.random() * 3 + 1);
      for (let i = 0; i < discoveries; i++) {
        const newAlert = {
          id: Date.now() + i,
          type: "new_construction" as any,
          title_ar: "🎯 اكتشاف ذكي جديد",
          title_en: "🎯 New Smart Discovery",
          description_ar: `فرصة عالية الجودة في منطقة نامية`,
          description_en: `High-quality opportunity in growing area`,
          lat: 25.2048 + (Math.random() - 0.5) * 1.2,
          lng: 55.2708 + (Math.random() - 0.5) * 1.2,
          value: `${(Math.random() * 8 + 2).toFixed(1)}M AED`,
          opportunity_score: Math.floor(Math.random() * 20 + 80),
          created_at: language === "ar" ? "اكتشاف ذكي" : "smart discovery",
          tags: ["ai_discovered", "high_potential"],
        };
        setLiveData((prev) => [newAlert, ...prev]);
      }
    }, 3000);
  };

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
              {tr.smartTerrain}
            </h2>
            <p className="text-emerald-300/80">{tr.liveIntelligence}</p>
          </div>

          <div
            className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Button
              onClick={handleSmartScan}
              disabled={isScanning}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
            >
              {isScanning ? (
                <>
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                  {tr.scanning}
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  مسح ذكي
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-20 space-y-2">
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-4 border border-emerald-400/20">
              <h3 className="text-white text-sm font-medium mb-3">
                {tr.mapControls}
              </h3>

              {/* Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <input
                  type="text"
                  placeholder={tr.searchArea}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-emerald-400/30 rounded-xl text-white placeholder-emerald-300/60 focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Emirates Filter */}
              <select
                value={selectedEmirate}
                onChange={(e) => setSelectedEmirate(e.target.value)}
                className="w-full mb-3 px-3 py-2 bg-white/10 border border-emerald-400/30 rounded-xl text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="all">{tr.allEmirates}</option>
                {Object.entries(UAE_EMIRATES).map(([key, emirate]) => (
                  <option key={key} value={key} className="text-black">
                    {emirate[`name_${language}` as keyof typeof emirate]}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "satellite", icon: Satellite, label: tr.satellite },
                  { key: "terrain", icon: Layers, label: tr.terrain },
                  { key: "opportunities", icon: Eye, label: tr.opportunities },
                  { key: "heatmap", icon: BarChart3, label: tr.heatmap },
                ].map(({ key, icon: Icon, label }) => (
                  <Button
                    key={key}
                    variant={mapView === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setMapView(key as any)}
                    className={`${mapView === key ? "bg-emerald-500 text-white" : "text-emerald-300 hover:text-white hover:bg-emerald-500/20"} border-0`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Canvas */}
          <div
            ref={mapRef}
            className="w-full h-full bg-gradient-to-br from-emerald-950/50 to-teal-950/50 relative overflow-hidden"
            style={{
              backgroundImage:
                mapView === "satellite"
                  ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 20h60v60H20z' fill='%23064e3b' opacity='0.3'/%3E%3C/svg%3E")`
                  : mapView === "terrain"
                    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q25 30 50 50 T100 50 V100 H0 Z' fill='%23065f46' opacity='0.4'/%3E%3C/svg%3E")`
                    : undefined,
            }}
          >
            {/* UAE Emirates Visualization */}
            {Object.entries(UAE_EMIRATES).map(([key, emirate]) => {
              if (selectedEmirate !== "all" && selectedEmirate !== key)
                return null;

              // Calculate position on the map canvas (simplified positioning)
              const x = ((emirate.center.lng - 51) / 8) * 100; // Normalize longitude
              const y = ((28 - emirate.center.lat) / 6) * 100; // Normalize latitude

              return (
                <div key={key}>
                  {/* Emirate Boundary */}
                  <div
                    className="absolute rounded-full opacity-60 animate-pulse"
                    style={{
                      left: `${x - 8}%`,
                      top: `${y - 8}%`,
                      width: "16%",
                      height: "16%",
                      backgroundColor: emirate.color + "20",
                      border: `2px solid ${emirate.color}60`,
                    }}
                  />

                  {/* Emirate Center */}
                  <div
                    className="absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: emirate.color,
                      boxShadow: `0 0 20px ${emirate.color}60`,
                    }}
                    onClick={() => setSelectedEmirate(key)}
                  >
                    {emirate.name_en.slice(0, 2).toUpperCase()}
                  </div>

                  {/* Zones */}
                  {emirate.zones.map((zone, idx) => {
                    const zoneX = ((zone.lng - 51) / 8) * 100;
                    const zoneY = ((28 - zone.lat) / 6) * 100;

                    return (
                      <div key={idx}>
                        {/* Zone Marker */}
                        <div
                          className="absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-300"
                          style={{
                            left: `${zoneX}%`,
                            top: `${zoneY}%`,
                            backgroundColor:
                              zone.opportunities > 50
                                ? "#ef4444"
                                : zone.opportunities > 20
                                  ? "#f59e0b"
                                  : "#10b981",
                            boxShadow: `0 0 10px ${zone.opportunities > 50 ? "#ef4444" : zone.opportunities > 20 ? "#f59e0b" : "#10b981"}40`,
                          }}
                          onClick={() => setSelectedZone(zone)}
                        />

                        {/* Zone Info on Hover */}
                        {selectedZone?.name_en === zone.name_en && (
                          <div
                            className="absolute bg-black/80 backdrop-blur-lg rounded-xl p-3 min-w-64 z-30 border border-emerald-400/30"
                            style={{
                              left: `${zoneX + 2}%`,
                              top: `${zoneY - 10}%`,
                            }}
                          >
                            <h4 className="text-white font-bold mb-1">
                              {zone[`name_${language}` as keyof typeof zone]}
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between text-emerald-300">
                                <span>{tr.projectsCount}:</span>
                                <span className="font-semibold">
                                  {zone.projects}
                                </span>
                              </div>
                              <div className="flex justify-between text-amber-300">
                                <span>{tr.opportunitiesCount}:</span>
                                <span className="font-semibold">
                                  {zone.opportunities}
                                </span>
                              </div>
                              <div className="flex justify-between text-blue-300">
                                <span>{tr.opportunityScore}:</span>
                                <span className="font-semibold">
                                  {Math.min(
                                    95,
                                    zone.opportunities + zone.projects,
                                  )}
                                  %
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                            >
                              {tr.viewDetails}
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Live Alerts on Map */}
            {showAlerts &&
              liveData.slice(0, 5).map((alert, idx) => {
                const alertX = ((alert.lng - 51) / 8) * 100;
                const alertY = ((28 - alert.lat) / 6) * 100;

                return (
                  <div key={alert.id}>
                    {/* Alert Pulse */}
                    <div
                      className="absolute w-8 h-8 rounded-full animate-ping opacity-40"
                      style={{
                        left: `${alertX}%`,
                        top: `${alertY}%`,
                        backgroundColor:
                          alert.type === "new_construction"
                            ? "#ef4444"
                            : alert.type === "property_sale"
                              ? "#f59e0b"
                              : "#8b5cf6",
                        transform: "translate(-50%, -50%)",
                      }}
                    />

                    {/* Alert Icon */}
                    <div
                      className="absolute w-4 h-4 rounded-full cursor-pointer flex items-center justify-center text-white text-xs transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-transform z-20"
                      style={{
                        left: `${alertX}%`,
                        top: `${alertY}%`,
                        backgroundColor:
                          alert.type === "new_construction"
                            ? "#ef4444"
                            : alert.type === "property_sale"
                              ? "#f59e0b"
                              : "#8b5cf6",
                      }}
                    >
                      {alert.type === "new_construction" && "🏗️"}
                      {alert.type === "property_sale" && "🏡"}
                      {alert.type === "development_permit" && "📋"}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Live Alerts Panel */}
        <div className="w-80 bg-black/30 backdrop-blur-lg border-l border-emerald-400/20 overflow-hidden">
          <div className="p-4 border-b border-emerald-400/20">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-400" />
              {tr.liveAlerts}
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-auto" />
            </h3>
          </div>

          <div className="h-full overflow-y-auto p-4 space-y-3">
            {liveData.map((alert) => (
              <div
                key={alert.id}
                className="bg-white/5 rounded-xl p-4 border border-emerald-400/20 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{
                      backgroundColor:
                        alert.type === "new_construction"
                          ? "#ef444420"
                          : alert.type === "property_sale"
                            ? "#f59e0b20"
                            : "#8b5cf620",
                    }}
                  >
                    {alert.type === "new_construction" && "🏗️"}
                    {alert.type === "property_sale" && "🏡"}
                    {alert.type === "development_permit" && "📋"}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {alert[`title_${language}` as keyof typeof alert]}
                    </h4>
                    <p className="text-emerald-300/80 text-xs mb-2">
                      {alert[`description_${language}` as keyof typeof alert]}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-amber-300 font-bold text-sm">
                        {alert.value}
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-semibold">
                          {alert.opportunity_score}%
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white border-0 text-xs"
                      >
                        {tr.viewDetails}
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white border-0 text-xs"
                      >
                        {tr.submitProposal}
                      </Button>
                    </div>

                    <p className="text-emerald-400/60 text-xs mt-2">
                      {alert.created_at}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
