import { useState, useRef, useEffect, useCallback } from "react";
import { useConfigurables } from "~/modules/configurables";
import { generateTravelPlan } from "~/lib/travel-ai";
import type { ChatMessage, TravelItinerary, ActiveTab } from "~/types/travel";
import { ChatMessageItem } from "~/components/travel/chat-message";
import { ChatInput } from "~/components/travel/chat-input";
import { WelcomeScreen } from "~/components/travel/welcome-screen";
import { TimelineView } from "~/components/travel/timeline-view";
import { MapView } from "~/components/travel/map-view";
import { NavTabs, SidebarNav } from "~/components/travel/nav-tabs";
import { cn } from "~/lib/utils";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function TravelPlannerPage() {
  const { config, loading } = useConfigurables();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("chat");
  const [currentItinerary, setCurrentItinerary] = useState<TravelItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Derived config values with fallbacks
  const appName = config?.appName ?? "AI Travel Planner";
  const logoUrl = config?.logoUrl ?? "";
  const tagline = config?.tagline ?? "Rencanakan perjalanan impian Anda dengan AI";
  const welcomeMessage = config?.welcomeMessage ?? "Halo! Saya siap membantu merencanakan perjalanan Anda.";
  const chatPlaceholder = config?.chatPlaceholder ?? "Ceritakan rencana perjalanan Anda...";
  const heroImageUrl = config?.heroImageUrl ?? "";
  const suggestedPrompts = config?.suggestedPrompts ?? [];
  const interestCategories = config?.interestCategories ?? [];
  const showMapTab = config?.showMapTab ?? true;
  const showTimelineTab = config?.showTimelineTab ?? true;
  const maxHistory = config?.maxChatHistoryItems ?? 50;

  const hasMessages = messages.length > 0;
  const hasItinerary = currentItinerary !== null;

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = useCallback(
    async (userText: string) => {
      if (isGenerating) return;

      // Build conversation history
      const history = messages
        .filter((m) => !m.isLoading)
        .slice(-(maxHistory - 2))
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));

      // Add user message
      const userMessage: ChatMessage = {
        id: generateId(),
        role: "user",
        content: userText,
        timestamp: new Date(),
      };

      // Add loading assistant message
      const loadingMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isLoading: true,
      };

      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setIsGenerating(true);

      try {
        const result = await generateTravelPlan(userText, history);

        // Replace loading message with actual response
        const assistantMessage: ChatMessage = {
          id: loadingMessage.id,
          role: "assistant",
          content: result.reply,
          timestamp: new Date(),
          itinerary: result.itinerary,
        };

        setMessages((prev) =>
          prev.map((m) => (m.id === loadingMessage.id ? assistantMessage : m))
        );

        // Update current itinerary if one was generated
        if (result.itinerary) {
          setCurrentItinerary(result.itinerary);
        }
      } catch (error) {
        const errorMsg: ChatMessage = {
          id: loadingMessage.id,
          role: "assistant",
          content:
            "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi.",
          timestamp: new Date(),
        };
        setMessages((prev) =>
          prev.map((m) => (m.id === loadingMessage.id ? errorMsg : m))
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [isGenerating, messages, maxHistory]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-56 lg:w-64 flex-shrink-0">
        <SidebarNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showMap={showMapTab}
          showTimeline={showTimelineTab}
          hasItinerary={hasItinerary}
          appName={appName}
          logoUrl={logoUrl}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card">
          {logoUrl ? (
            <img src={logoUrl} alt={appName} className="w-7 h-7 rounded-lg object-contain" />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs">✈️</span>
            </div>
          )}
          <h1 className="font-bold text-foreground text-sm flex-1 truncate">{appName}</h1>
          {hasItinerary && currentItinerary && (
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
              {currentItinerary.destination}
            </span>
          )}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {/* CHAT TAB */}
          <div
            className={cn(
              "flex flex-col h-full",
              activeTab !== "chat" && "hidden"
            )}
          >
            {/* Messages area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto"
            >
              {!hasMessages ? (
                <WelcomeScreen
                  appName={appName}
                  tagline={tagline}
                  welcomeMessage={welcomeMessage}
                  heroImageUrl={heroImageUrl}
                  suggestedPrompts={suggestedPrompts}
                  interestCategories={interestCategories}
                  onSendPrompt={handleSend}
                />
              ) : (
                <div className="px-4 py-4">
                  {messages.map((message) => (
                    <ChatMessageItem key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="px-4 py-3 border-t border-border bg-background">
              <ChatInput
                onSend={handleSend}
                isLoading={isGenerating}
                placeholder={chatPlaceholder}
                suggestedPrompts={suggestedPrompts}
                showSuggestions={!hasMessages}
              />
            </div>
          </div>

          {/* TIMELINE TAB */}
          <div
            className={cn(
              "h-full overflow-y-auto",
              activeTab !== "timeline" && "hidden"
            )}
          >
            {currentItinerary ? (
              <TimelineView itinerary={currentItinerary} />
            ) : (
              <EmptyTabState
                tab="timeline"
                onGoToChat={() => setActiveTab("chat")}
              />
            )}
          </div>

          {/* MAP TAB */}
          <div
            className={cn(
              "h-full",
              activeTab !== "map" && "hidden"
            )}
          >
            {currentItinerary ? (
              <MapView itinerary={currentItinerary} />
            ) : (
              <EmptyTabState
                tab="map"
                onGoToChat={() => setActiveTab("chat")}
              />
            )}
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <div className="md:hidden">
          <NavTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showMap={showMapTab}
            showTimeline={showTimelineTab}
            hasItinerary={hasItinerary}
          />
        </div>
      </div>
    </div>
  );
}

function EmptyTabState({
  tab,
  onGoToChat,
}: {
  tab: "timeline" | "map";
  onGoToChat: () => void;
}) {
  const isTimeline = tab === "timeline";

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center">
      <div className="text-5xl mb-4">{isTimeline ? "📅" : "🗺️"}</div>
      <h3 className="font-bold text-foreground text-lg mb-2">
        {isTimeline ? "Belum Ada Timeline" : "Belum Ada Peta"}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
        {isTimeline
          ? "Buat itinerari perjalanan di tab Chat terlebih dahulu untuk melihat jadwal lengkap hari per hari."
          : "Buat itinerari perjalanan di tab Chat terlebih dahulu untuk melihat peta interaktif dengan semua lokasi."}
      </p>
      <button
        onClick={onGoToChat}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
      >
        Mulai Chat
      </button>
    </div>
  );
}
