<template>
  <div class="mountain-footer" aria-hidden="true">
    <svg
      class="mountain-svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Far background mountain range (lighter) -->
      <path
        class="mountain-bg"
        d="M0,80 L80,40 L160,65 L240,25 L320,55 L400,20 L480,50 L560,30 L640,60 L720,15 L800,45 L880,35 L960,55 L1040,10 L1120,40 L1200,30 L1280,50 L1360,20 L1440,45 L1440,120 L0,120 Z"
        fill="rgba(45, 138, 78, 0.08)"
      />
      <!-- Mid mountain range -->
      <path
        class="mountain-mid"
        d="M0,90 L60,55 L140,75 L220,35 L320,60 L420,30 L500,65 L600,40 L700,70 L780,25 L880,55 L980,40 L1080,65 L1160,20 L1260,50 L1340,35 L1440,55 L1440,120 L0,120 Z"
        fill="rgba(45, 138, 78, 0.15)"
      />
      <!-- Foreground mountain range (darker) -->
      <path
        class="mountain-fg"
        d="M0,105 L100,70 L200,85 L300,55 L400,80 L500,50 L600,75 L700,60 L800,85 L900,50 L1000,70 L1100,55 L1200,80 L1300,45 L1400,70 L1440,65 L1440,120 L0,120 Z"
        fill="rgba(45, 138, 78, 0.25)"
      />
      <!-- Ground line -->
      <rect
        class="ground"
        x="0"
        y="110"
        width="1440"
        height="10"
        fill="rgba(15, 25, 35, 1)"
      />
    </svg>
  </div>
</template>

<style scoped>
.mountain-footer {
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.mountain-svg {
  display: block;
  width: 100%;
  height: 80px;
}

@media (min-width: 768px) {
  .mountain-svg {
    height: 120px;
  }
}

@media (min-width: 1024px) {
  .mountain-svg {
    height: 150px;
  }
}
</style>
