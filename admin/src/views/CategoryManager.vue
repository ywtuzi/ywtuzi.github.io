<script setup>
import { ref } from 'vue'
const categories = ref(['技术', '随笔', '读书', '成长'])
const newCat = ref('')

function addCategory() {
  const trimmed = newCat.value.trim()
  if (trimmed && !categories.value.includes(trimmed)) {
    categories.value.push(trimmed)
    newCat.value = ''
  }
}
function removeCategory(cat) {
  categories.value = categories.value.filter(c => c !== cat)
}
</script>

<template>
  <div>
    <h1 style="color:#c9a84c;margin-bottom:24px;">🏷️ 分类管理</h1>
    <p style="color:#888;margin-bottom:16px;">提示：分类以 posts/ 目录下的 Markdown 文件 frontmatter 为准，此处仅作本地展示</p>

    <div style="display:flex;gap:8px;margin-bottom:16px;">
      <input v-model="newCat" placeholder="新分类名称" style="max-width:300px;"
        @keyup.enter="addCategory"/>
      <button class="btn-primary" @click="addCategory">添加</button>
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:8px;">
      <div v-for="cat in categories" :key="cat"
        style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:20px;padding:6px 16px;
               display:flex;align-items:center;gap:8px;">
        <span>{{ cat }}</span>
        <button @click="removeCategory(cat)"
          style="background:none;border:none;color:#c43a31;cursor:pointer;padding:0;font-size:16px;">×</button>
      </div>
    </div>
  </div>
</template>
