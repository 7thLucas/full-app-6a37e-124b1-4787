// ── Travel Planner Types ────────────────────────────────────────────────────

export type ActivityType = "hotel" | "attraction" | "food" | "transport" | "activity" | "free";

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: ActivityType;
  location?: string;
  budgetRange?: string;
  imageUrl?: string;
  rating?: number;
  tips?: string;
}

export interface DayPlan {
  day: number;
  date?: string;
  title: string;
  summary: string;
  activities: Activity[];
}

export interface HotelRecommendation {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: string;
  rating: number;
  amenities: string[];
  imageUrl?: string;
  budgetTier: "budget" | "mid" | "luxury";
}

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: ActivityType;
  day?: number;
}

export interface TravelItinerary {
  id: string;
  destination: string;
  startDate?: string;
  endDate?: string;
  duration: number;
  budgetTier: "budget" | "mid" | "luxury";
  totalEstimatedBudget?: string;
  interests: string[];
  summary: string;
  days: DayPlan[];
  hotels: HotelRecommendation[];
  mapPins: MapPin[];
  tips?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  itinerary?: TravelItinerary;
  isLoading?: boolean;
}

export type ActiveTab = "chat" | "timeline" | "map";
