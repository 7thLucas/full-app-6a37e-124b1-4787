# WanderAI — Product Overview

## Product Identity
- **Name**: WanderAI
- **Tagline**: Agen perjalanan AI pribadi — rencanakan perjalanan impian dalam hitungan menit
- **Category**: Consumer Travel / AI Planning App
- **Positioning**: Personal AI travel agent that creates comprehensive, personalized travel itineraries based on user-stated destination, budget, and interests

## Target Users
- Independent travelers (domestic and international) who plan their own trips
- Budget-conscious travelers who want maximum value from every journey
- Travelers with specific interests: culture, adventure, culinary, nature, and more
- Anyone who finds trip planning time-consuming, fragmented, and overwhelming

## Core Problem
Planning a trip manually is slow, fragmented, and impersonal. Travelers cross-reference dozens of sources — maps, review sites, booking platforms, travel blogs — and still end up with a generic itinerary that ignores their personal budget, pace, and interests. No single tool creates a truly personalized plan and presents it visually.

## Solution
An AI-powered travel planner that acts as a personal travel agent. Users describe their destination, budget, and interests in natural language; the AI generates a complete, customized travel plan — hotel recommendations, curated attractions, and a day-by-day activity schedule. All plans are rendered as a visual timeline and an interactive map. The AI re-adjusts plans dynamically based on user feedback.

## Core Features

### Conversational Planning Input
Users describe destination, budget range, travel dates, and interests through a natural-language interface — no forms, no dropdowns.

### AI Itinerary Generation
Complete travel plan produced instantly: day-by-day schedule, recommended hotels, curated attractions, and activity suggestions — all tailored to the user's stated preferences and budget.

### Hotel & Accommodation Recommendations
Lodging suggestions matched to the user's budget tier, location preferences, and travel style.

### Attraction & Activity Discovery
Curated local recommendations aligned with stated interests (culture, adventure, culinary, nature, etc.).

### Timeline View
Visual day-by-day timeline of the full itinerary — every activity, meal, and stop laid out in sequence.

### Interactive Map
Geographic visualization of all planned stops and routes, giving travelers a spatial overview of the journey.

### Adaptive Planning
The AI listens to feedback and re-generates or adjusts any part of the plan on request — change a hotel, swap an activity, shift a day.

## Tone & Brand
- Warm, knowledgeable, helpful — like a trusted travel-savvy friend
- Visual and exploratory — destinations feel vivid and exciting
- Clean, accessible, optimized for ease of use
- **Primary language**: Bahasa Indonesia (bilingual-capable)

## App UI Structure (Shipped MVP)
Three-tab navigation — mobile-first (bottom nav), desktop (left sidebar):
- **Chat tab**: Conversational input; interest chips (Budaya, Kuliner, Alam, Pantai, Belanja, Relaksasi); AI-generated itinerary cards inline
- **Timeline tab**: Vertical day-by-day schedule with color-coded activity icons, time slots, and budget indicators
- **Peta tab**: Interactive Leaflet.js map; color-coded pins (indigo = hotels, amber = food, teal = attractions); click-to-popup labels

## MVP Scope
- **Status**: ✅ Shipped
- **Input**: destination, budget range, travel dates, personal interests (via conversational chat)
- **Output**: full itinerary (hotels, attractions, daily activities) rendered as timeline + interactive map
- **Feedback loop**: user requests adjustments; AI regenerates via agentic scaffold
- **Out of scope (MVP)**: flight booking, direct hotel/activity booking, payment processing

## Roadmap (Pre-staged)
1. **Save & revisit itineraries** — users can bookmark and return to generated plans
2. **Share travel plans** — shareable read-only link for friends and family
3. **Real-time weather forecasts** — per-day weather surfaced inline on the timeline

## Strategic Principles
- **AI-first value**: the core differentiator is the quality and depth of AI-generated, personalized recommendations
- **Visual presentation**: timeline and interactive map are non-negotiable — they make the plan tangible
- **Personalization depth**: every plan reflects the specific user's destination, budget, interests, and constraints
