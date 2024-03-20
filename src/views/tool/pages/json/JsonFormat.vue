<template>
  <div class="json-container">
    <h1 style="font-family: YShayuTi, HarmonyOS_Sans_SC_Medium, 'PingFang_Bold SC', 'Microsoft YaHei', sans-serif">
      <svg-icon icon-name="icon-tool"></svg-icon>
      JSON 在线解析
    </h1>
    <el-row :gutter="20">
      <el-col :span="9">
         <textarea
             v-model="code"
             class="custom-textarea"
             placeholder="请输入json数据"
         ></textarea>
      </el-col>
      <el-col :span="15">
        <codemirror
            v-model="formatCode"
            placeholder="解析结果在这边哦..."
            :style="{ height: '70vh', border: '1px solid #ccc', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            :extensions="extensions"
        />
      </el-col>
    </el-row>
    <div class="func-btn">
      <div class="func-btn-l">
        <div>
          <el-button type="success" @click="handleFormatJson" plain size="large">格式化</el-button>
        </div>
        <div class="ml_10">
          <el-button type="success" @click="handleJsonVerify" plain size="large">验证</el-button>
        </div>
        <div class="ml_10">
          <el-button type="success" @click="handleEscapeJson" plain size="large">转义</el-button>
        </div>
        <div class="ml_10">
          <el-button type="success" @click="handleZipJson" plain size="large">压缩</el-button>
        </div>
        <div class="ml_10">
          <el-button type="success" @click="handleZipAndEscapeJson" plain size="large">压缩转义</el-button>
        </div>
      </div>
      <div class="func-btn-r">
        <div class="ml_10">
          <el-button type="success" @click="handleCopyJson" plain size="large">复制结果</el-button>
        </div>
      </div>


    </div>
  </div>
</template>
<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { ref } from 'vue'
import { copyClipboard, escapeJson } from "@/utils/tool";
import { openF, openS } from "@/utils/tip";

const code = ref(`{ "name": "zsh", "age": 20}`)
const formatCode = ref('')
const extensions = [json()]
/**
 * Json格式化
 */
const handleFormatJson = () => {
  formatCode.value = JSON.stringify(JSON.parse(code.value), null, 2)
}

/**
 * Json验证
 */
const handleJsonVerify = () => {
  if (code.value !== '') {
    try {
      JSON.stringify(JSON.parse(code.value))
      openS("这是一个正确的JSON格式！")
    } catch (e: Error | any) {
      formatCode.value = e.message
      openF(e.message)
    }
  }

}

/**
 * Json复制
 */
const handleCopyJson = () => {
  if (formatCode.value !== '') {
    copyClipboard(formatCode.value)
  }
}

/**
 * 压缩json
 */
const handleZipJson = () => {
  if (code.value !== '') {
    formatCode.value = JSON.stringify(JSON.parse(code.value), null, 0)
  }
}

/**
 * json转义
 */
const handleEscapeJson = () => {
  if (code.value !== '') {
    formatCode.value = escapeJson(code.value)
  }
}

/**
 * 压缩+转义
 */
const handleZipAndEscapeJson = () => {
  if (code.value !== '') {
    let tc = JSON.stringify(JSON.parse(code.value), null, 0)
    formatCode.value = escapeJson(tc)
  }
}
</script>

<style scoped lang="scss">
.json-container {
  margin: 40px;
  padding: 20px;
  border: 1px solid #ccc;
}

.custom-textarea {
  width: 100%;
  height: 70vh;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.5;
  resize: vertical;
}

.custom-textarea::placeholder {
  color: #999;
}

.custom-textarea:focus {
  outline: none;
  border-color: #85b7d9;
  box-shadow: 0 0 0 2px rgba(133, 183, 217, 0.2);
}

.func-btn {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  &-l {
    display: flex;
  }
  &-r {
    display: flex;
  }
}

</style>
<style>
.ͼ1.cm-focused {
  outline: 1px solid #7ec050;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-color: #7ec050;
  box-shadow: 0 0 0 2px rgba(133, 183, 217, 0.2);

}
</style>
