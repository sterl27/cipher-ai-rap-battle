# Cipher.AI x Musaix Pro - Architecture & Technical Design

## Overview

**Cipher.AI x Musaix Pro** is a modern, agentic ecosystem for music production and AI-driven creative workflows. The platform has evolved from a real-time AI rap battle platform into a comprehensive creative suite featuring advanced analytics, AI collaboration tools, and a revolutionary holographic UI framework.

**Current Tech:** Nuxt 3 (Vue 3) + TypeScript on Vercel, with Firebase and Supabase backends.

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│        Nuxt 3 SSR Frontend (Vue 3)      │
│   Vercel Deployment | Auto-Deploy       │
└─────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        │             │             │
    ┌───▼────┐   ┌───▼────┐   ┌───▼────┐
    │Firebase │   │Supabase│   │Gemini  │
    │  Auth   │   │PostgreSQL   │API    │
    │ Realtime│   │(Optional)   │       │
    └────────┘    └────────┘    └───────┘
```

### Frontend Architecture (Nuxt 3)

```
nuxt.config.ts (Framework Configuration)
     │
     ├─ app.vue (Root Component)
     │
     ├─ pages/ (Route-Based Components)
     │  ├─ index.vue (Homepage)
     │  ├─ research.vue (Musaix Research)
     │  ├─ alic3x.vue (AI Assistant)
     │  ├─ liquidui.vue (UI Framework)
     │  ├─ about.vue
     │  └─ tools/
     │     ├─ index.vue (Tools Hub)
     │     ├─ battle.vue (AI Battle Arena)
     │     ├─ lyrical.vue (Lyrical Lab)
     │     └─ spectral.vue (Spectral Processor)
     │
     ├─ components/ (Reusable Components)
     │  ├─ ui/ (16 shadcn-style Vue 3 Components)
     │  │  ├─ Button.vue (Base Button)
     │  │  ├─ Card.vue, CardContent.vue, CardHeader.vue
     │  │  ├─ CardFooter.vue, CardTitle.vue, CardDescription.vue
     │  │  ├─ Input.vue (Form Input)
     │  │  ├─ Textarea.vue (Text Area)
     │  │  ├─ InputGroup.vue (Input Wrapper)
     │  │  ├─ Label.vue (Form Label)
     │  │  ├─ Alert.vue, AlertTitle.vue, AlertDescription.vue
     │  │  ├─ Switch.vue (Toggle)
     │  │  ├─ Badge.vue (Status Badge)
     │  │  └─ index.ts (Barrel Exports)
     │  │
     │  ├─ NavBar.vue (Navigation Header)
     │  ├─ GlassCard.vue (Design System Component)
     │  ├─ HoloBadge.vue (Holographic Badge)
     │  ├─ ToolCard.vue (Tool Showcase)
     │  └─ AppFooter.vue (Footer)
     │
     ├─ layouts/
     │  └─ default.vue (App Shell with Animations)
     │
     ├─ assets/
     │  └─ css/main.css (Global Styles)
     │
     └─ public/ (Static Assets)
```

---

## Tech Stack Details

### Framework Layer

| Technology | Version | Purpose |
|-----------|---------|---------|
| Nuxt | 3.21.2 | Meta-framework for Vue 3 SSR |
| Vue | 3.5.32 | UI framework |
| TypeScript | Latest | Type safety |
| Vite | 7.3.2 | Module bundler |
| Nitro | 2.13.3 | Server runtime |

### Styling & Design

| Technology | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| PostCSS | 8.4.35 | CSS processing |
| Autoprefixer | 10.4.17 | Vendor prefixes |
| Google Fonts | Via @nuxtjs/google-fonts | Typography |

**Custom Design Tokens:**
```javascript
// tailwind.config.js
colors: {
  mx: {
    bg: '#08080E',
    cyan: '#00EAFF',
    purple: '#8B00FF',
    magenta: '#FF007A',
    gold: '#FFD600',
    green: '#00FF8C',
    text: '#E8E8E8',
    muted: '#646464',
    surface: '#1A1A1F',
    border: '#2D2D35'
  }
}

backgroundImage: {
  'holo-gradient': 'linear-gradient(135deg, ...)',
  'mesh-dark': 'radial-gradient(...)',
  'card-glass': 'linear-gradient(...)'
}

boxShadow: {
  'glow-cyan': '0 0 20px rgba(0, 234, 255, 0.5)',
  'glow-purple': '0 0 20px rgba(139, 0, 255, 0.5)',
  // ... more glow variants
}

animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow-cycle': 'glowCycle 4s ease-in-out infinite',
  'gradient-x': 'gradientX 8s ease-in-out infinite',
  'scan': 'scan 3s linear infinite',
  'fade-up': 'fadeUp 0.6s ease-out',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
}
```

### UI Component Library

**16 Custom Vue 3 Components (shadcn-style)**

**Atomic Components:**
- `Button.vue` - Interactive button with variants (default, primary, ghost, outline)
- `Input.vue` - Form input with focus states
- `Textarea.vue` - Multi-line text input
- `Label.vue` - Form label with accessibility
- `Badge.vue` - Status/category badge

**Composed Components:**
- `Card.vue` - Base card container
- `CardContent.vue` - Card content area
- `CardHeader.vue` - Card header section
- `CardFooter.vue` - Card footer section
- `CardTitle.vue` - Card title
- `CardDescription.vue` - Card description text

**Complex Components:**
- `Alert.vue` - Alert container
- `AlertTitle.vue` - Alert title
- `AlertDescription.vue` - Alert message
- `Switch.vue` - Toggle switch with animation
- `InputGroup.vue` - Grouped input wrapper

**Implementation Pattern:**
```vue
<!-- All components use className prop pattern -->
<template>
  <button :class="baseClasses + (variant[props.variant] || '')">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'primary' | 'ghost' | 'outline'
  className?: string
}

defineProps<Props>()
</script>
```

**Barrel Export (index.ts):**
```javascript
export { default as Button } from './Button.vue'
export { default as Card } from './Card.vue'
// ... exports for all 16 components
```

### Core Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `NavBar.vue` | Navigation header | Scroll detection, mobile toggle, TypeScript types |
| `GlassCard.vue` | Design system card | Optional glow effects, accent border, hover elevation |
| `HoloBadge.vue` | Holographic badge | Color variants, modern minimal styling |
| `ToolCard.vue` | Tool showcase | Icon display, arrow animation, interactive |
| `AppFooter.vue` | App footer | Links, branding, responsive layout |

### Layout & Pages

**Layout (default.vue):**
- Fixed mesh background with 3 animated gradient orbs
- Grid overlay (30% opacity)
- Scan line effect (12s vertical movement)
- Responsive slot for page content

**Pages (Optimized for 2026 Minimal UX):**

| Page | Features | Responsive |
|------|----------|-----------|
| `index.vue` | Hero, product cards, tech stack, CTAs | text-xs md:text-sm lg:text-base |
| `research.vue` | Analytics dashboard demo, features, use cases | Responsive grid, adaptive padding |
| `alic3x.vue` | Chat interface, capabilities grid, tech specs | Mobile-first layout |
| `tools/index.vue` | Quick launch, feature cards, early access | Responsive grid layout |
| `about.vue` | Team, mission, values | Optimized typography |

**Typography System:**
```tailwind
/* Responsive text scaling */
text-xs      /* 12px - Mobile default */
md:text-sm   /* 14px - Tablet */
lg:text-base /* 16px - Desktop */

h1: text-2xl md:text-3xl lg:text-4xl
h2: text-xl md:text-2xl lg:text-3xl
p:  text-sm md:text-base lg:text-lg
```

**Spacing System:**
```tailwind
/* Responsive padding/gaps */
px-6 py-8      /* Mobile */
md:px-8 md:py-12 /* Tablet */
lg:px-12 lg:py-16 /* Desktop */

gap-4 md:gap-6 lg:gap-8 /* Grid gaps */
```

---

## Modules & Dependencies

### Nuxt Modules
- `@nuxtjs/tailwindcss` (6.11.4) - Tailwind integration
- `@nuxtjs/google-fonts` (3.2.0) - Font loading
- `@vueuse/nuxt` (10.9.0) - Composables library
- `@nuxt/devtools` (1.0.0) - Dev environment tools

### Runtime Dependencies
- `@vueuse/core` (10.9.0) - Composition utilities
- Build: Vite 7.3.2, Rollup 4.x
- PostCSS ecosystem (7.4.35+)

### Development Setup
- Node.js 20+ required
- pnpm 10.28.0 (locked)
- ESLint for code quality
- TypeScript for type safety

---

## Data Layer

### Authentication
- **Provider:** Firebase Authentication
- **Config:** Environment variables (NUXT_PUBLIC_FIREBASE_*)
- **Type:** Email/password + optional social login

### Database
- **Primary:** Firebase Realtime Database
- **Optional:** Supabase PostgreSQL
- **Config:** Environment variables (NUXT_PUBLIC_SUPABASE_*)

### AI Services
- **Provider:** Google Gemini API
- **Purpose:** Alic3X PRO assistant, lyrical analysis
- **Config:** NUXT_PUBLIC_GEMINI_API_KEY

---

## Deployment Architecture

### Vercel Setup

```
GitHub Repo (sterl27/cipher-ai-rap-battle)
    │
    ├─ Branch: n (main deployment branch)
    │
    └─ Vercel Project
       ├─ Build Command: nuxt build
       ├─ Output Dir: .output/public
       ├─ Node: 20.x (recommended)
       ├─ Functions: Nitro server routes
       └─ Auto-Deploy: Enabled (git push → deploy)
```

**Environment Variables (Vercel):**
- NUXT_PUBLIC_GEMINI_API_KEY
- NUXT_PUBLIC_FIREBASE_* (5 variables)
- NUXT_PUBLIC_SUPABASE_* (2 variables, optional)

**Build Metrics (Latest):**
- Client build: 4089ms (196 modules)
- Server build: 6072ms (238 modules)
- Nitro generation: Complete
- Bundle size: ~5.21MB (1.04MB gzip)

**Production URL:** https://cipher-ai-rap-battle.vercel.app

---

## Development Workflow

### Local Development

```bash
# Install
cd frontend
pnpm install

# Environment
cp .env.example .env.local
# Add API keys

# Development (port 3001)
pnpm dev

# Type checking
pnpm lint

# Production build
pnpm build
```

### Git Integration

```bash
# Branch: n
# Push to trigger Vercel auto-deploy
git add .
git commit -m "feat: description"
git push origin n
# → Vercel builds and deploys to production
```

### Performance Considerations

1. **Bundle Optimization:** Lazy-load pages via Nuxt auto-routes
2. **CSS:** Tailwind purges unused classes in build
3. **Images:** Use responsive images with `nuxt/image` (if needed)
4. **API:** Firebase SDKs loaded via environment variables only when needed

---

## Design System Architecture

### Color System (mx-* namespace)
```
Primary Background: #08080E (mx-bg)
Accent Colors:
  - Cyan:    #00EAFF (mx-cyan) - Primary accent
  - Purple:  #8B00FF (mx-purple) - Secondary accent
  - Magenta: #FF007A (mx-magenta) - Danger/Alert
  - Gold:    #FFD600 (mx-gold) - Success/Highlight
  - Green:   #00FF8C (mx-green) - Natural/Growth

Text & Neutral:
  - Text:    #E8E8E8 (mx-text)
  - Muted:   #646464 (mx-muted)
  - Surface: #1A1A1F (mx-surface)
  - Border:  #2D2D35 (mx-border)
```

### Animation System

```javascript
// Keyframe Animations (tailwind.config.js)

float: translateY(-30px) → 0 → -30px (6s ease-in-out)
glowCycle: hsla cycling through accent colors (4s)
gradientX: Horizontal gradient shift (8s)
scan: Vertical line movement (3s linear)
fadeUp: Opacity 0 → 1 + translateY -20px → 0 (0.6s)
```

### Typography Hierarchy

```
Display:  Orbitron (400-900) - Headings, hero text
Body:     Space Grotesk (300-700) - Main content
Mono:     Inter (300-500) - Code, technical text
```

---

## API Integration Points

### Firebase SDK
```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: useRuntimeConfig().public.firebaseApiKey,
  authDomain: useRuntimeConfig().public.firebaseAuthDomain,
  // ... other config
}
```

### Gemini API (Runtime)
```typescript
const config = useRuntimeConfig()
const apiKey = config.public.geminiApiKey

// Used in Alic3X PRO and lyrical tools
// API calls via fetch or axios in Vue components
```

### Supabase (Optional)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  useRuntimeConfig().public.supabaseUrl,
  useRuntimeConfig().public.supabaseAnonKey
)
```

---

## File Size Analysis

| Category | Size | Gzipped |
|----------|------|---------|
| CSS Bundle | ~15KB | 3.5KB |
| JS Runtime | ~250KB | ~80KB |
| Vendor JS | ~1.2MB | ~400KB |
| Total | 5.21MB | 1.04MB |

---

## Security Considerations

1. **API Keys:** Only public keys in environment variables (prefixed `NUXT_PUBLIC_`)
2. **Firebase:** Use security rules for database access
3. **Supabase:** Row-level security enabled (if used)
4. **CORS:** Vercel automatically handles cross-origin requests
5. **CSP:** Tailwind/Vite bundle includes no inline scripts

---

## Future Architecture Considerations

- **Edge Functions:** Supabase Edge Functions for serverless logic
- **Database:** Migrate from Firebase to Supabase for more control
- **Real-time:** Socket.io integration for live battles (if needed)
- **Media:** Cloudinary/Vercel Image Optimization for media handling
- **Analytics:** Sentry or PostHog for performance monitoring

---

## Version History

- **Current:** Nuxt 3.21.2 + Vue 3.5.32 + Tailwind 3.4.1 (January 2026)
- **Previous:** Next.js 14 + React + OpenAI (2025-2026)
- **Original:** Cipher.AI MVP with Express backend (2024-2025)
                                                - - Personalizes roasts based on user history
                                                  - - Maintains rap battle context
                                                    - - Generates competitive punchlines in real-time
                                                     
                                                      - ### 3. Scoring System
                                                      - - Base score: 0-100 points per verse
                                                        - - Criteria:
                                                          -   - Rhyme scheme (25 points)
                                                              -   - Wordplay & metaphors (25 points)
                                                                  -   - Flow & rhythm (25 points)
                                                                      -   - Crowd reaction (25 points)
                                                                          - - Real-time crowd voting via Hype Meter
                                                                           
                                                                            - ### 4. Leaderboard
                                                                            - - Global rankings by total wins
                                                                              - - Monthly ranked battles
                                                                                - - Trending battles
                                                                                  - - Win streaks
                                                                                    - - User profiles with stats
                                                                                     
                                                                                      - ### 5. User System
                                                                                      - - Sign-up/Login with JWT
                                                                                        - - User profiles with customizable avatars
                                                                                          - - Battle history
                                                                                            - - Personal stats
                                                                                              - - Follow/friend system
                                                                                               
                                                                                                - ## WebSocket Events
                                                                                               
                                                                                                - ### Battle Flow
                                                                                                - ```
                                                                                                  Client                          Server
                                                                                                    |-- join_battle() ----------->|
                                                                                                    |<---------- battle_ready ----|
                                                                                                    |-- submit_verse() ---------->|
                                                                                                    |<---------- ai_thinking ------|
                                                                                                    |<---------- ai_verse ---------|
                                                                                                    |-- vote() ------------------>|
                                                                                                    |<---------- hype_update ------|
                                                                                                    |<---------- round_end --------|
                                                                                                    |-- next_round() or exit ---->|
                                                                                                  ```

                                                                                                  ### Event Types
                                                                                                  - `join_battle`: Join a battle room
                                                                                                  - - `submit_verse`: Send user's rap bars
                                                                                                    - - `ai_thinking`: AI is generating response
                                                                                                      - - `ai_verse`: AI rap generated
                                                                                                        - - `vote`: User votes on a verse
                                                                                                          - - `hype_update`: Hype meter updated
                                                                                                            - - `battle_end`: Battle concluded
                                                                                                              - - `leaderboard_update`: Rankings updated
                                                                                                               
                                                                                                                - ## OpenAI Integration
                                                                                                               
                                                                                                                - ### Rap Prompt Template
                                                                                                                - ```
                                                                                                                  You are a legendary rap battle MC. Generate a response verse with:
                                                                                                                  - 4 bars exactly
                                                                                                                  - Rhyming couplets (AABB pattern)
                                                                                                                  - Wordplay and metaphors
                                                                                                                  - Personalized roasts based on opponent's bars
                                                                                                                  - Competitive and witty punchlines
                                                                                                                  - Maintain battle context and escalation

                                                                                                                  User bars: "{userBars}"
                                                                                                                  User profile: "{userProfile}"
                                                                                                                  Battle history: "{battleContext}"

                                                                                                                  Generate the AI response verse:
                                                                                                                  ```
                                                                                                                  
                                                                                                                  ### Response Processing
                                                                                                                  - Parse AI response for quality
                                                                                                                  - - Cache popular bars to prevent repetition
                                                                                                                    - - Track battle context for coherence
                                                                                                                      - - Generate variations if needed
                                                                                                                       
                                                                                                                        - ## Authentication Flow
                                                                                                                       
                                                                                                                        - ```
                                                                                                                          Sign Up / Login
                                                                                                                            ↓
                                                                                                                          Verify Credentials (Supabase Auth)
                                                                                                                            ↓
                                                                                                                          Generate JWT Token
                                                                                                                            ↓
                                                                                                                          Return Token + User Data
                                                                                                                            ↓
                                                                                                                          Store JWT in localStorage
                                                                                                                            ↓
                                                                                                                          Attach JWT to all API requests
                                                                                                                            ↓
                                                                                                                          WebSocket auto-authenticates with JWT
                                                                                                                          ```
                                                                                                                          
                                                                                                                          ## Battle Logic
                                                                                                                          
                                                                                                                          ### 1. Initialization
                                                                                                                          - 2 players (1 human, 1 AI)
                                                                                                                          - - Random first speaker
                                                                                                                            - - 10 rounds per battle
                                                                                                                              - - 30 seconds per verse
                                                                                                                               
                                                                                                                                - ### 2. Each Round
                                                                                                                                - - Player 1 submits verse (4 bars)
                                                                                                                                  - - AI generates response
                                                                                                                                    - - Crowd votes (live hype meter)
                                                                                                                                      - - Points awarded
                                                                                                                                        - - Next round
                                                                                                                                         
                                                                                                                                          - ### 3. Scoring
                                                                                                                                          - - Verses scored 0-100
                                                                                                                                            - - Based on: rhyme, wordplay, flow, crowd reaction
                                                                                                                                              - - Running total for each player
                                                                                                                                                - - Battle ends after 10 rounds
                                                                                                                                                 
                                                                                                                                                  - ### 4. Winner Determination
                                                                                                                                                  - - Highest total score wins
                                                                                                                                                    - - Leaderboard updated
                                                                                                                                                      - - Stats recorded
                                                                                                                                                        - - Badges/achievements awarded
                                                                                                                                                         
                                                                                                                                                          - ## Environment Variables
                                                                                                                                                         
                                                                                                                                                          - ```
                                                                                                                                                            # Frontend (.env.local)
                                                                                                                                                            NEXT_PUBLIC_API_URL=http://localhost:3001
                                                                                                                                                            NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
                                                                                                                                                            NEXT_PUBLIC_SUPABASE_URL=
                                                                                                                                                            NEXT_PUBLIC_SUPABASE_ANON_KEY=

                                                                                                                                                            # Backend (.env)
                                                                                                                                                            NODE_ENV=development
                                                                                                                                                            PORT=3001
                                                                                                                                                            DATABASE_URL=postgresql://...
                                                                                                                                                            OPENAI_API_KEY=sk-...
                                                                                                                                                            JWT_SECRET=your-secret-key
                                                                                                                                                            REDIS_URL=redis://...
                                                                                                                                                            SOCKET_PORT=3001
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ## Development Setup
                                                                                                                                                            
                                                                                                                                                            ### Frontend
                                                                                                                                                            ```bash
                                                                                                                                                            cd frontend
                                                                                                                                                            npm install
                                                                                                                                                            npm run dev
                                                                                                                                                            # Runs on http://localhost:3000
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Backend
                                                                                                                                                            ```bash
                                                                                                                                                            cd backend
                                                                                                                                                            npm install
                                                                                                                                                            npm run dev
                                                                                                                                                            # Runs on http://localhost:3001
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Both (from root)
                                                                                                                                                            ```bash
                                                                                                                                                            npm run dev  # Concurrently runs both
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ## Deployment
                                                                                                                                                            
                                                                                                                                                            ### Vercel (Frontend)
                                                                                                                                                            ```bash
                                                                                                                                                            vercel deploy
                                                                                                                                                            # Auto-deploys on git push
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Railway (Backend)
                                                                                                                                                            ```bash
                                                                                                                                                            railway deploy
                                                                                                                                                            # Auto-deploys on git push
                                                                                                                                                            ```
                                                                                                                                                            
                                                                                                                                                            ### Database (Supabase)
                                                                                                                                                            - Auto-backups
                                                                                                                                                            - - Real-time subscriptions
                                                                                                                                                              - - Built-in authentication
                                                                                                                                                               
                                                                                                                                                                - ## Performance Optimization
                                                                                                                                                               
                                                                                                                                                                - 1. **Low-Latency**
                                                                                                                                                                  2.    - WebSocket for real-time updates
                                                                                                                                                                        -    - Server-side caching of AI responses
                                                                                                                                                                             -    - CDN for static assets
                                                                                                                                                                              
                                                                                                                                                                                  - 2. **Scalability**
                                                                                                                                                                                    3.    - Redis for leaderboard cache
                                                                                                                                                                                          -    - Horizontal scaling with multiple workers
                                                                                                                                                                                               -    - Database query optimization
                                                                                                                                                                                                
                                                                                                                                                                                                    - 3. **AI Optimization**
                                                                                                                                                                                                      4.    - Prompt caching to reduce API calls
                                                                                                                                                                                                            -    - Response time < 2 seconds
                                                                                                                                                                                                                 -    - Fallback responses if API slow
                                                                                                                                                                                                                  
                                                                                                                                                                                                                      - ## Security Considerations
                                                                                                                                                                                                                  
                                                                                                                                                                                                                      - 1. **Authentication**: JWT with refresh tokens
                                                                                                                                                                                                                        2. 2. **Rate Limiting**: Prevent API abuse
                                                                                                                                                                                                                           3. 3. **Input Validation**: Sanitize all user inputs
                                                                                                                                                                                                                              4. 4. **CORS**: Restrict cross-origin requests
                                                                                                                                                                                                                                 5. 5. **HTTPS**: All connections encrypted
                                                                                                                                                                                                                                    6. 6. **XSS Protection**: React auto-escaping
                                                                                                                                                                                                                                       7. 7. **CSRF Protection**: Token validation
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                          8. ## Future Features
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                          9. - Voice input/output with speech synthesis
                                                                                                                                                                                                                                             - - Battle tournament mode
                                                                                                                                                                                                                                               - - Team battles (2v2)
                                                                                                                                                                                                                                                 - - Custom AI personalities
                                                                                                                                                                                                                                                   - - Multiplayer spectating
                                                                                                                                                                                                                                                     - - Recorded battles on blockchain
                                                                                                                                                                                                                                                       - - NFT badges & achievements
                                                                                                                                                                                                                                                         - - Prize pools for ranked battles
                                                                                                                                                                                                                                                           - - Mobile app (React Native)
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                             - ## Monitoring & Analytics
                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                             - - User engagement metrics
                                                                                                                                                                                                                                                               - - Battle completion rates
                                                                                                                                                                                                                                                                 - - AI response quality scores
                                                                                                                                                                                                                                                                   - - Leaderboard trends
                                                                                                                                                                                                                                                                     - - Error logging (Sentry)
                                                                                                                                                                                                                                                                       - - Performance monitoring (New Relic)
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                         - ## Contributing
                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                         - Follow the branch naming convention:
                                                                                                                                                                                                                                                                         - - `feature/` for new features
                                                                                                                                                                                                                                                                           - - `fix/` for bug fixes
                                                                                                                                                                                                                                                                             - - `refactor/` for code improvements
                                                                                                                                                                                                                                                                               - - `docs/` for documentation
                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                 - All PRs require code review and tests pass before merge.
                                                                                                                                                                                                                                                                                 - 
