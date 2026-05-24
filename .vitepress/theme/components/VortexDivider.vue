<template>
  <div class="vortex-divider" aria-hidden="true">
    <div class="vortex-ring"></div>
  </div>
</template>

<style scoped>
.vortex-divider {
  position: relative;
  height: 60px;
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.vortex-divider::before {
  content: '';
  position: absolute;
  width: 160px;
  height: 2px;
  background: linear-gradient(90deg,
    transparent,
    var(--vortex-red, #c43a31),
    var(--vortex-yellow, #f5d742),
    var(--vortex-cyan, #38bdf8),
    var(--vortex-blue, #3b82f6),
    transparent
  );
  animation: vortexPulse 3s ease-in-out infinite;
}

.vortex-ring {
  position: absolute;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  animation: spin 4s linear infinite;
  background: conic-gradient(
    #c43a31,
    #f5d742,
    #38bdf8,
    #3b82f6,
    #c43a31
  );
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
  mask: radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px));
  opacity: 0.35;
}

@keyframes vortexPulse {
  0%, 100% { opacity: 0.3; transform: scaleX(1); }
  50% { opacity: 0.7; transform: scaleX(1.15); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .vortex-divider::before,
  .vortex-ring {
    animation: none;
  }
  .vortex-ring {
    opacity: 0.2;
  }
}
</style>
