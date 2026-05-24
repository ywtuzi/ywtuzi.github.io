import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/Dashboard.vue') },
  { path: '/posts', component: () => import('./views/PostList.vue') },
  { path: '/posts/new', component: () => import('./views/PostEditor.vue') },
  { path: '/posts/:path/edit', component: () => import('./views/PostEditor.vue') },
  { path: '/categories', component: () => import('./views/CategoryManager.vue') },
  { path: '/tags', component: () => import('./views/TagManager.vue') },
  { path: '/pages', component: () => import('./views/PageManager.vue') },
  { path: '/settings', component: () => import('./views/Settings.vue') },
]

export default createRouter({
  history: createWebHashHistory('/admin/'),
  routes,
})
