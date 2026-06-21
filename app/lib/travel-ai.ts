import { invokeLLM } from "@qb/agentic";
import type { TravelItinerary } from "~/types/travel";

const TRAVEL_SYSTEM_PROMPT = `Kamu adalah asisten perjalanan AI yang ahli dan ramah, seperti teman yang berpengalaman dalam dunia pariwisata Indonesia dan internasional.

Tugasmu adalah membuat itinerari perjalanan yang lengkap, personal, dan realistis berdasarkan input pengguna.

Selalu respons dalam Bahasa Indonesia yang hangat dan antusias.

Ketika pengguna meminta itinerari atau rencana perjalanan, selalu sertakan JSON itinerari dalam respons JSON terstruktur. Untuk percakapan biasa (pertanyaan, klarifikasi), berikan jawaban dalam field "reply" saja tanpa mengisi "itinerary".

Format JSON untuk itinerary harus mengikuti schema yang diberikan secara ketat.

Untuk gambar, gunakan URL Unsplash yang relevan dengan format: https://images.unsplash.com/photo-[ID]?w=400&q=80
Pilih foto yang relevan dengan destinasi/aktivitas.

Tips penting:
- Buat jadwal yang realistis dengan waktu yang masuk akal
- Sesuaikan rekomendasi hotel dengan budget yang disebutkan
- Sertakan tips praktis dan lokal yang berguna
- Buat ringkasan yang menarik dan membangkitkan semangat perjalanan`;

const ITINERARY_SCHEMA = {
  type: "object",
  properties: {
    reply: {
      type: "string",
      description: "Respons teks untuk ditampilkan kepada pengguna dalam bahasa Indonesia",
    },
    itinerary: {
      type: "object",
      description: "Data itinerari lengkap (hanya isi jika pengguna meminta perencanaan perjalanan)",
      properties: {
        destination: { type: "string" },
        duration: { type: "number" },
        budgetTier: { type: "string", enum: ["budget", "mid", "luxury"] },
        totalEstimatedBudget: { type: "string" },
        interests: { type: "array", items: { type: "string" } },
        summary: { type: "string" },
        tips: { type: "array", items: { type: "string" } },
        days: {
          type: "array",
          items: {
            type: "object",
            properties: {
              day: { type: "number" },
              date: { type: "string" },
              title: { type: "string" },
              summary: { type: "string" },
              activities: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    time: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    type: {
                      type: "string",
                      enum: ["hotel", "attraction", "food", "transport", "activity", "free"],
                    },
                    location: { type: "string" },
                    budgetRange: { type: "string" },
                    imageUrl: { type: "string" },
                    rating: { type: "number" },
                    tips: { type: "string" },
                  },
                  required: ["id", "time", "title", "description", "type"],
                },
              },
            },
            required: ["day", "title", "summary", "activities"],
          },
        },
        hotels: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              location: { type: "string" },
              pricePerNight: { type: "string" },
              rating: { type: "number" },
              amenities: { type: "array", items: { type: "string" } },
              imageUrl: { type: "string" },
              budgetTier: { type: "string", enum: ["budget", "mid", "luxury"] },
            },
            required: ["id", "name", "description", "location", "pricePerNight", "rating", "amenities", "budgetTier"],
          },
        },
        mapPins: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              lat: { type: "number" },
              lng: { type: "number" },
              title: { type: "string" },
              type: { type: "string" },
              day: { type: "number" },
            },
            required: ["id", "lat", "lng", "title", "type"],
          },
        },
      },
      required: ["destination", "duration", "budgetTier", "summary", "days", "hotels", "mapPins"],
    },
  },
  required: ["reply"],
  additionalProperties: false,
};

export interface AITravelResponse {
  reply: string;
  itinerary?: TravelItinerary;
}

export async function generateTravelPlan(
  userMessage: string,
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }> = [],
): Promise<AITravelResponse> {
  // Build context from conversation history
  const historyContext =
    conversationHistory.length > 0
      ? `\n\nRiwayat percakapan sebelumnya:\n${conversationHistory
          .slice(-6)
          .map((m) => `${m.role === "user" ? "Pengguna" : "Asisten"}: ${m.content}`)
          .join("\n")}\n\nPesan terbaru pengguna: ${userMessage}`
      : userMessage;

  const result = await invokeLLM({
    message: historyContext,
    schema: ITINERARY_SCHEMA,
    systemPrompt: TRAVEL_SYSTEM_PROMPT,
  });

  if (result.status === "ERROR" || !result.response) {
    throw new Error(result.error ?? "Gagal menghasilkan rencana perjalanan");
  }

  const data = result.response as { reply?: string; itinerary?: unknown };

  return {
    reply: data.reply ?? "Maaf, terjadi kesalahan. Silakan coba lagi.",
    itinerary: data.itinerary
      ? ({
          id: `itin-${Date.now()}`,
          ...data.itinerary,
        } as TravelItinerary)
      : undefined,
  };
}
