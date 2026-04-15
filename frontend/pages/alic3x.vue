<template>
  <div class="px-4 md:px-6 py-12 md:py-16 max-w-7xl mx-auto">
    <!-- Hero -->
    <div class="text-center mb-12 md:mb-16">
      <HoloBadge color="purple" dot class="mb-3">Powered by Gemini</HoloBadge>
      <h1 class="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white mb-4">
        Meet <span class="holo-text">Alic3X PRO</span>
      </h1>
      <p class="text-mx-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        Your AI creative collaborator for every stage of the music production workflow.
        Alic3X understands your vision, learns your style, and helps you create at the speed of thought.
      </p>
    </div>

    <!-- Chat Interface Demo -->
    <GlassCard accent="purple" class="mb-16 p-0 overflow-hidden max-w-3xl mx-auto">
      <!-- Chat header -->
      <div class="px-6 py-4 border-b border-mx-border flex items-center gap-3">
        <div class="alic3x-avatar">
          <span class="font-display font-black text-sm holo-text">A3</span>
        </div>
        <div>
          <p class="font-display font-bold text-sm text-white">Alic3X PRO</p>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-mx-green animate-pulse" />
            <span class="text-xs text-mx-muted">Active · Gemini 2.0 Powered</span>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="p-6 space-y-4">
        <div v-for="msg in chatMessages" :key="msg.id">
          <!-- User message -->
          <div v-if="msg.role === 'user'" class="flex justify-end">
            <div class="user-bubble">{{ msg.content }}</div>
          </div>
          <!-- AI message -->
          <div v-else class="flex gap-3">
            <div class="alic3x-avatar-sm flex-shrink-0">
              <span class="font-display font-black text-xs holo-text">A3</span>
            </div>
            <div class="ai-bubble">
              <p class="text-sm leading-relaxed text-mx-text" v-html="msg.content" />
              <div v-if="msg.tags" class="flex flex-wrap gap-1.5 mt-3">
                <span v-for="tag in msg.tags" :key="tag" class="tool-badge border-mx-purple/30 text-mx-purple bg-mx-purple/10">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing indicator -->
        <div class="flex gap-3">
          <div class="alic3x-avatar-sm flex-shrink-0">
            <span class="font-display font-black text-xs holo-text">A3</span>
          </div>
          <div class="ai-bubble flex items-center gap-1 py-4 px-4">
            <span v-for="i in 3" :key="i" class="typing-dot" :style="{ animationDelay: (i * 0.2) + 's' }" />
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="px-6 py-4 border-t border-mx-border">
        <div class="flex gap-3">
          <input
            class="chat-input flex-1"
            placeholder="Ask Alic3X anything about your music..."
            disabled
          />
          <button class="btn-primary px-4 py-2 text-xs" disabled>Send</button>
        </div>
      </div>
    </GlassCard>

    <!-- Capabilities Grid -->
    <div class="mb-12 md:mb-16">
      <h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white text-center mb-8 md:mb-10">
        What Alic3X <span class="holo-text">Can Do</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard
          v-for="cap in capabilities"
          :key="cap.title"
          :accent="cap.accent"
          hoverable
        >
          <div class="text-4xl mb-4">{{ cap.emoji }}</div>
          <h3 class="font-display font-bold text-lg text-white mb-2">{{ cap.title }}</h3>
          <p class="text-mx-muted text-sm leading-relaxed mb-4">{{ cap.desc }}</p>
          <ul class="space-y-1">
            <li v-for="point in cap.points" :key="point" class="flex items-center gap-2 text-xs text-mx-muted">
              <span class="w-1 h-1 rounded-full bg-mx-purple flex-shrink-0" />
              {{ point }}
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>

    <!-- Tech behind Alic3X -->
    <GlassCard accent="purple" class="mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="section-label mb-3">Under the Hood</p>
          <h2 class="font-display font-bold text-3xl text-white mb-4">
            Built on <span class="holo-text">Gemini 2.0</span>
          </h2>
          <p class="text-mx-muted leading-relaxed mb-6">
            Alic3X PRO is powered by Google's Gemini 2.0 multimodal model, giving it the ability
            to understand audio, text, and creative context simultaneously — delivering
            responses that actually understand music production.
          </p>
          <div class="space-y-3">
            <div v-for="spec in specs" :key="spec.label" class="spec-row">
              <span class="text-mx-muted text-xs font-mono">{{ spec.label }}</span>
              <span class="font-mono text-xs text-mx-cyan">{{ spec.value }}</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="s in techPoints" :key="s.title" class="tech-point">
            <div class="text-2xl mb-2">{{ s.icon }}</div>
            <h4 class="font-display font-bold text-xs text-white mb-1">{{ s.title }}</h4>
            <p class="text-mx-muted text-xs">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </GlassCard>

    <!-- CTA -->
    <div class="text-center">
      <h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-white mb-3">
        Ready to Create with <span class="holo-text">Alic3X?</span>
      </h2>
      <p class="text-mx-muted mb-8">Start your first creative session for free. No setup required.</p>
      <NuxtLink to="/tools" class="btn-primary mr-4">Get Started Free</NuxtLink>
      <NuxtLink to="/research" class="btn-holo">Explore Research</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Alic3X PRO — Your AI Creative Collaborator | Musaix Pro',
  description: 'AI-powered creative assistant for music production, powered by Gemini 2.0.',
})

const chatMessages = [
  {
    id: 1, role: 'user',
    content: 'I\'m working on a lo-fi hip-hop track in Dm. Can you suggest a chord progression and some lyric themes?'
  },
  {
    id: 2, role: 'ai',
    content: 'Love that choice — Dm is perfect for lo-fi. Here\'s what I\'d suggest:<br/><br/><strong style="color:#00EAFF">Chord Progression:</strong> Dm7 → Gmaj7 → Cmaj7 → Am7<br/>This gives you that classic melancholic warmth. You can loop bars 1-4 or resolve to Fmaj7 for a bridge.<br/><br/><strong style="color:#8B00FF">Lyric Themes:</strong> Late-night nostalgia, quiet introspection, city lights from a window, or the space between conversations.',
    tags: ['Chord Theory', 'Lyric Concepts', 'Lo-Fi', 'Dm Key']
  },
  {
    id: 3, role: 'user',
    content: 'Perfect. What BPM range works best for this vibe?'
  },
  {
    id: 4, role: 'ai',
    content: 'For authentic lo-fi hip-hop in that emotional range, aim for <strong style="color:#FFD600">75–90 BPM</strong>. I\'d place you specifically around <strong style="color:#FFD600">82–85 BPM</strong> — slow enough to feel contemplative, but with enough pulse to keep listeners engaged.',
    tags: ['BPM', 'Production', 'Lo-Fi']
  }
]

const capabilities = [
  {
    emoji: '✍️', title: 'Lyric Co-Writing', accent: 'purple' as const,
    desc: 'Collaborate on lyrics in real-time. Alic3X matches your style, tone, and theme.',
    points: ['Rhyme scheme suggestions', 'Flow analysis', 'Metaphor generation', 'Verse / hook / bridge structure'],
  },
  {
    emoji: '🎸', title: 'Chord & Theory', accent: 'cyan' as const,
    desc: 'Get instant music theory guidance — chord progressions, scale modes, and harmonic tension.',
    points: ['Progression suggestions by mood', 'Genre-specific theory', 'Modulation paths', 'Roman numeral analysis'],
  },
  {
    emoji: '🎚️', title: 'Mix Consulting', accent: 'magenta' as const,
    desc: 'Upload a rough mix and get professional feedback on frequency balance, dynamics, and stereo field.',
    points: ['Frequency masking detection', 'Compression advice', 'Reference track matching', 'Final polish checklist'],
  },
  {
    emoji: '🧠', title: 'Creative Direction', accent: 'gold' as const,
    desc: 'Stuck on an idea? Alic3X generates creative prompts, concept art descriptions, and album narratives.',
    points: ['Visual aesthetic concepts', 'Album arc storytelling', 'Single rollout strategy', 'Brand voice alignment'],
  },
  {
    emoji: '📊', title: 'Production Analysis', accent: 'cyan' as const,
    desc: 'Drop a track link and get deep analysis — BPM, key, instrumentation, and production techniques used.',
    points: ['Automatic BPM/key detection', 'Instrument identification', 'Genre classification', 'Production signature'],
  },
  {
    emoji: '🚀', title: 'Release Strategy', accent: 'purple' as const,
    desc: 'Data-backed release planning — when to drop, how to sequence, and what platforms to prioritize.',
    points: ['Optimal release windows', 'Playlist pitch strategy', 'Pre-save campaign guidance', 'Momentum planning'],
  },
]

const specs = [
  { label: 'Model',        value: 'Gemini 2.0 Flash' },
  { label: 'Context',      value: '1M token window' },
  { label: 'Modalities',   value: 'Text + Audio + Vision' },
  { label: 'Latency',      value: '< 800ms response' },
  { label: 'Memory',       value: 'Persistent session context' },
]

const techPoints = [
  { icon: '⚡', title: 'Streaming Responses', desc: 'Real-time token streaming for instant feedback.' },
  { icon: '🔒', title: 'Private by Default',   desc: 'Your creative work is never used for training.' },
  { icon: '🌐', title: 'Firebase Sync',        desc: 'Sessions sync across all your devices.' },
  { icon: '🎵', title: 'Audio Understanding',  desc: 'Native audio analysis — no conversion needed.' },
]
</script>

<style scoped>
.alic3x-avatar {
  @apply w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-mx-purple/40;
  background: linear-gradient(135deg, rgba(139,0,255,0.2), rgba(255,0,122,0.2));
}
.alic3x-avatar-sm {
  @apply w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border border-mx-purple/40;
  background: linear-gradient(135deg, rgba(139,0,255,0.2), rgba(255,0,122,0.2));
}
.user-bubble {
  @apply text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-xs;
  background: linear-gradient(135deg, rgba(0,234,255,0.15), rgba(139,0,255,0.15));
  border: 1px solid rgba(0,234,255,0.2);
  color: #E8E8F0;
}
.ai-bubble {
  @apply px-4 py-3 rounded-2xl rounded-tl-sm max-w-lg flex-1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}
.typing-dot {
  @apply w-1.5 h-1.5 rounded-full bg-mx-purple;
  animation: typingBounce 1.2s ease-in-out infinite;
}
@keyframes typingBounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50%       { transform: translateY(-4px); opacity: 1; }
}
.chat-input {
  @apply px-4 py-2.5 rounded-xl text-sm text-mx-muted bg-mx-surface border border-mx-border outline-none w-full;
}
.spec-row {
  @apply flex items-center justify-between py-2 border-b border-mx-border/50;
}
.tech-point {
  @apply relative overflow-hidden rounded-2xl border border-mx-border p-4 text-center;
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
}
</style>
