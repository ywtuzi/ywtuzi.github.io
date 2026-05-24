<template>
  <div class="sword-nav-wrapper" aria-hidden="true">
    <span class="sword-nav-decoration">
      🗡️
    </span>
  </div>
</template>

<style scoped>
.sword-nav-wrapper {
  position: absolute;
  left: 50%;
  bottom: -14px;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 100;
}

.sword-nav-decoration {
  display: inline-block;
  font-size: 20px;
  animation: swordFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(45, 138, 78, 0.4));
  opacity: 0.7;
}

@keyframes swordFloat {
  0%, 100% {
    transform: translateY(0) rotate(-8deg);
    opacity: 0.4;
  }
  25% {
    transform: translateY(-5px) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-2px) rotate(8deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-7px) rotate(0deg);
    opacity: 0.8;
  }
}

/* Pause animation when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .sword-nav-decoration {
    animation: none;
    opacity: 0.5;
  }
}
</style>
