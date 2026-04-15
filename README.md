# Musaix Pro

**An agentic, modular ecosystem for professional music production and AI-driven audio workflows.**

> Born from **Cipher.AI**, the world's first real-time AI rap battle platform. Evolved into a complete creative suite for music professionals.

---

## 🚀 Live Deployment

**Production:** https://cipher-ai-rap-battle.vercel.app

Auto-deployed from GitHub with Vercel's git integration. Latest commit auto-deploys to production.

---

## Core Products

| Product | Description |
|---------|-------------|
| **Musaix Research** | Advanced data analytics for music catalogs, trend forecasting, and market intelligence |
| **Alic3X PRO** | AI creative collaborator for every stage of the production workflow, powered by Gemini API |
| **LiquidUI 2026** | Revolutionary holographic and mobile-first UI framework with custom design system |

---

## Tools Suite

| Tool | Description |
|------|-------------|
| **Lyrical Lab** | AI lyrical engineering — rhyme schemes, flow analysis, verse co-writing |
| **Spectral Processor** | Real-time FFT audio visualization and intelligent mix analysis |
| **AI Battle Arena** | Real-time 1v1 battles against an adaptive AI MC |

---

## Tech Stack

**Frontend Framework**
- Nuxt 3.21.2 (Vue 3.5.32, Vite 7.3.2)
- TypeScript for type safety
- Pnpm v10.28.0 package manager

**Styling & Design System**
- Tailwind CSS 3.4.1 with extended custom palette
- PostCSS 8.4.35 + Autoprefixer
- 16 custom UI components (shadcn-style Vue 3)
- Custom animations: float, glow-cycle, gradient-x, scan, fade-up, pulse-slow
- Responsive typography system (text-xs md:text-sm patterns)
- Font stack: Orbitron (display), Space Grotesk (body), Inter (mono)

**Backend & Services**
- Firebase Authentication & Realtime Database
- Supabase PostgreSQL (optional)
- Gemini API for AI features
- Vercel (frontend deployment)

**Code Quality**
- ESLint for linting
- Nuxt DevTools enabled
- Module system: @nuxtjs/tailwindcss, @nuxtjs/google-fonts, @vueuse/nuxt

---

## Project Structure

```
cipher-ai-rap-battle/
├── frontend/                      # Nuxt 3 SSR application
│   ├── app.vue                   # Root component
│   ├── nuxt.config.ts            # Framework configuration
│   ├── tailwind.config.js        # Design system tokens
│   ├── components/
│   │   ├── ui/                   # 16 shadcn-style Vue 3 components
│   │   │   ├── Button.vue
│   │   │   ├── Card.vue & variants
│   │   │   ├── Input.vue, Textarea.vue
│   │   │   ├── Label.vue
│   │   │   ├── Alert.vue & variants
│   │   │   ├── Switch.vue, Badge.vue
│   │   │   ├── InputGroup.vue
│   │   │   └── index.ts           # Barrel exports
│   │   ├── NavBar.vue            # Navigation with scroll detection
│   │   ├── GlassCard.vue         # Core design component (glow variants)
│   │   ├── HoloBadge.vue         # Holographic badge
│   │   ├── ToolCard.vue          # Tool showcase card
│   │   └── AppFooter.vue         # Footer component
│   ├── layouts/
│   │   └── default.vue           # App shell with mesh animations
│   ├── pages/
│   │   ├── index.vue             # Homepage hero + products
│   │   ├── research.vue          # Musaix Research product page
│   │   ├── alic3x.vue            # Alic3X PRO assistant page
│   │   ├── liquidui.vue          # LiquidUI 2026 framework
│   │   ├── about.vue             # About & team
│   │   └── tools/
│   │       ├── index.vue         # Tools overview
│   │       ├── battle.vue        # AI Battle Arena
│   │       ├── lyrical.vue       # Lyrical Lab
│   │       └── spectral.vue      # Spectral Processor
│   ├── assets/
│   │   └── css/main.css          # Global styles
│   ├── public/                   # Static assets
│   ├── package.json
│   └── .env.example              # Environment variable template
├── ARCHITECTURE.md               # Detailed tech architecture
└── README.md                     # This file
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 10.28.0+

### Installation

```bash
# Clone repository
git clone https://github.com/sterl27/cipher-ai-rap-battle.git
cd cipher-ai-rap-battle/frontend

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local:
# - GEMINI_API_KEY
# - Firebase config (API_KEY, AUTH_DOMAIN, PROJECT_ID, etc.)
# - Optional: Supabase config
```

### Development

```bash
# Start dev server (port 3001)
pnpm dev

# Open browser
# → http://localhost:3001
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview
```

### Deployment

Automatic deployment to Vercel on git push to main branch.

Manual deployment:
```bash
# From project root
vercel deploy --prod
```

---

## Routes & Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `pages/index.vue` | Homepage with hero, products, tech stack |
| `/research` | `pages/research.vue` | Musaix Research analytics platform |
| `/alic3x` | `pages/alic3x.vue` | Alic3X PRO creative assistant |
| `/liquidui` | `pages/liquidui.vue` | LiquidUI 2026 framework showcase |
| `/about` | `pages/about.vue` | About & team information |
| `/tools` | `pages/tools/index.vue` | Tools suite overview |
| `/tools/battle` | `pages/tools/battle.vue` | AI Battle Arena |
| `/tools/lyrical` | `pages/tools/lyrical.vue` | Lyrical Lab |
| `/tools/spectral` | `pages/tools/spectral.vue` | Spectral Processor |

---

## Environment Variables

Create `frontend/.env.local` with:

```env
# Gemini API
NUXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Firebase
NUXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NUXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NUXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Supabase
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

See [frontend/.env.example](frontend/.env.example) for full template.

---

## Design System

### Color Palette (mx-* namespace)
- **mx-bg**: #08080E (background)
- **mx-cyan**: #00EAFF (accent 1)
- **mx-purple**: #8B00FF (accent 2)
- **mx-magenta**: #FF007A (accent 3)
- **mx-gold**: #FFD600 (accent 4)
- **mx-green**: #00FF8C (accent 5)

### Animations
- `float`: 6s translateY + scale
- `glow-cycle`: 4s color cycling
- `gradient-x`: 8s horizontal gradient shift
- `scan`: 3s vertical scan line
- `fade-up`: 0.6s entrance animation
- `pulse-slow`: 4s breathing effect

### Typography
- Display: Orbitron (400-900 weights)
- Body: Space Grotesk (300-700 weights)
- Mono: Inter Mono (300-500 weights)
- Responsive: text-xs md:text-sm lg:text-base patterns

---

## Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint
```

---

## Performance Metrics (Latest Build)

- Client build: 4089ms (196 modules)
- Server build: 6072ms (238 modules)
- CSS output: 1-3.5KB gzipped
- Total bundle: ~5.21MB (1.04MB gzip)

---

## Deployment Info

**Platform:** Vercel  
**Branch:** Auto-deploy from `n` branch  
**Status:** Production live  
**Alias:** cipher-ai-rap-battle.vercel.app

---

## License

Proprietary — Musaix Pro (2026)

## Contributing

Branch naming:
- `feature/` — new features
- `fix/` — bug fixes
- `design/` — UI/UX changes
- `docs/` — documentation

All PRs require review before merge.

---

*© 2026 Musaix Pro. Built for creators, by creators.*
