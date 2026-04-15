<template>
  <footer class="relative mt-32 border-t border-mx-border">
    <div class="neon-divider" />
    <div class="max-w-7xl mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="12" fill="rgba(0,234,255,0.1)" stroke="rgba(0,234,255,0.3)" stroke-width="1.5"/>
              <text x="32" y="46" font-family="Arial Black, sans-serif" font-weight="900" font-size="38"
                    text-anchor="middle" fill="url(#footGrad)">M</text>
              <defs>
                <linearGradient id="footGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#00EAFF"/>
                  <stop offset="100%" stop-color="#8B00FF"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="font-display font-bold text-white tracking-wider">MUSAIX <span class="text-mx-cyan font-light">PRO</span></span>
          </div>
          <p class="text-mx-muted text-sm leading-relaxed mb-6">
            The future of music production. An agentic, modular ecosystem for professionals and creators.
          </p>
          <!-- Social links -->
          <div class="flex gap-3">
            <a v-for="s in socials" :key="s.label" href="#" class="social-icon" :title="s.label">
              <span v-html="s.icon" />
            </a>
          </div>
        </div>

        <!-- Products -->
        <div>
          <h4 class="section-label mb-4">Products</h4>
          <ul class="space-y-2">
            <li v-for="link in productLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Tools -->
        <div>
          <h4 class="section-label mb-4">Tools</h4>
          <ul class="space-y-2">
            <li v-for="link in toolLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h4 class="section-label mb-4">Company</h4>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="footer-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="neon-divider mb-6" />

      <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-mx-muted">
        <p>© 2026 Musaix Pro. All rights reserved.</p>
        <p class="flex items-center gap-1">
          Built with
          <span class="inline-block w-1.5 h-1.5 rounded-full bg-mx-cyan animate-pulse mx-1" />
          by the Musaix team
        </p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-mx-cyan transition-colors">Privacy</a>
          <a href="#" class="hover:text-mx-cyan transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const productLinks = [
  { to: '/research', label: 'Musaix Research' },
  { to: '/alic3x',   label: 'Alic3X PRO' },
  { to: '/liquidui', label: 'LiquidUI 2026' },
]
const toolLinks = [
  { to: '/tools/lyrical',  label: 'Lyrical Lab' },
  { to: '/tools/spectral', label: 'Spectral Processor' },
  { to: '/tools/battle',   label: 'AI Battle Arena' },
  { to: '/tools',          label: 'All Tools' },
]
const companyLinks = [
  { to: '/about', label: 'About' },
  { to: '/about#team', label: 'Team' },
  { to: '/about#mission', label: 'Mission' },
]
const socials = [
  { label: 'Twitter', icon: '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.844L1.254 2.25H8.08l4.259 5.633 5.905-5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
  { label: 'Instagram', icon: '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>' },
  { label: 'Discord', icon: '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.031.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.031.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>' },
]
</script>

<style scoped>
.footer-link {
  @apply text-sm text-mx-muted hover:text-mx-cyan transition-colors duration-200;
}
.social-icon {
  @apply w-8 h-8 rounded-lg border border-mx-border flex items-center justify-center text-mx-muted hover:text-mx-cyan hover:border-mx-cyan transition-all duration-200;
}
</style>
