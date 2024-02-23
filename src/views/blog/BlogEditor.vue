<template>
  <div class="editor">
    <div class="page-header">
      <h1>Editor，一个面向富文本编辑器</h1>
    </div>
    <div ref="divRef">
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
              <div class="setting-item">
                <label class="setting-item-title">添加封面</label>
                <el-upload
                    class="avatar-uploader"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false">
                  <img v-if="article.cover" :src="article.cover" class="avatar"  alt=""/>
                  <svg-icon v-else icon-name="icon-add" size="14"></svg-icon>
                  <span style="margin-left: 5px">添加文章封面</span>
                  <template #tip>
                    <div class="el-upload__tip">
                      图片支持jpg/png，大小少于500KB.
                    </div>
                  </template>
                </el-upload>
              </div>
              <!-- 文章标签 -->
              <div class="setting-item">
                <label class="setting-item-title">文章标签
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-button plain size="small">
                  <svg-icon icon-name="icon-add" size="12"></svg-icon>
                  <span class="ml_4">添加文章标签</span>
                </el-button>
              </div>
              <!-- 创作声明 -->
              <div class="setting-item">
                <label class="setting-item-title">创作声明
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-select
                    v-model="article.statement"
                    clearable
                    placeholder="Select"
                    style="width: 240px">
                  <el-option
                      v-for="item in articleSetting.statements"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </div>
              <!-- 分类专栏 -->
              <div class="setting-item">
                <label class="setting-item-title">分类专栏
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-button plain size="small">
                  <svg-icon icon-name="icon-add" size="12"></svg-icon>
                  <span class="ml_4">添加分类标签</span>
                </el-button>
              </div>
              <!-- 文章类型 -->
              <div class="setting-item">
                <label class="setting-item-title">文章类型
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-radio-group v-model="article.type">
                  <el-radio :label="1">原创</el-radio>
                  <el-radio :label="2">转载</el-radio>
                  <el-radio :label="3">翻译</el-radio>
                </el-radio-group>
              </div>
              <!-- 原文链接 -->
              <div class="source-link" v-if="article.type !== 1">
                <input type="text" v-model="article.source" placeholder="请输入原文链接"/>
                <el-checkbox v-if="article.type == 2" v-model="article.isAuthorized" :label="articleSetting.reprinted" size="large" />
                <el-checkbox v-if="article.type == 3" v-model="article.isAuthorized" :label="articleSetting.translation" size="large"/>
              </div>
              <!-- 可见范围 -->
              <div class="setting-item">
                <label class="setting-item-title">可见范围
                  <span class="ml_4">
                    <svg-icon icon-name="icon-tip"></svg-icon>
                  </span>
                </label>
                <el-radio-group v-model="article.range">
                  <el-radio :label="1">全部可见</el-radio>
                  <el-radio :label="2">粉丝可见</el-radio>
                  <el-radio :label="3">仅我可见</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部发布栏 -->
    <div class="toolbar">

    </div>
  </div>
</template>
<script setup lang="ts">
import { AiEditor } from "aieditor";
import "aieditor/dist/style.css";
import {onMounted, ref, onUnmounted, onBeforeUnmount, reactive} from "vue";
import { useRoute } from "vue-router";
import SvgIcon from "@/components/icon/SvgIcon.vue";

const route = useRoute()
const divRef = ref()
const hasUnsavedContent = ref(false)
let aiEditor: AiEditor | null = null
const article = reactive({
  title: '',
  content: '',
  cover: '',
  // 创作声明
  statement: '',
  // 文章类型
  type: 1,
  // 原文链接
  source: '',
  // 是否授权文章（转载或翻译）
  isAuthorized : false,
  // 可见范围(1-全部可见，2-粉丝可见，3-仅我可见)
  range: 1,
})
const articleSetting = {
  reprinted: '原文允许进行转载，或者已经获得原作者的转载授权。',
  translation: '原文允许进行翻译，或者已经获得原作者的翻译授权。',
  statements: [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ],
}
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
.editor {
  background-color: #f3f4f6;
  padding: 0;
  margin: 0;
}

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
    width: 100%;
    max-width: 800px;
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

.setting-item {
  display: flex;
  margin-top: 15px;
}

.setting-item-title {
  min-width: 0;
  color: #373a40;
  margin: 0 3px 0 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  line-height: 38px;
  font-size: 15px;
  font-weight: 500;
  width: 110px;
  padding-left: 10px;
  font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
}

.avatar-uploader {
  margin: 0;
  min-width: 0;
  flex: 1;
  -ms-flex: 1;
  -webkit-flex: 1;
  text-align: left;
}

.avatar-uploader .avatar {
  width: 152px;
  height: 102px;
  display: block;
}

.el-upload__tip {
  margin-top: 0;
}

.ml_4 {
  margin-left: 4px;
}

.source-link {
  text-align: left;
  margin-left: 120px;
  input {
    display: block;
    width: 100%;
    height: 30px;
    outline: none;
    border: 1px solid #dddfe5;
    border-radius: 5px;
    text-indent: 10px;
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 152px;
  height: 102px;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>