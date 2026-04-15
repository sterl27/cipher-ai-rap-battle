<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'nav-scrolled' : 'nav-top'"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="logo-mark">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
            <rect width="64" height="64" rx="12" fill="rgba(0,234,255,0.1)" stroke="rgba(0,234,255,0.3)" stroke-width="1.5"/>
            <text x="32" y="46" font-family="Arial Black, sans-serif" font-weight="900" font-size="38"
                  text-anchor="middle" fill="url(#navGrad)">M</text>
            <defs>
              <linearGradient id="navGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#00EAFF"/>
                <stop offset="100%" stop-color="#8B00FF"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div>
          <span class="font-display font-bold text-base text-white tracking-wider group-hover:holo-text transition-all">
            MUSAIX
          </span>
          <span class="font-display font-light text-base text-mx-cyan ml-1 tracking-widest">PRO</span>
        </div>
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          active-class="nav-link-active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <!-- CTA -->
      <div class="hidden lg:flex items-center gap-3">
        <NuxtLink to="/tools" class="btn-holo text-xs px-4 py-2">
          Launch Tools
        </NuxtLink>
        <NuxtLink to="/alic3x" class="btn-primary text-xs px-4 py-2">
          Meet Alic3X
        </NuxtLink>
      </div>

      <!-- Mobile menu toggle -->
      <button
        class="lg:hidden text-mx-cyan p-2"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <div class="w-5 space-y-1.5">
          <span class="block h-px bg-current transition-all" :class="mobileOpen ? 'rotate-45 translate-y-2' : ''" />
          <span class="block h-px bg-current transition-all" :class="mobileOpen ? 'opacity-0' : ''" />
          <span class="block h-px bg-current transition-all" :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''" />
        </div>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen" class="lg:hidden glass-card mx-4 mb-4 mt-1 p-4">
        <nav class="flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link px-3 py-2 rounded-lg"
            active-class="nav-link-active"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
        <div class="flex gap-2 mt-4 pt-4 border-t border-mx-border">
          <NuxtLink to="/tools" class="btn-holo text-xs flex-1 py-2" @click="mobileOpen = false">
            Launch Tools
          </NuxtLink>
          <NuxtLink to="/alic3x" class="btn-primary text-xs flex-1 py-2" @click="mobileOpen = false">
            Meet Alic3X
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
interface NavLink {
  to: string
  label: string
}

const { y: scrollY } = useWindowScroll()
const scrolled = computed(() => scrollY.value > 20)
const mobileOpen = ref(false)

const navLinks: NavLink[] = [
  { to: '/',          label: 'Home' },
  { to: '/research',  label: 'Research' },
  { to: '/alic3x',   label: 'Alic3X PRO' },
  { to: '/tools',    label: 'Tools' },
  { to: '/liquidui', label: 'LiquidUI 2026' },
  { to: '/about',    label: 'About' },
]
</script>

<style scoped>
.nav-top {
  background: transparent;
}
.nav-scrolled {
  background: rgba(8, 8, 14, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav-link {
  @apply px-3 py-2 text-sm font-body text-mx-muted rounded-lg transition-all duration-200;
}
.nav-link:hover {
  @apply text-white;
  background: rgba(255,255,255,0.05);
}
.nav-link-active {
  @apply text-mx-cyan;
  background: rgba(0,234,255,0.08);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
