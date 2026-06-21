/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TInterestCategory = {
  id: string;
  label: string;
  emoji?: string;
};

export type TBudgetTier = {
  id: string;
  label: string;
  description?: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  tagline?: string;
  welcomeMessage?: string;
  chatPlaceholder?: string;
  heroImageUrl?: string;
  suggestedPrompts?: string[];
  interestCategories?: TInterestCategory[];
  budgetTiers?: TBudgetTier[];
  showMapTab?: boolean;
  showTimelineTab?: boolean;
  maxChatHistoryItems?: number;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "AI Travel Planner",
  logoUrl: "",
  brandColor: {
    // Base
    background:        "#ffffff",
    foreground:        "#0f172a",
    // Card
    card:              "#ffffff",
    cardForeground:    "#0f172a",
    // Popover
    popover:           "#ffffff",
    popoverForeground: "#0f172a",
    // Primary — Indigo
    primary:           "#4f46e5",
    primaryForeground: "#ffffff",
    // Secondary — Teal
    secondary:           "#f0fdfa",
    secondaryForeground: "#0f172a",
    // Muted
    muted:           "#f8fafc",
    mutedForeground: "#475569",
    // Accent — Amber
    accent:           "#fef3c7",
    accentForeground: "#0f172a",
    // Destructive
    destructive:           "#ef4444",
    destructiveForeground: "#fafafa",
    // Border / Input / Ring
    border: "#e2e8f0",
    input:  "#e2e8f0",
    ring:   "#4f46e5",
    // Charts
    chart1: "#4f46e5",
    chart2: "#0d9488",
    chart3: "#f59e0b",
    chart4: "#8b5cf6",
    chart5: "#ec4899",
    // Navbar
    navbarBackground: "#ffffff",
    // Sidebar
    sidebarBackground:        "#f8fafc",
    sidebarForeground:        "#475569",
    sidebarPrimary:           "#4f46e5",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent:            "#ede9fe",
    sidebarAccentForeground:  "#0f172a",
    sidebarBorder:            "#e2e8f0",
    sidebarRing:              "#4f46e5",
  },
  font: {
    headingFont: "Plus Jakarta Sans",
    textFont: "Inter",
  },
  tagline: "Perencana perjalanan AI yang menciptakan itinerari perjalanan lengkap dan personal hanya dalam beberapa detik.",
  welcomeMessage: "Halo! Saya asisten perjalanan AI Anda. Ceritakan ke mana Anda ingin pergi, dan saya akan membuat rencana perjalanan yang sempurna untuk Anda.",
  chatPlaceholder: "Contoh: Rencanakan liburan 5 hari ke Bali dengan budget Rp 5 juta, saya suka budaya dan kuliner...",
  heroImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  suggestedPrompts: [
    "Rencanakan liburan 5 hari ke Bali dengan budget Rp 5 juta",
    "Itinerari 3 hari di Yogyakarta untuk keluarga dengan anak kecil",
    "Trip ke Raja Ampat 7 hari untuk pecinta snorkeling",
    "Weekend di Bandung dengan tema kuliner dan belanja",
  ],
  interestCategories: [
    { id: "culture", label: "Budaya & Sejarah", emoji: "🏛️" },
    { id: "culinary", label: "Kuliner", emoji: "🍜" },
    { id: "nature", label: "Alam & Petualangan", emoji: "🏔️" },
    { id: "beach", label: "Pantai & Bahari", emoji: "🏖️" },
    { id: "shopping", label: "Belanja", emoji: "🛍️" },
    { id: "wellness", label: "Relaksasi & Spa", emoji: "🧘" },
  ],
  budgetTiers: [
    { id: "budget", label: "Budget", description: "< Rp 1 juta/hari" },
    { id: "mid", label: "Menengah", description: "Rp 1-3 juta/hari" },
    { id: "luxury", label: "Mewah", description: "> Rp 3 juta/hari" },
  ],
  showMapTab: true,
  showTimelineTab: true,
  maxChatHistoryItems: 50,
  // ─────────────────────────────────────────────────────────────────────
  // Add new field defaults here. See RULES.md §5 for per-type shape.
  // ─────────────────────────────────────────────────────────────────────
};
