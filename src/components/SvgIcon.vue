<template>
  <div>
    <div v-html="getSvgCode"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义属性
const props = defineProps({
  svgCode: { type: String },
  color: { type: String }
})

const getSvgCode = computed(() => {
  // 解析 SVG 代码字符串为 DOM 元素
  var parser = new DOMParser()
  var svgDoc = parser.parseFromString(props.svgCode, 'image/svg+xml')

  // 获取要修改的元素
  var svgTags = svgDoc.getElementsByTagName('svg')
  if (svgTags.length > 0) {
    var svgIcon = svgTags[0]
    svgIcon.setAttribute('width', 28)
    svgIcon.setAttribute('height', 28)
    var pathAttr = svgIcon.getElementsByTagName('path')
    if (pathAttr.length > 0 && props.color) {
      pathAttr[0].setAttribute('fill', props.color)
    }
  }

  // 将修改后的 SVG 转换为字符串
  var serializer = new XMLSerializer()
  return serializer.serializeToString(svgDoc)
})
</script>
