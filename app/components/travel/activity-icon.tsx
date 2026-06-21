import {
  Hotel,
  MapPin,
  Utensils,
  Train,
  Compass,
  Clock,
} from "lucide-react";
import type { ActivityType } from "~/types/travel";
import { cn } from "~/lib/utils";

interface ActivityIconProps {
  type: ActivityType;
  className?: string;
  size?: number;
}

export function ActivityIcon({ type, className, size = 16 }: ActivityIconProps) {
  const iconProps = { size, className };

  switch (type) {
    case "hotel":
      return <Hotel {...iconProps} />;
    case "food":
      return <Utensils {...iconProps} />;
    case "transport":
      return <Train {...iconProps} />;
    case "activity":
      return <Compass {...iconProps} />;
    case "attraction":
      return <MapPin {...iconProps} />;
    case "free":
      return <Clock {...iconProps} />;
    default:
      return <Compass {...iconProps} />;
  }
}

export function activityTypeColor(type: ActivityType): string {
  switch (type) {
    case "hotel":
      return "bg-primary text-primary-foreground";
    case "food":
      return "bg-[#f59e0b] text-white";
    case "transport":
      return "bg-muted-foreground text-background";
    case "activity":
      return "bg-[#0d9488] text-white";
    case "attraction":
      return "bg-primary text-primary-foreground";
    case "free":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function activityTypeBorder(type: ActivityType): string {
  switch (type) {
    case "hotel":
      return "border-primary/30";
    case "food":
      return "border-[#f59e0b]/30";
    case "transport":
      return "border-muted-foreground/30";
    case "activity":
      return "border-[#0d9488]/30";
    case "attraction":
      return "border-primary/30";
    case "free":
      return "border-border";
    default:
      return "border-border";
  }
}

export function activityTypeLabel(type: ActivityType): string {
  switch (type) {
    case "hotel":
      return "Hotel";
    case "food":
      return "Kuliner";
    case "transport":
      return "Transportasi";
    case "activity":
      return "Aktivitas";
    case "attraction":
      return "Atraksi";
    case "free":
      return "Waktu Bebas";
    default:
      return "Aktivitas";
  }
}
