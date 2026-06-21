import { MapPin, Star, Hotel, Clock, Loader2 } from "lucide-react";
import type { ChatMessage, TravelItinerary } from "~/types/travel";
import { cn } from "~/lib/utils";
import { Badge } from "~/components/ui/badge";

interface ChatMessageProps {
  message: ChatMessage;
}

function ItineraryPreviewCard({ itinerary }: { itinerary: TravelItinerary }) {
  return (
    <div className="mt-3 rounded-xl border border-border bg-card overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary-foreground opacity-80" />
          <span className="font-bold text-primary-foreground text-sm">
            {itinerary.destination}
          </span>
        </div>
        <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground text-xs">
          {itinerary.duration} Hari
        </Badge>
      </div>

      {/* Summary */}
      <div className="px-4 py-3 border-b border-border">
        <p className="text-sm text-muted-foreground leading-relaxed">{itinerary.summary}</p>
      </div>

      {/* Stats row */}
      <div className="px-4 py-3 flex items-center gap-4 flex-wrap">
        {itinerary.totalEstimatedBudget && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Estimasi Budget:</span>
            <span className="text-xs font-semibold text-foreground">{itinerary.totalEstimatedBudget}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Hotel size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{itinerary.hotels.length} Hotel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {itinerary.days.reduce((sum, d) => sum + d.activities.length, 0)} Aktivitas
          </span>
        </div>
      </div>

      {/* Day preview - first 2 days */}
      {itinerary.days.slice(0, 2).map((day) => (
        <div key={day.day} className="px-4 py-2 border-t border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary-foreground">{day.day}</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{day.title}</span>
          </div>
          <p className="text-xs text-muted-foreground ml-8 leading-relaxed">{day.summary}</p>
        </div>
      ))}

      {itinerary.days.length > 2 && (
        <div className="px-4 py-2 border-t border-border">
          <p className="text-xs text-primary font-medium">
            + {itinerary.days.length - 2} hari lainnya — lihat di tab Timeline
          </p>
        </div>
      )}

      {/* Tips */}
      {itinerary.tips && itinerary.tips.length > 0 && (
        <div className="px-4 py-3 border-t border-border bg-accent/30">
          <p className="text-xs font-semibold text-foreground mb-1">Tips Perjalanan</p>
          <ul className="space-y-0.5">
            {itinerary.tips.slice(0, 2).map((tip, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-1.5">
                <span className="text-primary">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
    </div>
  );
}

export function ChatMessageItem({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted border border-border"
        )}
      >
        {isUser ? (
          <span className="text-xs font-bold">K</span>
        ) : (
          <span className="text-sm">✈️</span>
        )}
      </div>

      {/* Bubble */}
      <div className={cn("max-w-[85%] min-w-0", isUser && "items-end flex flex-col")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-card border border-border text-foreground rounded-tl-sm shadow-sm"
          )}
        >
          {message.isLoading ? (
            <LoadingDots />
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Itinerary card */}
        {message.itinerary && !message.isLoading && (
          <div className="w-full mt-1">
            <ItineraryPreviewCard itinerary={message.itinerary} />
          </div>
        )}

        {/* Timestamp */}
        <p className={cn("text-xs text-muted-foreground mt-1", isUser && "text-right")}>
          {message.timestamp.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
