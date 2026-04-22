<template>
  <div class="p-6 h-full overflow-y-auto">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="font-display font-bold text-xl text-white mb-1">Web Search</h2>
      <p class="text-xs text-mx-muted">Powered by Google Custom Search API</p>
    </div>

    <!-- Search form -->
    <div class="flex gap-2 mb-6">
      <input
        v-model="query"
        class="search-input flex-1"
        placeholder="Search the web..."
        @keydown.enter="doSearch()"
      />
      <button
        :class="[
          'px-4 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0',
          isLoading || !query.trim()
            ? 'opacity-40 cursor-not-allowed bg-mx-cyan/20 text-mx-cyan border border-mx-cyan/20'
            : 'bg-mx-cyan text-mx-bg border border-mx-cyan hover:bg-mx-cyan/80',
        ]"
        :disabled="isLoading || !query.trim()"
        @click="doSearch()"
      >
        {{ isLoading ? '...' : 'Search' }}
      </button>
    </div>

    <!-- Error -->
    <div v-if="error" class="mb-4 p-4 rounded-xl border border-mx-magenta/40 bg-mx-magenta/10 text-mx-magenta text-sm">
      {{ error }}
    </div>

    <!-- Trending / History -->
    <div v-if="!results.length && !isLoading && !error">
      <div v-if="history.length" class="mb-4">
        <p class="text-xs text-mx-muted mb-2 font-mono uppercase tracking-wide">Recent Searches</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="h in history.slice(0, 8)"
            :key="h"
            class="px-3 py-1 text-xs rounded-full border border-mx-border text-mx-muted hover:text-white hover:border-mx-cyan/40 transition-all"
            @click="query = h; doSearch()"
          >
            {{ h }}
          </button>
        </div>
      </div>
      <div>
        <p class="text-xs text-mx-muted mb-2 font-mono uppercase tracking-wide">Trending Topics</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="t in trending"
            :key="t"
            class="px-3 py-1 text-xs rounded-full border border-mx-purple/30 text-mx-purple bg-mx-purple/10 hover:bg-mx-purple/20 transition-all"
            @click="query = t; doSearch()"
          >
            🔥 {{ t }}
          </button>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="results.length">
      <div class="flex items-center justify-between mb-4">
        <p class="text-xs text-mx-muted">
          About {{ totalResults.toLocaleString() }} results ({{ searchTime.toFixed(2) }}s)
        </p>
        <p class="text-xs text-mx-muted">Page {{ currentPage }}</p>
      </div>

      <div class="space-y-3 mb-6">
        <a
          v-for="r in results"
          :key="r.link"
          :href="r.link"
          target="_blank"
          rel="noopener noreferrer"
          class="result-card block hover:border-mx-cyan/40 transition-all"
        >
          <div class="flex gap-3">
            <img
              v-if="r.image"
              :src="r.image"
              alt=""
              class="w-12 h-12 rounded-lg object-cover shrink-0"
            />
            <div class="flex-1 min-w-0">
              <p class="text-xs text-mx-cyan mb-0.5 truncate">{{ r.displayLink }}</p>
              <h3 class="text-sm font-bold text-white mb-1 line-clamp-1">{{ r.title }}</h3>
              <p class="text-xs text-mx-muted line-clamp-2 leading-relaxed">{{ r.snippet }}</p>
            </div>
          </div>
        </a>
      </div>

      <!-- Pagination -->
      <div class="flex gap-2">
        <button
          v-if="startIndex > 1"
          class="px-4 py-2 text-xs rounded-lg border border-mx-border text-mx-muted hover:text-white hover:border-mx-cyan/40 transition-all"
          @click="doSearch(startIndex - 10)"
        >
          ← Previous
        </button>
        <button
          v-if="results.length === 10"
          class="px-4 py-2 text-xs rounded-lg border border-mx-border text-mx-muted hover:text-white hover:border-mx-cyan/40 transition-all"
          @click="doSearch(startIndex + 10)"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { results, isLoading, error, totalResults, searchTime, currentPage, startIndex, history, search } = useGoogleSearch()
const { track } = useAnalytics()

const query = ref('')

async function doSearch(start?: number) {
  if (!query.value.trim()) return
  await search(query.value, start ?? 1)
  if (!error.value) track('searches')
}

const trending = [
  'AI music production 2026',
  'trap beat tutorials',
  'mixing vocals FL Studio',
  'chord progressions hip hop',
  'lo-fi sample packs free',
  'mastering with AI tools',
]
</script>

<style scoped>
.search-input {
  @apply px-4 py-2.5 rounded-xl text-sm text-mx-muted bg-mx-surface border border-mx-border
    outline-none focus:border-mx-cyan/40 transition-colors;
}
.result-card {
  @apply rounded-xl border border-mx-border p-4;
  background: rgba(255,255,255,0.03);
}
</style>
