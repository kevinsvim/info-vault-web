<template>
  <div>
    <h1>Editor，一个面向富文本编辑器</h1>
  </div>
  <div ref="divRef" style="height: 550px; margin: 20px">
    <div class="aie-container">
      <div class="aie-container-header"></div>
      <div class="aie-container-main"></div>
      <div class="aie-container-footer"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css"
import { onMounted, ref, onUnmounted } from "vue";
const divRef = ref();
let aiEditor: AiEditor | null = null;
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: '一个面向AI的富文本编辑器',
  })
})
onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
</script>
<style scoped lang="scss">
</style>
<style>
.aie-container {
  width: 50%;
}
.aie-container-main {
  width: 50%;
}
</style>