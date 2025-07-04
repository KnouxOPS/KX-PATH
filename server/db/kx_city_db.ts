// KX PATH UAE Smart Database System
// طريق الخبرة - قاعدة بيانات الإمارات الذكية

export interface UAEArea {
  id: string;
  name_ar: string;
  name_en: string;
  emirate:
    | "dubai"
    | "abudhabi"
    | "sharjah"
    | "ajman"
    | "rak"
    | "fujairah"
    | "uaq";
  coordinates: {
    lat: number;
    lng: number;
    bounds: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
  };
  villa_count: number;
  active_projects: number;
  interested_clients: number;
  landscape_potential: "high" | "medium" | "low";
  avg_property_value: number;
  competition_level: "low" | "medium" | "high";
  soil_type: "sandy" | "rocky" | "clay" | "mixed";
  irrigation_complexity: "simple" | "moderate" | "complex";
  premium_factor: number; // 1-10 scale
}

export interface LiveProject {
  id: string;
  title_ar: string;
  title_en: string;
  coordinates: { lat: number; lng: number };
  status:
    | "planning"
    | "design"
    | "approval"
    | "execution"
    | "completed"
    | "maintenance";
  budget: number;
  progress_percentage: number;
  client_tier: "standard" | "premium" | "vip";
  project_type:
    | "villa_garden"
    | "commercial_landscape"
    | "pool_installation"
    | "maintenance"
    | "irrigation_system"
    | "green_roof"
    | "outdoor_lighting";
  start_date: string;
  estimated_completion: string;
  assigned_team: string[];
  materials_used: string[];
  sustainability_score: number;
}

export interface SmartNotification {
  id: string;
  type:
    | "new_construction"
    | "property_sale"
    | "land_purchase"
    | "development_permit"
    | "renovation"
    | "zoning_change";
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  coordinates: { lat: number; lng: number };
  area_id: string;
  opportunity_score: number; // 1-100
  property_value: number;
  plot_size: number;
  created_at: string;
  source:
    | "DubaiOpenData"
    | "SharjahRera"
    | "AjmanLands"
    | "AbuDhabiMunicipality"
    | "Manual"
    | "AIDiscovery";
  urgency_level: "low" | "medium" | "high" | "urgent";
  tags: string[];
}

export interface Company {
  id: string;
  user_id: string;
  company_name_ar: string;
  company_name_en: string;
  description_ar: string;
  description_en: string;
  license_number: string;
  municipality: string;
  services_offered: string[];
  specializations: string[];
  portfolio_images: string[];
  rating: number;
  total_projects: number;
  years_experience: number;
  team_size: number;
  location_coordinates: { lat: number; lng: number };
  service_areas: string[]; // Area IDs they cover
  verified: boolean;
  premium_member: boolean;
  contact_info: {
    phone: string;
    email: string;
    website?: string;
    instagram?: string;
    whatsapp?: string;
  };
  business_hours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  created_at: string;
}

export interface GardenRequest {
  id: string;
  client_id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  property_type: "villa" | "apartment" | "commercial" | "government" | "hotel";
  area_size: number; // square meters
  budget_range: { min: number; max: number };
  preferred_styles: string[];
  special_requirements: string[];
  has_pool: boolean;
  has_outdoor_kitchen: boolean;
  has_playground: boolean;
  has_pergola: boolean;
  irrigation_preference: "automatic" | "manual" | "smart";
  maintenance_preference: "self" | "company" | "hybrid";
  timeline: "urgent" | "normal" | "flexible";
  coordinates: { lat: number; lng: number };
  area_id: string;
  soil_analysis: {
    ph_level?: number;
    drainage_quality?: "excellent" | "good" | "poor";
    soil_type?: string;
    sun_exposure?: "full" | "partial" | "shade";
  };
  status:
    | "pending"
    | "reviewing"
    | "quoted"
    | "approved"
    | "in_progress"
    | "completed"
    | "cancelled";
  assigned_company_id?: string;
  ai_plan_id?: string;
  quotes_received: number;
  created_at: string;
  updated_at: string;
}

export interface AIPlan {
  id: string;
  garden_request_id: string;
  generated_images: string[];
  design_summary_ar: string;
  design_summary_en: string;
  plant_recommendations: {
    name_ar: string;
    name_en: string;
    scientific_name: string;
    climate_suitability: "excellent" | "good" | "fair";
    maintenance_level: "low" | "medium" | "high";
    water_requirement: "low" | "medium" | "high";
    growth_rate: "slow" | "medium" | "fast";
    size_at_maturity: string;
    special_features: string[];
  }[];
  hardscape_elements: {
    type: string;
    description_ar: string;
    description_en: string;
    estimated_cost: number;
    installation_complexity: "simple" | "moderate" | "complex";
  }[];
  irrigation_plan: {
    system_type: "drip" | "sprinkler" | "smart" | "hybrid";
    zones: number;
    water_efficiency_rating: number;
    estimated_monthly_usage: number; // liters
    automation_level: "basic" | "advanced" | "smart_ai";
  };
  sustainability_features: string[];
  estimated_total_cost: { min: number; max: number };
  estimated_timeline: string;
  maintenance_schedule: {
    daily: string[];
    weekly: string[];
    monthly: string[];
    seasonal: string[];
  };
  model_used: string;
  generation_parameters: any;
  approved_by_client: boolean;
  implemented: boolean;
  created_at: string;
}

export interface Rating {
  id: string;
  client_id: string;
  company_id: string;
  project_id: string;
  overall_rating: number; // 1-5
  quality_rating: number;
  timeliness_rating: number;
  communication_rating: number;
  value_rating: number;
  comment_ar?: string;
  comment_en?: string;
  images?: string[];
  would_recommend: boolean;
  created_at: string;
}

// UAE Areas Database - Real locations and data
export const UAE_AREAS_DATA: UAEArea[] = [
  // Dubai Areas
  {
    id: "dubai_marina",
    name_ar: "دبي مارينا",
    name_en: "Dubai Marina",
    emirate: "dubai",
    coordinates: {
      lat: 25.0814,
      lng: 55.1391,
      bounds: { north: 25.095, south: 25.065, east: 55.155, west: 55.12 },
    },
    villa_count: 156,
    active_projects: 45,
    interested_clients: 89,
    landscape_potential: "high",
    avg_property_value: 4500000,
    competition_level: "high",
    soil_type: "sandy",
    irrigation_complexity: "complex",
    premium_factor: 9,
  },
  {
    id: "jumeirah",
    name_ar: "جميرا",
    name_en: "Jumeirah",
    emirate: "dubai",
    coordinates: {
      lat: 25.2252,
      lng: 55.2606,
      bounds: { north: 25.245, south: 25.205, east: 55.28, west: 55.24 },
    },
    villa_count: 287,
    active_projects: 67,
    interested_clients: 134,
    landscape_potential: "high",
    avg_property_value: 6200000,
    competition_level: "medium",
    soil_type: "sandy",
    irrigation_complexity: "moderate",
    premium_factor: 10,
  },
  {
    id: "downtown_dubai",
    name_ar: "داون تاون دبي",
    name_en: "Downtown Dubai",
    emirate: "dubai",
    coordinates: {
      lat: 25.1972,
      lng: 55.2744,
      bounds: { north: 25.21, south: 25.185, east: 55.29, west: 55.26 },
    },
    villa_count: 89,
    active_projects: 23,
    interested_clients: 67,
    landscape_potential: "medium",
    avg_property_value: 8900000,
    competition_level: "high",
    soil_type: "mixed",
    irrigation_complexity: "complex",
    premium_factor: 10,
  },
  {
    id: "dubai_hills",
    name_ar: "دبي هيلز",
    name_en: "Dubai Hills",
    emirate: "dubai",
    coordinates: {
      lat: 25.1108,
      lng: 55.2453,
      bounds: { north: 25.13, south: 25.09, east: 55.265, west: 55.225 },
    },
    villa_count: 412,
    active_projects: 123,
    interested_clients: 198,
    landscape_potential: "high",
    avg_property_value: 5800000,
    competition_level: "medium",
    soil_type: "clay",
    irrigation_complexity: "moderate",
    premium_factor: 8,
  },

  // Abu Dhabi Areas
  {
    id: "khalifa_city",
    name_ar: "مدينة خليفة",
    name_en: "Khalifa City",
    emirate: "abudhabi",
    coordinates: {
      lat: 24.4187,
      lng: 54.5574,
      bounds: { north: 24.44, south: 24.395, east: 54.58, west: 54.53 },
    },
    villa_count: 523,
    active_projects: 145,
    interested_clients: 267,
    landscape_potential: "high",
    avg_property_value: 3200000,
    competition_level: "low",
    soil_type: "sandy",
    irrigation_complexity: "moderate",
    premium_factor: 7,
  },
  {
    id: "al_reef",
    name_ar: "الريف",
    name_en: "Al Reef",
    emirate: "abudhabi",
    coordinates: {
      lat: 24.4298,
      lng: 54.6063,
      bounds: { north: 24.445, south: 24.415, east: 54.625, west: 54.59 },
    },
    villa_count: 345,
    active_projects: 91,
    interested_clients: 156,
    landscape_potential: "high",
    avg_property_value: 2800000,
    competition_level: "low",
    soil_type: "sandy",
    irrigation_complexity: "simple",
    premium_factor: 6,
  },

  // Sharjah Areas
  {
    id: "al_rashidiya_sharjah",
    name_ar: "الراشدية",
    name_en: "Al Rashidiya",
    emirate: "sharjah",
    coordinates: {
      lat: 25.3421,
      lng: 55.4652,
      bounds: { north: 25.36, south: 25.325, east: 55.485, west: 55.445 },
    },
    villa_count: 678,
    active_projects: 234,
    interested_clients: 456,
    landscape_potential: "high",
    avg_property_value: 1800000,
    competition_level: "low",
    soil_type: "clay",
    irrigation_complexity: "simple",
    premium_factor: 5,
  },
  {
    id: "muweilah",
    name_ar: "مويلح",
    name_en: "Muweilah",
    emirate: "sharjah",
    coordinates: {
      lat: 25.2847,
      lng: 55.4712,
      bounds: { north: 25.3, south: 25.27, east: 55.49, west: 55.45 },
    },
    villa_count: 234,
    active_projects: 67,
    interested_clients: 123,
    landscape_potential: "medium",
    avg_property_value: 1200000,
    competition_level: "low",
    soil_type: "sandy",
    irrigation_complexity: "simple",
    premium_factor: 4,
  },

  // Ajman Areas
  {
    id: "al_nuaimiya",
    name_ar: "النعيمية",
    name_en: "Al Nuaimiya",
    emirate: "ajman",
    coordinates: {
      lat: 25.4086,
      lng: 55.5342,
      bounds: { north: 25.425, south: 25.39, east: 55.555, west: 55.515 },
    },
    villa_count: 789,
    active_projects: 234,
    interested_clients: 567,
    landscape_potential: "high",
    avg_property_value: 1500000,
    competition_level: "low",
    soil_type: "sandy",
    irrigation_complexity: "simple",
    premium_factor: 6,
  },

  // Ras Al Khaimah Areas
  {
    id: "al_hamra",
    name_ar: "الحمرا",
    name_en: "Al Hamra",
    emirate: "rak",
    coordinates: {
      lat: 25.7621,
      lng: 55.8234,
      bounds: { north: 25.78, south: 25.745, east: 55.845, west: 55.8 },
    },
    villa_count: 167,
    active_projects: 89,
    interested_clients: 234,
    landscape_potential: "high",
    avg_property_value: 2200000,
    competition_level: "low",
    soil_type: "rocky",
    irrigation_complexity: "complex",
    premium_factor: 7,
  },

  // Fujairah Areas
  {
    id: "fujairah_city",
    name_ar: "الفجيرة",
    name_en: "Fujairah City",
    emirate: "fujairah",
    coordinates: {
      lat: 25.1267,
      lng: 56.3414,
      bounds: { north: 25.145, south: 25.11, east: 56.36, west: 56.32 },
    },
    villa_count: 123,
    active_projects: 78,
    interested_clients: 145,
    landscape_potential: "medium",
    avg_property_value: 1800000,
    competition_level: "low",
    soil_type: "rocky",
    irrigation_complexity: "complex",
    premium_factor: 6,
  },
];

// Sample Live Notifications
export const SAMPLE_NOTIFICATIONS: SmartNotification[] = [
  {
    id: "notif_001",
    type: "new_construction",
    title_ar: "🏗️ بناء فيلا جديدة في النعيمية",
    title_en: "🏗️ New Villa Construction in Al Nuaimiya",
    description_ar: "فيلا بمساحة 1200 متر مربع، 4 غرف نوم، حديقة خلفية كبيرة",
    description_en: "1200 sqm villa, 4 bedrooms, large backyard garden space",
    coordinates: { lat: 25.4086, lng: 55.5342 },
    area_id: "al_nuaimiya",
    opportunity_score: 95,
    property_value: 2500000,
    plot_size: 1200,
    created_at: "2024-01-15T10:30:00Z",
    source: "AjmanLands",
    urgency_level: "high",
    tags: ["high_potential", "new_area", "villa", "large_garden"],
  },
  {
    id: "notif_002",
    type: "property_sale",
    title_ar: "🏡 بيع أرض سكنية في الراشدية",
    title_en: "🏡 Residential Land Sale in Al Rashidiya",
    description_ar: "أرض بمساحة 800 متر مربع، موقع ممتاز، قريبة من الخدمات",
    description_en: "800 sqm land, excellent location, close to amenities",
    coordinates: { lat: 25.3421, lng: 55.4652 },
    area_id: "al_rashidiya_sharjah",
    opportunity_score: 88,
    property_value: 1800000,
    plot_size: 800,
    created_at: "2024-01-15T08:15:00Z",
    source: "SharjahRera",
    urgency_level: "medium",
    tags: ["hot_zone", "growing_area", "land_sale"],
  },
];

// Helper functions for database operations
export class KXCityDB {
  static async getAreasByEmirate(emirate: string): Promise<UAEArea[]> {
    if (emirate === "all") {
      return UAE_AREAS_DATA;
    }
    return UAE_AREAS_DATA.filter((area) => area.emirate === emirate);
  }

  static async getHighOpportunityAreas(limit: number = 10): Promise<UAEArea[]> {
    return UAE_AREAS_DATA.filter(
      (area) =>
        area.landscape_potential === "high" &&
        area.competition_level !== "high",
    )
      .sort(
        (a, b) =>
          b.interested_clients +
          b.active_projects -
          (a.interested_clients + a.active_projects),
      )
      .slice(0, limit);
  }

  static async searchAreas(
    query: string,
    language: "ar" | "en" = "en",
  ): Promise<UAEArea[]> {
    const searchField = language === "ar" ? "name_ar" : "name_en";
    return UAE_AREAS_DATA.filter((area) =>
      area[searchField].toLowerCase().includes(query.toLowerCase()),
    );
  }

  static async getAreaById(areaId: string): Promise<UAEArea | null> {
    return UAE_AREAS_DATA.find((area) => area.id === areaId) || null;
  }

  static async getRecentNotifications(
    limit: number = 20,
  ): Promise<SmartNotification[]> {
    return SAMPLE_NOTIFICATIONS.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ).slice(0, limit);
  }

  static async getNotificationsByArea(
    areaId: string,
  ): Promise<SmartNotification[]> {
    return SAMPLE_NOTIFICATIONS.filter((notif) => notif.area_id === areaId);
  }

  static async getHighScoreOpportunities(
    minScore: number = 80,
  ): Promise<SmartNotification[]> {
    return SAMPLE_NOTIFICATIONS.filter(
      (notif) => notif.opportunity_score >= minScore,
    );
  }

  // AI-powered recommendations
  static async getAIRecommendations(
    companyId: string,
    preferences: any,
  ): Promise<{
    recommended_areas: UAEArea[];
    hot_opportunities: SmartNotification[];
    market_insights: any;
  }> {
    const recommendedAreas = await this.getHighOpportunityAreas(5);
    const hotOpportunities = await this.getHighScoreOpportunities(85);

    const marketInsights = {
      trending_emirates: ["ajman", "sharjah"],
      growth_areas: ["al_nuaimiya", "al_rashidiya_sharjah"],
      competition_gaps: UAE_AREAS_DATA.filter(
        (area) => area.competition_level === "low",
      ),
      seasonal_trends: {
        current_season: "winter",
        demand_level: "high",
        recommended_services: [
          "pool_installation",
          "outdoor_lighting",
          "villa_garden",
        ],
      },
    };

    return {
      recommended_areas: recommendedAreas,
      hot_opportunities: hotOpportunities,
      market_insights: marketInsights,
    };
  }
}

export default KXCityDB;
