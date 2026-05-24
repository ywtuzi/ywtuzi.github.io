<template>
  <div class="hero-video-bg" aria-hidden="true">
    <video autoplay muted loop playsinline poster="https://cdn.jsdelivr.net/gh/ywtuzi/img@master/misty-mountain.jpg">
      <source src="https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3383.mp4" type="video/mp4">
      <source src="https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3128.mp4" type="video/mp4">
    </video>
    <div class="hero-video-overlay"></div>
  </div>
</template>

<style scoped>
.hero-video-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-video-bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.hero-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg,
    rgba(5,5,16,0.5) 0%,
    rgba(5,5,16,0.65) 30%,
    rgba(5,5,16,0.8) 60%,
    rgba(5,5,16,0.95) 100%
  );
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .hero-video-bg video { display: none; }
}
</style>
