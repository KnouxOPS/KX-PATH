import { useState, useEffect, useRef, useCallback } from "react";
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
  Pause,
  Maximize,
  Sun,
  Cloud,
  Wind,
  Thermometer,
  Droplets,
  Wifi,
  Signal,
  Battery,
  Phone,
  Mail,
  Globe,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Share,
  Download,
  Upload,
  RefreshCw,
  Calendar,
  Timer,
  Volume2,
  PlusCircle,
  MinusCircle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move3d,
  Sliders,
  Crosshair,
  MousePointer,
  Hand,
  Square,
  Circle,
  Polygon,
  Ruler,
  PaintBucket,
  FlashLightIcon as Flashlight,
  Bookmark,
  Flag,
  Radio,
  Wifi as WifiIcon,
  Map,
  Globe2,
  Fullscreen,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Comprehensive Real Estate Market Data Structure
interface MarketDataPoint {
  id: string;
  type:
    | "property_sale"
    | "new_construction"
    | "permit_issued"
    | "price_change"
    | "investment_opportunity"
    | "zoning_change"
    | "infrastructure_development"
    | "market_trend"
    | "competitor_activity"
    | "government_announcement";
  coordinates: { lat: number; lng: number };
  timestamp: string;
  status: "active" | "pending" | "completed" | "cancelled";
  priority: "critical" | "high" | "medium" | "low";

  // Property Details
  property: {
    id: string;
    type: "villa" | "apartment" | "commercial" | "land" | "industrial";
    size_sqm: number;
    price_aed: number;
    price_per_sqm: number;
    bedrooms?: number;
    bathrooms?: number;
    parking?: number;
    age_years?: number;
    condition: "new" | "excellent" | "good" | "fair" | "renovation_needed";
  };

  // Location Intelligence
  location: {
    emirate: string;
    city: string;
    district: string;
    neighborhood: string;
    street_name: string;
    plot_number?: string;
    building_name?: string;
    landmarks_nearby: string[];
    accessibility_score: number;
    infrastructure_score: number;
  };

  // Market Analytics
  market_data: {
    current_market_value: number;
    predicted_value_6m: number;
    predicted_value_1y: number;
    roi_potential: number;
    rental_yield?: number;
    price_trend: "increasing" | "stable" | "decreasing";
    demand_level: "very_high" | "high" | "medium" | "low";
    supply_level: "scarce" | "limited" | "adequate" | "abundant";
    competition_level: "high" | "medium" | "low";
  };

  // Visual Representation
  display: {
    icon: string;
    color: string;
    size: "small" | "medium" | "large" | "xl";
    animation: "pulse" | "bounce" | "glow" | "static";
    layer: string;
    z_index: number;
  };

  // Interaction Data
  interaction: {
    clickable: boolean;
    hover_info: boolean;
    detailed_popup: boolean;
    actions_available: string[];
    contact_info?: {
      agent_name: string;
      agent_phone: string;
      agent_email: string;
      company: string;
    };
  };
}

// Real UAE Districts with Precise Coordinates and Market Data
const UAE_DISTRICTS_COMPREHENSIVE = {
  dubai: {
    business_bay: {
      name_ar: "الخليج التجاري",
      name_en: "Business Bay",
      bounds: {
        north: 25.195,
        south: 25.184,
        east: 55.27,
        west: 55.256,
      },
      center: { lat: 25.1897, lng: 55.2632 },
      market_stats: {
        avg_price_per_sqm: 12500,
        total_properties: 15420,
        new_listings_monthly: 180,
        avg_rental_yield: 6.8,
        growth_rate_annual: 8.5,
        demand_score: 92,
        luxury_factor: 85,
      },
      infrastructure: {
        metro_stations: ["Business Bay", "First Gulf Bank"],
        hospitals: ["Mediclinic City Hospital"],
        schools: ["GEMS World Academy", "Brighton College"],
        malls: ["Business Bay Mall"],
        beaches_nearby: ["JBR Beach", "Kite Beach"],
        distance_to_airport: 15,
      },
      live_feed_sources: [
        "dubizzle_api",
        "bayut_api",
        "property_finder",
        "rera_permits",
      ],
    },
    jumeirah: {
      name_ar: "جميرا",
      name_en: "Jumeirah",
      bounds: {
        north: 25.235,
        south: 25.215,
        east: 55.27,
        west: 55.245,
      },
      center: { lat: 25.2252, lng: 55.2606 },
      market_stats: {
        avg_price_per_sqm: 18500,
        total_properties: 8950,
        new_listings_monthly: 95,
        avg_rental_yield: 5.2,
        growth_rate_annual: 12.3,
        demand_score: 98,
        luxury_factor: 95,
      },
      infrastructure: {
        metro_stations: [],
        hospitals: ["American Hospital"],
        schools: ["Jumeirah College", "Dubai British School"],
        malls: ["Mercato Mall", "City Walk"],
        beaches_nearby: ["Jumeirah Beach", "Sunset Beach"],
        distance_to_airport: 25,
      },
      live_feed_sources: ["dubizzle_api", "bayut_api", "luxury_properties_api"],
    },
  },
  abudhabi: {
    khalifa_city: {
      name_ar: "مدينة خليفة",
      name_en: "Khalifa City",
      bounds: {
        north: 24.43,
        south: 24.4,
        east: 54.57,
        west: 54.54,
      },
      center: { lat: 24.4187, lng: 54.5574 },
      market_stats: {
        avg_price_per_sqm: 8500,
        total_properties: 18600,
        new_listings_monthly: 220,
        avg_rental_yield: 7.5,
        growth_rate_annual: 6.8,
        demand_score: 78,
        luxury_factor: 65,
      },
      infrastructure: {
        metro_stations: [],
        hospitals: ["Cleveland Clinic Abu Dhabi"],
        schools: ["ADNOC Schools", "British School Al Khubairat"],
        malls: ["Khalifa City Mall"],
        beaches_nearby: ["Saadiyat Beach"],
        distance_to_airport: 45,
      },
      live_feed_sources: ["bayut_api", "property_finder", "abu_dhabi_dmt"],
    },
  },
  sharjah: {
    al_majaz: {
      name_ar: "المجاز",
      name_en: "Al Majaz",
      bounds: {
        north: 25.335,
        south: 25.32,
        east: 55.395,
        west: 55.38,
      },
      center: { lat: 25.3278, lng: 55.3892 },
      market_stats: {
        avg_price_per_sqm: 6800,
        total_properties: 12400,
        new_listings_monthly: 140,
        avg_rental_yield: 8.2,
        growth_rate_annual: 11.5,
        demand_score: 85,
        luxury_factor: 55,
      },
      infrastructure: {
        metro_stations: [],
        hospitals: ["University Hospital Sharjah"],
        schools: ["American School of Creative Science"],
        malls: ["Sahara Centre", "City Centre Sharjah"],
        beaches_nearby: ["Al Majaz Waterfront"],
        distance_to_airport: 20,
      },
      live_feed_sources: ["bayut_api", "property_finder", "sharjah_rera"],
    },
  },
  ajman: {
    al_nuaimiya: {
      name_ar: "النعيمية",
      name_en: "Al Nuaimiya",
      bounds: {
        north: 25.415,
        south: 25.4,
        east: 55.54,
        west: 55.525,
      },
      center: { lat: 25.4086, lng: 55.5342 },
      market_stats: {
        avg_price_per_sqm: 4200,
        total_properties: 28900,
        new_listings_monthly: 380,
        avg_rental_yield: 9.8,
        growth_rate_annual: 15.2,
        demand_score: 94,
        luxury_factor: 35,
      },
      infrastructure: {
        metro_stations: [],
        hospitals: ["Gulf Medical College Hospital"],
        schools: ["City School International"],
        malls: ["City Centre Ajman"],
        beaches_nearby: ["Ajman Beach"],
        distance_to_airport: 35,
      },
      live_feed_sources: ["bayut_api", "property_finder", "ajman_dmt"],
    },
  },
};

// Map Layer Configuration
interface MapLayer {
  id: string;
  name_ar: string;
  name_en: string;
  type: "base" | "overlay" | "data" | "analysis";
  enabled: boolean;
  opacity: number;
  z_index: number;
  data_source: string;
  update_frequency: number; // seconds
  color_scheme: string[];
  icon_set: string;
}

// Drawing Tools
interface DrawingTool {
  id: string;
  name_ar: string;
  name_en: string;
  icon: any;
  cursor: string;
  active: boolean;
}

interface UltimateLiveMapProps {
  language: "en" | "ar";
}

export default function UltimateLiveMap({ language }: UltimateLiveMapProps) {
  // Core State Management
  const [mapReady, setMapReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<
    "2d" | "3d" | "satellite" | "terrain" | "hybrid"
  >("satellite");
  const [zoomLevel, setZoomLevel] = useState(11);
  const [mapCenter, setMapCenter] = useState({ lat: 25.2048, lng: 55.2708 });

  // Data State
  const [liveDataPoints, setLiveDataPoints] = useState<MarketDataPoint[]>([]);
  const [selectedDataPoint, setSelectedDataPoint] =
    useState<MarketDataPoint | null>(null);
  const [filteredData, setFilteredData] = useState<MarketDataPoint[]>([]);

  // UI State
  const [layers, setLayers] = useState<MapLayer[]>([
    {
      id: "satellite",
      name_ar: "صور الأقمار الصناعية",
      name_en: "Satellite Imagery",
      type: "base",
      enabled: true,
      opacity: 1,
      z_index: 1,
      data_source: "mapbox_satellite",
      update_frequency: 86400,
      color_scheme: ["natural"],
      icon_set: "satellite",
    },
    {
      id: "terrain",
      name_ar: "التضاريس",
      name_en: "Terrain",
      type: "base",
      enabled: false,
      opacity: 0.8,
      z_index: 2,
      data_source: "mapbox_terrain",
      update_frequency: 86400,
      color_scheme: ["elevation"],
      icon_set: "terrain",
    },
    {
      id: "properties",
      name_ar: "العقارات",
      name_en: "Properties",
      type: "data",
      enabled: true,
      opacity: 0.9,
      z_index: 10,
      data_source: "real_estate_apis",
      update_frequency: 300,
      color_scheme: ["price_based"],
      icon_set: "properties",
    },
    {
      id: "construction",
      name_ar: "الإنشاءات",
      name_en: "Construction",
      type: "data",
      enabled: true,
      opacity: 0.8,
      z_index: 11,
      data_source: "permits_api",
      update_frequency: 600,
      color_scheme: ["status_based"],
      icon_set: "construction",
    },
    {
      id: "heatmap",
      name_ar: "الخريطة الحرارية",
      name_en: "Heatmap",
      type: "analysis",
      enabled: false,
      opacity: 0.6,
      z_index: 15,
      data_source: "analytics_engine",
      update_frequency: 1800,
      color_scheme: ["heat_gradient"],
      icon_set: "heatmap",
    },
    {
      id: "predictions",
      name_ar: "التنبؤات",
      name_en: "Predictions",
      type: "analysis",
      enabled: false,
      opacity: 0.7,
      z_index: 16,
      data_source: "ai_predictions",
      update_frequency: 3600,
      color_scheme: ["prediction_confidence"],
      icon_set: "predictions",
    },
  ]);

  // Filters State
  const [activeFilters, setActiveFilters] = useState({
    property_type: "all",
    price_range: { min: 0, max: 50000000 },
    emirate: "all",
    status: "all",
    priority: "all",
    date_range: "all",
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Drawing Tools State
  const [drawingMode, setDrawingMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState<DrawingTool | null>(null);
  const [drawnShapes, setDrawnShapes] = useState<any[]>([]);

  // Panel State
  const [showLayersPanel, setShowLayersPanel] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [showAnalyticsPanel, setShowAnalyticsPanel] = useState(false);
  const [showDrawingPanel, setShowDrawingPanel] = useState(false);

  // Real-time Updates
  const [liveUpdatesEnabled, setLiveUpdatesEnabled] = useState(true);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [updateFrequency, setUpdateFrequency] = useState(30); // seconds

  // Performance
  const [renderOptimization, setRenderOptimization] = useState(true);
  const [clusteringEnabled, setClusteringEnabled] = useState(true);
  const [maxDataPoints, setMaxDataPoints] = useState(1000);

  const mapRef = useRef<HTMLDivElement>(null);

  const t = {
    ar: {
      ultimateLiveMap: "الخريطة التفاعلية الحية الشاملة",
      connectedToLiveMarket: "مرتبطة بالسوق المباشر",
      viewModes: "أوضاع العرض",
      satellite: "الأقمار الصناعية",
      terrain: "التضاريس",
      hybrid: "مختلط",
      street: "الشوارع",
      mapLayers: "طبقات الخريطة",
      dataFilters: "مرشحات البيانات",
      searchMap: "البحث في الخريطة",
      drawingTools: "أدوات الرسم",
      analytics: "التحليلات",
      liveData: "البيانات المباشرة",
      realTimeUpdates: "التحديثات المباشرة",
      propertyTypes: "أنواع العقارات",
      priceRange: "نطاق السعر",
      location: "الموقع",
      status: "الحالة",
      priority: "الأولوية",
      villa: "فيلا",
      apartment: "شقة",
      commercial: "تجاري",
      land: "أرض",
      industrial: "صناعي",
      all: "الكل",
      active: "نشط",
      pending: "معلق",
      completed: "مكتمل",
      cancelled: "ملغي",
      critical: "حرج",
      high: "عالي",
      medium: "متوسط",
      low: "منخفض",
      searchPlaceholder: "البحث في العقارات، الشوارع، المناطق...",
      selectArea: "تحديد منطقة",
      drawPolygon: "رسم مضلع",
      drawCircle: "رسم دائرة",
      drawLine: "رسم خط",
      measure: "قياس",
      addNote: "إضافة ملاحظة",
      clearDrawings: "مسح الرسومات",
      exportMap: "تصدير الخريطة",
      shareLocation: "مشاركة الموقع",
      enableLiveUpdates: "تفعيل التحديثات المباشرة",
      lastUpdated: "آخر تحديث",
      dataPoints: "نقاط البيانات",
      loading: "جاري التحميل...",
      updating: "جاري التحديث...",
      zoomIn: "تكبير",
      zoomOut: "تصغير",
      resetView: "إعادة تعيين العرض",
      fullscreen: "ملء الشاشة",
      propertyDetails: "تفاصيل العقار",
      contactAgent: "التواصل مع الوكيل",
      viewPhotos: "عرض الصور",
      scheduleTour: "جدولة جولة",
      saveProperty: "حفظ العقار",
      reportError: "الإبلاغ عن خطأ",
      marketValue: "القيمة السوقية",
      predictedValue: "القيمة المتوقعة",
      roiPotential: "إمكانية العائد",
      rentalYield: "العائد الإيجاري",
      demandLevel: "مستوى الطلب",
      supplyLevel: "مستوى العرض",
      pricePerSqm: "السعر للمتر المربع",
      totalArea: "المساحة الإجمالية",
      bedrooms: "غرف النوم",
      bathrooms: "دورات المياه",
      parking: "المواقف",
      ageYears: "العمر بالسنوات",
      condition: "الحالة",
      nearbyLandmarks: "معالم قريبة",
      infrastructureScore: "نقاط البنية التحتية",
      accessibilityScore: "نقاط سهولة الوصول",
    },
    en: {
      ultimateLiveMap: "Ultimate Live Interactive Map",
      connectedToLiveMarket: "Connected to Live Market Data",
      viewModes: "View Modes",
      satellite: "Satellite",
      terrain: "Terrain",
      hybrid: "Hybrid",
      street: "Street",
      mapLayers: "Map Layers",
      dataFilters: "Data Filters",
      searchMap: "Search Map",
      drawingTools: "Drawing Tools",
      analytics: "Analytics",
      liveData: "Live Data",
      realTimeUpdates: "Real-time Updates",
      propertyTypes: "Property Types",
      priceRange: "Price Range",
      location: "Location",
      status: "Status",
      priority: "Priority",
      villa: "Villa",
      apartment: "Apartment",
      commercial: "Commercial",
      land: "Land",
      industrial: "Industrial",
      all: "All",
      active: "Active",
      pending: "Pending",
      completed: "Completed",
      cancelled: "Cancelled",
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
      searchPlaceholder: "Search properties, streets, areas...",
      selectArea: "Select Area",
      drawPolygon: "Draw Polygon",
      drawCircle: "Draw Circle",
      drawLine: "Draw Line",
      measure: "Measure",
      addNote: "Add Note",
      clearDrawings: "Clear Drawings",
      exportMap: "Export Map",
      shareLocation: "Share Location",
      enableLiveUpdates: "Enable Live Updates",
      lastUpdated: "Last Updated",
      dataPoints: "Data Points",
      loading: "Loading...",
      updating: "Updating...",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      resetView: "Reset View",
      fullscreen: "Fullscreen",
      propertyDetails: "Property Details",
      contactAgent: "Contact Agent",
      viewPhotos: "View Photos",
      scheduleTour: "Schedule Tour",
      saveProperty: "Save Property",
      reportError: "Report Error",
      marketValue: "Market Value",
      predictedValue: "Predicted Value",
      roiPotential: "ROI Potential",
      rentalYield: "Rental Yield",
      demandLevel: "Demand Level",
      supplyLevel: "Supply Level",
      pricePerSqm: "Price per sqm",
      totalArea: "Total Area",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      parking: "Parking",
      ageYears: "Age (Years)",
      condition: "Condition",
      nearbyLandmarks: "Nearby Landmarks",
      infrastructureScore: "Infrastructure Score",
      accessibilityScore: "Accessibility Score",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Sample Live Data Generation
  const generateLiveMarketData = useCallback(() => {
    const sampleData: MarketDataPoint[] = [];

    Object.entries(UAE_DISTRICTS_COMPREHENSIVE).forEach(
      ([emirate, districts]) => {
        Object.entries(districts).forEach(([districtKey, district]) => {
          // Generate 10-20 random properties per district
          const propertyCount = Math.floor(Math.random() * 10) + 10;

          for (let i = 0; i < propertyCount; i++) {
            const lat = district.center.lat + (Math.random() - 0.5) * 0.02;
            const lng = district.center.lng + (Math.random() - 0.5) * 0.02;

            const propertyTypes = [
              "villa",
              "apartment",
              "commercial",
              "land",
            ] as const;
            const propertyType =
              propertyTypes[Math.floor(Math.random() * propertyTypes.length)];

            const basePrice = district.market_stats.avg_price_per_sqm;
            const size = Math.floor(Math.random() * 300 + 100);
            const totalPrice = basePrice * size * (0.8 + Math.random() * 0.4);

            const dataPoint: MarketDataPoint = {
              id: `${emirate}_${districtKey}_${i}`,
              type: Math.random() > 0.7 ? "new_construction" : "property_sale",
              coordinates: { lat, lng },
              timestamp: new Date(
                Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
              ).toISOString(),
              status: ["active", "pending"][
                Math.floor(Math.random() * 2)
              ] as any,
              priority: ["high", "medium", "low"][
                Math.floor(Math.random() * 3)
              ] as any,

              property: {
                id: `prop_${emirate}_${i}`,
                type: propertyType,
                size_sqm: size,
                price_aed: Math.floor(totalPrice),
                price_per_sqm: Math.floor(totalPrice / size),
                bedrooms:
                  propertyType === "villa"
                    ? Math.floor(Math.random() * 4) + 3
                    : Math.floor(Math.random() * 3) + 1,
                bathrooms: Math.floor(Math.random() * 3) + 2,
                parking: Math.floor(Math.random() * 3) + 1,
                age_years: Math.floor(Math.random() * 10),
                condition: ["new", "excellent", "good"][
                  Math.floor(Math.random() * 3)
                ] as any,
              },

              location: {
                emirate: emirate.charAt(0).toUpperCase() + emirate.slice(1),
                city: emirate.charAt(0).toUpperCase() + emirate.slice(1),
                district: district.name_en,
                neighborhood: `${district.name_en} ${Math.floor(Math.random() * 5) + 1}`,
                street_name: `Street ${Math.floor(Math.random() * 20) + 1}`,
                plot_number: `${Math.floor(Math.random() * 1000) + 1}`,
                landmarks_nearby: district.infrastructure.schools.slice(0, 2),
                accessibility_score: Math.floor(Math.random() * 30) + 70,
                infrastructure_score: Math.floor(Math.random() * 20) + 80,
              },

              market_data: {
                current_market_value: Math.floor(totalPrice),
                predicted_value_6m: Math.floor(
                  totalPrice * (1 + (Math.random() * 0.1 - 0.05)),
                ),
                predicted_value_1y: Math.floor(
                  totalPrice * (1 + (Math.random() * 0.2 - 0.1)),
                ),
                roi_potential: Math.floor(Math.random() * 15) + 5,
                rental_yield:
                  district.market_stats.avg_rental_yield +
                  (Math.random() * 2 - 1),
                price_trend: ["increasing", "stable", "decreasing"][
                  Math.floor(Math.random() * 3)
                ] as any,
                demand_level: ["high", "medium"][
                  Math.floor(Math.random() * 2)
                ] as any,
                supply_level: ["limited", "adequate"][
                  Math.floor(Math.random() * 2)
                ] as any,
                competition_level: ["medium", "low"][
                  Math.floor(Math.random() * 2)
                ] as any,
              },

              display: {
                icon:
                  propertyType === "villa"
                    ? "🏡"
                    : propertyType === "apartment"
                      ? "🏢"
                      : propertyType === "commercial"
                        ? "🏪"
                        : "🏞️",
                color:
                  totalPrice > basePrice * 200
                    ? "#ef4444"
                    : totalPrice > basePrice * 100
                      ? "#f59e0b"
                      : "#10b981",
                size: totalPrice > basePrice * 200 ? "large" : "medium",
                animation: Math.random() > 0.7 ? "pulse" : "static",
                layer: "properties",
                z_index: 10,
              },

              interaction: {
                clickable: true,
                hover_info: true,
                detailed_popup: true,
                actions_available: [
                  "view_details",
                  "contact_agent",
                  "save",
                  "share",
                ],
                contact_info: {
                  agent_name: `Agent ${Math.floor(Math.random() * 100) + 1}`,
                  agent_phone: `+971 50 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
                  agent_email: `agent${Math.floor(Math.random() * 100)}@kxpath.ae`,
                  company: "KX PATH Real Estate",
                },
              },
            };

            sampleData.push(dataPoint);
          }
        });
      },
    );

    return sampleData;
  }, []);

  // Initialize Map and Data
  useEffect(() => {
    setIsLoading(true);

    // Simulate loading time
    setTimeout(() => {
      const data = generateLiveMarketData();
      setLiveDataPoints(data);
      setFilteredData(data);
      setMapReady(true);
      setIsLoading(false);
    }, 2000);
  }, [generateLiveMarketData]);

  // Real-time Data Updates
  useEffect(() => {
    if (!liveUpdatesEnabled || !mapReady) return;

    const interval = setInterval(() => {
      setLastUpdateTime(new Date());

      // Simulate new data points
      if (Math.random() > 0.7) {
        const newDataPoints = generateLiveMarketData().slice(0, 5);
        setLiveDataPoints((prev) => [
          ...newDataPoints,
          ...prev.slice(0, maxDataPoints - 5),
        ]);
      }
    }, updateFrequency * 1000);

    return () => clearInterval(interval);
  }, [
    liveUpdatesEnabled,
    mapReady,
    updateFrequency,
    maxDataPoints,
    generateLiveMarketData,
  ]);

  // Apply Filters
  useEffect(() => {
    let filtered = liveDataPoints;

    if (activeFilters.property_type !== "all") {
      filtered = filtered.filter(
        (point) => point.property.type === activeFilters.property_type,
      );
    }

    if (activeFilters.emirate !== "all") {
      filtered = filtered.filter(
        (point) =>
          point.location.emirate.toLowerCase() === activeFilters.emirate,
      );
    }

    if (activeFilters.status !== "all") {
      filtered = filtered.filter(
        (point) => point.status === activeFilters.status,
      );
    }

    if (activeFilters.priority !== "all") {
      filtered = filtered.filter(
        (point) => point.priority === activeFilters.priority,
      );
    }

    filtered = filtered.filter(
      (point) =>
        point.property.price_aed >= activeFilters.price_range.min &&
        point.property.price_aed <= activeFilters.price_range.max,
    );

    setFilteredData(filtered);
  }, [activeFilters, liveDataPoints]);

  // Search Functionality
  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);

      // Simulate API search delay
      setTimeout(() => {
        const results = filteredData
          .filter(
            (point) =>
              point.location.district
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              point.location.neighborhood
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              point.location.street_name
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              point.property.type.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 10);

        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    },
    [filteredData],
  );

  // Drawing Tools
  const drawingTools: DrawingTool[] = [
    {
      id: "select",
      name_ar: "تحديد",
      name_en: "Select",
      icon: MousePointer,
      cursor: "default",
      active: !drawingMode,
    },
    {
      id: "polygon",
      name_ar: "مضلع",
      name_en: "Polygon",
      icon: Polygon,
      cursor: "crosshair",
      active: false,
    },
    {
      id: "circle",
      name_ar: "دائرة",
      name_en: "Circle",
      icon: Circle,
      cursor: "crosshair",
      active: false,
    },
    {
      id: "line",
      name_ar: "خط",
      name_en: "Line",
      icon: Route,
      cursor: "crosshair",
      active: false,
    },
    {
      id: "measure",
      name_ar: "قياس",
      name_en: "Measure",
      icon: Ruler,
      cursor: "crosshair",
      active: false,
    },
  ];

  const handleDataPointClick = (dataPoint: MarketDataPoint) => {
    setSelectedDataPoint(dataPoint);
  };

  const handleLayerToggle = (layerId: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer,
      ),
    );
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toLocaleString();
  };

  const getScreenPosition = (lat: number, lng: number) => {
    // Simple projection for demo - in production use proper map projection
    const bounds = {
      north: 26.5,
      south: 22.5,
      east: 57,
      west: 51,
    };

    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;

    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl border border-white/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h3 className="text-2xl font-bold text-white">{tr.loading}</h3>
          <p className="text-cyan-300">
            Initializing live market connections...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Advanced Header with Live Status */}
      <div
        className={`p-6 border-b border-white/10 bg-black/30 backdrop-blur-xl ${isRTL ? "text-right" : "text-left"}`}
      >
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-purple-500/30 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center">
                <Globe2
                  className={`w-8 h-8 text-cyan-400 ${liveUpdatesEnabled ? "animate-pulse" : ""}`}
                />
              </div>
              {liveUpdatesEnabled && (
                <div className="absolute -inset-1 rounded-2xl border-2 border-cyan-400 animate-ping opacity-60"></div>
              )}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <Wifi className="w-2 h-2 text-white" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {tr.ultimateLiveMap}
              </h2>
              <p className="text-cyan-300/80 flex items-center gap-2">
                <Activity className="w-4 h-4 animate-pulse" />
                {tr.connectedToLiveMarket}
              </p>
              <div className="flex items-center gap-4 mt-1 text-sm">
                <span className="text-green-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {filteredData.length} {tr.dataPoints}
                </span>
                <span className="text-blue-300">
                  {tr.lastUpdated}: {lastUpdateTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Live Controls */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setLiveUpdatesEnabled(!liveUpdatesEnabled)}
              variant={liveUpdatesEnabled ? "default" : "ghost"}
              size="sm"
              className={
                liveUpdatesEnabled
                  ? "bg-green-500 text-white border-0"
                  : "text-green-300 hover:text-white hover:bg-green-500/20 border-0"
              }
            >
              {liveUpdatesEnabled ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {tr.enableLiveUpdates}
            </Button>

            <Button className="bg-purple-500 hover:bg-purple-600 text-white border-0">
              <Download className="w-4 h-4 mr-2" />
              {tr.exportMap}
            </Button>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white border-0">
              <Share className="w-4 h-4 mr-2" />
              {tr.shareLocation}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Toolbar */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          {/* View Mode Controls */}
          <div className="flex items-center gap-2">
            <span className="text-blue-300 text-sm font-medium">
              {tr.viewModes}:
            </span>
            {[
              { key: "satellite", icon: Satellite, label: tr.satellite },
              { key: "terrain", icon: Layers, label: tr.terrain },
              { key: "hybrid", icon: Navigation, label: tr.hybrid },
              { key: "3d", icon: Move3d, label: "3D" },
            ].map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                variant={viewMode === key ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(key as any)}
                className={
                  viewMode === key
                    ? "bg-blue-500 text-white border-0"
                    : "text-blue-300 hover:text-white hover:bg-blue-500/20 border-0"
                }
              >
                <Icon className="w-4 h-4 mr-1" />
                {label}
              </Button>
            ))}
          </div>

          {/* Panel Toggles */}
          <div className="flex items-center gap-2">
            <Button
              variant={showLayersPanel ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowLayersPanel(!showLayersPanel)}
              className={
                showLayersPanel
                  ? "bg-cyan-500 text-white border-0"
                  : "text-cyan-300 hover:text-white hover:bg-cyan-500/20 border-0"
              }
            >
              <Layers className="w-4 h-4 mr-1" />
              {tr.mapLayers}
            </Button>

            <Button
              variant={showFiltersPanel ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={
                showFiltersPanel
                  ? "bg-green-500 text-white border-0"
                  : "text-green-300 hover:text-white hover:bg-green-500/20 border-0"
              }
            >
              <Filter className="w-4 h-4 mr-1" />
              {tr.dataFilters}
            </Button>

            <Button
              variant={showDrawingPanel ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowDrawingPanel(!showDrawingPanel)}
              className={
                showDrawingPanel
                  ? "bg-purple-500 text-white border-0"
                  : "text-purple-300 hover:text-white hover:bg-purple-500/20 border-0"
              }
            >
              <PaintBucket className="w-4 h-4 mr-1" />
              {tr.drawingTools}
            </Button>

            <Button
              variant={showAnalyticsPanel ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowAnalyticsPanel(!showAnalyticsPanel)}
              className={
                showAnalyticsPanel
                  ? "bg-orange-500 text-white border-0"
                  : "text-orange-300 hover:text-white hover:bg-orange-500/20 border-0"
              }
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              {tr.analytics}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              placeholder={tr.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              onClick={() => setZoomLevel((prev) => Math.min(18, prev + 1))}
              className="bg-white/10 text-white hover:bg-white/20 border-0"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => setZoomLevel((prev) => Math.max(3, prev - 1))}
              className="bg-white/10 text-white hover:bg-white/20 border-0"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setZoomLevel(11);
                setMapCenter({ lat: 25.2048, lng: 55.2708 });
              }}
              className="bg-white/10 text-white hover:bg-white/20 border-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[700px]">
        {/* Main Map Canvas */}
        <div className="flex-1 relative">
          <div
            ref={mapRef}
            className={`w-full h-full relative overflow-hidden cursor-${selectedTool?.cursor || "default"} transition-all duration-1000 ${
              viewMode === "satellite"
                ? "bg-gradient-to-br from-green-900 via-blue-800 to-gray-700"
                : viewMode === "terrain"
                  ? "bg-gradient-to-br from-amber-800 via-green-700 to-blue-600"
                  : viewMode === "3d"
                    ? "bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"
                    : "bg-gradient-to-br from-blue-800 via-cyan-600 to-teal-500"
            }`}
            style={{
              backgroundImage:
                viewMode === "satellite"
                  ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 20h60v60H20z' fill='%23064e3b' opacity='0.4'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%2306b6d4' opacity='0.3'/%3E%3Ccircle cx='70' cy='70' r='1' fill='%2306b6d4' opacity='0.4'/%3E%3C/svg%3E")`
                  : viewMode === "terrain"
                    ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M0 50 Q25 30 50 50 T100 50 V100 H0 Z' fill='%23065f46' opacity='0.5'/%3E%3C/svg%3E")`
                    : undefined,
            }}
          >
            {/* Advanced Grid System */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="advancedGrid"
                    width="50"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 50 0 L 0 0 0 50"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="0.5"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="0.5"
                      fill="rgba(6,182,212,0.3)"
                    />
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill="url(#advancedGrid)" />
              </svg>
            </div>

            {/* UAE Districts Boundaries */}
            {Object.entries(UAE_DISTRICTS_COMPREHENSIVE).map(
              ([emirate, districts]) =>
                Object.entries(districts).map(([districtKey, district]) => {
                  const centerPos = getScreenPosition(
                    district.center.lat,
                    district.center.lng,
                  );

                  return (
                    <div key={`${emirate}_${districtKey}`}>
                      {/* District Boundary */}
                      <div
                        className="absolute border-2 border-cyan-400/30 rounded-lg bg-cyan-400/5 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/60 hover:bg-cyan-400/10"
                        style={{
                          left: `${centerPos.x - 8}%`,
                          top: `${centerPos.y - 6}%`,
                          width: "16%",
                          height: "12%",
                        }}
                      />

                      {/* District Label */}
                      <div
                        className="absolute bg-black/80 backdrop-blur-md rounded-lg px-3 py-1 border border-cyan-400/30 pointer-events-none"
                        style={{
                          left: `${centerPos.x}%`,
                          top: `${centerPos.y - 8}%`,
                          transform: "translate(-50%, 0)",
                        }}
                      >
                        <p className="text-cyan-300 font-semibold text-sm">
                          {
                            district[
                              `name_${language}` as keyof typeof district
                            ]
                          }
                        </p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-green-400">
                            {formatPrice(
                              district.market_stats.avg_price_per_sqm,
                            )}
                            /m²
                          </span>
                          <span className="text-blue-400">
                            {district.market_stats.total_properties} units
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }),
            )}

            {/* Live Data Points */}
            {filteredData.map((dataPoint) => {
              const pos = getScreenPosition(
                dataPoint.coordinates.lat,
                dataPoint.coordinates.lng,
              );

              return (
                <div key={dataPoint.id} className="absolute z-20">
                  {/* Data Point Glow */}
                  {dataPoint.display.animation === "pulse" && (
                    <div
                      className="absolute rounded-full animate-ping opacity-40"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        width: "20px",
                        height: "20px",
                        backgroundColor: dataPoint.display.color,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}

                  {/* Data Point */}
                  <div
                    className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-125 ${
                      selectedDataPoint?.id === dataPoint.id
                        ? "scale-125 z-30"
                        : "scale-100 z-20"
                    }`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => handleDataPointClick(dataPoint)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white/50 shadow-lg ${
                        dataPoint.display.size === "large"
                          ? "w-8 h-8"
                          : "w-6 h-6"
                      }`}
                      style={{
                        backgroundColor: dataPoint.display.color,
                        boxShadow: `0 4px 20px ${dataPoint.display.color}60, 0 0 15px ${dataPoint.display.color}40`,
                      }}
                    >
                      {dataPoint.display.icon}
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute left-8 top-0 bg-black/95 backdrop-blur-md rounded-xl p-3 min-w-64 border border-white/20 transform opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                        <span>{dataPoint.display.icon}</span>
                        {dataPoint.property.type.charAt(0).toUpperCase() +
                          dataPoint.property.type.slice(1)}
                      </h4>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div className="bg-green-500/20 rounded-lg p-2">
                          <p className="text-green-300">Price</p>
                          <p className="text-white font-bold">
                            {formatPrice(dataPoint.property.price_aed)} AED
                          </p>
                        </div>
                        <div className="bg-blue-500/20 rounded-lg p-2">
                          <p className="text-blue-300">Size</p>
                          <p className="text-white font-bold">
                            {dataPoint.property.size_sqm} m²
                          </p>
                        </div>
                        <div className="bg-purple-500/20 rounded-lg p-2">
                          <p className="text-purple-300">Location</p>
                          <p className="text-white font-bold">
                            {dataPoint.location.district}
                          </p>
                        </div>
                        <div className="bg-orange-500/20 rounded-lg p-2">
                          <p className="text-orange-300">ROI</p>
                          <p className="text-white font-bold">
                            {dataPoint.market_data.roi_potential}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            dataPoint.priority === "high"
                              ? "bg-red-500/20 text-red-300"
                              : dataPoint.priority === "medium"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {tr[dataPoint.priority as keyof typeof tr]}
                        </span>
                        <span className="text-white/60 text-xs">
                          {new Date(dataPoint.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Heatmap Layer */}
            {layers.find((l) => l.id === "heatmap")?.enabled && (
              <div className="absolute inset-0 pointer-events-none z-5">
                {Object.entries(UAE_DISTRICTS_COMPREHENSIVE).map(
                  ([emirate, districts]) =>
                    Object.entries(districts).map(([districtKey, district]) => {
                      const centerPos = getScreenPosition(
                        district.center.lat,
                        district.center.lng,
                      );
                      const intensity =
                        district.market_stats.demand_score / 100;

                      return (
                        <div
                          key={`heat_${emirate}_${districtKey}`}
                          className="absolute rounded-full pointer-events-none"
                          style={{
                            left: `${centerPos.x}%`,
                            top: `${centerPos.y}%`,
                            width: `${12 + intensity * 8}%`,
                            height: `${12 + intensity * 8}%`,
                            background: `radial-gradient(circle, rgba(255,${255 - intensity * 100},0,${intensity * 0.6}) 0%, transparent 70%)`,
                            transform: "translate(-50%, -50%)",
                            filter: "blur(10px)",
                          }}
                        />
                      );
                    }),
                )}
              </div>
            )}

            {/* Search Results Overlay */}
            {searchResults.length > 0 && searchQuery && (
              <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md rounded-2xl p-4 max-w-sm border border-white/20 z-30">
                <h4 className="text-white font-bold mb-3">
                  Search Results ({searchResults.length})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => {
                        setMapCenter({
                          lat: result.coordinates.lat,
                          lng: result.coordinates.lng,
                        });
                        setZoomLevel(15);
                        setSelectedDataPoint(result);
                      }}
                      className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{result.display.icon}</span>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            {result.property.type}
                          </p>
                          <p className="text-blue-300 text-xs">
                            {result.location.district}
                          </p>
                        </div>
                        <span className="text-green-400 font-bold text-sm">
                          {formatPrice(result.property.price_aed)} AED
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panels */}
        <div className="w-80 bg-black/40 backdrop-blur-lg border-l border-white/10 flex flex-col">
          {/* Layers Panel */}
          {showLayersPanel && (
            <div className="border-b border-white/10 p-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                {tr.mapLayers}
              </h3>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div
                    key={layer.id}
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={layer.enabled}
                        onChange={() => handleLayerToggle(layer.id)}
                        className="rounded"
                      />
                      <span className="text-white text-sm">
                        {layer[`name_${language}` as keyof typeof layer]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-white/60">
                        {Math.round(layer.opacity * 100)}%
                      </span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={layer.opacity}
                        onChange={(e) => {
                          const newOpacity = parseFloat(e.target.value);
                          setLayers((prev) =>
                            prev.map((l) =>
                              l.id === layer.id
                                ? { ...l, opacity: newOpacity }
                                : l,
                            ),
                          );
                        }}
                        className="w-16"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filters Panel */}
          {showFiltersPanel && (
            <div className="border-b border-white/10 p-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Filter className="w-5 h-5 text-green-400" />
                {tr.dataFilters}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-green-300 text-sm font-medium mb-1 block">
                    {tr.propertyTypes}
                  </label>
                  <select
                    value={activeFilters.property_type}
                    onChange={(e) =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        property_type: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="all" className="text-black">
                      {tr.all}
                    </option>
                    <option value="villa" className="text-black">
                      {tr.villa}
                    </option>
                    <option value="apartment" className="text-black">
                      {tr.apartment}
                    </option>
                    <option value="commercial" className="text-black">
                      {tr.commercial}
                    </option>
                    <option value="land" className="text-black">
                      {tr.land}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-blue-300 text-sm font-medium mb-1 block">
                    {tr.location}
                  </label>
                  <select
                    value={activeFilters.emirate}
                    onChange={(e) =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        emirate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="all" className="text-black">
                      {tr.all}
                    </option>
                    <option value="dubai" className="text-black">
                      Dubai
                    </option>
                    <option value="abudhabi" className="text-black">
                      Abu Dhabi
                    </option>
                    <option value="sharjah" className="text-black">
                      Sharjah
                    </option>
                    <option value="ajman" className="text-black">
                      Ajman
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-purple-300 text-sm font-medium mb-1 block">
                    {tr.priority}
                  </label>
                  <select
                    value={activeFilters.priority}
                    onChange={(e) =>
                      setActiveFilters((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-400"
                  >
                    <option value="all" className="text-black">
                      {tr.all}
                    </option>
                    <option value="critical" className="text-black">
                      {tr.critical}
                    </option>
                    <option value="high" className="text-black">
                      {tr.high}
                    </option>
                    <option value="medium" className="text-black">
                      {tr.medium}
                    </option>
                    <option value="low" className="text-black">
                      {tr.low}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-yellow-300 text-sm font-medium mb-1 block">
                    {tr.priceRange} (AED)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={activeFilters.price_range.min || ""}
                      onChange={(e) =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          price_range: {
                            ...prev.price_range,
                            min: parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={
                        activeFilters.price_range.max === 50000000
                          ? ""
                          : activeFilters.price_range.max
                      }
                      onChange={(e) =>
                        setActiveFilters((prev) => ({
                          ...prev,
                          price_range: {
                            ...prev.price_range,
                            max: parseInt(e.target.value) || 50000000,
                          },
                        }))
                      }
                      className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drawing Tools Panel */}
          {showDrawingPanel && (
            <div className="border-b border-white/10 p-4">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <PaintBucket className="w-5 h-5 text-purple-400" />
                {tr.drawingTools}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {drawingTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Button
                      key={tool.id}
                      variant={
                        selectedTool?.id === tool.id ? "default" : "ghost"
                      }
                      size="sm"
                      onClick={() => {
                        setSelectedTool(tool);
                        setDrawingMode(tool.id !== "select");
                      }}
                      className={`flex flex-col items-center gap-1 h-auto py-3 ${
                        selectedTool?.id === tool.id
                          ? "bg-purple-500 text-white border-0"
                          : "text-purple-300 hover:text-white hover:bg-purple-500/20 border-0"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs">
                        {tool[`name_${language}` as keyof typeof tool]}
                      </span>
                    </Button>
                  );
                })}
              </div>

              {drawnShapes.length > 0 && (
                <div className="mt-3">
                  <Button
                    onClick={() => setDrawnShapes([])}
                    className="w-full bg-red-500 hover:bg-red-600 text-white border-0"
                  >
                    {tr.clearDrawings}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Property Details Panel */}
          {selectedDataPoint && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">
                      {selectedDataPoint.display.icon}
                    </span>
                    {tr.propertyDetails}
                  </h3>
                  <Button
                    size="sm"
                    onClick={() => setSelectedDataPoint(null)}
                    className="bg-white/10 text-white hover:bg-white/20 border-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Property Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-500/20 rounded-lg p-3">
                      <p className="text-green-300 text-sm">{tr.marketValue}</p>
                      <p className="text-white font-bold">
                        {formatPrice(selectedDataPoint.property.price_aed)} AED
                      </p>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-300 text-sm">{tr.pricePerSqm}</p>
                      <p className="text-white font-bold">
                        {formatPrice(selectedDataPoint.property.price_per_sqm)}{" "}
                        AED
                      </p>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <p className="text-purple-300 text-sm">{tr.totalArea}</p>
                      <p className="text-white font-bold">
                        {selectedDataPoint.property.size_sqm} m²
                      </p>
                    </div>
                    <div className="bg-orange-500/20 rounded-lg p-3">
                      <p className="text-orange-300 text-sm">
                        {tr.roiPotential}
                      </p>
                      <p className="text-white font-bold">
                        {selectedDataPoint.market_data.roi_potential}%
                      </p>
                    </div>
                  </div>

                  {/* Property Features */}
                  {selectedDataPoint.property.bedrooms && (
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white/60 text-xs">{tr.bedrooms}</p>
                        <p className="text-white font-bold">
                          {selectedDataPoint.property.bedrooms}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white/60 text-xs">{tr.bathrooms}</p>
                        <p className="text-white font-bold">
                          {selectedDataPoint.property.bathrooms}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <p className="text-white/60 text-xs">{tr.parking}</p>
                        <p className="text-white font-bold">
                          {selectedDataPoint.property.parking}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location Info */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-cyan-300 font-semibold mb-2">
                      {tr.location}
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p className="text-white">
                        {selectedDataPoint.location.district},{" "}
                        {selectedDataPoint.location.emirate}
                      </p>
                      <p className="text-white/80">
                        {selectedDataPoint.location.neighborhood}
                      </p>
                      <p className="text-white/60">
                        {selectedDataPoint.location.street_name}
                      </p>
                    </div>
                  </div>

                  {/* Market Analytics */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-yellow-300 font-semibold mb-2">
                      Market Analytics
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/80 text-sm">
                          {tr.predictedValue} (6m):
                        </span>
                        <span className="text-green-400 font-semibold">
                          {formatPrice(
                            selectedDataPoint.market_data.predicted_value_6m,
                          )}{" "}
                          AED
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80 text-sm">
                          {tr.demandLevel}:
                        </span>
                        <span className="text-blue-400 font-semibold">
                          {selectedDataPoint.market_data.demand_level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80 text-sm">Trend:</span>
                        <span
                          className={`font-semibold ${
                            selectedDataPoint.market_data.price_trend ===
                            "increasing"
                              ? "text-green-400"
                              : selectedDataPoint.market_data.price_trend ===
                                  "stable"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {selectedDataPoint.market_data.price_trend}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white border-0">
                      <Phone className="w-4 h-4 mr-2" />
                      {tr.contactAgent}
                    </Button>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white border-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      {tr.scheduleTour}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white border-0">
                        <Bookmark className="w-4 h-4 mr-1" />
                        {tr.saveProperty}
                      </Button>
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-white border-0">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  {selectedDataPoint.interaction.contact_info && (
                    <div className="bg-white/5 rounded-lg p-3">
                      <h4 className="text-emerald-300 font-semibold mb-2">
                        Contact Information
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-white">
                          {
                            selectedDataPoint.interaction.contact_info
                              .agent_name
                          }
                        </p>
                        <p className="text-emerald-300">
                          {
                            selectedDataPoint.interaction.contact_info
                              .agent_phone
                          }
                        </p>
                        <p className="text-blue-300">
                          {
                            selectedDataPoint.interaction.contact_info
                              .agent_email
                          }
                        </p>
                        <p className="text-white/60">
                          {selectedDataPoint.interaction.contact_info.company}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Default Panel - Live Statistics */}
          {!selectedDataPoint &&
            !showLayersPanel &&
            !showFiltersPanel &&
            !showDrawingPanel && (
              <div className="flex-1 overflow-y-auto p-4">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                  {tr.liveData}
                </h3>

                <div className="space-y-4">
                  {/* Live Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-500/20 rounded-lg p-3">
                      <p className="text-emerald-300 text-sm">
                        Active Properties
                      </p>
                      <p className="text-white font-bold text-xl">
                        {filteredData.length}
                      </p>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-3">
                      <p className="text-blue-300 text-sm">Avg Price/m²</p>
                      <p className="text-white font-bold text-xl">
                        {formatPrice(
                          filteredData.reduce(
                            (sum, d) => sum + d.property.price_per_sqm,
                            0,
                          ) / filteredData.length || 0,
                        )}
                      </p>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <p className="text-purple-300 text-sm">High Priority</p>
                      <p className="text-white font-bold text-xl">
                        {
                          filteredData.filter((d) => d.priority === "high")
                            .length
                        }
                      </p>
                    </div>
                    <div className="bg-orange-500/20 rounded-lg p-3">
                      <p className="text-orange-300 text-sm">New Today</p>
                      <p className="text-white font-bold text-xl">
                        {
                          filteredData.filter(
                            (d) =>
                              new Date(d.timestamp).toDateString() ===
                              new Date().toDateString(),
                          ).length
                        }
                      </p>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-cyan-300 font-semibold mb-3">
                      Recent Activity
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {filteredData.slice(0, 10).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                        >
                          <span className="text-lg">{item.display.icon}</span>
                          <div className="flex-1">
                            <p className="text-white text-sm">
                              {item.property.type} in {item.location.district}
                            </p>
                            <p className="text-white/60 text-xs">
                              {formatPrice(item.property.price_aed)} AED
                            </p>
                          </div>
                          <span className="text-white/60 text-xs">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Emirates Summary */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="text-yellow-300 font-semibold mb-3">
                      Emirates Overview
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(UAE_DISTRICTS_COMPREHENSIVE).map(
                        ([emirate, districts]) => {
                          const emirateProperties = filteredData.filter(
                            (d) => d.location.emirate.toLowerCase() === emirate,
                          );
                          const avgPrice =
                            emirateProperties.reduce(
                              (sum, d) => sum + d.property.price_per_sqm,
                              0,
                            ) / emirateProperties.length || 0;

                          return (
                            <div
                              key={emirate}
                              className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                            >
                              <span className="text-white capitalize">
                                {emirate}
                              </span>
                              <div className="text-right">
                                <p className="text-yellow-400 font-semibold">
                                  {emirateProperties.length} properties
                                </p>
                                <p className="text-white/60 text-xs">
                                  {formatPrice(avgPrice)}/m²
                                </p>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
