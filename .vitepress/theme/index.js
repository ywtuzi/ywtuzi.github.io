import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './style.css'
import SwordNav from './components/SwordNav.vue'
import MountainFooter from './components/MountainFooter.vue'
import VortexDivider from './components/VortexDivider.vue'
import HeroVideo from './components/HeroVideo.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SwordNav', SwordNav)
    app.component('MountainFooter', MountainFooter)
    app.component('VortexDivider', VortexDivider)
    app.component('HeroVideo', HeroVideo)
  },
  setup() {
    onMounted(() => {
      // Inject hero video background into the home hero section
      const hero = document.querySelector('.VPHomeHero')
      if (hero && !hero.querySelector('.hero-video-bg')) {
        const videoContainer = document.createElement('div')
        videoContainer.innerHTML = '<HeroVideo />'
        // Since we can't directly use Vue component this way,
        // we need a different approach — use CSS background instead
        const video = document.createElement('video')
        video.autoplay = true
        video.muted = true
        video.loop = true
        video.playsInline = true
        video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.5;z-index:0'
        const src1 = document.createElement('source')
        src1.src = 'https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3383.mp4'
        src1.type = 'video/mp4'
        video.appendChild(src1)

        const overlay = document.createElement('div')
        overlay.style.cssText = 'position:absolute;inset:0;z-index:1;background:linear-gradient(160deg,rgba(5,5,16,0.5),rgba(5,5,16,0.65)30%,rgba(5,5,16,0.8)60%,rgba(5,5,16,0.95)100%);pointer-events:none'

        const wrapper = document.createElement('div')
        wrapper.style.cssText = 'position:absolute;inset:0;z-index:0;overflow:hidden'
        wrapper.appendChild(video)
        wrapper.appendChild(overlay)

        hero.style.position = 'relative'
        hero.prepend(wrapper)
      }
    })
  },
}
