<template>
  <div class="toolbar-search-container">
    <form>
      <!-- 热度标识 -->
      <span class="icon-fire" style="display: none"></span>
      <input
        class="toolbar-search-input"
        maxlength="2000"
        autocomplete="off"
        type="text"
        :placeholder="placeHolder"
        @focus="clearPlaceholder"
        @blur="showPlaceHolder"
        v-model="searchValue"
      />
      <button class="toolbar-search-button">
        <svg-icon icon-name="icon-search"></svg-icon>
        <span>搜索</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'
import { ref } from 'vue'
// input输入的数据
const searchValue = ref('')
const placeHolder = ref('旅行商问题')
/**
 * 获取焦点清空placeHolder
 */
const clearPlaceholder = () => {
  placeHolder.value = ''
}
/**
 * 失去焦点显示placeholder
 */
const showPlaceHolder = () => {
  placeHolder.value = '旅行商问题'
}
</script>

<style scoped lang="scss">
.toolbar-search-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  line-height: $base-nav-height;
  text-align: center;

  .toolbar-search-input {
    font-size: 0.8rem;
    display: inline-block;
    height: 32px;
    width: calc(100% - 88px);
    outline: 0;
    background: #f5f6f7;
    color: #222226;
    border-radius: 16px 0 0 16px;
    border: 1px solid #e8e8ed;
    border-right: none;
    caret-color: red;
    text-indent: 12px;
  }

  .toolbar-search-button {
    display: inline-block;
    width: 88px;
    height: 32px;
    outline: 0;
    border: 0 none;
    border-radius: 0 16px 16px 0;
    font-size: 14px;
    line-height: 32px;
    cursor: pointer;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
    background-color: #1e80ff;

    svg-icon {
      color: #fff;
    }

    span {
      color: #fff;
    }
  }
}
</style>
