<template>
  <div class="p-6 h-full overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="font-display font-bold text-xl text-white mb-1">Knowledge Base</h2>
        <p class="text-xs text-mx-muted">{{ docs.length }} document{{ docs.length !== 1 ? 's' : '' }} indexed</p>
      </div>
    </div>

    <!-- Add document -->
    <div class="glass-panel p-4 mb-6">
      <p class="text-xs text-mx-muted mb-3 font-mono uppercase tracking-wide">Index New Document</p>
      <input v-model="newTitle" class="kb-input w-full mb-2" placeholder="Document title..." />
      <textarea
        v-model="newContent"
        class="kb-input w-full resize-none"
        rows="4"
        placeholder="Paste document content, lyrics, notes, or references..."
      />
      <div class="flex justify-end mt-3">
        <button
          :class="[
            'px-4 py-2 text-xs rounded-lg font-bold transition-all',
            newTitle.trim() && newContent.trim()
              ? 'bg-mx-purple text-white border border-mx-purple hover:bg-mx-purple/80'
              : 'opacity-40 cursor-not-allowed bg-mx-purple/20 text-mx-purple border border-mx-purple/20',
          ]"
          :disabled="!newTitle.trim() || !newContent.trim()"
          @click="addDoc"
        >
          + Index Document
        </button>
      </div>
    </div>

    <!-- Search -->
    <div class="flex gap-2 mb-6">
      <input v-model="searchQuery" class="kb-input flex-1" placeholder="Search knowledge base..." />
      <button
        v-if="searchQuery"
        class="px-3 py-2 text-xs rounded-lg border border-mx-border text-mx-muted hover:text-white transition-all"
        @click="searchQuery = ''"
      >
        Clear
      </button>
    </div>

    <!-- Document list -->
    <div v-if="filteredDocs.length" class="space-y-3">
      <div v-for="doc in filteredDocs" :key="doc.id" class="kb-card">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-sm text-white mb-1">{{ doc.title }}</h3>
            <p class="text-xs text-mx-muted line-clamp-2 leading-relaxed">{{ excerpt(doc.content) }}</p>
          </div>
          <button class="text-mx-muted hover:text-mx-magenta text-xs shrink-0" @click="removeDoc(doc.id)">✕</button>
        </div>
        <div class="flex items-center gap-3 mt-3">
          <span class="text-xs text-mx-muted font-mono">{{ doc.wordCount }} words</span>
          <span class="text-xs text-mx-muted">{{ fmtDate(doc.createdAt) }}</span>
          <button
            v-if="expanded !== doc.id"
            class="text-xs text-mx-cyan hover:underline ml-auto"
            @click="expanded = doc.id"
          >
            Expand →
          </button>
          <button
            v-else
            class="text-xs text-mx-muted hover:underline ml-auto"
            @click="expanded = null"
          >
            Collapse
          </button>
        </div>
        <div v-if="expanded === doc.id" class="mt-3 pt-3 border-t border-mx-border">
          <p class="text-xs text-mx-muted leading-relaxed whitespace-pre-wrap">{{ doc.content }}</p>
        </div>
      </div>
    </div>

    <p v-else-if="searchQuery" class="text-mx-muted text-sm text-center py-8">
      No documents match "{{ searchQuery }}"
    </p>
    <p v-else class="text-mx-muted text-sm text-center py-8">
      No documents yet. Index your first document above.
    </p>
  </div>
</template>

<script setup lang="ts">
interface KBDoc {
  id: number
  title: string
  content: string
  wordCount: number
  createdAt: number
}

const newTitle    = ref('')
const newContent  = ref('')
const searchQuery = ref('')
const expanded    = ref<number | null>(null)
const docs        = ref<KBDoc[]>([])

function load() {
  if (typeof localStorage === 'undefined') return
  try { docs.value = JSON.parse(localStorage.getItem('alic3x_kb') || '[]') }
  catch { /* empty */ }
}

function save() {
  if (typeof localStorage !== 'undefined')
    localStorage.setItem('alic3x_kb', JSON.stringify(docs.value))
}

function addDoc() {
  const title   = newTitle.value.trim()
  const content = newContent.value.trim()
  if (!title || !content) return
  docs.value.unshift({
    id: Date.now(),
    title,
    content,
    wordCount: content.split(/\s+/).length,
    createdAt: Date.now(),
  })
  newTitle.value   = ''
  newContent.value = ''
  save()
}

function removeDoc(id: number) {
  docs.value = docs.value.filter(d => d.id !== id)
  if (expanded.value === id) expanded.value = null
  save()
}

const filteredDocs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return docs.value
  return docs.value.filter(d =>
    d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q)
  )
})

function excerpt(text: string) {
  return text.slice(0, 200)
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
}

onMounted(load)
</script>

<style scoped>
.glass-panel {
  @apply rounded-2xl border border-mx-border;
  background: rgba(255,255,255,0.04);
}
.kb-card {
  @apply rounded-xl border border-mx-border p-4;
  background: rgba(255,255,255,0.03);
}
.kb-input {
  @apply px-3 py-2 rounded-lg text-sm text-mx-muted bg-mx-surface border border-mx-border
    outline-none focus:border-mx-purple/40 transition-colors;
}
</style>
