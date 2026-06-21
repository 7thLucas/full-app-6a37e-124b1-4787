import { MessageCircle, Calendar, Map } from "lucide-react";
import type { ActiveTab } from "~/types/travel";
import { cn } from "~/lib/utils";

interface NavTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  showMap: boolean;
  showTimeline: boolean;
  hasItinerary: boolean;
}

interface TabItem {
  id: ActiveTab;
  label: string;
  icon: React.ReactNode;
}

export function NavTabs({ activeTab, onTabChange, showMap, showTimeline, hasItinerary }: NavTabsProps) {
  const tabs: TabItem[] = [
    {
      id: "chat",
      label: "Chat",
      icon: <MessageCircle size={20} />,
    },
    ...(showTimeline
      ? [
          {
            id: "timeline" as ActiveTab,
            label: "Timeline",
            icon: <Calendar size={20} />,
          },
        ]
      : []),
    ...(showMap
      ? [
          {
            id: "map" as ActiveTab,
            label: "Peta",
            icon: <Map size={20} />,
          },
        ]
      : []),
  ];

  return (
    <div className="flex border-t border-border bg-background safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isDisabled = tab.id !== "chat" && !hasItinerary;

        return (
          <button
            key={tab.id}
            onClick={() => !isDisabled && onTabChange(tab.id)}
            disabled={isDisabled}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2",
              "transition-colors duration-150 relative",
              isActive
                ? "text-primary"
                : isDisabled
                ? "text-muted-foreground/40 cursor-not-allowed"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label={tab.label}
          >
            {/* Active indicator */}
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
            )}

            {tab.icon}

            <span className={cn("text-xs font-medium", isActive && "font-semibold")}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Desktop sidebar version
export function SidebarNav({ activeTab, onTabChange, showMap, showTimeline, hasItinerary, appName, logoUrl }: NavTabsProps & { appName?: string; logoUrl?: string }) {
  const tabs: TabItem[] = [
    {
      id: "chat",
      label: "Chat AI",
      icon: <MessageCircle size={18} />,
    },
    ...(showTimeline
      ? [
          {
            id: "timeline" as ActiveTab,
            label: "Timeline",
            icon: <Calendar size={18} />,
          },
        ]
      : []),
    ...(showMap
      ? [
          {
            id: "map" as ActiveTab,
            label: "Peta Interaktif",
            icon: <Map size={18} />,
          },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt={appName} className="w-8 h-8 rounded-lg object-contain" />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm">✈️</span>
            </div>
          )}
          <span className="font-bold text-sidebar-foreground text-sm">{appName ?? "Travel Planner"}</span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.id !== "chat" && !hasItinerary;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && onTabChange(tab.id)}
              disabled={isDisabled}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                  : isDisabled
                  ? "text-sidebar-foreground/30 cursor-not-allowed"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
              {isDisabled && (
                <span className="ml-auto text-xs text-sidebar-foreground/30">Buat dulu</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/50">AI Travel Planner v1.0</p>
      </div>
    </div>
  );
}
