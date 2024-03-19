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
    <div style="margin-top: 20px; display: flex;">
      <div>
        <el-button type="primary" @click="handleFormatJson">格式化</el-button>
      </div>
      <div class="ml_4">
        <el-button type="primary">验证</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
// 引入css文件
import { ref } from 'vue'
const code = ref(`{"name": "那年夏天", "age": 25, "city": "Hang Zhou"}`)
const extensions = [json()]
const formatCode = ref()
const handleFormatJson = () => {
  formatCode.value = JSON.stringify(JSON.parse(code.value), null, 2)
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

</style>
<style>
.ͼ1.cm-focused {
  outline: 1px solid #85b7d9;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-color: #85b7d9;
  box-shadow: 0 0 0 2px rgba(133, 183, 217, 0.2);

}
</style>
