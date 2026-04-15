<template>
  <div>
    <!-- ─── HERO ─────────────────────────────────────────────── -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <!-- Hero background art -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="hero-ring hero-ring-1" />
        <div class="hero-ring hero-ring-2" />
        <div class="hero-ring hero-ring-3" />
      </div>

      <div class="relative z-10 text-center max-w-5xl mx-auto">
        <!-- Pre-badge -->
        <div class="flex justify-center mb-8">
          <HoloBadge color="cyan" dot>
            <span class="text-mx-cyan">v1.0 Now Available</span>
          </HoloBadge>
        </div>

        <!-- Headline -->
        <h1 class="font-display font-black leading-tight mb-6">
          <span class="block text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight">
            THE FUTURE OF
          </span>
          <span class="block text-4xl sm:text-6xl lg:text-7xl holo-text tracking-tight mt-1">
            MUSIC PRODUCTION
          </span>
        </h1>

        <p class="text-mx-muted text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          Musaix Pro is an agentic, modular ecosystem for music professionals — combining
          AI-driven creative tools, real-time audio processing, and holographic UI design
          in one unified platform.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <NuxtLink to="/tools" class="btn-primary text-xs md:text-sm">
            Launch Tools Suite
          </NuxtLink>
          <NuxtLink to="/alic3x" class="btn-holo text-xs md:text-sm">
            Meet Alic3X PRO
          </NuxtLink>
        </div>

        <!-- Stats strip -->
        <div class="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="stat-number text-2xl md:text-3xl font-black">{{ stat.value }}</div>
            <div class="text-mx-muted text-xs mt-0.5 tracking-wider uppercase">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mx-muted">
        <span class="text-xs tracking-widest uppercase">Explore</span>
        <div class="scroll-indicator" />
      </div>
    </section>

    <!-- ─── PRODUCTS ──────────────────────────────────────────── -->
    <section class="relative py-16 md:py-24 px-4 md:px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <p class="section-label text-xs md:text-sm mb-2">Core Products</p>
          <h2 class="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            Three Pillars of the <span class="holo-text">Ecosystem</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="product in products"
            :key="product.to"
            :to="product.to"
            class="product-card group"
          >
            <!-- Top gradient bar -->
            <div class="h-1 w-full rounded-t-2xl" :style="{ background: product.gradient }" />
            <div class="p-8">
              <div class="product-icon mb-6" :style="{ color: product.color }">
                <span v-html="product.icon" />
              </div>
              <h3 class="font-display font-bold text-lg md:text-xl text-white mb-3 group-hover:holo-text transition-all">
                {{ product.name }}
              </h3>
              <p class="text-mx-muted text-sm leading-relaxed mb-4">{{ product.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in product.tags"
                  :key="tag"
                  class="text-xs px-2 py-0.5 rounded-md border border-mx-border text-mx-muted"
                >{{ tag }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── TOOLS PREVIEW ─────────────────────────────────────── -->
    <section class="relative py-16 md:py-24 px-4 md:px-6">
      <div class="neon-divider mb-24" />
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p class="section-label text-xs md:text-sm mb-2">Tools Suite</p>
            <h2 class="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-4">
              Professional Tools<br/>
              <span class="holo-text">Powered by AI</span>
            </h2>
            <p class="text-mx-muted text-sm md:text-base leading-relaxed mb-6">
              From lyrical engineering to real-time spectral audio analysis, our tools
              are built for professionals who demand precision and creativity in equal measure.
            </p>
            <NuxtLink to="/tools" class="btn-primary inline-flex">Explore All Tools</NuxtLink>
          </div>

          <div class="space-y-4">
            <ToolCard
              v-for="tool in featuredTools"
              :key="tool.to"
              v-bind="tool"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ─── LIQUIDUI TEASER ───────────────────────────────────── -->
    <section class="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div class="neon-divider mb-24" />
      <div class="max-w-7xl mx-auto">
        <GlassCard accent="gold" class="relative overflow-hidden">
          <div class="liquidui-bg" />
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-4 sm:p-8">
            <div>
              <HoloBadge color="gold" dot class="mb-3">LiquidUI 2026</HoloBadge>
              <h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-3">
                Holographic UI<br/>
                <span style="color: #FFD600">for the Next Era</span>
              </h2>
              <p class="text-mx-muted text-sm md:text-base leading-relaxed mb-4">
                LiquidUI 2026 brings a revolutionary holographic and mobile-first interface
                to Musaix Pro. Experience music production like you're in the future.
              </p>
              <NuxtLink to="/liquidui" class="btn-holo">
                Preview LiquidUI →
              </NuxtLink>
            </div>
            <div class="relative h-64 flex items-center justify-center">
              <div class="liquidui-demo" />
            </div>
          </div>
        </GlassCard>
      </div>
    </section>

    <!-- ─── ALIC3X SECTION ────────────────────────────────────── -->
    <section class="relative py-24 px-6">
      <div class="neon-divider mb-24" />
      <div class="max-w-7xl mx-auto text-center">
        <HoloBadge color="purple" dot class="mb-4">Alic3X PRO</HoloBadge>
        <h2 class="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
          Your AI Creative<br/>
          <span class="holo-text">Collaborator</span>
        </h2>
        <p class="text-mx-muted text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Alic3X PRO is your always-on AI assistant for every stage of the music production workflow.
          From ideation to mastering, Alic3X understands your creative vision.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <GlassCard
            v-for="feat in alic3xFeatures"
            :key="feat.title"
            accent="purple"
            class="text-center"
          >
            <div class="text-3xl mb-3">{{ feat.emoji }}</div>
            <h4 class="font-display font-bold text-sm text-white mb-2">{{ feat.title }}</h4>
            <p class="text-mx-muted text-xs leading-relaxed">{{ feat.desc }}</p>
          </GlassCard>
        </div>

        <NuxtLink to="/alic3x" class="btn-primary inline-flex">Meet Alic3X PRO</NuxtLink>
      </div>
    </section>

    <!-- ─── TECH STACK ────────────────────────────────────────── -->
    <section class="relative py-24 px-6">
      <div class="neon-divider mb-24" />
      <div class="max-w-7xl mx-auto">
        <p class="section-label text-center mb-12">Built With</p>
        <div class="flex flex-wrap justify-center gap-4">
          <div
            v-for="tech in techStack"
            :key="tech.name"
            class="tech-pill"
          >
            <span class="text-sm">{{ tech.icon }}</span>
            <span class="font-mono text-sm text-mx-muted">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── FINAL CTA ──────────────────────────────────────────── -->
    <section class="relative py-24 px-6">
      <div class="neon-divider mb-24" />
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="font-display font-black text-5xl sm:text-6xl text-white mb-6">
          Ready to Create<br/>
          <span class="holo-text">the Future?</span>
        </h2>
        <p class="text-mx-muted text-lg mb-10">
          Join thousands of music professionals already using Musaix Pro
          to push the boundaries of creativity.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/tools" class="btn-primary">Start for Free</NuxtLink>
          <NuxtLink to="/about" class="btn-holo">Learn More</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Musaix Pro — AI Music Production Ecosystem',
  description: 'The future of music production. An agentic, modular ecosystem for professionals.',
})

const stats = [
  { value: '50K+',  label: 'Creators' },
  { value: '3',     label: 'Core Products' },
  { value: '2026',  label: 'Next Gen UI' },
]

const products = [
  {
    to: '/research',
    name: 'Musaix Research',
    description: 'Advanced data analysis and insights for music production. Understand trends, analyze your catalog, and make data-driven creative decisions.',
    icon: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
    color: '#00EAFF',
    gradient: 'linear-gradient(90deg, #00EAFF, #0080FF)',
    tags: ['Analytics', 'Trends', 'Catalog', 'Insights'],
  },
  {
    to: '/alic3x',
    name: 'Alic3X PRO',
    description: 'Your AI creative assistant for every stage of the workflow. From idea generation to mix feedback, Alic3X is always ready to collaborate.',
    icon: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
    color: '#8B00FF',
    gradient: 'linear-gradient(90deg, #8B00FF, #FF007A)',
    tags: ['AI Assistant', 'Creative', 'Workflow', 'Gemini'],
  },
  {
    to: '/liquidui',
    name: 'LiquidUI 2026',
    description: 'A revolutionary holographic and mobile-first UI framework. Navigate your entire production suite through intuitive spatial interfaces.',
    icon: '<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    color: '#FFD600',
    gradient: 'linear-gradient(90deg, #FFD600, #FF6B00)',
    tags: ['Holographic', 'Mobile', 'UI/UX', 'Spatial'],
  },
]

const featuredTools = [
  {
    to: '/tools/lyrical',
    name: 'Lyrical Lab',
    description: 'AI-powered lyrical engineering — rhyme schemes, flow analysis, and verse generation.',
    icon: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
    badge: 'AI',
    color: 'purple' as const,
  },
  {
    to: '/tools/spectral',
    name: 'Spectral Processor',
    description: 'Real-time spectral audio visualization and processing for mastering engineers.',
    icon: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/></svg>',
    badge: 'LIVE',
    color: 'cyan' as const,
  },
  {
    to: '/tools/battle',
    name: 'AI Battle Arena',
    description: 'Test your lyrical skills in real-time against an adaptive AI MC.',
    icon: '<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    badge: 'NEW',
    color: 'magenta' as const,
  },
]

const alic3xFeatures = [
  { emoji: '🎵', title: 'Beat Analysis',    desc: 'Real-time BPM, key, and mood detection for any track.' },
  { emoji: '✍️', title: 'Lyric Writing',   desc: 'AI co-writing with rhyme, flow, and style suggestions.' },
  { emoji: '🎚️', title: 'Mix Feedback',    desc: 'Professional feedback on EQ, compression, and dynamics.' },
  { emoji: '🧠', title: 'Creative Coach',  desc: 'Personalized AI coaching tailored to your style.' },
]

const techStack = [
  { name: 'Nuxt 3',      icon: '⚡' },
  { name: 'Firebase',    icon: '🔥' },
  { name: 'Gemini API',  icon: '🤖' },
  { name: 'Tailwind CSS',icon: '🎨' },
  { name: 'Node.js',     icon: '🟢' },
  { name: 'Supabase',    icon: '⚡' },
  { name: 'Socket.io',   icon: '🔌' },
  { name: 'Redis',       icon: '🔴' },
]
</script>

<style scoped>
/* Hero rings */
.hero-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  animation: ring-pulse 4s ease-in-out infinite;
}
.hero-ring-1 {
  width: 600px; height: 600px;
  border-color: rgba(0,234,255,0.08);
  animation-delay: 0s;
}
.hero-ring-2 {
  width: 900px; height: 900px;
  border-color: rgba(139,0,255,0.05);
  animation-delay: -1.5s;
}
.hero-ring-3 {
  width: 1200px; height: 1200px;
  border-color: rgba(255,0,122,0.03);
  animation-delay: -3s;
}
@keyframes ring-pulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.02); }
}

/* Scroll indicator */
.scroll-indicator {
  width: 1px; height: 40px;
  background: linear-gradient(to bottom, #00EAFF, transparent);
  animation: scroll-bounce 2s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%, 100% { opacity: 1; transform: scaleY(1); }
  50%       { opacity: 0.3; transform: scaleY(0.5); }
}

/* Product cards */
.product-card {
  @apply relative overflow-hidden rounded-2xl border border-mx-border transition-all duration-300;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  padding: 0;
}
.product-card:hover {
  transform: translateY(-6px);
}

.product-icon {
  @apply w-14 h-14 rounded-2xl flex items-center justify-center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
}

/* LiquidUI teaser bg */
.liquidui-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(255,214,0,0.08) 0%, transparent 60%);
  pointer-events: none;
}
.liquidui-demo {
  width: 200px; height: 200px; border-radius: 50%;
  background: conic-gradient(from 0deg, #FFD600, #FF007A, #8B00FF, #00EAFF, #FFD600);
  animation: rotate 8s linear infinite;
  filter: blur(2px);
  opacity: 0.6;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

/* Tech pills */
.tech-pill {
  @apply flex items-center gap-2 px-4 py-2 rounded-full border border-mx-border;
  background: rgba(255,255,255,0.03);
  transition: all 0.2s;
}
.tech-pill:hover {
  border-color: rgba(0,234,255,0.3);
  background: rgba(0,234,255,0.05);
}
</style>
