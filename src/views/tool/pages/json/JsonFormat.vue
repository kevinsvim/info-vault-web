<template>
  <div class="json-container">
    <div>
      JSON格式化
    </div>
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
            placeholder="Code goes here..."
            :style="{ height: '70vh' }"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="4"
            :extensions="extensions"
        />
      </el-col>
    </el-row>
    <div style="margin-top: 20px">
      <el-row>
        <el-col>
          <el-button type="primary" @click="handleFormatJson">格式化</el-button>
        </el-col>
      </el-row>
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
}

.custom-textarea {
  width: 100%;
  height: calc(70vh + 40px);
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