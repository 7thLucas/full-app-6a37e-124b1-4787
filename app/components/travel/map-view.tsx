import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import type { TravelItinerary, MapPin as MapPinType } from "~/types/travel";
import { activityTypeLabel } from "./activity-icon";
import { cn } from "~/lib/utils";

interface MapViewProps {
  itinerary: TravelItinerary;
}

// A lightweight static map implementation using OpenStreetMap tiles via Leaflet
// Loaded dynamically to avoid SSR issues
function LeafletMap({ pins, center }: { pins: MapPinType[]; center: [number, number] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    async function initMap() {
      try {
        // Dynamic import to avoid SSR
        const L = await import("leaflet");

        // Fix default icon path issue
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });

        if (!isMounted || !mapRef.current) return;

        const map = L.map(mapRef.current, {
          center: center,
          zoom: pins.length === 1 ? 13 : 11,
          zoomControl: true,
          attributionControl: false,
        });

        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        // Add pins
        const markerGroup = L.featureGroup();

        pins.forEach((pin) => {
          const marker = L.circleMarker([pin.lat, pin.lng], {
            radius: 8,
            fillColor: pin.type === "hotel" ? "#4f46e5" : pin.type === "food" ? "#f59e0b" : "#0d9488",
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9,
          });

          marker.bindPopup(
            `<div style="font-family: inherit; min-width: 120px;">
              <strong style="font-size: 13px;">${pin.title}</strong>
              <br/>
              <span style="font-size: 11px; color: #666;">${activityTypeLabel(pin.type as any)}${pin.day ? ` · Hari ${pin.day}` : ""}</span>
            </div>`,
            { closeButton: false }
          );

          marker.addTo(markerGroup);
        });

        markerGroup.addTo(map);

        // Fit bounds if multiple pins
        if (pins.length > 1) {
          map.fitBounds(markerGroup.getBounds().pad(0.2));
        }
      } catch (err) {
        if (isMounted) {
          setError("Tidak dapat memuat peta. Pastikan koneksi internet tersedia.");
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted rounded-xl">
        <p className="text-sm text-muted-foreground text-center px-4">{error}</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
}

function PinLegend({ pins }: { pins: MapPinType[] }) {
  const grouped = pins.reduce(
    (acc, pin) => {
      if (!acc[pin.type]) acc[pin.type] = [];
      acc[pin.type].push(pin);
      return acc;
    },
    {} as Record<string, MapPinType[]>
  );

  return (
    <div className="flex gap-3 flex-wrap">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="flex items-center gap-1.5">
          <div
            className={cn(
              "w-3 h-3 rounded-full",
              type === "hotel"
                ? "bg-primary"
                : type === "food"
                ? "bg-[#f59e0b]"
                : "bg-[#0d9488]"
            )}
          />
          <span className="text-xs text-muted-foreground">
            {activityTypeLabel(type as any)} ({items.length})
          </span>
        </div>
      ))}
    </div>
  );
}

export function MapView({ itinerary }: MapViewProps) {
  const { mapPins } = itinerary;

  // Calculate map center from pins
  const center: [number, number] =
    mapPins.length > 0
      ? [
          mapPins.reduce((sum, p) => sum + p.lat, 0) / mapPins.length,
          mapPins.reduce((sum, p) => sum + p.lng, 0) / mapPins.length,
        ]
      : [-8.4095, 115.1889]; // Default to Bali

  if (mapPins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-8 text-center">
        <MapPin size={48} className="text-muted-foreground mb-4" />
        <h3 className="font-bold text-foreground mb-2">Belum Ada Peta</h3>
        <p className="text-sm text-muted-foreground">
          Buat itinerari terlebih dahulu untuk melihat peta interaktif dengan semua lokasi yang akan dikunjungi.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <MapPin size={16} className="text-primary" />
          <h2 className="font-bold text-foreground text-sm">{itinerary.destination}</h2>
          <span className="text-xs text-muted-foreground ml-auto">{mapPins.length} lokasi</span>
        </div>
        <PinLegend pins={mapPins} />
      </div>

      {/* Map */}
      <div className="flex-1 p-3">
        <LeafletMap pins={mapPins} center={center} />
      </div>

      {/* Pin list */}
      <div className="px-4 pb-4 max-h-48 overflow-y-auto">
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          Daftar Lokasi
        </p>
        <div className="space-y-1.5">
          {mapPins.map((pin) => (
            <div key={pin.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-full flex-shrink-0",
                  pin.type === "hotel"
                    ? "bg-primary"
                    : pin.type === "food"
                    ? "bg-[#f59e0b]"
                    : "bg-[#0d9488]"
                )}
              />
              <span className="text-xs text-foreground flex-1 truncate">{pin.title}</span>
              {pin.day && (
                <span className="text-xs text-muted-foreground flex-shrink-0">Hari {pin.day}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
