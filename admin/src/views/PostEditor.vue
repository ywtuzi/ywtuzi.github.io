<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { saveFile, getFile } from '../api/github.js'
import MarkdownEditor from '../components/MarkdownEditor.vue'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.params.path && route.params.path !== 'new'

const form = ref({
  title: '',
  date: new Date().toISOString().slice(0, 10),
  category: '随笔',
  tags: '',
  content: '# 新文章\n\n在此输入内容...',
})
const saving = ref(false)

// If editing, load existing article
onMounted(async () => {
  if (isEdit) {
    try {
      const data = await getFile(`posts/${route.params.path}`)
      const match = data.content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      if (match) {
        const fm = match[1]
        form.value.content = match[2]
        const titleMatch = fm.match(/title:\s*(.+)/)
        if (titleMatch) form.value.title = titleMatch[1]
        const dateMatch = fm.match(/date:\s*(.+)/)
        if (dateMatch) form.value.date = dateMatch[1]
        const catMatch = fm.match(/category:\s*(.+)/)
        if (catMatch) form.value.category = catMatch[1]
        const tagsMatch = fm.match(/tags:\n([\s\S]*?)(?=\n\S|$)/)
        if (tagsMatch) {
          form.value.tags = tagsMatch[1]
            .split('\n')
            .map(t => t.replace(/^\s*-\s*/, '').trim())
            .filter(Boolean)
            .join(', ')
        }
      }
    } catch (e) {
      console.error('加载文章失败:', e)
    }
  }
})

function buildMarkdown() {
  const tags = form.value.tags.split(/[,，\s]+/).filter(Boolean)
  const tagsYaml = tags.length > 0
    ? `tags:\n${tags.map(t => `  - ${t}`).join('\n')}`
    : 'tags: []'
  return `---
title: ${form.value.title}
date: ${form.value.date}
category: ${form.value.category}
${tagsYaml}
---

${form.value.content}`
}

async function handleSave() {
  if (!form.value.title.trim()) { alert('请输入文章标题'); return }
  saving.value = true
  try {
    const fileName = `${form.value.date}-${form.value.title
      .replace(/[^\w一-鿿]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()}.md`
    await saveFile(`posts/${fileName}`, buildMarkdown())
    alert('保存成功！')
    router.push('/posts')
  } catch (e) {
    alert('保存失败: ' + e.message)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:24px;">
      {{ isEdit ? '✏️ 编辑文章' : '✏️ 新建文章' }}
    </h1>

    <div style="display:flex;gap:16px;margin-bottom:16px;flex-wrap:wrap;">
      <div style="flex:2;min-width:300px;">
        <label style="display:block;font-size:12px;color:#888;margin-bottom:4px;">标题</label>
        <input v-model="form.title" placeholder="文章标题" />
      </div>
      <div style="flex:1;min-width:150px;">
        <label style="display:block;font-size:12px;color:#888;margin-bottom:4px;">日期</label>
        <input v-model="form.date" type="date" />
      </div>
      <div style="flex:1;min-width:150px;">
        <label style="display:block;font-size:12px;color:#888;margin-bottom:4px;">分类</label>
        <select v-model="form.category" style="background:#1a2a3a;border:1px solid #2a3a4a;color:#e8e4d9;padding:8px 12px;border-radius:4px;font-size:14px;width:100%;">
          <option>技术</option>
          <option>随笔</option>
          <option>读书</option>
          <option>成长</option>
        </select>
      </div>
    </div>

    <div style="margin-bottom:16px;">
      <label style="display:block;font-size:12px;color:#888;margin-bottom:4px;">标签（逗号分隔）</label>
      <input v-model="form.tags" placeholder="Vue, Spring Boot, 修仙" />
    </div>

    <MarkdownEditor v-model="form.content" />

    <div style="margin-top:16px;display:flex;gap:8px;">
      <button class="btn-primary" @click="handleSave" :disabled="saving">
        {{ saving ? '保存中...' : '💾 保存文章' }}
      </button>
      <button @click="router.back()"
        style="background:#2a3a4a;color:#e8e4d9;padding:8px 20px;border:none;border-radius:4px;cursor:pointer;">取消</button>
    </div>
  </div>
</template>
