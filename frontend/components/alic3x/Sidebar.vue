<template>
  <aside
    :class="[
      'flex flex-col border-r border-mx-border bg-mx-surface/80 backdrop-blur-xl transition-all duration-300 shrink-0 hidden md:flex',
      collapsed ? 'w-16' : 'w-56',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-3 py-4 border-b border-mx-border">
      <button class="sidebar-avatar shrink-0" @click="collapsed = !collapsed">
        <span class="font-display font-black text-xs holo-text">A3</span>
      </button>
      <Transition name="fade">
        <div v-if="!collapsed" class="overflow-hidden">
          <p class="font-display font-bold text-sm text-white whitespace-nowrap">Alic3X PRO</p>
          <p class="text-xs text-mx-muted whitespace-nowrap">Dashboard</p>
        </div>
      </Transition>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-3 space-y-1 px-2">
      <button
        v-for="item in navItems"
        :key="item.id"
        :class="[
          'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200',
          modelValue === item.id
            ? 'bg-mx-purple/20 text-mx-purple border border-mx-purple/30'
            : 'text-mx-muted hover:bg-white/5 hover:text-white border border-transparent',
        ]"
        :title="collapsed ? item.label : undefined"
        @click="$emit('update:modelValue', item.id)"
      >
        <span class="text-base shrink-0">{{ item.icon }}</span>
        <span v-if="!collapsed" class="whitespace-nowrap font-medium">{{ item.label }}</span>
      </button>
    </nav>

    <!-- Collapse toggle -->
    <div class="px-2 pb-4">
      <button
        class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-mx-muted hover:text-white hover:bg-white/5 transition-all duration-200"
        @click="collapsed = !collapsed"
      >
        <span class="text-sm shrink-0">{{ collapsed ? '▶' : '◀' }}</span>
        <span v-if="!collapsed" class="whitespace-nowrap">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [string] }>()

const collapsed = ref(false)

const navItems = [
  { id: 'chat',      icon: '💬', label: 'Chat' },
  { id: 'tasks',     icon: '✅', label: 'Tasks' },
  { id: 'search',    icon: '🔍', label: 'Web Search' },
  { id: 'analytics', icon: '📊', label: 'Analytics' },
  { id: 'kb',        icon: '🗄️', label: 'Knowledge Base' },
  { id: 'settings',  icon: '⚙️', label: 'Settings' },
]
</script>

<style scoped>
.sidebar-avatar {
  @apply w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-mx-purple/40;
  background: linear-gradient(135deg, rgba(139,0,255,0.2), rgba(255,0,122,0.2));
}
.fade-enter-active,
.fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }
</style>
