<template>
  <div class="p-6 h-full overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-bold text-xl text-white">Analytics</h2>
      <button
        class="px-3 py-1.5 text-xs rounded-lg border border-mx-border text-mx-muted hover:text-white transition-all"
        @click="refresh"
      >
        ↺ Refresh
      </button>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div v-for="s in stats" :key="s.label" class="stat-card">
        <div class="text-2xl mb-2">{{ s.icon }}</div>
        <div class="text-2xl font-display font-black" :class="s.color">{{ s.value }}</div>
        <div class="text-xs text-mx-muted mt-1">{{ s.label }}</div>
      </div>
    </div>

    <!-- 7-day bar chart -->
    <div class="glass-panel p-6 mb-6">
      <h3 class="font-display font-bold text-sm text-white mb-5">Last 7 Days</h3>
      <div class="flex items-end gap-2" style="height:128px">
        <div
          v-for="d in chartDays"
          :key="d.date"
          class="flex-1 flex flex-col items-stretch justify-end gap-px"
          style="height:100%"
        >
          <div
            v-if="d.tasks"
            class="rounded-sm bg-mx-gold/70 w-full shrink-0"
            :style="{ height: barPx(d.tasks) + 'px' }"
            :title="`${d.tasks} tasks`"
          />
          <div
            v-if="d.searches"
            class="rounded-sm bg-mx-cyan/70 w-full shrink-0"
            :style="{ height: barPx(d.searches) + 'px' }"
            :title="`${d.searches} searches`"
          />
          <div
            v-if="d.messages"
            class="rounded-sm bg-mx-purple/70 w-full shrink-0"
            :style="{ height: barPx(d.messages) + 'px' }"
            :title="`${d.messages} messages`"
          />
          <div
            v-if="!d.messages && !d.searches && !d.tasks"
            class="rounded-sm bg-mx-border/20 w-full"
            style="height:4px"
          />
        </div>
      </div>
      <!-- Day labels -->
      <div class="flex gap-2 mt-2">
        <div v-for="d in chartDays" :key="d.date" class="flex-1 text-center">
          <span class="text-xs text-mx-muted">{{ dayLabel(d.date) }}</span>
        </div>
      </div>
      <!-- Legend -->
      <div class="flex gap-4 mt-3 flex-wrap">
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-mx-purple/70" />
          <span class="text-xs text-mx-muted">Messages</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-mx-cyan/70" />
          <span class="text-xs text-mx-muted">Searches</span>
        </div>
        <div class="flex items-center gap-1.5">
          <span class="w-3 h-3 rounded-sm bg-mx-gold/70" />
          <span class="text-xs text-mx-muted">Tasks</span>
        </div>
      </div>
    </div>

    <!-- All-time breakdown -->
    <div class="glass-panel p-6">
      <h3 class="font-display font-bold text-sm text-white mb-4">All-Time Breakdown</h3>
      <div class="space-y-4">
        <div v-for="m in breakdown" :key="m.label">
          <div class="flex justify-between mb-1">
            <span class="text-xs text-mx-muted">{{ m.label }}</span>
            <span class="text-xs font-mono" :class="m.color">{{ m.value }}</span>
          </div>
          <div class="h-1.5 rounded-full bg-mx-border/30">
            <div
              class="h-full rounded-full transition-all duration-700"
              :class="m.barColor"
              :style="{ width: m.pct + '%' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DayUsage { date: string; messages: number; searches: number; tasks: number }

const { totals, last7Days } = useAnalytics()

const t          = ref({ messages: 0, searches: 0, tasks: 0 })
const chartDays  = ref<DayUsage[]>([])

function refresh() {
  t.value         = totals()
  chartDays.value = last7Days()
}

const total = computed(() => Math.max(t.value.messages + t.value.searches + t.value.tasks, 1))

const maxBarVal = computed(() => {
  const vals = chartDays.value.flatMap(d => [d.messages, d.searches, d.tasks])
  return Math.max(...vals, 1)
})

function barPx(val: number) {
  return Math.max(4, Math.round((val / maxBarVal.value) * 100))
}

function dayLabel(date: string) {
  return new Date(date + 'T12:00:00').toLocaleDateString('en', { weekday: 'short' }).slice(0, 3)
}

const stats = computed(() => [
  { icon: '💬', label: 'Messages Sent',  value: t.value.messages,                                    color: 'text-mx-purple' },
  { icon: '🔍', label: 'Searches Made',  value: t.value.searches,                                    color: 'text-mx-cyan'   },
  { icon: '✅', label: 'Tasks Created',  value: t.value.tasks,                                       color: 'text-mx-gold'   },
  { icon: '⭐', label: 'Total Actions',  value: t.value.messages + t.value.searches + t.value.tasks, color: 'text-mx-green'  },
])

const breakdown = computed(() => [
  { label: 'AI Chat Messages', value: t.value.messages, pct: Math.round(t.value.messages / total.value * 100), color: 'text-mx-purple', barColor: 'bg-mx-purple' },
  { label: 'Web Searches',     value: t.value.searches, pct: Math.round(t.value.searches / total.value * 100), color: 'text-mx-cyan',   barColor: 'bg-mx-cyan'   },
  { label: 'Tasks Created',    value: t.value.tasks,    pct: Math.round(t.value.tasks    / total.value * 100), color: 'text-mx-gold',   barColor: 'bg-mx-gold'   },
])

onMounted(refresh)
</script>

<style scoped>
.stat-card {
  @apply rounded-2xl border border-mx-border p-4 text-center;
  background: rgba(255,255,255,0.04);
}
.glass-panel {
  @apply rounded-2xl border border-mx-border;
  background: rgba(255,255,255,0.04);
}
</style>
