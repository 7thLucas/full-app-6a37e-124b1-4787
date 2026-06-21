import { useState, useRef, useEffect } from "react";
import { Send, Mic } from "lucide-react";
import { cn } from "~/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestedPrompts?: string[];
  showSuggestions?: boolean;
}

export function ChatInput({
  onSend,
  isLoading = false,
  placeholder = "Ceritakan rencana perjalanan impian Anda...",
  suggestedPrompts = [],
  showSuggestions = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      {/* Suggested prompts */}
      {showSuggestions && suggestedPrompts.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onSend(prompt)}
              disabled={isLoading}
              className={cn(
                "flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-border",
                "bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary",
                "transition-colors duration-150 whitespace-nowrap",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {prompt.length > 45 ? prompt.slice(0, 42) + "..." : prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-2 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          className={cn(
            "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
            "resize-none outline-none border-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "leading-relaxed"
          )}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading}
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150",
            value.trim() && !isLoading
              ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Kirim pesan"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
