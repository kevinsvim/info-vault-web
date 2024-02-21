<template>
  <div style="background-color: #f3f4f6; padding: 0; margin: 0">
    <div class="page-header">
      <h1>Editor，一个面向富文本编辑器</h1>
    </div>
    <div ref="divRef" style="height: 100%; ">
      <div class="aie-container">
        <div class="aie-header-panel">
          <div class="aie-container-header"></div>
        </div>
        <div class="aie-container-main"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import { onMounted, ref, onUnmounted } from "vue";

const divRef = ref()
let aiEditor: AiEditor | null = null
onMounted(() => {
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: '一个面向AI的富文本编辑器',
    onChange: (editor) => {
      console.log(editor.getHtml())
    }
  })
})
onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
</script>
<style lang="scss">
.page-header {
  background-color: #fff;
  height: 51px;
  line-height: 51px;
  padding: 0 2rem;
  display: flex;
  position: sticky;
  border-bottom: 1px solid #efefef;
  top: 0;
  z-index: 2;
}
.aie-header-panel {
  position: sticky;
  top: 51px;
  z-index: 2;
}
.aie-container aie-header>div {
  border: none;
}
.aie-container aie-header {
  display: flex;
  align-items: center;
}
.aie-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: none;
  background-color: #f3f4f6;
  &-header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 56px;
    text-align: center;
    background-color: #fff;
  }

  &-main {
    position: relative;
    width: calc(100% - 2rem - 2px);
    max-width: 800px;
    margin: 1rem auto;
    border: 1px solid rgb(229 231 235);
    background-color: #fff;
    height: 100%;
    min-height: 100vh;
    padding: 1rem;
    z-index: 1 ;
  }

}

</style>