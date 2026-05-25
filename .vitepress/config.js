import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'AI学习记录',
  description: 'AI学习记录 - 技术探索与成长',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  srcDir: '.',
  outDir: 'dist',

  themeConfig: {
    logo: '/images/seal-logo.png',
    siteTitle: 'AI学习记录',
    nav: [
      { text: '首页', link: '/' },
      { text: 'AI发展史', link: '/ai-history/' },
      { text: '文章', link: '/posts/' },
      { text: '分类', link: '/categories/' },
      { text: '标签', link: '/tags/' },
      { text: '归档', link: '/archive/' },
      { text: '关于', link: '/about/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ywtuzi' },
    ],
    footer: {
      message: '凡人修仙 · 以代码证道',
      copyright: 'AI学习记录 <span style="font-size:0.65em;opacity:0.4">/ ywtuzi</span>',
    },
    editLink: { pattern: '', text: '' },
  },
})
