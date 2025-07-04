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
  Star,
  Award,
  Compass,
  Route,
  Camera,
  Play,
  Maximize,
  Sun,
  Cloud,
  Wind,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Advanced UAE Emirates with detailed zones and real coordinates
const UAE_ADVANCED_DATA = {
  emirates: [
    {
      id: "dubai",
      name_ar: "دبي",
      name_en: "Dubai",
      center: { lat: 25.2048, lng: 55.2708 },
      zoom: 11,
      color: "#FF6B6B",
      gradient: ["#FF6B6B", "#FF8E53"],
      population: 3.5,
      area: 4114,
      zones: [
        {
          id: "dubai_marina",
          name_ar: "دبي مارينا",
          name_en: "Dubai Marina",
          coords: { lat: 25.0814, lng: 55.1391 },
          type: "luxury",
          projects: 156,
          opportunities: 89,
          avg_value: 4.5,
          activity_level: 95,
          landmarks: ["Marina Walk", "JBR Beach", "Marina Mall"],
        },
        {
          id: "downtown",
          name_ar: "داون تاون",
          name_en: "Downtown Dubai",
          coords: { lat: 25.1972, lng: 55.2744 },
          type: "commercial",
          projects: 234,
          opportunities: 67,
          avg_value: 8.9,
          activity_level: 98,
          landmarks: ["Burj Khalifa", "Dubai Mall", "Opera District"],
        },
        {
          id: "jumeirah",
          name_ar: "جميرا",
          name_en: "Jumeirah",
          coords: { lat: 25.2252, lng: 55.2606 },
          type: "residential",
          projects: 178,
          opportunities: 123,
          avg_value: 6.2,
          activity_level: 87,
          landmarks: ["Burj Al Arab", "Jumeirah Beach", "Wild Wadi"],
        },
        {
          id: "dubai_hills",
          name_ar: "دبي هيلز",
          name_en: "Dubai Hills",
          coords: { lat: 25.1108, lng: 55.2453 },
          type: "residential",
          projects: 289,
          opportunities: 167,
          avg_value: 5.8,
          activity_level: 92,
          landmarks: ["Dubai Hills Mall", "Golf Course", "City Walk"],
        },
      ],
    },
    {
      id: "abudhabi",
      name_ar: "أبوظبي",
      name_en: "Abu Dhabi",
      center: { lat: 24.4539, lng: 54.3773 },
      zoom: 10,
      color: "#4ECDC4",
      gradient: ["#4ECDC4", "#44A08D"],
      population: 2.9,
      area: 67340,
      zones: [
        {
          id: "khalifa_city",
          name_ar: "مدينة خليفة",
          name_en: "Khalifa City",
          coords: { lat: 24.4187, lng: 54.5574 },
          type: "residential",
          projects: 345,
          opportunities: 234,
          avg_value: 3.2,
          activity_level: 78,
          landmarks: ["Khalifa Park", "Masdar City", "NYUAD"],
        },
        {
          id: "al_reef",
          name_ar: "الريف",
          name_en: "Al Reef",
          coords: { lat: 24.4298, lng: 54.6063 },
          type: "residential",
          projects: 267,
          opportunities: 189,
          avg_value: 2.8,
          activity_level: 85,
          landmarks: ["Al Reef Villas", "Community Center", "Parks"],
        },
        {
          id: "corniche",
          name_ar: "الكورنيش",
          name_en: "Corniche",
          coords: { lat: 24.4651, lng: 54.3661 },
          type: "commercial",
          projects: 123,
          opportunities: 67,
          avg_value: 7.5,
          activity_level: 94,
          landmarks: ["Emirates Palace", "Corniche Beach", "Marina Mall"],
        },
      ],
    },
    {
      id: "sharjah",
      name_ar: "الشارقة",
      name_en: "Sharjah",
      center: { lat: 25.3463, lng: 55.4209 },
      zoom: 11,
      color: "#A8E6CF",
      gradient: ["#A8E6CF", "#7FCDCD"],
      population: 1.7,
      area: 2590,
      zones: [
        {
          id: "al_rashidiya",
          name_ar: "الراشدية",
          name_en: "Al Rashidiya",
          coords: { lat: 25.3421, lng: 55.4652 },
          type: "residential",
          projects: 456,
          opportunities: 567,
          avg_value: 1.8,
          activity_level: 89,
          landmarks: ["Sahara Centre", "Al Qasba", "Blue Souk"],
        },
        {
          id: "muweilah",
          name_ar: "مويلح",
          name_en: "Muweilah",
          coords: { lat: 25.2847, lng: 55.4712 },
          type: "emerging",
          projects: 234,
          opportunities: 789,
          avg_value: 1.2,
          activity_level: 95,
          landmarks: ["University City", "Muweilah Commercial", "Hospital"],
        },
      ],
    },
    {
      id: "ajman",
      name_ar: "عجمان",
      name_en: "Ajman",
      center: { lat: 25.4052, lng: 55.5136 },
      zoom: 12,
      color: "#FFB74D",
      gradient: ["#FFB74D", "#FFA726"],
      population: 0.5,
      area: 259,
      zones: [
        {
          id: "al_nuaimiya",
          name_ar: "النعيمية",
          name_en: "Al Nuaimiya",
          coords: { lat: 25.4086, lng: 55.5342 },
          type: "hot_zone",
          projects: 789,
          opportunities: 1234,
          avg_value: 1.5,
          activity_level: 97,
          landmarks: ["Ajman Beach", "City Centre", "Corniche"],
        },
      ],
    },
    {
      id: "rak",
      name_ar: "رأس الخيمة",
      name_en: "Ras Al Khaimah",
      center: { lat: 25.7889, lng: 55.9598 },
      zoom: 11,
      color: "#BA68C8",
      gradient: ["#BA68C8", "#9C27B0"],
      population: 0.4,
      area: 1684,
      zones: [
        {
          id: "al_hamra",
          name_ar: "الحمرا",
          name_en: "Al Hamra",
          coords: { lat: 25.7621, lng: 55.8234 },
          type: "tourism",
          projects: 167,
          opportunities: 289,
          avg_value: 2.2,
          activity_level: 82,
          landmarks: ["Al Hamra Marina", "Golf Resort", "Beach Resort"],
        },
      ],
    },
    {
      id: "fujairah",
      name_ar: "الفجيرة",
      name_en: "Fujairah",
      center: { lat: 25.1208, lng: 56.3264 },
      zoom: 11,
      color: "#66BB6A",
      gradient: ["#66BB6A", "#43A047"],
      population: 0.3,
      area: 1166,
      zones: [
        {
          id: "fujairah_city",
          name_ar: "مدينة الفجيرة",
          name_en: "Fujairah City",
          coords: { lat: 25.1267, lng: 56.3414 },
          type: "coastal",
          projects: 123,
          opportunities: 234,
          avg_value: 1.8,
          activity_level: 76,
          landmarks: ["Fujairah Fort", "Al Bidya Mosque", "Beaches"],
        },
      ],
    },
    {
      id: "uaq",
      name_ar: "أم القيوين",
      name_en: "Umm Al Quwain",
      center: { lat: 25.5641, lng: 55.6552 },
      zoom: 12,
      color: "#FF7043",
      gradient: ["#FF7043", "#FF5722"],
      population: 0.08,
      area: 777,
      zones: [
        {
          id: "uaq_city",
          name_ar: "مدينة أم القيوين",
          name_en: "UAQ City",
          coords: { lat: 25.5523, lng: 55.6734 },
          type: "heritage",
          projects: 89,
          opportunities: 456,
          avg_value: 1.1,
          activity_level: 71,
          landmarks: ["UAQ Fort", "Marine Club", "Mangroves"],
        },
      ],
    },
  ],
};

// Live activity data
const LIVE_ACTIVITIES = [
  {
    id: 1,
    type: "construction",
    title_ar: "🏗️ مشروع جديد قيد الإنشاء",
    title_en: "🏗️ New Construction Project",
    location: { lat: 25.4086, lng: 55.5342 },
    emirate: "ajman",
    zone: "al_nuaimiya",
    value: "2.5M AED",
    intensity: 95,
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: 2,
    type: "sale",
    title_ar: "💰 صفقة عقارية ضخمة",
    title_en: "💰 Major Property Sale",
    location: { lat: 25.2252, lng: 55.2606 },
    emirate: "dubai",
    zone: "jumeirah",
    value: "15M AED",
    intensity: 88,
    timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
  },
  {
    id: 3,
    type: "opportunity",
    title_ar: "⭐ فرصة استثمارية ذهبية",
    title_en: "⭐ Golden Investment Opportunity",
    location: { lat: 25.3421, lng: 55.4652 },
    emirate: "sharjah",
    zone: "al_rashidiya",
    value: "Hot Zone",
    intensity: 92,
    timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
  },
];

interface StunningUAEMapProps {
  language: "en" | "ar";
}

export default function StunningUAEMap({ language }: StunningUAEMapProps) {
  const [selectedEmirate, setSelectedEmirate] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [mapStyle, setMapStyle] = useState<
    "satellite" | "terrain" | "hybrid" | "dark"
  >("hybrid");
  const [viewMode, setViewMode] = useState<
    "overview" | "detailed" | "analytics"
  >("overview");
  const [isAnimating, setIsAnimating] = useState(true);
  const [liveActivities, setLiveActivities] = useState(LIVE_ACTIVITIES);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [show3D, setShow3D] = useState(false);
  const [weather, setWeather] = useState({
    temp: 28,
    condition: "sunny",
    wind: 12,
  });
  const mapRef = useRef<HTMLDivElement>(null);

  const t = {
    ar: {
      stunningMap: "خريطة الإمارات التفاعلية الخارقة",
      realTimeIntelligence: "الذكاء الجغرافي المباشر",
      mapStyles: "أنماط الخريطة",
      satellite: "الأقمار الصناعية",
      terrain: "التضاريس",
      hybrid: "مختلط",
      dark: "المظهر الليلي",
      viewModes: "أوضاع العرض",
      overview: "نظرة عامة",
      detailed: "تفصيلي",
      analytics: "التحليلات",
      liveActivity: "النشاط المباشر",
      emirateStats: "إحصائيات الإمارة",
      zoneAnalysis: "تحليل المنطقة",
      population: "السكان",
      projects: "المشاريع",
      opportunities: "الفرص",
      avgValue: "القيمة المتوسطة",
      activityLevel: "مستوى النشاط",
      million: "مليون",
      thousand: "ألف",
      viewDetails: "عرض التفاصيل",
      exploreZone: "استكشاف المنطقة",
      hotZone: "منطقة ساخنة",
      emergingArea: "منطقة نامية",
      premiumLocation: "موقع متميز",
      weatherToday: "الطقس اليوم",
      temperature: "درجة الحرارة",
      windSpeed: "سرعة الرياح",
      enable3D: "تفعيل 3D",
      toggleHeatmap: "خريطة حرارية",
      liveUpdates: "تحديثات مباشرة",
    },
    en: {
      stunningMap: "Stunning Interactive UAE Map",
      realTimeIntelligence: "Real-time Geographic Intelligence",
      mapStyles: "Map Styles",
      satellite: "Satellite",
      terrain: "Terrain",
      hybrid: "Hybrid",
      dark: "Dark Mode",
      viewModes: "View Modes",
      overview: "Overview",
      detailed: "Detailed",
      analytics: "Analytics",
      liveActivity: "Live Activity",
      emirateStats: "Emirate Statistics",
      zoneAnalysis: "Zone Analysis",
      population: "Population",
      projects: "Projects",
      opportunities: "Opportunities",
      avgValue: "Avg Value",
      activityLevel: "Activity Level",
      million: "Million",
      thousand: "K",
      viewDetails: "View Details",
      exploreZone: "Explore Zone",
      hotZone: "Hot Zone",
      emergingArea: "Emerging Area",
      premiumLocation: "Premium Location",
      weatherToday: "Weather Today",
      temperature: "Temperature",
      windSpeed: "Wind Speed",
      enable3D: "Enable 3D",
      toggleHeatmap: "Toggle Heatmap",
      liveUpdates: "Live Updates",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newActivity = {
          id: Date.now(),
          type: ["construction", "sale", "opportunity"][
            Math.floor(Math.random() * 3)
          ] as any,
          title_ar: "🔥 نشاط جديد مكتشف",
          title_en: "🔥 New Activity Detected",
          location: {
            lat: 25.2 + (Math.random() - 0.5) * 0.8,
            lng: 55.3 + (Math.random() - 0.5) * 0.8,
          },
          emirate: "dubai",
          zone: "downtown",
          value: `${(Math.random() * 10 + 1).toFixed(1)}M AED`,
          intensity: Math.floor(Math.random() * 30 + 70),
          timestamp: Date.now(),
        };

        setLiveActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  // Get emirate by coordinates
  const getEmirateAtCoords = (lat: number, lng: number) => {
    return UAE_ADVANCED_DATA.emirates.find((emirate) => {
      const distance = Math.sqrt(
        Math.pow(lat - emirate.center.lat, 2) +
          Math.pow(lng - emirate.center.lng, 2),
      );
      return distance < 0.5; // Simple proximity check
    });
  };

  // Calculate position on screen
  const getScreenPosition = (lat: number, lng: number) => {
    // UAE bounds: lat 22.5-26.5, lng 51-57
    const x = ((lng - 51) / 6) * 100;
    const y = ((26.5 - lat) / 4) * 100;
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  // Get zone type styling
  const getZoneTypeStyle = (type: string) => {
    switch (type) {
      case "hot_zone":
        return "bg-red-500/80 border-red-400 shadow-red-500/50";
      case "luxury":
        return "bg-purple-500/80 border-purple-400 shadow-purple-500/50";
      case "emerging":
        return "bg-green-500/80 border-green-400 shadow-green-500/50";
      case "commercial":
        return "bg-blue-500/80 border-blue-400 shadow-blue-500/50";
      case "residential":
        return "bg-orange-500/80 border-orange-400 shadow-orange-500/50";
      default:
        return "bg-gray-500/80 border-gray-400 shadow-gray-500/50";
    }
  };

  const formatValue = (value: number) => {
    if (value >= 1) return `${value.toFixed(1)}M`;
    return `${(value * 1000).toFixed(0)}K`;
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Advanced Header */}
      <div
        className={`p-6 border-b border-white/10 bg-black/20 backdrop-blur-xl ${isRTL ? "text-right" : "text-left"}`}
      >
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {tr.stunningMap}
            </h2>
            <p className="text-blue-300/80 flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse" />
              {tr.realTimeIntelligence}
            </p>
          </div>

          {/* Weather Widget */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-white font-bold">{weather.temp}°C</p>
                <p className="text-blue-300/80 text-sm">{tr.weatherToday}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Controls */}
      <div className="p-4 border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Map Style Controls */}
          <div className="flex items-center gap-2">
            <span className="text-blue-300 text-sm font-medium">
              {tr.mapStyles}:
            </span>
            {[
              { key: "satellite", icon: Satellite, label: tr.satellite },
              { key: "terrain", icon: Layers, label: tr.terrain },
              { key: "hybrid", icon: Navigation, label: tr.hybrid },
              { key: "dark", icon: Settings, label: tr.dark },
            ].map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                variant={mapStyle === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setMapStyle(key as any)}
                className={
                  mapStyle === key
                    ? "bg-blue-500 text-white border-0"
                    : "text-blue-300 hover:text-white hover:bg-blue-500/20 border-0"
                }
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-2">
            <span className="text-blue-300 text-sm font-medium">
              {tr.viewModes}:
            </span>
            {[
              { key: "overview", icon: Eye, label: tr.overview },
              { key: "detailed", icon: Search, label: tr.detailed },
              { key: "analytics", icon: BarChart3, label: tr.analytics },
            ].map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                variant={viewMode === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(key as any)}
                className={
                  viewMode === key
                    ? "bg-cyan-500 text-white border-0"
                    : "text-cyan-300 hover:text-white hover:bg-cyan-500/20 border-0"
                }
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>

          {/* Advanced Toggles */}
          <div className="flex items-center gap-2">
            <Button
              variant={showHeatmap ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={
                showHeatmap
                  ? "bg-red-500 text-white border-0"
                  : "text-red-300 hover:text-white hover:bg-red-500/20 border-0"
              }
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              {tr.toggleHeatmap}
            </Button>

            <Button
              variant={show3D ? "default" : "ghost"}
              size="sm"
              onClick={() => setShow3D(!show3D)}
              className={
                show3D
                  ? "bg-purple-500 text-white border-0"
                  : "text-purple-300 hover:text-white hover:bg-purple-500/20 border-0"
              }
            >
              <Maximize className="w-4 h-4 mr-1" />
              {tr.enable3D}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[600px]">
        {/* Stunning 3D Map Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={mapRef}
            className={`w-full h-full relative transition-all duration-1000 ${
              mapStyle === "satellite"
                ? "bg-gradient-to-br from-blue-900 via-green-800 to-yellow-700"
                : mapStyle === "dark"
                  ? "bg-gradient-to-br from-gray-900 via-slate-800 to-black"
                  : mapStyle === "terrain"
                    ? "bg-gradient-to-br from-amber-800 via-green-700 to-blue-600"
                    : "bg-gradient-to-br from-blue-800 via-cyan-600 to-teal-500"
            }`}
          >
            {/* Animated Background Grid */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-20">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="50"
                      height="50"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 50 0 L 0 0 0 50"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </div>

            {/* 3D Terrain Effect */}
            {show3D && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent transform perspective-1000 rotate-x-12"></div>
              </div>
            )}

            {/* Emirates Visualization */}
            {UAE_ADVANCED_DATA.emirates.map((emirate) => {
              const pos = getScreenPosition(
                emirate.center.lat,
                emirate.center.lng,
              );
              const isSelected = selectedEmirate === emirate.id;

              return (
                <div key={emirate.id} className="absolute">
                  {/* Emirate Boundary Glow */}
                  <div
                    className={`absolute rounded-full transition-all duration-700 ${
                      isSelected ? "animate-pulse scale-110" : "scale-100"
                    }`}
                    style={{
                      left: `${pos.x - 12}%`,
                      top: `${pos.y - 12}%`,
                      width: "24%",
                      height: "24%",
                      background: `radial-gradient(circle, ${emirate.color}20 0%, ${emirate.color}10 50%, transparent 100%)`,
                      border: `2px solid ${emirate.color}60`,
                      boxShadow: `0 0 30px ${emirate.color}40, inset 0 0 20px ${emirate.color}20`,
                    }}
                  />

                  {/* Emirate Central Hub */}
                  <div
                    className={`absolute cursor-pointer transform transition-all duration-500 hover:scale-125 ${
                      isSelected ? "scale-110 z-20" : "scale-100 z-10"
                    }`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() =>
                      setSelectedEmirate(isSelected ? null : emirate.id)
                    }
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-2xl backdrop-blur-sm border-2 border-white/30"
                      style={{
                        background: `linear-gradient(135deg, ${emirate.gradient[0]}CC, ${emirate.gradient[1]}CC)`,
                        boxShadow: `0 8px 32px ${emirate.color}60, 0 0 24px ${emirate.color}40`,
                      }}
                    >
                      {emirate.name_en.slice(0, 3).toUpperCase()}
                    </div>

                    {/* Emirate Label */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1 border border-white/20">
                      <p className="text-white font-semibold text-sm whitespace-nowrap">
                        {emirate[`name_${language}` as keyof typeof emirate]}
                      </p>
                      <p className="text-cyan-300 text-xs">
                        {emirate.population}M {tr.population}
                      </p>
                    </div>
                  </div>

                  {/* Zones for Selected Emirate */}
                  {isSelected &&
                    emirate.zones.map((zone, zoneIdx) => {
                      const zonePos = getScreenPosition(
                        zone.coords.lat,
                        zone.coords.lng,
                      );

                      return (
                        <div key={zone.id} className="absolute z-30">
                          {/* Zone Connection Line */}
                          <svg
                            className="absolute pointer-events-none"
                            style={{
                              left: `${Math.min(pos.x, zonePos.x)}%`,
                              top: `${Math.min(pos.y, zonePos.y)}%`,
                              width: `${Math.abs(pos.x - zonePos.x)}%`,
                              height: `${Math.abs(pos.y - zonePos.y)}%`,
                            }}
                          >
                            <line
                              x1={pos.x > zonePos.x ? "100%" : "0%"}
                              y1={pos.y > zonePos.y ? "100%" : "0%"}
                              x2={pos.x > zonePos.x ? "0%" : "100%"}
                              y2={pos.y > zonePos.y ? "0%" : "100%"}
                              stroke={emirate.color}
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              className="animate-pulse"
                              opacity="0.6"
                            />
                          </svg>

                          {/* Zone Marker */}
                          <div
                            className="absolute cursor-pointer transform transition-all duration-300 hover:scale-110"
                            style={{
                              left: `${zonePos.x}%`,
                              top: `${zonePos.y}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                            onClick={() => setSelectedZone(zone)}
                          >
                            {/* Zone Pulse Effect */}
                            <div
                              className="absolute inset-0 rounded-full animate-ping"
                              style={{
                                backgroundColor:
                                  zone.activity_level > 90
                                    ? "#ef4444"
                                    : zone.activity_level > 70
                                      ? "#f59e0b"
                                      : "#10b981",
                                width: "40px",
                                height: "40px",
                                left: "-20px",
                                top: "-20px",
                              }}
                            />

                            {/* Zone Icon */}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white/50 ${getZoneTypeStyle(zone.type)}`}
                              style={{
                                boxShadow: `0 4px 20px ${
                                  zone.activity_level > 90
                                    ? "#ef4444"
                                    : zone.activity_level > 70
                                      ? "#f59e0b"
                                      : "#10b981"
                                }60`,
                              }}
                            >
                              {zone.activity_level > 90 && "🔥"}
                              {zone.activity_level <= 90 &&
                                zone.activity_level > 70 &&
                                "⭐"}
                              {zone.activity_level <= 70 && "💎"}
                            </div>

                            {/* Zone Info Tooltip */}
                            <div className="absolute left-12 top-0 bg-black/90 backdrop-blur-md rounded-xl p-3 min-w-64 border border-white/20 transform opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <h4 className="text-white font-bold mb-2">
                                {zone[`name_${language}` as keyof typeof zone]}
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-cyan-300">
                                  <span>{tr.projects}: </span>
                                  <span className="text-white font-semibold">
                                    {zone.projects}
                                  </span>
                                </div>
                                <div className="text-green-300">
                                  <span>{tr.opportunities}: </span>
                                  <span className="text-white font-semibold">
                                    {zone.opportunities}
                                  </span>
                                </div>
                                <div className="text-yellow-300">
                                  <span>{tr.avgValue}: </span>
                                  <span className="text-white font-semibold">
                                    {formatValue(zone.avg_value)} AED
                                  </span>
                                </div>
                                <div className="text-purple-300">
                                  <span>{tr.activityLevel}: </span>
                                  <span className="text-white font-semibold">
                                    {zone.activity_level}%
                                  </span>
                                </div>
                              </div>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {zone.landmarks
                                  .slice(0, 2)
                                  .map((landmark, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                                    >
                                      {landmark}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

            {/* Live Activities Overlay */}
            {liveActivities.slice(0, 5).map((activity, idx) => {
              const actPos = getScreenPosition(
                activity.location.lat,
                activity.location.lng,
              );
              const age = (Date.now() - activity.timestamp) / (1000 * 60); // minutes

              return (
                <div
                  key={activity.id}
                  className="absolute z-40 animate-bounce"
                  style={{
                    left: `${actPos.x}%`,
                    top: `${actPos.y}%`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${idx * 0.2}s`,
                  }}
                >
                  {/* Activity Pulse */}
                  <div
                    className={`absolute inset-0 rounded-full animate-ping ${
                      activity.type === "construction"
                        ? "bg-red-500"
                        : activity.type === "sale"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                    style={{
                      width: "20px",
                      height: "20px",
                      left: "-10px",
                      top: "-10px",
                      opacity: Math.max(0.1, 1 - age / 60), // Fade over 1 hour
                    }}
                  />

                  {/* Activity Icon */}
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs ${
                      activity.type === "construction"
                        ? "bg-red-500"
                        : activity.type === "sale"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                  >
                    {activity.type === "construction" && "🏗️"}
                    {activity.type === "sale" && "💰"}
                    {activity.type === "opportunity" && "⭐"}
                  </div>
                </div>
              );
            })}

            {/* Heatmap Overlay */}
            {showHeatmap && (
              <div className="absolute inset-0 pointer-events-none">
                {UAE_ADVANCED_DATA.emirates.map((emirate) =>
                  emirate.zones.map((zone) => {
                    const pos = getScreenPosition(
                      zone.coords.lat,
                      zone.coords.lng,
                    );
                    const intensity = zone.activity_level / 100;

                    return (
                      <div
                        key={`heat-${zone.id}`}
                        className="absolute rounded-full"
                        style={{
                          left: `${pos.x}%`,
                          top: `${pos.y}%`,
                          width: `${8 + intensity * 12}%`,
                          height: `${8 + intensity * 12}%`,
                          background: `radial-gradient(circle, rgba(255,${255 - intensity * 100},0,${intensity * 0.6}) 0%, transparent 70%)`,
                          transform: "translate(-50%, -50%)",
                          filter: "blur(8px)",
                        }}
                      />
                    );
                  }),
                )}
              </div>
            )}

            {/* Floating Analytics */}
            {viewMode === "analytics" && (
              <div className="absolute top-4 right-4 space-y-2">
                {UAE_ADVANCED_DATA.emirates.slice(0, 4).map((emirate, idx) => (
                  <div
                    key={emirate.id}
                    className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-white/20 min-w-48"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: emirate.color }}
                      />
                      <span className="text-white font-semibold text-sm">
                        {emirate[`name_${language}` as keyof typeof emirate]}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-cyan-300">
                        Projects:{" "}
                        <span className="text-white font-semibold">
                          {emirate.zones.reduce(
                            (sum, zone) => sum + zone.projects,
                            0,
                          )}
                        </span>
                      </div>
                      <div className="text-green-300">
                        Opportunities:{" "}
                        <span className="text-white font-semibold">
                          {emirate.zones.reduce(
                            (sum, zone) => sum + zone.opportunities,
                            0,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="w-80 bg-black/30 backdrop-blur-lg border-l border-white/10">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400 animate-pulse" />
              {tr.liveActivity}
            </h3>
          </div>

          <div className="h-full overflow-y-auto p-4 space-y-3">
            {liveActivities.map((activity) => {
              const age = Math.floor(
                (Date.now() - activity.timestamp) / (1000 * 60),
              );

              return (
                <div
                  key={activity.id}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        activity.type === "construction"
                          ? "bg-red-500/20 text-red-300"
                          : activity.type === "sale"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {activity.type === "construction" && "🏗️"}
                      {activity.type === "sale" && "💰"}
                      {activity.type === "opportunity" && "⭐"}
                    </div>

                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm">
                        {activity[`title_${language}` as keyof typeof activity]}
                      </h4>
                      <p className="text-blue-300/80 text-xs mt-1">
                        {activity.emirate} • {activity.zone}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-cyan-400 font-bold text-sm">
                          {activity.value}
                        </span>
                        <span className="text-white/60 text-xs">
                          {age}m ago
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
