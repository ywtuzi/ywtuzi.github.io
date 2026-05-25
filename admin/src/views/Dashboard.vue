<script setup>
import { ref, onMounted } from 'vue'
import { listPosts, validateToken } from '../api/github.js'

const stats = ref({ total: 0, loading: true })
const tokenValid = ref(false)

onMounted(async () => {
  tokenValid.value = localStorage.getItem('github_token') ? await validateToken() : false
  try {
    const posts = await listPosts()
    stats.value = { total: posts.length, loading: false }
  } catch {
    stats.value = { total: 0, loading: false }
  }
})
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:8px;">📊 仪表盘</h1>
    <p style="color:#888;margin-bottom:24px;">AI学习记录 · 后台管理</p>

    <div v-if="!tokenValid && localStorage.getItem('github_token')"
      style="background:#c43a31;color:#fff;padding:12px;border-radius:6px;margin-bottom:16px;">
      ⚠️ GitHub Token 无效，请到设置页面重新配置
    </div>
    <div v-if="!localStorage.getItem('github_token')"
      style="background:#c9a84c;color:#0f1923;padding:12px;border-radius:6px;margin-bottom:16px;">
      ⚠️ 请先在设置页面配置 GitHub Token
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;">
      <div style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:8px;padding:20px;">
        <div style="color:#888;font-size:14px;">📝 文章总数</div>
        <div v-if="!stats.loading" style="font-size:36px;color:#2d8a4e;font-weight:bold;">
          {{ stats.total }}
        </div>
        <div v-else style="color:#666;">加载中...</div>
      </div>
    </div>
  </div>
</template>
