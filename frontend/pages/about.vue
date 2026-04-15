<template>
  <div class="px-6 py-16 max-w-7xl mx-auto">
    <!-- Hero -->
    <div class="text-center mb-20">
      <HoloBadge color="cyan" dot class="mb-4">Our Story</HoloBadge>
      <h1 class="font-display font-black text-5xl sm:text-6xl text-white mb-6">
        About <span class="holo-text">Musaix Pro</span>
      </h1>
      <p class="text-mx-muted text-lg max-w-2xl mx-auto leading-relaxed">
        Born from a real-time AI rap battle platform, evolved into a complete ecosystem
        for the next generation of music professionals.
      </p>
    </div>

    <!-- Origin Story -->
    <GlassCard accent="cyan" class="mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="section-label mb-3">Origin</p>
          <h2 class="font-display font-bold text-3xl text-white mb-4">From Battle to <span class="holo-text">Ecosystem</span></h2>
          <p class="text-mx-muted leading-relaxed mb-4">
            Musaix Pro began as <strong class="text-white">Cipher.AI</strong> — the world's first real-time AI rap battle platform.
            We built the tech to let humans go head-to-head with an AI MC, and the response was overwhelming.
          </p>
          <p class="text-mx-muted leading-relaxed mb-4">
            We realized we'd built something bigger than a battle game. We'd built a foundation for
            AI-powered creative tools that could serve every kind of music professional.
          </p>
          <p class="text-mx-muted leading-relaxed">
            Today, Musaix Pro is a complete ecosystem — with AI research tools, a creative assistant,
            a revolutionary UI framework, and the battle arena that started it all.
          </p>
        </div>
        <div class="space-y-4">
          <div v-for="milestone in timeline" :key="milestone.year" class="timeline-item">
            <div class="timeline-year">{{ milestone.year }}</div>
            <div>
              <h4 class="font-display font-bold text-sm text-white mb-1">{{ milestone.title }}</h4>
              <p class="text-mx-muted text-xs">{{ milestone.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>

    <!-- Mission -->
    <div id="mission" class="mb-20 text-center">
      <p class="section-label mb-3">Mission</p>
      <h2 class="font-display font-bold text-4xl sm:text-5xl text-white mb-8 max-w-3xl mx-auto">
        "Empowering every creator with the tools that were once only available to
        <span class="holo-text">the few."</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <GlassCard v-for="value in values" :key="value.title" :accent="value.accent" class="text-center">
          <div class="text-3xl mb-3">{{ value.emoji }}</div>
          <h3 class="font-display font-bold text-sm text-white mb-2">{{ value.title }}</h3>
          <p class="text-mx-muted text-xs leading-relaxed">{{ value.desc }}</p>
        </GlassCard>
      </div>
    </div>

    <!-- Tech Stack -->
    <div class="mb-20">
      <h2 class="font-display font-bold text-3xl text-white text-center mb-10">
        Our <span class="holo-text">Tech Stack</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="layer in techLayers" :key="layer.name" class="glass-card p-5">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xl">{{ layer.icon }}</span>
            <h4 class="font-display font-bold text-sm text-white">{{ layer.name }}</h4>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in layer.techs"
              :key="tech"
              class="text-xs px-2 py-0.5 rounded-md border border-mx-border text-mx-muted bg-mx-surface/50"
            >{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Team -->
    <div id="team" class="mb-20">
      <h2 class="font-display font-bold text-3xl text-white text-center mb-10">
        Built by <span class="holo-text">Creators</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard
          v-for="member in team"
          :key="member.name"
          :accent="member.accent"
          class="text-center"
          hoverable
        >
          <div class="member-avatar mx-auto mb-4" :style="{ background: member.gradient }">
            <span class="font-display font-black text-xl text-white">{{ member.initials }}</span>
          </div>
          <h3 class="font-display font-bold text-base text-white mb-0.5">{{ member.name }}</h3>
          <p class="text-mx-cyan text-xs font-mono mb-3">{{ member.role }}</p>
          <p class="text-mx-muted text-xs leading-relaxed">{{ member.bio }}</p>
        </GlassCard>
      </div>
    </div>

    <!-- Open Source / Contact -->
    <GlassCard accent="magenta" class="text-center">
      <h2 class="font-display font-bold text-3xl text-white mb-4">
        Join the <span class="holo-text">Community</span>
      </h2>
      <p class="text-mx-muted max-w-xl mx-auto mb-8 leading-relaxed">
        Musaix Pro is built in the open. We believe in transparency, community,
        and creating tools that lift all creators.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink to="/tools" class="btn-primary">Start Creating</NuxtLink>
        <a href="#" class="btn-holo">View on GitHub</a>
      </div>
    </GlassCard>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'About Musaix Pro — Our Story & Mission',
  description: 'From AI rap battle platform to a complete music production ecosystem. The story of Musaix Pro.',
})

const timeline = [
  { year: '2024', title: 'Cipher.AI Launches', desc: 'The world\'s first real-time AI rap battle platform goes live.' },
  { year: '2025', title: 'Platform Expansion', desc: 'Added Lyrical Lab, Spectral Processor, and user profiles.' },
  { year: '2026', title: 'Musaix Pro', desc: 'Full rebrand to Musaix Pro with Research, Alic3X PRO, and LiquidUI 2026.' },
]

const values = [
  { emoji: '🎨', title: 'Creator-First',  desc: 'Every decision starts with "does this help the creator?"', accent: 'cyan' as const },
  { emoji: '🔬', title: 'Research-Led',   desc: 'We build tools that are backed by audio science and AI research.', accent: 'purple' as const },
  { emoji: '🌍', title: 'Open Platform',  desc: 'APIs, SDKs, and community plugins — music production is better together.', accent: 'magenta' as const },
]

const techLayers = [
  { icon: '🎨', name: 'Frontend', techs: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'TypeScript'] },
  { icon: '⚙️', name: 'Backend',  techs: ['Node.js', 'Express', 'Socket.io', 'Firebase'] },
  { icon: '🤖', name: 'AI Layer', techs: ['Gemini 2.0', 'Vertex AI', 'TensorFlow.js'] },
  { icon: '🗄️', name: 'Data',    techs: ['Supabase', 'PostgreSQL', 'Redis', 'Firebase RT'] },
  { icon: '🚀', name: 'Deploy',   techs: ['Vercel', 'Railway', 'Cloudflare', 'GitHub Actions'] },
  { icon: '🔊', name: 'Audio',   techs: ['Web Audio API', 'Tone.js', 'FFmpeg', 'WebRTC'] },
]

const team = [
  {
    name: 'Sterl',
    initials: 'ST',
    role: 'Founder & CEO',
    bio: 'Music producer turned technologist. Building the platform he always wished existed.',
    accent: 'cyan' as const,
    gradient: 'linear-gradient(135deg, #00EAFF, #8B00FF)',
  },
  {
    name: 'Alic3X',
    initials: 'A3',
    role: 'AI Creative Director',
    bio: 'Powered by Gemini 2.0. Your always-on AI collaborator for the creative process.',
    accent: 'purple' as const,
    gradient: 'linear-gradient(135deg, #8B00FF, #FF007A)',
  },
  {
    name: 'The Community',
    initials: '∞',
    role: 'Co-Creators',
    bio: 'Over 50,000 musicians, producers, and engineers shaping the future of Musaix Pro.',
    accent: 'magenta' as const,
    gradient: 'linear-gradient(135deg, #FF007A, #FFD600)',
  },
]
</script>

<style scoped>
.timeline-item {
  @apply flex items-start gap-4 p-4 rounded-xl border border-mx-border;
  background: rgba(255,255,255,0.02);
}
.timeline-year {
  @apply font-display font-black text-sm flex-shrink-0 w-12 text-mx-cyan;
}
.member-avatar {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center;
}
</style>
