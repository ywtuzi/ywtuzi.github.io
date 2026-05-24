import DefaultTheme from 'vitepress/theme'
import './style.css'
import SwordNav from './components/SwordNav.vue'
import MountainFooter from './components/MountainFooter.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SwordNav', SwordNav)
    app.component('MountainFooter', MountainFooter)
  },
}
