<script setup>
import * as monaco from 'monaco-editor'
import { onMounted, ref, watch } from 'vue'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

// 定义事件
const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: 'calc(100vh - 46px)' },
  language: { type: String, default: 'json' },
  readOnly: { type: Boolean, default: false },
  modelValue: { type: String, default: '{}' }
})
// 定义事件 v-models
const emit = defineEmits(['update:modelValue'])

const codeRef = ref('')
// 初始化编辑器，确保dom已经渲染
window.MonacoEnvironment = {
  getWorker: (_, label) => {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      return new tsWorker()
    }
    return new EditorWorker()
  }
}

onMounted(() => {
  // 使用样例参考: https://microsoft.github.io/monaco-editor/playground.html
  // 更多属性请参考: https://microsoft.github.io/monaco-editor/docs.html#interfaces/editor.IEditorOptions.html
  const editor = monaco.editor.create(codeRef.value, {
    value: props.modelValue,
    readOnly: props.readOnly,
    language: props.language,
    theme: 'vs-dark',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    minimap: {
      enabled: false
    }
  })

  // 更新数据
  watch(
    () => props.modelValue,
    (newV) => {
      const v = editor.getValue()
      if (newV !== v) {
        editor.setValue(newV)
      }
    }
  )

  // 监听值的变化
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue()
    emit('update:modelValue', value)
  })
})
</script>

<template>
  <div ref="codeRef" :style="{ width, height }"></div>
</template>

<style scoped></style>
