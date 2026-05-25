import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'
import './style.css'

function injectFixedVideo() {
  if (document.querySelector('.site-video-bg')) return

  const wrapper = document.createElement('div')
  wrapper.className = 'site-video-bg'
  wrapper.style.cssText = 'position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none'

  const video = document.createElement('video')
  video.autoplay = true
  video.muted = true
  video.loop = true
  video.playsInline = true
  video.style.cssText = 'width:100vw;height:100vh;object-fit:cover;opacity:0.3'

  const src = document.createElement('source')
  src.src = 'https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3383.mp4'
  src.type = 'video/mp4'
  video.appendChild(src)

  const src2 = document.createElement('source')
  src2.src = 'https://cdn.jsdelivr.net/gh/ywtuzi/img@master/hero-bg-3128.mp4'
  src2.type = 'video/mp4'
  video.appendChild(src2)

  wrapper.appendChild(video)
  document.body.prepend(wrapper)
}

export default {
  extends: DefaultTheme,
  setup() {
    onMounted(() => {
      injectFixedVideo()
      // Retry with observer if body not ready
      if (!document.querySelector('.site-video-bg')) {
        const obs = new MutationObserver(() => {
          injectFixedVideo()
          obs.disconnect()
        })
        obs.observe(document.body, { childList: true })
        setTimeout(() => obs.disconnect(), 10000)
      }
    })
  },
}
