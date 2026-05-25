import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './style.css'

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      // Inject hero video background
      const hero = document.querySelector('.VPHomeHero')
      if (!hero || hero.querySelector('.hero-bg-video')) return

      const wrapper = document.createElement('div')
      wrapper.className = 'hero-bg-video'
      wrapper.style.cssText = 'position:absolute;inset:0;z-index:0;overflow:hidden'

      const video = document.createElement('video')
      video.autoplay = true
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.poster = 'https://cdn.jsdelivr.net/gh/ywtuzi/img@master/misty-peaks.jpg'
      video.style.cssText = 'width:100%;height:100%;object-fit:cover;opacity:0.4'

      const src = document.createElement('source')
      src.src = 'https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3383.mp4'
      src.type = 'video/mp4'
      video.appendChild(src)

      const src2 = document.createElement('source')
      src2.src = 'https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3128.mp4'
      src2.type = 'video/mp4'
      video.appendChild(src2)

      const overlay = document.createElement('div')
      overlay.style.cssText = 'position:absolute;inset:0;z-index:1;background:linear-gradient(160deg,rgba(5,5,16,0.6) 0%,rgba(5,5,16,0.7) 40%,rgba(5,5,16,0.85) 70%,rgba(10,10,10,1) 100%);pointer-events:none'

      wrapper.appendChild(video)
      wrapper.appendChild(overlay)
      hero.prepend(wrapper)
    })
  },
}
