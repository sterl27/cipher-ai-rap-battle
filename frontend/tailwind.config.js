/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        mx: {
          bg:        '#08080E',
          'bg-alt':  '#0E0E1A',
          surface:   '#12121F',
          border:    'rgba(255,255,255,0.08)',
          cyan:      '#00EAFF',
          'cyan-dim':'#00AACC',
          purple:    '#8B00FF',
          'purple-dim':'#5A00B0',
          magenta:   '#FF007A',
          gold:      '#FFD600',
          green:     '#00FF8C',
          text:      '#E8E8F0',
          muted:     '#7B7B9A',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body:    ['Space Grotesk', 'sans-serif'],
        mono:    ['Inter', 'monospace'],
      },
      backgroundImage: {
        'holo-gradient':
          'linear-gradient(135deg, #00EAFF 0%, #8B00FF 33%, #FF007A 66%, #FFD600 100%)',
        'holo-gradient-soft':
          'linear-gradient(135deg, rgba(0,234,255,0.3) 0%, rgba(139,0,255,0.3) 50%, rgba(255,0,122,0.3) 100%)',
        'mesh-dark':
          'radial-gradient(at 20% 20%, rgba(0,234,255,0.15) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(139,0,255,0.15) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(255,0,122,0.08) 0px, transparent 50%)',
        'card-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glow-cyan':    '0 0 20px rgba(0,234,255,0.4), 0 0 60px rgba(0,234,255,0.1)',
        'glow-purple':  '0 0 20px rgba(139,0,255,0.4), 0 0 60px rgba(139,0,255,0.1)',
        'glow-magenta': '0 0 20px rgba(255,0,122,0.4), 0 0 60px rgba(255,0,122,0.1)',
        'glow-gold':    '0 0 20px rgba(255,214,0,0.4), 0 0 60px rgba(255,214,0,0.1)',
        'glass':        '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-hover':  '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
      },
      animation: {
        'pulse-slow':   'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-cycle':   'glowCycle 4s ease-in-out infinite alternate',
        'gradient-x':   'gradientX 8s ease infinite',
        'scan':         'scan 3s linear infinite',
        'fade-up':      'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        glowCycle: {
          '0%':   { boxShadow: '0 0 20px rgba(0,234,255,0.4)' },
          '50%':  { boxShadow: '0 0 20px rgba(139,0,255,0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(255,0,122,0.4)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
