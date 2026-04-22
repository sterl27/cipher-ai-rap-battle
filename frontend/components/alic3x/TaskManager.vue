<template>
  <div class="p-6 h-full overflow-y-auto">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-bold text-xl text-white">Task Manager</h2>
      <div class="flex gap-2">
        <button
          :class="['px-3 py-1.5 text-xs rounded-lg border transition-all', view === 'board' ? 'bg-mx-cyan/20 border-mx-cyan/40 text-mx-cyan' : 'border-mx-border text-mx-muted hover:text-white']"
          @click="view = 'board'"
        >
          Board
        </button>
        <button
          :class="['px-3 py-1.5 text-xs rounded-lg border transition-all', view === 'list' ? 'bg-mx-cyan/20 border-mx-cyan/40 text-mx-cyan' : 'border-mx-border text-mx-muted hover:text-white']"
          @click="view = 'list'"
        >
          List
        </button>
      </div>
    </div>

    <!-- Add task form -->
    <div class="glass-panel p-4 mb-6 flex flex-wrap gap-3">
      <input
        v-model="newTitle"
        class="task-input flex-1 min-w-40"
        placeholder="New task title..."
        @keydown.enter="addTask"
      />
      <select v-model="newPriority" class="task-input w-28">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        :class="[
          'px-4 py-2 text-xs rounded-xl font-bold transition-all border',
          newTitle.trim()
            ? 'bg-mx-purple text-white border-mx-purple hover:bg-mx-purple/80'
            : 'opacity-40 cursor-not-allowed bg-mx-purple/20 text-mx-purple border-mx-purple/20',
        ]"
        :disabled="!newTitle.trim()"
        @click="addTask"
      >
        + Add Task
      </button>
    </div>

    <!-- Board view -->
    <div v-if="view === 'board'" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="col in columns"
        :key="col.status"
        class="col-panel"
        @dragover.prevent
        @drop="onDrop(col.status)"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-display font-bold text-sm" :class="col.color">{{ col.label }}</h3>
          <span class="text-xs text-mx-muted bg-mx-surface px-2 py-0.5 rounded-full">
            {{ tasksByStatus(col.status).length }}
          </span>
        </div>
        <div class="space-y-2 min-h-12">
          <div
            v-for="task in tasksByStatus(col.status)"
            :key="task.id"
            class="task-card"
            draggable="true"
            @dragstart="draggedId = task.id"
            @dragend="draggedId = null"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="text-sm text-mx-text flex-1">{{ task.title }}</p>
              <button class="text-mx-muted hover:text-mx-magenta text-xs shrink-0 leading-none" @click="removeTask(task.id)">✕</button>
            </div>
            <div class="flex items-center gap-2 mt-2">
              <span :class="['priority-badge', task.priority]">{{ task.priority }}</span>
              <span class="text-xs text-mx-muted">{{ fmtDate(task.createdAt) }}</span>
            </div>
          </div>
          <p
            v-if="!tasksByStatus(col.status).length"
            class="text-xs text-mx-muted text-center py-4 border border-dashed border-mx-border/30 rounded-lg"
          >
            Drop here
          </p>
        </div>
      </div>
    </div>

    <!-- List view -->
    <div v-else class="space-y-2">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-card flex items-center gap-3"
      >
        <button
          :class="[
            'w-4 h-4 rounded-full border-2 shrink-0 transition-all',
            task.status === 'done' ? 'bg-mx-green border-mx-green' : 'border-mx-border hover:border-mx-cyan',
          ]"
          @click="cycleStatus(task)"
        />
        <p :class="['text-sm flex-1', task.status === 'done' ? 'line-through text-mx-muted' : 'text-mx-text']">
          {{ task.title }}
        </p>
        <span :class="['priority-badge', task.priority]">{{ task.priority }}</span>
        <span
          class="text-xs px-2 py-0.5 rounded-full border"
          :class="statusStyle(task.status)"
        >
          {{ task.status }}
        </span>
        <button class="text-mx-muted hover:text-mx-magenta text-xs" @click="removeTask(task.id)">✕</button>
      </div>
      <p v-if="!tasks.length" class="text-mx-muted text-sm text-center py-8">
        No tasks yet. Add one above.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type Priority = 'low' | 'medium' | 'high'
type Status   = 'todo' | 'in-progress' | 'done'

interface Task {
  id: number
  title: string
  priority: Priority
  status: Status
  createdAt: number
}

const { track } = useAnalytics()

const view        = ref<'board' | 'list'>('board')
const newTitle    = ref('')
const newPriority = ref<Priority>('medium')
const draggedId   = ref<number | null>(null)
const tasks       = ref<Task[]>([])

function load() {
  if (typeof localStorage === 'undefined') return
  try { tasks.value = JSON.parse(localStorage.getItem('alic3x_tasks') || '[]') }
  catch { /* empty */ }
}

function save() {
  if (typeof localStorage !== 'undefined')
    localStorage.setItem('alic3x_tasks', JSON.stringify(tasks.value))
}

function addTask() {
  const title = newTitle.value.trim()
  if (!title) return
  tasks.value.unshift({ id: Date.now(), title, priority: newPriority.value, status: 'todo', createdAt: Date.now() })
  newTitle.value = ''
  save()
  track('tasks')
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
  save()
}

function cycleStatus(task: Task) {
  const order: Status[] = ['todo', 'in-progress', 'done']
  task.status = order[(order.indexOf(task.status) + 1) % order.length]
  save()
}

function tasksByStatus(s: Status) { return tasks.value.filter(t => t.status === s) }

function onDrop(status: Status) {
  if (draggedId.value === null) return
  const task = tasks.value.find(t => t.id === draggedId.value)
  if (task) { task.status = status; save() }
  draggedId.value = null
}

function fmtDate(ts: number) {
  return new Date(ts).toLocaleDateString('en', { month: 'short', day: 'numeric' })
}

function statusStyle(s: Status) {
  return {
    'todo':        'border-mx-border text-mx-muted',
    'in-progress': 'border-mx-cyan/40 text-mx-cyan',
    'done':        'border-mx-green/40 text-mx-green',
  }[s]
}

const columns = [
  { status: 'todo'        as Status, label: 'To Do',       color: 'text-mx-muted' },
  { status: 'in-progress' as Status, label: 'In Progress', color: 'text-mx-cyan'  },
  { status: 'done'        as Status, label: 'Done',        color: 'text-mx-green' },
]

onMounted(load)
</script>

<style scoped>
.glass-panel {
  @apply rounded-2xl border border-mx-border;
  background: rgba(255,255,255,0.04);
}
.col-panel {
  @apply rounded-2xl border border-mx-border p-4;
  background: rgba(255,255,255,0.03);
  min-height: 200px;
}
.task-card {
  @apply rounded-xl border border-mx-border p-3 cursor-grab transition-all hover:border-mx-purple/30;
  background: rgba(255,255,255,0.05);
}
.task-card:active { cursor: grabbing; }
.task-input {
  @apply px-3 py-2 rounded-xl text-sm text-mx-muted bg-mx-surface border border-mx-border
    outline-none focus:border-mx-purple/40 transition-colors;
}
.priority-badge {
  @apply text-xs px-2 py-0.5 rounded-full border;
}
.priority-badge.low    { @apply border-mx-green/40   text-mx-green   bg-mx-green/10;   }
.priority-badge.medium { @apply border-mx-gold/40    text-mx-gold    bg-mx-gold/10;    }
.priority-badge.high   { @apply border-mx-magenta/40 text-mx-magenta bg-mx-magenta/10; }
</style>
