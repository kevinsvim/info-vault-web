<template>
  <div style="background-color: #f3f4f6; padding: 0; margin: 0">
    <div class="page-header">
      <h1>Editor，一个面向富文本编辑器</h1>
    </div>
    <div ref="divRef" style="height: 100%; ">
      <div class="aie-container">
        <!-- 头部功能区域 -->
        <div class="aie-header-panel">
          <div class="aie-container-header"></div>
        </div>
        <!-- 内容区域 -->
        <div class="content">
          <div class="title">
            <input title="title" v-model="article.title" placeholder="请输入标题（最多100字）"/>
          </div>
          <el-divider/>
          <div class="aie-container-main"></div>
          <el-divider/>
          <div class="aie-container-footer">
            <div class="setting">
              <!-- 添加封面 -->
              <div class="setting-cover">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import {onMounted, ref, onUnmounted, onBeforeUnmount, reactive} from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const divRef = ref()
const hasUnsavedContent = ref(false)
let aiEditor: AiEditor | null = null
const article = reactive({
  title: '',
  content: ''
})
onMounted(() => {
  window.addEventListener('beforeunload', beforeLeave)
  aiEditor = new AiEditor({
    element: divRef.value as Element,
    placeholder: "点击输入内容...",
    content: '一个面向AI的富文本编辑器',
    onChange: () => {
      hasUnsavedContent.value = true
    }
  })
})
onUnmounted(() => {
  aiEditor && aiEditor.destroy()
})
const beforeLeave = async (e: any) => {
  // 检查路由是否是write,并且检查是否有未保存的内容
  if (route.path === '/write' && hasUnsavedContent.value) {
    // 提示用户是否保存
    e.preventDefault()
  }
}
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeLeave)
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
    width: 100%;
    max-width: 800px;
    border: none;
    background-color: #fff;
    height: 100%;
    min-height: 100vh;
    z-index: 1 ;
  }

  &-footer {
    position: relative;
    width: 100px;
    max-width: 800px;
    height: 256px;
    background-color: #fff;
    text-align: center;
    line-height: 56px;
    font-size: 14px;
    color: #a0a0a0;
    z-index: 1;
  }
}

.content {
  min-width: 867px;
  width: 867px;
  background-color: #fff;
  max-width: 800px;
  margin: 1rem auto 2rem;
  border-radius: 5px;
  padding: 20px;
}

.aie-content {
  padding: 0;
}

.title {
  width: 100%;
  height: 40px;
  max-width: 800px;
  background-color: #fff;
  border: none;
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 32px;
    font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
    font-weight: 500;
  }
}

.setting {
  &-cover {

  }
}
</style>