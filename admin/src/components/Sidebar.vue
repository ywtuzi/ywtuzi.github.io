<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const menuItems = [
  { path: '/', label: '📊 仪表盘' },
  { path: '/posts', label: '📝 文章管理' },
  { path: '/categories', label: '🏷️ 分类管理' },
  { path: '/tags', label: '🔖 标签管理' },
  { path: '/pages', label: '📄 页面管理' },
  { path: '/settings', label: '⚙️ 设置' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>🗡️ 青墨管理</h2>
    </div>
    <nav class="nav-list">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="['nav-item', { active: isActive(item.path) }]"
      >
        {{ item.label }}
      </router-link>
    </nav>
    <div class="sidebar-footer">
      <a href="/" target="_blank" class="nav-item">🏠 查看博客</a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  min-width: 220px;
  background: #1a2a3a;
  border-right: 1px solid #2a3a4a;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid #2a3a4a;
}
.sidebar-header h2 {
  color: #c9a84c;
  font-size: 18px;
  margin: 0;
  font-family: 'Noto Serif SC', serif;
}
.nav-list {
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: block;
  padding: 10px 12px;
  border-radius: 6px;
  color: #c8c4b9;
  text-decoration: none;
  transition: all 0.2s;
  font-size: 14px;
}
.nav-item:hover { background: #243447; color: #e8e4d9; }
.nav-item.active {
  background: rgba(45, 138, 78, 0.2);
  color: #2d8a4e;
  font-weight: bold;
}
.sidebar-footer {
  padding: 12px;
  border-top: 1px solid #2a3a4a;
}
.sidebar-footer .nav-item:hover {
  background: #243447;
}
</style>
