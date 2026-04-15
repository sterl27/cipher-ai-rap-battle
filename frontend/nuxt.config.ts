// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
  ],

  googleFonts: {
    families: {
      'Orbitron': [400, 500, 700, 900],
      'Space+Grotesk': [300, 400, 500, 600, 700],
      'Inter': [300, 400, 500],
    },
    display: 'swap',
    preconnect: true,
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Musaix Pro — AI Music Production Ecosystem',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'description',
          content:
            'Musaix Pro: An agentic, modular ecosystem for professional music production and AI-driven audio workflows. Featuring Musaix Research, Alic3X PRO, and LiquidUI 2026.',
        },
        { name: 'theme-color', content: '#08080E' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  nitro: {
    cacheRoute: [
      { route: '/', maxAge: 60 * 10 },
      { route: '/research', maxAge: 60 * 10 },
      { route: '/tools/**', maxAge: 60 * 10 },
      { route: '/alic3x', maxAge: 60 * 10 },
    ],
  },

  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    public: {
      appName: 'Musaix Pro',
      appVersion: '1.0.0',
    },
  },

  experimental: {
    componentPresets: true,
  },
})
