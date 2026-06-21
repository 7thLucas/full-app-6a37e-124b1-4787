# Design Guidelines — AI Travel Planner

## Color Palette
- Primary: Indigo (#4F46E5) — trustworthy, modern, premium
- Secondary: Teal (#0D9488) — fresh, travel-inspired
- Accent: Amber (#F59E0B) — warmth, energy, highlights
- Background: White (#FFFFFF) with slate-50 (#F8FAFC) surfaces
- Text: Slate-900 (#0F172A) headings, Slate-600 (#475569) body, Slate-400 (#94A3B8) muted

## Typography
- Headings: font-black or font-bold, tight leading — confident and editorial
- Body: Regular weight, relaxed leading — readable and warm
- Labels/tags: font-semibold, tracking-widest uppercase — structured and clean

## Visual Style
- Clean, minimal, editorial — inspired by premium travel magazines
- Card-based layouts with generous padding (p-6 to p-8)
- Rounded corners (rounded-xl, rounded-2xl)
- Soft shadows for depth and elevation
- High-quality travel imagery where applicable

## Key UI Components
- **Chat/Input**: Conversational message input at bottom, responses shown as rich cards above
- **Timeline**: Vertical day-by-day schedule with colored day markers and time slots
- **Map**: Leaflet.js or similar embedded map with pins for each planned stop
- **Itinerary Cards**: Hotel card, attraction card, activity card — each with image, name, description, budget indicator
- **Navigation**: Tab-based (Chat | Timeline | Map)

## Responsive Design
- Mobile-first layout
- Bottom navigation on mobile
- Sidebar navigation on desktop

## Accessibility
- High contrast text on colored backgrounds
- Clear focus states
- Descriptive alt text on images