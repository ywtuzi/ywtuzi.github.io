<script setup>
import { ref, onMounted } from 'vue'
import { listPosts, validateToken } from '../api/github.js'

const stats = ref({ total: 0, loading: true })
const tokenValid = ref(false)
const error = ref('')
const recentPosts = ref([])
const hasToken = ref(!!localStorage.getItem('github_token'))

onMounted(async () => {
  const token = localStorage.getItem('github_token')
  if (!token) {
    stats.value.loading = false
    return
  }

  tokenValid.value = await validateToken()
  if (!tokenValid.value) {
    stats.value.loading = false
    error.value = 'Token 无效'
    return
  }

  try {
    const posts = await listPosts()
    stats.value = { total: posts.length, loading: false }
    recentPosts.value = posts.slice(0, 5)
  } catch (e) {
    stats.value = { total: 0, loading: false }
    error.value = e.message
  }
})
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:4px;">📊 仪表盘</h1>
    <p style="color:#666;margin-bottom:32px;font-size:0.85em;">AI学习记录 · 后台管理</p>

    <!-- 未配置 Token -->
    <div v-if="!hasToken"
      style="background:#c9a84c;color:#1a1a1a;padding:16px 20px;margin-bottom:24px;font-size:0.9em;">
      ⚠️ 请先在左侧「设置」页面配置 GitHub Token
    </div>

    <!-- Token 无效 -->
    <div v-else-if="!tokenValid"
      style="background:#c43a31;color:#fff;padding:16px 20px;margin-bottom:24px;font-size:0.9em;">
      ⚠️ GitHub Token 无效，请到设置页面重新配置
    </div>

    <!-- 加载中 -->
    <div v-if="stats.loading" style="color:#888;">加载中...</div>

    <!-- 统计数据 -->
    <div v-if="!stats.loading" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;margin-bottom:32px;">
      <div style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:6px;padding:20px;">
        <div style="color:#666;font-size:0.8em;margin-bottom:4px;">📝 文章总数</div>
        <div style="font-size:32px;color:#2d8a4e;font-weight:bold;">{{ stats.total }}</div>
      </div>
    </div>

    <!-- 错误信息 -->
    <div v-if="error"
      style="background:rgba(196,58,49,0.1);border:1px solid rgba(196,58,49,0.2);padding:12px 16px;margin-bottom:24px;font-size:0.85em;color:#c43a31;">
      API 错误：{{ error }}
    </div>

    <!-- 最近文章 -->
    <div v-if="recentPosts.length > 0" style="margin-top:24px;">
      <h3 style="font-size:0.95em;color:#c9a84c;margin-bottom:12px;border-left:2px solid #c9a84c;padding-left:12px;">最近文章</h3>
      <div v-for="post in recentPosts" :key="post.sha"
        style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.85em;color:#aaa;">
        {{ post.name }}
      </div>
      <div v-if="stats.total > 5" style="margin-top:8px;font-size:0.8em;color:#555;">
        共 {{ stats.total }} 篇，仅显示最近 5 篇
      </div>
    </div>
  </div>
</template>
