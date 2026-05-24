<script setup>
import { ref, computed } from 'vue'
import { validateToken } from '../api/github.js'

const token = ref(localStorage.getItem('github_token') || '')
const status = ref('')
const statusValid = computed(() => status.value.includes('有效'))

async function saveToken() {
  localStorage.setItem('github_token', token.value.trim())
  status.value = '验证中...'
  const valid = await validateToken()
  status.value = valid ? '✅ Token 有效！' : '❌ Token 无效，请检查'
}
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:24px;">⚙️ 设置</h1>

    <div style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:8px;padding:24px;max-width:600px;">
      <label style="display:block;margin-bottom:8px;color:#888;">GitHub Personal Access Token</label>
      <input v-model="token" type="password" placeholder="ghp_xxxxxxxxxxxx"
        style="margin-bottom:8px;width:100%;" />
      <p style="font-size:12px;color:#666;margin-bottom:16px;">
        需要 repo 权限。在
        <a href="https://github.com/settings/tokens" target="_blank" style="color:#2d8a4e;">GitHub Tokens</a>
        页面生成
      </p>
      <button class="btn-primary" @click="saveToken">💾 保存并验证</button>
      <div v-if="status" :style="{
        marginTop: '12px',
        padding: '8px 12px',
        borderRadius: '4px',
        background: statusValid ? 'rgba(45,138,78,0.2)' : 'rgba(196,58,49,0.2)',
        color: statusValid ? '#2d8a4e' : '#c43a31'
      }">{{ status }}</div>
    </div>
  </div>
</template>
