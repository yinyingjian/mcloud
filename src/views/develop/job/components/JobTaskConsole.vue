<script setup>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { Solarized_Darcula, GetTermSize } from '@/tools/term'
import { onMounted } from 'vue'

// 声明属性
const props = defineProps({
  taskId: { type: String, default: '', required: true },
  containerName: { type: String, default: '', required: true },
  token: { type: String, default: '', required: true },
  height: { type: String, default: '750px' },
  width: { type: String, default: '100%' },
  theme: {
    type: Object,
    default: () => {
      return Solarized_Darcula
    }
  }
})

// 终端对象
var term = new Terminal({
  theme: props.theme,
  fontSize: 13,
  convertEol: true,
  disableStdin: false
})

const connect = () => {
  let socket = new WebSocket(
    `ws://127.0.0.1:8090/mpaas/api/v1/tasks/${props.taskId}/log?mcenter_access_token=${props.token}`
  )
  socket.onopen = function (e) {
    console.log(e)
    socket.send(JSON.stringify({ task_id: props.taskId, container_name: props.containerName }))
  }
  socket.onmessage = function (event) {
    if (event.data instanceof Blob) {
      // 数据
      let reader = new FileReader()
      reader.onload = (e) => {
        term.write(e.target.result)
      }
      reader.readAsText(event.data)
    } else {
      // 指令响应
      console.log(event.data)
    }
  }
  socket.onclose = function (event) {
    if (event.wasClean) {
      term.write(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`)
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      term.write('[close] Connection died')
    }
  }
  socket.onerror = function () {
    term.write(`error, `)
  }
}

// 调整窗口
const fitSize = () => {
  var geometry = GetTermSize(term)
  term.resize(geometry.cols, geometry.rows)
}
// 初始化终端
const init = () => {
  term.open(document.getElementById('terminal'))

  // 及时适配窗口
  fitSize()
  // 监听窗口变化
  window.onresize = fitSize
}

onMounted(() => {
  // 初始化终端
  init()
  // 连接终端
  connect()
})
</script>

<template>
  <div id="terminal" :style="{ height, width, backgroundColor: theme.background }"></div>
</template>
