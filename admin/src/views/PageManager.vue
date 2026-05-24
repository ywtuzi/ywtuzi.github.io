<script setup>
import { ref } from 'vue'
import { saveFile } from '../api/github.js'

const pages = ref([
  { name: 'about.md', label: '关于我' },
])
const editing = ref(null)
const editorContent = ref('')
const saving = ref(false)

function editPage(page) {
  editorContent.value = '# 关于我\n\n在此编辑你的个人介绍...'
  editing.value = page
}

async function savePage() {
  if (!editing.value) return
  saving.value = true
  try {
    await saveFile(editing.value.name, editorContent.value)
    alert('保存成功！')
    editing.value = null
  } catch (e) {
    alert('保存失败: ' + e.message)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:24px;">📄 页面管理</h1>

    <div v-for="page in pages" :key="page.name"
      style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:6px;padding:16px;margin-bottom:8px;
             display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-weight:bold;">{{ page.label }}</div>
        <div style="font-size:12px;color:#888;">{{ page.name }}</div>
      </div>
      <button class="btn-primary" @click="editPage(page)">编辑</button>
    </div>

    <div v-if="editing"
      style="margin-top:24px;background:#1a2a3a;border:1px solid #2a3a4a;border-radius:8px;padding:16px;">
      <h3 style="color:#c9a84c;margin-bottom:12px;">编辑: {{ editing.label }}</h3>
      <textarea v-model="editorContent" rows="15"
        style="width:100%;font-family:monospace;resize:vertical;margin-bottom:12px;background:#0d1117;color:#e8e4d9;border:1px solid #2a3a4a;border-radius:4px;padding:12px;"></textarea>
      <div style="display:flex;gap:8px;">
        <button class="btn-primary" @click="savePage" :disabled="saving">
          {{ saving ? '保存中...' : '💾 保存' }}
        </button>
        <button @click="editing = null"
          style="background:#2a3a4a;color:#e8e4d9;padding:8px 20px;border:none;border-radius:4px;cursor:pointer;">取消</button>
      </div>
    </div>
  </div>
</template>
