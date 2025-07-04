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
  PlusCircle,
  MinusCircle,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move3d,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Comprehensive UAE Real Estate & Construction Database
const UAE_COMPREHENSIVE_DATA = {
  emirates: [
    {
      id: "dubai",
      name_ar: "دبي",
      name_en: "Dubai",
      capital: "دبي",
      ruler: "محمد بن راشد آل مكتوم",
      established: 1833,
      area_km2: 4114,
      population: 3500000,
      gdp_billion: 108.5,
      growth_rate: 6.2,
      major_industries: ["Tourism", "Trade", "Finance", "Real Estate"],
      coordinates: { lat: 25.2048, lng: 55.2708 },
      color: "#FF6B6B",
      elevation: 16,
      climate: {
        avg_temp: 28,
        humidity: 65,
        rainfall: 94,
        sunny_days: 340,
      },
      real_estate_stats: {
        total_properties: 580000,
        avg_price_per_sqft: 1200,
        annual_growth: 8.5,
        luxury_segment: 35,
        foreign_ownership: 75,
      },
      districts: [
        {
          id: "business_bay",
          name_ar: "الخليج التجاري",
          name_en: "Business Bay",
          coordinates: { lat: 25.1897, lng: 55.2632 },
          type: "commercial",
          development_status: "established",
          population: 85000,
          avg_property_value: 2.8,
          projects_count: 234,
          opportunities: 89,
          activity_level: 95,
          infrastructure_score: 9.2,
          investment_potential: "high",
          upcoming_projects: [
            {
              name: "Business Bay Plaza",
              type: "mixed_use",
              completion: "2025-Q3",
              value: "1.2B AED",
              units: 450,
            },
          ],
          landmarks: ["Dubai Canal", "Business Bay Metro", "JW Marriott"],
          connectivity: {
            metro_distance: 0.2,
            airport_distance: 15,
            beach_distance: 8,
          },
        },
        {
          id: "downtown",
          name_ar: "وسط المدينة",
          name_en: "Downtown Dubai",
          coordinates: { lat: 25.1972, lng: 55.2744 },
          type: "luxury_commercial",
          development_status: "mature",
          population: 60000,
          avg_property_value: 8.9,
          projects_count: 156,
          opportunities: 45,
          activity_level: 98,
          infrastructure_score: 9.8,
          investment_potential: "premium",
          upcoming_projects: [
            {
              name: "Opera District Phase 2",
              type: "cultural_residential",
              completion: "2026-Q1",
              value: "2.5B AED",
              units: 280,
            },
          ],
          landmarks: ["Burj Khalifa", "Dubai Mall", "Dubai Opera"],
          connectivity: {
            metro_distance: 0.1,
            airport_distance: 12,
            beach_distance: 6,
          },
        },
      ],
    },
    {
      id: "abudhabi",
      name_ar: "أبوظبي",
      name_en: "Abu Dhabi",
      capital: "أبوظبي",
      ruler: "محمد بن زايد آل نهيان",
      established: 1761,
      area_km2: 67340,
      population: 2900000,
      gdp_billion: 178.2,
      growth_rate: 5.8,
      major_industries: ["Oil & Gas", "Finance", "Tourism", "Technology"],
      coordinates: { lat: 24.4539, lng: 54.3773 },
      color: "#4ECDC4",
      elevation: 27,
      climate: {
        avg_temp: 27,
        humidity: 68,
        rainfall: 78,
        sunny_days: 330,
      },
      real_estate_stats: {
        total_properties: 420000,
        avg_price_per_sqft: 950,
        annual_growth: 7.2,
        luxury_segment: 28,
        foreign_ownership: 65,
      },
      districts: [
        {
          id: "masdar_city",
          name_ar: "مدينة مصدر",
          name_en: "Masdar City",
          coordinates: { lat: 24.4292, lng: 54.6196 },
          type: "sustainable_tech",
          development_status: "expanding",
          population: 15000,
          avg_property_value: 1.8,
          projects_count: 67,
          opportunities: 234,
          activity_level: 87,
          infrastructure_score: 9.5,
          investment_potential: "high",
          upcoming_projects: [
            {
              name: "Masdar City Phase 3",
              type: "sustainable_residential",
              completion: "2027-Q2",
              value: "3.2B AED",
              units: 1200,
            },
          ],
          landmarks: ["IRENA HQ", "Masdar Institute", "Solar Park"],
          connectivity: {
            metro_distance: 25,
            airport_distance: 8,
            beach_distance: 35,
          },
        },
      ],
    },
    {
      id: "sharjah",
      name_ar: "الشارقة",
      name_en: "Sharjah",
      capital: "الشارقة",
      ruler: "سلطان بن محمد القاسمي",
      established: 1727,
      area_km2: 2590,
      population: 1700000,
      gdp_billion: 45.8,
      growth_rate: 4.9,
      major_industries: ["Manufacturing", "Culture", "Education", "Trade"],
      coordinates: { lat: 25.3463, lng: 55.4209 },
      color: "#A8E6CF",
      elevation: 31,
      climate: {
        avg_temp: 27,
        humidity: 70,
        rainfall: 110,
        sunny_days: 325,
      },
      real_estate_stats: {
        total_properties: 320000,
        avg_price_per_sqft: 650,
        annual_growth: 9.8,
        luxury_segment: 15,
        foreign_ownership: 45,
      },
      districts: [
        {
          id: "al_majaz",
          name_ar: "المجاز",
          name_en: "Al Majaz",
          coordinates: { lat: 25.3278, lng: 55.3892 },
          type: "waterfront_residential",
          development_status: "developing",
          population: 95000,
          avg_property_value: 1.2,
          projects_count: 189,
          opportunities: 567,
          activity_level: 92,
          infrastructure_score: 8.5,
          investment_potential: "high",
          upcoming_projects: [
            {
              name: "Al Majaz Waterfront Phase 4",
              type: "residential_commercial",
              completion: "2025-Q4",
              value: "800M AED",
              units: 650,
            },
          ],
          landmarks: [
            "Al Majaz Waterfront",
            "Sharjah Aquarium",
            "Al Noor Mosque",
          ],
          connectivity: {
            metro_distance: 5,
            airport_distance: 12,
            beach_distance: 2,
          },
        },
      ],
    },
    {
      id: "ajman",
      name_ar: "عجمان",
      name_en: "Ajman",
      capital: "عجمان",
      ruler: "حميد بن راشد النعيمي",
      established: 1816,
      area_km2: 259,
      population: 500000,
      gdp_billion: 12.5,
      growth_rate: 7.8,
      major_industries: ["Manufacturing", "Trade", "Tourism", "Real Estate"],
      coordinates: { lat: 25.4052, lng: 55.5136 },
      color: "#FFB74D",
      elevation: 12,
      climate: {
        avg_temp: 28,
        humidity: 72,
        rainfall: 95,
        sunny_days: 335,
      },
      real_estate_stats: {
        total_properties: 95000,
        avg_price_per_sqft: 485,
        annual_growth: 12.5,
        luxury_segment: 8,
        foreign_ownership: 85,
      },
      districts: [
        {
          id: "al_nuaimiya",
          name_ar: "النعيمية",
          name_en: "Al Nuaimiya",
          coordinates: { lat: 25.4086, lng: 55.5342 },
          type: "hot_investment_zone",
          development_status: "booming",
          population: 180000,
          avg_property_value: 0.8,
          projects_count: 456,
          opportunities: 1234,
          activity_level: 97,
          infrastructure_score: 7.8,
          investment_potential: "very_high",
          upcoming_projects: [
            {
              name: "Nuaimiya Towers Complex",
              type: "high_rise_residential",
              completion: "2024-Q4",
              value: "450M AED",
              units: 850,
            },
            {
              name: "Al Nuaimiya Business Park",
              type: "commercial",
              completion: "2025-Q2",
              value: "280M AED",
              units: 120,
            },
          ],
          landmarks: ["Ajman Beach", "City Centre Ajman", "Ajman Corniche"],
          connectivity: {
            metro_distance: 18,
            airport_distance: 45,
            beach_distance: 1,
          },
        },
      ],
    },
  ],
  live_intelligence: {
    construction_alerts: [
      {
        id: "CA001",
        type: "major_construction",
        title_ar: "🏗️ مجمع سكني ضخم قيد الإنشاء",
        title_en: "🏗️ Major Residential Complex Under Construction",
        description_ar: "مجمع سكني يضم 1200 وحدة في النعيمية، عجمان",
        description_en:
          "Residential complex with 1200 units in Al Nuaimiya, Ajman",
        location: {
          emirate: "ajman",
          district: "al_nuaimiya",
          coordinates: { lat: 25.4086, lng: 55.5342 },
          address: "Sheikh Khalifa Street, Al Nuaimiya",
        },
        project_details: {
          developer: "Ajman Properties",
          value: "450M AED",
          units: 1200,
          completion_date: "2024-Q4",
          project_type: "residential_towers",
          floors: 25,
          amenities: ["Swimming Pool", "Gym", "Kids Area", "Parking"],
        },
        opportunity_score: 95,
        investment_potential: "very_high",
        target_audience: ["investors", "end_users", "contractors"],
        market_analysis: {
          demand_level: "high",
          competition_level: "medium",
          roi_potential: "15-20%",
          rental_yield: "8-10%",
        },
        detected_at: "2024-01-15T14:30:00Z",
        verified: true,
        source: "government_permits",
        urgency: "high",
        action_required: true,
      },
      {
        id: "CA002",
        type: "villa_construction",
        title_ar: "🏡 فيلات فاخرة جديدة",
        title_en: "🏡 New Luxury Villas",
        description_ar: "15 فيلا فاخرة في دبي هيلز بمساحات تبدأ من 4000 قدم",
        description_en:
          "15 luxury villas in Dubai Hills starting from 4000 sqft",
        location: {
          emirate: "dubai",
          district: "dubai_hills",
          coordinates: { lat: 25.1108, lng: 55.2453 },
          address: "Dubai Hills Estate, Mohammed Bin Rashid City",
        },
        project_details: {
          developer: "Emaar Properties",
          value: "180M AED",
          units: 15,
          completion_date: "2025-Q1",
          project_type: "luxury_villas",
          plot_size: "4000-6000 sqft",
          amenities: [
            "Private Garden",
            "Maid Room",
            "Driver Room",
            "Pool Ready",
          ],
        },
        opportunity_score: 88,
        investment_potential: "high",
        target_audience: ["landscaping_companies", "luxury_contractors"],
        market_analysis: {
          demand_level: "very_high",
          competition_level: "high",
          roi_potential: "12-18%",
          rental_yield: "6-8%",
        },
        detected_at: "2024-01-15T16:45:00Z",
        verified: true,
        source: "developer_announcement",
        urgency: "medium",
        action_required: true,
      },
    ],
    market_trends: [
      {
        id: "MT001",
        trend_type: "sustainable_landscaping",
        title_ar: "اتجاه متزايد للمناظر الطبيعية المستدامة",
        title_en: "Growing Trend in Sustainable Landscaping",
        description_ar:
          "ازدياد الطلب على التصاميم البيئية والنباتات المحلية بنسبة 45%",
        description_en:
          "45% increase in demand for eco-friendly designs and native plants",
        growth_rate: 45,
        market_value: "1.2B AED",
        affected_emirates: ["dubai", "abudhabi", "sharjah"],
        key_drivers: [
          "Government sustainability initiatives",
          "Environmental awareness",
          "Water conservation requirements",
          "Cost effectiveness",
        ],
        opportunities: [
          "Native plant nurseries",
          "Water-efficient irrigation systems",
          "Solar-powered landscape lighting",
          "Organic fertilizers and soil",
        ],
        timeline: "2024-2027",
        confidence_score: 92,
        impact_level: "high",
      },
    ],
    competitor_activities: [
      {
        id: "COMP001",
        competitor_name: "Green Oasis Landscaping",
        activity_type: "major_contract_win",
        title_ar: "منافس يفوز بعقد ضخم",
        title_en: "Competitor Wins Major Contract",
        description_ar:
          "فوز بعقد تنسيق 200 فيلا في الشارقة بقيمة 15 مليون درهم",
        description_en:
          "Won landscaping contract for 200 villas in Sharjah worth 15M AED",
        contract_value: "15M AED",
        project_size: "200 villas",
        location: "Sharjah - Al Majaz",
        threat_level: "medium",
        recommended_actions: [
          "Analyze their pricing strategy",
          "Improve proposal quality",
          "Focus on unique value propositions",
        ],
        detected_at: "2024-01-14T12:20:00Z",
      },
    ],
  },
};

// Live Feed Data Structure
interface LiveFeedItem {
  id: string;
  timestamp: string;
  type:
    | "construction"
    | "sale"
    | "permit"
    | "opportunity"
    | "weather"
    | "traffic";
  priority: "low" | "medium" | "high" | "urgent";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  location: {
    emirate: string;
    district?: string;
    coordinates: { lat: number; lng: number };
  };
  value?: string;
  impact_score: number;
  verified: boolean;
  source: string;
  action_required: boolean;
  metadata?: any;
}

interface SmartTerritoryIntelligenceProps {
  language: "en" | "ar";
}

export default function SmartTerritoryIntelligence({
  language,
}: SmartTerritoryIntelligenceProps) {
  const [selectedEmirate, setSelectedEmirate] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [viewMode, setViewMode] = useState<
    "satellite" | "terrain" | "hybrid" | "intelligence"
  >("intelligence");
  const [analysisMode, setAnalysisMode] = useState<
    "overview" | "opportunities" | "threats" | "predictions"
  >("overview");
  const [liveFeed, setLiveFeed] = useState<LiveFeedItem[]>([]);
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [show3D, setShow3D] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    humidity: 65,
    wind_speed: 12,
    visibility: "Excellent",
    uv_index: 8,
    condition: "sunny",
  });

  const t = {
    ar: {
      territoryIntelligence: "نظام الاستخبارات الإقليمية الذكي",
      realTimeMonitoring: "المراقبة المباشرة للأراضي والفرص",
      intelligenceMode: "وضع الاستخبارات",
      satellite: "الأقمار الصناعية",
      terrain: "التضاريس",
      hybrid: "مختلط",
      overview: "نظرة عامة",
      opportunities: "الفرص",
      threats: "التهديدات",
      predictions: "التنبؤات",
      liveFeed: "البث المباشر",
      smartAlerts: "التنبيهات الذكية",
      constructionActivity: "النشاط الإنشائي",
      marketTrends: "اتجاهات السوق",
      competitorWatch: "مراقبة المنافسين",
      weatherConditions: "الأحوال الجوية",
      emirateStats: "إحصائيات الإمارة",
      districtAnalysis: "تحليل المنطقة",
      investmentPotential: "الإمكانات الاستثمارية",
      projectValue: "قيمة المشروع",
      completionDate: "تاريخ الإنجاز",
      opportunityScore: "نقاط الفرصة",
      threatLevel: "مستوى التهديد",
      verified: "موثق",
      actionRequired: "يتطلب إجراء",
      highPriority: "أولوية عالية",
      mediumPriority: "أولوية متوسطة",
      lowPriority: "أولوية منخفضة",
      scanningTerritory: "مسح الإقليم...",
      enableAlerts: "تفعيل التنبيهات",
      toggle3D: "تبديل 3D",
      heatmapMode: "الخريطة الحرارية",
      exportData: "تصدير البيانات",
      shareIntelligence: "مشاركة الاستخبار��ت",
    },
    en: {
      territoryIntelligence: "Smart Territory Intelligence System",
      realTimeMonitoring: "Real-time Territory & Opportunity Monitoring",
      intelligenceMode: "Intelligence Mode",
      satellite: "Satellite",
      terrain: "Terrain",
      hybrid: "Hybrid",
      overview: "Overview",
      opportunities: "Opportunities",
      threats: "Threats",
      predictions: "Predictions",
      liveFeed: "Live Feed",
      smartAlerts: "Smart Alerts",
      constructionActivity: "Construction Activity",
      marketTrends: "Market Trends",
      competitorWatch: "Competitor Watch",
      weatherConditions: "Weather Conditions",
      emirateStats: "Emirate Statistics",
      districtAnalysis: "District Analysis",
      investmentPotential: "Investment Potential",
      projectValue: "Project Value",
      completionDate: "Completion Date",
      opportunityScore: "Opportunity Score",
      threatLevel: "Threat Level",
      verified: "Verified",
      actionRequired: "Action Required",
      highPriority: "High Priority",
      mediumPriority: "Medium Priority",
      lowPriority: "Low Priority",
      scanningTerritory: "Scanning Territory...",
      enableAlerts: "Enable Alerts",
      toggle3D: "Toggle 3D",
      heatmapMode: "Heatmap Mode",
      exportData: "Export Data",
      shareIntelligence: "Share Intelligence",
    },
  };

  const tr = t[language];
  const isRTL = language === "ar";

  // Real-time territory scanning simulation
  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          // Generate new intelligence feed
          const newFeedItem: LiveFeedItem = {
            id: `feed_${Date.now()}`,
            timestamp: new Date().toISOString(),
            type: ["construction", "sale", "permit", "opportunity"][
              Math.floor(Math.random() * 4)
            ] as any,
            priority: ["medium", "high", "urgent"][
              Math.floor(Math.random() * 3)
            ] as any,
            title_ar: "🎯 استخبارات جديدة مكتشفة",
            title_en: "🎯 New Intelligence Discovered",
            description_ar: "تم اكتشاف نشاط جديد في المنطقة المراقبة",
            description_en: "New activity detected in monitored area",
            location: {
              emirate: ["dubai", "abudhabi", "sharjah", "ajman"][
                Math.floor(Math.random() * 4)
              ],
              coordinates: {
                lat: 25.2 + (Math.random() - 0.5) * 1.2,
                lng: 55.3 + (Math.random() - 0.5) * 1.2,
              },
            },
            value: `${(Math.random() * 50 + 10).toFixed(1)}M AED`,
            impact_score: Math.floor(Math.random() * 30 + 70),
            verified: Math.random() > 0.3,
            source: "satellite_analysis",
            action_required: Math.random() > 0.6,
          };

          setLiveFeed((prev) => [newFeedItem, ...prev.slice(0, 19)]);
          return 0;
        }
        return prev + Math.floor(Math.random() * 20 + 5);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isScanning]);

  // Weather updates
  useEffect(() => {
    const weatherInterval = setInterval(() => {
      setWeatherData((prev) => ({
        ...prev,
        temperature: 25 + Math.random() * 8,
        humidity: 60 + Math.random() * 20,
        wind_speed: 8 + Math.random() * 10,
      }));
    }, 30000);

    return () => clearInterval(weatherInterval);
  }, []);

  const getScreenPosition = (lat: number, lng: number) => {
    // UAE bounds: lat 22.5-26.5, lng 51-57
    const x = ((lng - 51) / 6) * 100;
    const y = ((26.5 - lat) / 4) * 100;
    return {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "construction":
        return Building2;
      case "sale":
        return DollarSign;
      case "permit":
        return CheckCircle;
      case "opportunity":
        return Target;
      case "weather":
        return Sun;
      case "traffic":
        return Route;
      default:
        return Info;
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Advanced Intelligence Header */}
      <div
        className={`p-6 border-b border-white/10 bg-black/30 backdrop-blur-xl ${isRTL ? "text-right" : "text-left"}`}
      >
        <div
          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {tr.territoryIntelligence}
            </h2>
            <p className="text-blue-300/80 flex items-center gap-2">
              <Radar className="w-4 h-4 animate-spin" />
              {tr.realTimeMonitoring}
            </p>
          </div>

          {/* Intelligence Status Dashboard */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-bold">
                    {
                      UAE_COMPREHENSIVE_DATA.live_intelligence
                        .construction_alerts.length
                    }
                  </p>
                  <p className="text-green-300/80 text-xs">
                    {tr.constructionActivity}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-bold">
                    {
                      UAE_COMPREHENSIVE_DATA.live_intelligence
                        .competitor_activities.length
                    }
                  </p>
                  <p className="text-blue-300/80 text-xs">
                    {tr.competitorWatch}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Control Panel */}
      <div className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* View Mode Controls */}
          <div>
            <label className="text-blue-300 text-sm font-medium mb-2 block">
              View Mode
            </label>
            <div className="grid grid-cols-2 gap-1">
              {[
                {
                  key: "intelligence",
                  icon: Radar,
                  label: tr.intelligenceMode,
                },
                { key: "satellite", icon: Satellite, label: tr.satellite },
                { key: "terrain", icon: Layers, label: tr.terrain },
                { key: "hybrid", icon: Navigation, label: tr.hybrid },
              ].map(({ key, icon: Icon, label }) => (
                <Button
                  key={key}
                  variant={viewMode === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(key as any)}
                  className={`text-xs ${
                    viewMode === key
                      ? "bg-blue-500 text-white border-0"
                      : "text-blue-300 hover:text-white hover:bg-blue-500/20 border-0"
                  }`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Analysis Mode */}
          <div>
            <label className="text-cyan-300 text-sm font-medium mb-2 block">
              Analysis
            </label>
            <div className="grid grid-cols-2 gap-1">
              {[
                { key: "overview", icon: BarChart3, label: tr.overview },
                { key: "opportunities", icon: Target, label: tr.opportunities },
                { key: "threats", icon: AlertTriangle, label: tr.threats },
                { key: "predictions", icon: TrendingUp, label: tr.predictions },
              ].map(({ key, icon: Icon, label }) => (
                <Button
                  key={key}
                  variant={analysisMode === key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setAnalysisMode(key as any)}
                  className={`text-xs ${
                    analysisMode === key
                      ? "bg-cyan-500 text-white border-0"
                      : "text-cyan-300 hover:text-white hover:bg-cyan-500/20 border-0"
                  }`}
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Scanning Controls */}
          <div>
            <label className="text-green-300 text-sm font-medium mb-2 block">
              Scanning
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button
                  variant={isScanning ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setIsScanning(!isScanning)}
                  className={
                    isScanning
                      ? "bg-green-500 text-white border-0"
                      : "text-green-300 hover:text-white hover:bg-green-500/20 border-0"
                  }
                >
                  <Activity
                    className={`w-3 h-3 mr-1 ${isScanning ? "animate-spin" : ""}`}
                  />
                  {isScanning ? "Scanning..." : "Start Scan"}
                </Button>
              </div>
              {isScanning && (
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-green-400 transition-all duration-1000"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Feature Toggles */}
          <div>
            <label className="text-purple-300 text-sm font-medium mb-2 block">
              Features
            </label>
            <div className="space-y-1">
              <Button
                variant={alertsEnabled ? "default" : "ghost"}
                size="sm"
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`w-full text-xs ${
                  alertsEnabled
                    ? "bg-purple-500 text-white border-0"
                    : "text-purple-300 hover:text-white hover:bg-purple-500/20 border-0"
                }`}
              >
                <Bell className="w-3 h-3 mr-1" />
                {tr.enableAlerts}
              </Button>
              <Button
                variant={show3D ? "default" : "ghost"}
                size="sm"
                onClick={() => setShow3D(!show3D)}
                className={`w-full text-xs ${
                  show3D
                    ? "bg-indigo-500 text-white border-0"
                    : "text-indigo-300 hover:text-white hover:bg-indigo-500/20 border-0"
                }`}
              >
                <Move3d className="w-3 h-3 mr-1" />
                {tr.toggle3D}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[700px]">
        {/* Enhanced 3D Territory Map */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className={`w-full h-full relative transition-all duration-1000 ${
              viewMode === "satellite"
                ? "bg-gradient-to-br from-blue-900 via-green-800 to-yellow-700"
                : viewMode === "terrain"
                  ? "bg-gradient-to-br from-amber-800 via-green-700 to-blue-600"
                  : viewMode === "intelligence"
                    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
                    : "bg-gradient-to-br from-blue-800 via-cyan-600 to-teal-500"
            }`}
          >
            {/* Advanced Grid System */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" className="opacity-20">
                <defs>
                  <pattern
                    id="intelligenceGrid"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 60"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="0.5"
                    />
                    <circle cx="30" cy="30" r="1" fill="rgba(0,255,255,0.3)" />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#intelligenceGrid)"
                />
              </svg>
            </div>

            {/* Emirates with Enhanced Intelligence Overlay */}
            {UAE_COMPREHENSIVE_DATA.emirates.map((emirate) => {
              const pos = getScreenPosition(
                emirate.coordinates.lat,
                emirate.coordinates.lng,
              );
              const isSelected = selectedEmirate === emirate.id;

              return (
                <div key={emirate.id} className="absolute">
                  {/* Emirate Intelligence Boundary */}
                  <div
                    className={`absolute rounded-full transition-all duration-1000 ${
                      isSelected
                        ? "animate-pulse scale-125 z-30"
                        : "scale-100 z-10"
                    }`}
                    style={{
                      left: `${pos.x - 15}%`,
                      top: `${pos.y - 15}%`,
                      width: "30%",
                      height: "30%",
                      background: `conic-gradient(from 0deg, ${emirate.color}40, ${emirate.color}20, ${emirate.color}40)`,
                      border: `3px solid ${emirate.color}80`,
                      boxShadow: `0 0 40px ${emirate.color}60, inset 0 0 30px ${emirate.color}20`,
                    }}
                  />

                  {/* Central Intelligence Hub */}
                  <div
                    className={`absolute cursor-pointer transform transition-all duration-700 hover:scale-150 ${
                      isSelected ? "scale-125 z-40" : "scale-100 z-20"
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
                      className="w-20 h-20 rounded-3xl flex flex-col items-center justify-center text-white font-bold shadow-2xl backdrop-blur-lg border-3 border-white/40 relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${emirate.color}DD, ${emirate.color}AA)`,
                        boxShadow: `0 12px 40px ${emirate.color}80, 0 0 30px ${emirate.color}60`,
                      }}
                    >
                      {/* Pulsing Core */}
                      <div
                        className="absolute inset-2 rounded-2xl animate-pulse"
                        style={{
                          background: `radial-gradient(circle, ${emirate.color}60, transparent)`,
                        }}
                      />

                      <span className="text-lg font-black z-10">
                        {emirate.name_en.slice(0, 3).toUpperCase()}
                      </span>
                      <div className="text-xs font-medium z-10 flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {emirate.real_estate_stats.annual_growth}%
                      </div>
                    </div>

                    {/* Intelligence Data Overlay */}
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-md rounded-2xl p-4 min-w-80 border border-white/20 opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                      <h4 className="text-white font-bold mb-3 text-center">
                        {emirate[`name_${language}` as keyof typeof emirate]} -
                        Intelligence Brief
                      </h4>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-500/20 rounded-lg p-2">
                          <p className="text-blue-300">Population</p>
                          <p className="text-white font-bold">
                            {(emirate.population / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div className="bg-green-500/20 rounded-lg p-2">
                          <p className="text-green-300">GDP</p>
                          <p className="text-white font-bold">
                            ${emirate.gdp_billion}B
                          </p>
                        </div>
                        <div className="bg-purple-500/20 rounded-lg p-2">
                          <p className="text-purple-300">Properties</p>
                          <p className="text-white font-bold">
                            {(
                              emirate.real_estate_stats.total_properties / 1000
                            ).toFixed(0)}
                            K
                          </p>
                        </div>
                        <div className="bg-orange-500/20 rounded-lg p-2">
                          <p className="text-orange-300">Avg Price/sqft</p>
                          <p className="text-white font-bold">
                            {emirate.real_estate_stats.avg_price_per_sqft} AED
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 space-y-1">
                        <h5 className="text-cyan-300 font-semibold text-xs">
                          Major Industries
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {emirate.major_industries.map((industry, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full"
                            >
                              {industry}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Districts for Selected Emirate */}
                  {isSelected &&
                    emirate.districts.map((district, districtIdx) => {
                      const districtPos = getScreenPosition(
                        district.coordinates.lat,
                        district.coordinates.lng,
                      );

                      return (
                        <div key={district.id} className="absolute z-40">
                          {/* District Connection Beam */}
                          <svg
                            className="absolute pointer-events-none z-30"
                            style={{
                              left: `${Math.min(pos.x, districtPos.x)}%`,
                              top: `${Math.min(pos.y, districtPos.y)}%`,
                              width: `${Math.abs(pos.x - districtPos.x)}%`,
                              height: `${Math.abs(pos.y - districtPos.y)}%`,
                            }}
                          >
                            <line
                              x1={pos.x > districtPos.x ? "100%" : "0%"}
                              y1={pos.y > districtPos.y ? "100%" : "0%"}
                              x2={pos.x > districtPos.x ? "0%" : "100%"}
                              y2={pos.y > districtPos.y ? "0%" : "100%"}
                              stroke={emirate.color}
                              strokeWidth="3"
                              strokeDasharray="8,4"
                              className="animate-pulse"
                              opacity="0.8"
                              filter="drop-shadow(0 0 8px currentColor)"
                            />
                          </svg>

                          {/* District Intelligence Node */}
                          <div
                            className="absolute cursor-pointer transform transition-all duration-500 hover:scale-125 z-40"
                            style={{
                              left: `${districtPos.x}%`,
                              top: `${districtPos.y}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                            onClick={() => setSelectedDistrict(district)}
                          >
                            {/* Pulsing Activity Ring */}
                            <div
                              className="absolute inset-0 rounded-full animate-ping z-20"
                              style={{
                                backgroundColor:
                                  district.activity_level > 90
                                    ? "#ef4444"
                                    : district.activity_level > 70
                                      ? "#f59e0b"
                                      : "#10b981",
                                width: "60px",
                                height: "60px",
                                left: "-30px",
                                top: "-30px",
                                opacity: 0.6,
                              }}
                            />

                            {/* District Core */}
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-bold border-3 border-white/60 backdrop-blur-sm z-30 relative overflow-hidden`}
                              style={{
                                background: `linear-gradient(135deg, ${
                                  district.investment_potential === "very_high"
                                    ? "#ef4444DD"
                                    : district.investment_potential === "high"
                                      ? "#f59e0bDD"
                                      : "#10b981DD"
                                }, ${
                                  district.investment_potential === "very_high"
                                    ? "#dc2626AA"
                                    : district.investment_potential === "high"
                                      ? "#d97706AA"
                                      : "#059669AA"
                                })`,
                                boxShadow: `0 8px 25px ${
                                  district.investment_potential === "very_high"
                                    ? "#ef4444"
                                    : district.investment_potential === "high"
                                      ? "#f59e0b"
                                      : "#10b981"
                                }60`,
                              }}
                            >
                              {/* Activity Indicator */}
                              <div
                                className="absolute inset-1 rounded-xl opacity-50"
                                style={{
                                  background: `conic-gradient(from 0deg, transparent ${100 - district.activity_level}%, white ${100 - district.activity_level}%)`,
                                }}
                              />

                              {/* Investment Level Icon */}
                              {district.investment_potential === "very_high" &&
                                "🔥"}
                              {district.investment_potential === "high" && "⭐"}
                              {district.investment_potential === "medium" &&
                                "💎"}
                              {district.investment_potential === "low" && "🟡"}
                            </div>

                            {/* District Intelligence Panel */}
                            <div className="absolute left-16 top-0 bg-black/95 backdrop-blur-md rounded-2xl p-4 min-w-72 border border-white/30 transform opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-cyan-400" />
                                {
                                  district[
                                    `name_${language}` as keyof typeof district
                                  ]
                                }
                              </h4>

                              <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                                <div className="bg-cyan-500/20 rounded-lg p-2">
                                  <p className="text-cyan-300">Projects</p>
                                  <p className="text-white font-bold">
                                    {district.projects_count}
                                  </p>
                                </div>
                                <div className="bg-green-500/20 rounded-lg p-2">
                                  <p className="text-green-300">
                                    Opportunities
                                  </p>
                                  <p className="text-white font-bold">
                                    {district.opportunities}
                                  </p>
                                </div>
                                <div className="bg-yellow-500/20 rounded-lg p-2">
                                  <p className="text-yellow-300">Avg Value</p>
                                  <p className="text-white font-bold">
                                    {district.avg_property_value}M AED
                                  </p>
                                </div>
                                <div className="bg-purple-500/20 rounded-lg p-2">
                                  <p className="text-purple-300">Activity</p>
                                  <p className="text-white font-bold">
                                    {district.activity_level}%
                                  </p>
                                </div>
                              </div>

                              <div className="mb-3">
                                <h5 className="text-blue-300 font-semibold text-xs mb-1">
                                  Investment Potential
                                </h5>
                                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-1000 ${
                                      district.investment_potential ===
                                      "very_high"
                                        ? "bg-red-500"
                                        : district.investment_potential ===
                                            "high"
                                          ? "bg-orange-500"
                                          : "bg-green-500"
                                    }`}
                                    style={{
                                      width: `${
                                        district.investment_potential ===
                                        "very_high"
                                          ? 95
                                          : district.investment_potential ===
                                              "high"
                                            ? 80
                                            : 60
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <h5 className="text-emerald-300 font-semibold text-xs">
                                  Key Landmarks
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                  {district.landmarks
                                    .slice(0, 3)
                                    .map((landmark, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full"
                                      >
                                        {landmark}
                                      </span>
                                    ))}
                                </div>
                              </div>

                              {district.upcoming_projects &&
                                district.upcoming_projects.length > 0 && (
                                  <div className="mt-3 space-y-1">
                                    <h5 className="text-orange-300 font-semibold text-xs">
                                      Upcoming Projects
                                    </h5>
                                    {district.upcoming_projects
                                      .slice(0, 2)
                                      .map((project, idx) => (
                                        <div
                                          key={idx}
                                          className="bg-orange-500/10 rounded-lg p-2"
                                        >
                                          <p className="text-orange-300 text-xs font-medium">
                                            {project.name}
                                          </p>
                                          <p className="text-white text-xs">
                                            {project.value} •{" "}
                                            {project.completion}
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}

            {/* Live Intelligence Alerts Overlay */}
            {UAE_COMPREHENSIVE_DATA.live_intelligence.construction_alerts.map(
              (alert, idx) => {
                const alertPos = getScreenPosition(
                  alert.location.coordinates.lat,
                  alert.location.coordinates.lng,
                );

                return (
                  <div
                    key={alert.id}
                    className="absolute z-50 animate-bounce"
                    style={{
                      left: `${alertPos.x}%`,
                      top: `${alertPos.y}%`,
                      transform: "translate(-50%, -50%)",
                      animationDelay: `${idx * 0.3}s`,
                    }}
                  >
                    {/* Alert Pulse */}
                    <div
                      className={`absolute inset-0 rounded-full animate-ping ${
                        alert.urgency === "high"
                          ? "bg-red-500"
                          : alert.urgency === "medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                      style={{
                        width: "24px",
                        height: "24px",
                        left: "-12px",
                        top: "-12px",
                        opacity: 0.7,
                      }}
                    />

                    {/* Alert Icon */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                        alert.urgency === "high"
                          ? "bg-red-500"
                          : alert.urgency === "medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                      style={{
                        boxShadow: `0 4px 15px ${
                          alert.urgency === "high"
                            ? "#ef4444"
                            : alert.urgency === "medium"
                              ? "#eab308"
                              : "#3b82f6"
                        }60`,
                      }}
                    >
                      {alert.type === "major_construction" && "🏗️"}
                      {alert.type === "villa_construction" && "🏡"}
                      {alert.type === "permit_issued" && "📋"}
                    </div>

                    {/* Alert Details Panel */}
                    <div className="absolute left-8 top-0 bg-black/95 backdrop-blur-md rounded-xl p-4 min-w-80 border border-white/30 transform opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none z-60">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                            alert.urgency === "high"
                              ? "bg-red-500/20 text-red-300"
                              : alert.urgency === "medium"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {alert.type === "major_construction" && "🏗️"}
                          {alert.type === "villa_construction" && "🏡"}
                        </div>

                        <div className="flex-1">
                          <h4 className="text-white font-bold text-sm mb-1">
                            {alert[`title_${language}` as keyof typeof alert]}
                          </h4>
                          <p className="text-blue-300/80 text-xs mb-2">
                            {
                              alert[
                                `description_${language}` as keyof typeof alert
                              ]
                            }
                          </p>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-green-500/20 rounded-lg p-2">
                              <p className="text-green-300">Value</p>
                              <p className="text-white font-bold">
                                {alert.project_details.value}
                              </p>
                            </div>
                            <div className="bg-blue-500/20 rounded-lg p-2">
                              <p className="text-blue-300">Units</p>
                              <p className="text-white font-bold">
                                {alert.project_details.units}
                              </p>
                            </div>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${alert.opportunity_score}%`,
                                  }}
                                />
                              </div>
                              <span className="text-emerald-400 text-xs font-semibold">
                                {alert.opportunity_score}%
                              </span>
                            </div>
                            <span className="text-white/60 text-xs">
                              {alert.project_details.completion_date}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              },
            )}

            {/* Weather Overlay */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-64">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-400" />
                {tr.weatherConditions}
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-red-400" />
                  <div>
                    <p className="text-red-300">Temperature</p>
                    <p className="text-white font-bold">
                      {weatherData.temperature.toFixed(1)}°C
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-blue-300">Humidity</p>
                    <p className="text-white font-bold">
                      {weatherData.humidity.toFixed(0)}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="text-cyan-300">Wind</p>
                    <p className="text-white font-bold">
                      {weatherData.wind_speed.toFixed(0)} km/h
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-green-300">Visibility</p>
                    <p className="text-white font-bold">
                      {weatherData.visibility}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Intelligence Feed */}
        <div className="w-96 bg-black/40 backdrop-blur-lg border-l border-white/10">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <Activity
                className={`w-5 h-5 text-green-400 ${isScanning ? "animate-spin" : "animate-pulse"}`}
              />
              {tr.liveFeed}
            </h3>
            <p className="text-green-300/60 text-sm">
              {liveFeed.length} active intelligence items
            </p>
          </div>

          <div className="h-full overflow-y-auto p-4 space-y-3">
            {/* Construction Alerts */}
            <div className="mb-4">
              <h4 className="text-orange-300 font-semibold mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {tr.constructionActivity}
              </h4>
              {UAE_COMPREHENSIVE_DATA.live_intelligence.construction_alerts.map(
                (alert) => (
                  <div
                    key={alert.id}
                    className="bg-white/5 rounded-xl p-3 border border-orange-400/20 hover:bg-white/10 transition-colors mb-2"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          alert.urgency === "high"
                            ? "bg-red-500/20 text-red-300"
                            : alert.urgency === "medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-blue-500/20 text-blue-300"
                        }`}
                      >
                        {alert.type === "major_construction" && "🏗️"}
                        {alert.type === "villa_construction" && "🏡"}
                      </div>

                      <div className="flex-1">
                        <h5 className="text-white font-medium text-sm">
                          {alert[`title_${language}` as keyof typeof alert]}
                        </h5>
                        <p className="text-blue-300/80 text-xs mt-1">
                          {alert.location.emirate} • {alert.location.district}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-green-400 font-bold text-sm">
                            {alert.project_details.value}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-xs">
                              {alert.opportunity_score}%
                            </span>
                          </div>
                        </div>
                        {alert.verified && (
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">
                              {tr.verified}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Live Feed Items */}
            {liveFeed.map((item) => {
              const Icon = getTypeIcon(item.type);

              return (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-xl p-3 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getPriorityColor(item.priority)}/20`}
                    >
                      <Icon
                        className={`w-4 h-4 ${getPriorityColor(item.priority).replace("bg-", "text-")}`}
                      />
                    </div>

                    <div className="flex-1">
                      <h5 className="text-white font-medium text-sm">
                        {item[`title_${language}` as keyof typeof item]}
                      </h5>
                      <p className="text-blue-300/80 text-xs mt-1">
                        {item[`description_${language}` as keyof typeof item]}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-cyan-400 font-bold text-sm">
                          {item.value}
                        </span>
                        <span className="text-white/60 text-xs">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                            style={{ width: `${item.impact_score}%` }}
                          />
                        </div>
                        <span className="text-emerald-400 text-xs">
                          {item.impact_score}%
                        </span>
                        {item.verified && (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        )}
                        {item.action_required && (
                          <Bell className="w-3 h-3 text-orange-400" />
                        )}
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
