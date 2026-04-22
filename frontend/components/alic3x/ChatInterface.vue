<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-mx-border shrink-0">
      <div class="flex items-center gap-3">
        <div class="chat-avatar">
          <span class="font-display font-black text-sm holo-text">A3</span>
        </div>
        <div>
          <p class="font-display font-bold text-sm text-white">Alic3X PRO</p>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-mx-green animate-pulse" />
            <span class="text-xs text-mx-muted">
              {{ isTyping ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Active · Gemini 2.0' }}
            </span>
          </div>
        </div>
      </div>
      <!-- TTS & stop controls -->
      <div v-if="isSupported" class="flex items-center gap-2">
        <button
          :class="[
            'px-3 py-1.5 rounded-lg text-xs transition-all duration-200 border',
            autoSpeak
              ? 'bg-mx-purple/20 border-mx-purple/40 text-mx-purple'
              : 'bg-transparent border-mx-border text-mx-muted hover:text-white',
          ]"
          title="Auto-read AI responses aloud"
          @click="autoSpeak = !autoSpeak"
        >
          🔊 Auto-Read
        </button>
        <button
          v-if="isSpeaking"
          class="px-3 py-1.5 rounded-lg text-xs bg-mx-magenta/20 border border-mx-magenta/40 text-mx-magenta"
          @click="stopSpeaking"
        >
          ⏹ Stop
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div ref="chatScroll" class="flex-1 overflow-y-auto p-6 space-y-4">
      <div v-for="msg in messages" :key="msg.id">
        <div v-if="msg.role === 'user'" class="flex justify-end">
          <div class="user-bubble">{{ msg.content }}</div>
        </div>
        <div v-else class="flex gap-3">
          <div class="chat-avatar-sm shrink-0">
            <span class="font-display font-black text-xs holo-text">A3</span>
          </div>
          <div class="ai-bubble">
            <p class="text-sm leading-relaxed text-mx-text whitespace-pre-line">{{ msg.content }}</p>
            <div v-if="msg.tags?.length" class="flex flex-wrap gap-1.5 mt-3">
              <span v-for="tag in msg.tags" :key="tag" class="tool-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="flex gap-3">
        <div class="chat-avatar-sm shrink-0">
          <span class="font-display font-black text-xs holo-text">A3</span>
        </div>
        <div class="ai-bubble flex items-center gap-1 py-4">
          <span v-for="i in 3" :key="i" class="typing-dot" :style="{ animationDelay: i * 0.2 + 's' }" />
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="px-6 py-4 border-t border-mx-border shrink-0">
      <div class="flex gap-2">
        <!-- Voice button -->
        <button
          v-if="isSupported"
          :class="[
            'px-3 py-2.5 rounded-xl text-sm border transition-all duration-200 shrink-0',
            isListening
              ? 'bg-mx-magenta/20 border-mx-magenta/40 text-mx-magenta animate-pulse'
              : 'border-mx-border text-mx-muted hover:text-white hover:border-mx-purple/40',
          ]"
          :title="isListening ? 'Stop listening' : 'Voice input'"
          @click="toggleVoice"
        >
          {{ isListening ? '🔴' : '🎤' }}
        </button>
        <input
          v-model="userInput"
          class="chat-input flex-1"
          :placeholder="isListening ? 'Listening...' : 'Ask Alic3X anything about your music...'"
          :disabled="isTyping"
          @keydown.enter.prevent="send"
        />
        <button
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0',
            isTyping || !userInput.trim()
              ? 'opacity-40 cursor-not-allowed bg-mx-purple/20 text-mx-purple border border-mx-purple/20'
              : 'bg-mx-purple text-white border border-mx-purple hover:bg-mx-purple/80',
          ]"
          :disabled="isTyping || !userInput.trim()"
          @click="send"
        >
          <span v-if="!isTyping">Send</span>
          <span v-else class="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
        </button>
      </div>
      <p v-if="isListening" class="text-xs text-mx-magenta mt-2 animate-pulse">
        🎤 Listening... speak now
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ChatMessage {
  id: number
  role: 'user' | 'ai'
  content: string
  tags?: string[]
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'ai',
    content: 'Hey, I\'m Alic3X PRO — your AI music collaborator. Ask me about chord progressions, lyrics, production tips, mix feedback, or anything creative. What are you working on?',
    tags: ['Ready', 'Gemini 2.0'],
  },
])

const userInput = ref('')
const isTyping = ref(false)
const autoSpeak = ref(false)
const chatScroll = ref<HTMLElement | null>(null)

const { isListening, isSpeaking, isSupported, startListening, stopListening, speak, stopSpeaking } = useVoice()
const { track } = useAnalytics()

function toggleVoice() {
  if (isListening.value) {
    stopListening()
  } else {
    startListening((text: string) => { userInput.value = text })
  }
}

async function scrollToBottom() {
  await nextTick()
  if (chatScroll.value) chatScroll.value.scrollTop = chatScroll.value.scrollHeight
}

async function send() {
  const text = userInput.value.trim()
  if (!text || isTyping.value) return

  if (isListening.value) stopListening()

  messages.value.push({ id: Date.now(), role: 'user', content: text })
  userInput.value = ''
  isTyping.value = true
  track('messages')
  await scrollToBottom()

  try {
    const history = messages.value
      .slice(-9, -1)
      .map(m => ({
        role: (m.role === 'ai' ? 'model' : 'user') as 'user' | 'model',
        text: m.content,
      }))

    const res = await $fetch<{ content: string; tags: string[] }>('/api/ai/chat', {
      method: 'POST',
      body: { message: text, history },
    })
    messages.value.push({ id: Date.now() + 1, role: 'ai', content: res.content, tags: res.tags })
    if (autoSpeak.value) speak(res.content)
  } catch (e: unknown) {
    const err = e as { data?: { statusMessage?: string } }
    messages.value.push({
      id: Date.now() + 1,
      role: 'ai',
      content: `Something went wrong: ${err?.data?.statusMessage ?? 'Check your GEMINI_API_KEY.'}`,
    })
  } finally {
    isTyping.value = false
    await scrollToBottom()
  }
}
</script>

<style scoped>
.chat-avatar {
  @apply w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-mx-purple/40;
  background: linear-gradient(135deg, rgba(139,0,255,0.2), rgba(255,0,122,0.2));
}
.chat-avatar-sm {
  @apply w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-mx-purple/40;
  background: linear-gradient(135deg, rgba(139,0,255,0.2), rgba(255,0,122,0.2));
}
.user-bubble {
  @apply text-sm px-4 py-3 rounded-2xl rounded-tr-sm max-w-sm;
  background: linear-gradient(135deg, rgba(0,234,255,0.15), rgba(139,0,255,0.15));
  border: 1px solid rgba(0,234,255,0.2);
  color: #E8E8F0;
}
.ai-bubble {
  @apply px-4 py-3 rounded-2xl rounded-tl-sm max-w-2xl flex-1;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
}
.tool-tag {
  @apply text-xs px-2 py-0.5 rounded-full border border-mx-purple/30 text-mx-purple bg-mx-purple/10;
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
  @apply px-4 py-2.5 rounded-xl text-sm text-mx-muted bg-mx-surface border border-mx-border
    outline-none focus:border-mx-purple/40 transition-colors;
}
</style>
