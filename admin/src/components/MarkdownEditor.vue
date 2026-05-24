<script setup>
import { ref, watch } from 'vue'
import { marked } from 'marked'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
const preview = ref('')

watch(() => props.modelValue, (val) => {
  preview.value = val ? marked(val) : ''
}, { immediate: true })
</script>

<template>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;height:500px;">
    <textarea
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      style="height:100%;font-family:monospace;resize:none;padding:12px;background:#0d1117;color:#e8e4d9;border:1px solid #2a3a4a;border-radius:4px;"
      placeholder="在此输入 Markdown..."
    ></textarea>
    <div style="background:#1a2a3a;border:1px solid #2a3a4a;border-radius:4px;padding:16px;overflow-y:auto;"
      v-html="preview">
    </div>
  </div>
</template>
