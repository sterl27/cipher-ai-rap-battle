<template>
  <div class="min-h-screen flex flex-col bg-mx-bg">
    <!-- Background animated mesh -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true" role="presentation">
      <div class="mesh-orb mesh-orb-1" />
      <div class="mesh-orb mesh-orb-2" />
      <div class="mesh-orb mesh-orb-3" />
      <!-- Grid overlay -->
      <div class="absolute inset-0 grid-bg opacity-30" />
      <!-- Scan line effect -->
      <div class="scan-line" />
    </div>

    <NavBar />

    <main class="flex-1 pt-16">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.mesh-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 8s ease-in-out infinite;
}
.mesh-orb-1 {
  width: 600px; height: 600px;
  top: -200px; left: -200px;
  background: radial-gradient(circle, rgba(0,234,255,0.12) 0%, transparent 70%);
  animation-delay: 0s;
}
.mesh-orb-2 {
  width: 500px; height: 500px;
  bottom: 10%; right: -100px;
  background: radial-gradient(circle, rgba(139,0,255,0.15) 0%, transparent 70%);
  animation-delay: -3s;
}
.mesh-orb-3 {
  width: 400px; height: 400px;
  top: 40%; left: 40%;
  background: radial-gradient(circle, rgba(255,0,122,0.08) 0%, transparent 70%);
  animation-delay: -6s;
}
.scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,234,255,0.15), transparent);
  animation: scanLine 12s linear infinite;
  pointer-events: none;
}
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-30px) scale(1.05); }
}
@keyframes scanLine {
  0%   { top: -2px; }
  100% { top: 100vh; }
}
</style>
