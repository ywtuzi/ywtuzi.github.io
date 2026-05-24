<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listPosts } from '../api/github.js'

const router = useRouter()
const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    posts.value = await listPosts()
  } catch (e) {
    console.error('加载文章失败:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
      <h1 style="color:#c9a84c;">📝 文章管理</h1>
      <button class="btn-primary" @click="router.push('/posts/new')">✏️ 新建文章</button>
    </div>

    <div v-if="loading" style="color:#666;">加载中...</div>
    <div v-else-if="posts.length === 0"
      style="text-align:center;padding:40px;color:#666;">
      还没有文章，点击右上角新建第一篇！
    </div>
    <div v-else>
      <div v-for="post in posts" :key="post.sha"
        style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:6px;padding:16px;margin-bottom:8px;
               display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-weight:bold;">{{ post.name }}</div>
          <div style="font-size:12px;color:#888;">{{ post.path }}</div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn-primary"
            @click="router.push(`/posts/${encodeURIComponent(post.name)}/edit`)">编辑</button>
        </div>
      </div>
    </div>
  </div>
</template>
