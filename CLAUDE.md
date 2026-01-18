# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Architecture

**Life Reset Protocol** is a mobile-first PWA for identity-based habit tracking, built on gamification principles from Naval Ravikant, Joe Dispenza, and "The 1-Day Life Reset Protocol".

### Core Concept
Users don't "do tasks" - they "confirm who they are". The app gamifies life transformation:
- **Annual Mission**: 1-year goal
- **Boss Fight**: Monthly project with milestones
- **Daily Quests**: 3-5 critical daily actions linked to identity statements

### Tech Stack
- React 19 + TypeScript + Vite
- Tailwind CSS v4 (glassmorphism dark theme)
- Zustand (state management with LocalStorage persistence)
- Framer Motion (animations)
- Vite PWA Plugin (installable on mobile)
- Vercel Analytics

### State Management (Zustand Stores)

**`playerStore.ts`** - Player identity and settings:
- Anti-Vision (pain to avoid), Vision (ideal future)
- Identity statements ("I am the type of person who...")
- Onboarding progress

**`gameStore.ts`** - Game state:
- Annual mission, current boss fight with milestones
- Daily quests with completion tracking
- Streak and statistics

Both stores persist to LocalStorage automatically.

### Key Flows

**Onboarding ("La Excavación")**: Welcome → Anti-Vision → Vision → Identity → Mission → Boss → Quests → Complete

**Dashboard (HUD)**: Header with identity → Boss progress bar → Daily quest list

**State Shifter**: Floating panic button → Breathing exercise (4-4-4-4 box breathing) or Truth reminder (wisdom quotes, vision vs anti-vision)

### UI Components

All UI in `src/components/ui/` follows glassmorphism style with `.glass` and `.glass-strong` CSS classes. Custom Tailwind theme colors: `void`, `abyss`, `neon-purple`, `neon-cyan`, `neon-green`, etc.

### Language

All UI text must be in **Spanish (Spain)**. Use gamification terminology:
- "Misiones" not "Tasks"
- "Conquistado" not "Completed"
- "Reglas del Juego" not "Settings"
