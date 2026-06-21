import { Plane, MapPin, Calendar, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";

interface WelcomeScreenProps {
  appName: string;
  tagline: string;
  welcomeMessage: string;
  heroImageUrl?: string;
  suggestedPrompts?: string[];
  interestCategories?: Array<{ id: string; label: string; emoji?: string }>;
  onSendPrompt: (prompt: string) => void;
}

export function WelcomeScreen({
  appName,
  tagline,
  welcomeMessage,
  heroImageUrl,
  suggestedPrompts = [],
  interestCategories = [],
  onSendPrompt,
}: WelcomeScreenProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-primary">
        {heroImageUrl && (
          <div className="absolute inset-0">
            <img
              src={heroImageUrl}
              alt={appName}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="relative z-10 px-6 pt-10 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Plane size={16} className="text-primary-foreground" />
            </div>
            <span className="text-primary-foreground font-bold text-sm opacity-90">
              {appName}
            </span>
          </div>

          <h1 className="text-2xl font-black text-primary-foreground leading-tight mb-3">
            Rencanakan Perjalanan<br />
            <span className="opacity-80">Impian Anda</span>
          </h1>

          <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
            {tagline}
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: <MapPin size={14} />, label: "Destinasi" },
              { icon: <Calendar size={14} />, label: "Jadwal" },
              { icon: <Sparkles size={14} />, label: "Personal" },
            ].map((feat, i) => (
              <div
                key={i}
                className="bg-primary-foreground/10 rounded-xl px-2 py-2.5 flex flex-col items-center gap-1 backdrop-blur-sm"
              >
                <div className="text-primary-foreground">{feat.icon}</div>
                <span className="text-xs font-medium text-primary-foreground/90">
                  {feat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-3 items-start">
          <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center flex-shrink-0">
            <span className="text-sm">✈️</span>
          </div>
          <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-foreground leading-relaxed">{welcomeMessage}</p>
          </div>
        </div>
      </div>

      {/* Interest categories */}
      {interestCategories.length > 0 && (
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Apa minat perjalanan Anda?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {interestCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  onSendPrompt(
                    `Saya ingin merencanakan perjalanan dengan fokus ${cat.label.toLowerCase()}`
                  )
                }
                className={cn(
                  "rounded-xl border border-border bg-card p-3 text-center",
                  "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  "transition-all duration-150 active:scale-95 cursor-pointer"
                )}
              >
                {cat.emoji && (
                  <div className="text-xl mb-1">{cat.emoji}</div>
                )}
                <div className="text-xs font-medium text-foreground leading-tight">
                  {cat.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Suggested prompts */}
      {suggestedPrompts.length > 0 && (
        <div className="px-6 py-4 border-t border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
            Mulai dari sini
          </p>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => onSendPrompt(prompt)}
                className={cn(
                  "w-full text-left text-sm px-4 py-3 rounded-xl",
                  "border border-border bg-card text-foreground",
                  "hover:bg-primary hover:text-primary-foreground hover:border-primary",
                  "transition-all duration-150 leading-relaxed",
                  "active:scale-[0.98] cursor-pointer"
                )}
              >
                <span className="mr-2 text-primary">→</span>
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
