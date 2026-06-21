import { Star, MapPin } from "lucide-react";
import type { TravelItinerary, DayPlan, Activity } from "~/types/travel";
import { ActivityIcon, activityTypeColor, activityTypeBorder, activityTypeLabel } from "./activity-icon";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

interface TimelineViewProps {
  itinerary: TravelItinerary;
}

function ActivityCard({ activity, isLast }: { activity: Activity; isLast: boolean }) {
  return (
    <div className={cn("flex gap-3", !isLast && "mb-4")}>
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10",
            activityTypeColor(activity.type)
          )}
        >
          <ActivityIcon type={activity.type} size={14} />
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-border mt-1" />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-1", !isLast && "mb-2")}>
        <div
          className={cn(
            "rounded-xl border p-3 bg-card shadow-sm hover:shadow-md transition-shadow",
            activityTypeBorder(activity.type)
          )}
        >
          {/* Time & type */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-primary">{activity.time}</span>
            <Badge variant="outline" className="text-xs">
              {activityTypeLabel(activity.type)}
            </Badge>
          </div>

          {/* Title */}
          <h4 className="font-semibold text-foreground text-sm mb-1 leading-tight">
            {activity.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            {activity.description}
          </p>

          {/* Image */}
          {activity.imageUrl && (
            <div className="rounded-lg overflow-hidden mb-2 h-28">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}

          {/* Meta info */}
          <div className="flex items-center gap-3 flex-wrap">
            {activity.location && (
              <div className="flex items-center gap-1">
                <MapPin size={11} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{activity.location}</span>
              </div>
            )}
            {activity.rating && (
              <div className="flex items-center gap-1">
                <Star size={11} className="text-[#f59e0b] fill-[#f59e0b]" />
                <span className="text-xs text-muted-foreground">{activity.rating}</span>
              </div>
            )}
            {activity.budgetRange && (
              <span className="text-xs text-muted-foreground">{activity.budgetRange}</span>
            )}
          </div>

          {/* Tips */}
          {activity.tips && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground italic">
                💡 {activity.tips}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DaySection({ day }: { day: DayPlan }) {
  return (
    <div className="mb-8">
      {/* Day header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="text-sm font-black text-primary-foreground">{day.day}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-foreground leading-tight">{day.title}</h3>
          {day.date && (
            <p className="text-xs text-muted-foreground">{day.date}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="ml-13 mb-4 pl-3 border-l-2 border-primary/20">
        <p className="text-sm text-muted-foreground leading-relaxed">{day.summary}</p>
      </div>

      {/* Activities */}
      <div className="ml-5">
        {day.activities.map((activity, index) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isLast={index === day.activities.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function HotelSection({ itinerary }: { itinerary: TravelItinerary }) {
  if (!itinerary.hotels.length) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-foreground text-base">Rekomendasi Hotel</h3>
        <Badge variant="secondary">{itinerary.hotels.length} pilihan</Badge>
      </div>

      <div className="space-y-3">
        {itinerary.hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            {/* Hotel image */}
            {hotel.imageUrl && (
              <div className="rounded-lg overflow-hidden mb-3 h-32">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-bold text-foreground text-sm leading-tight">{hotel.name}</h4>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
                <span className="text-xs font-semibold text-foreground">{hotel.rating}</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {hotel.description}
            </p>

            <div className="flex items-center gap-2 mb-2">
              <MapPin size={11} className="text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">{hotel.location}</span>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-bold text-primary">{hotel.pricePerNight}</span>
              <div className="flex gap-1 flex-wrap">
                {hotel.amenities.slice(0, 3).map((amenity, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineView({ itinerary }: TimelineViewProps) {
  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-primary" />
          <h2 className="text-xl font-black text-foreground">{itinerary.destination}</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{itinerary.summary}</p>

        {/* Stats */}
        <div className="flex gap-3 mt-3 flex-wrap">
          <div className="px-3 py-1.5 bg-primary/10 rounded-full">
            <span className="text-xs font-semibold text-primary">{itinerary.duration} Hari</span>
          </div>
          {itinerary.totalEstimatedBudget && (
            <div className="px-3 py-1.5 bg-accent rounded-full">
              <span className="text-xs font-semibold text-accent-foreground">
                {itinerary.totalEstimatedBudget}
              </span>
            </div>
          )}
          {itinerary.interests.map((interest, i) => (
            <div key={i} className="px-3 py-1.5 bg-secondary rounded-full">
              <span className="text-xs font-medium text-secondary-foreground">{interest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hotels */}
      <HotelSection itinerary={itinerary} />

      {/* Day-by-day timeline */}
      <div>
        <h3 className="font-bold text-foreground text-base mb-4">Jadwal Perjalanan</h3>
        {itinerary.days.map((day) => (
          <DaySection key={day.day} day={day} />
        ))}
      </div>

      {/* Travel tips */}
      {itinerary.tips && itinerary.tips.length > 0 && (
        <div className="rounded-xl border border-border bg-accent/20 p-4">
          <h4 className="font-bold text-foreground text-sm mb-3">Tips Perjalanan</h4>
          <ul className="space-y-2">
            {itinerary.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
