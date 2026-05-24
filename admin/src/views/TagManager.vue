<script setup>
import { ref } from 'vue'
const tags = ref(['开始', '修仙', 'Java', 'Spring Boot', 'Vue', '读书笔记'])
const newTag = ref('')

function addTag() {
  const trimmed = newTag.value.trim()
  if (trimmed && !tags.value.includes(trimmed)) {
    tags.value.push(trimmed)
    newTag.value = ''
  }
}
function removeTag(tag) {
  tags.value = tags.value.filter(t => t !== tag)
}
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:24px;">🔖 标签管理</h1>

    <div style="display:flex;gap:8px;margin-bottom:16px;">
      <input v-model="newTag" placeholder="新标签" style="max-width:300px;"
        @keyup.enter="addTag"/>
      <button class="btn-primary" @click="addTag">添加</button>
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:8px;">
      <div v-for="tag in tags" :key="tag"
        style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:20px;padding:6px 16px;
               display:flex;align-items:center;gap:8px;">
        <span>#{{ tag }}</span>
        <button @click="removeTag(tag)"
          style="background:none;border:none;color:#c43a31;cursor:pointer;padding:0;font-size:16px;">×</button>
      </div>
    </div>
  </div>
</template>
