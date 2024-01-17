<template>
  <div class="search-container" v-click-outside="handleTargetClick">
    <!-- 搜索框 -->
    <form class="nav-searchForm" :class="{actived: isFocus}">
      <div class="nav-search-content" :class="{focus: isFocus}">
        <input
          class="nav-search-input"
          type="text"
          autocomplete="off"
          accesskey="s"
          maxlength="100"
          v-model="searchContent"
          placeholder="空白的心丶z ·23分钟前更新"
          title="空白的心丶z ·23分钟前更新"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- 清除图标 -->
        <div v-show="hasClean" class="clear_content" @click="handleClear">
          <svg-icon icon-name="icon-close1" icon-style="close-icon" size="15"></svg-icon>
        </div>
      </div>
      <!-- 搜索图标 -->
      <div class="nav-search-btn">
        <svg-icon icon-name="icon-search" size="19"></svg-icon>
      </div>
    </form>
    <!-- 搜索面板列表 -->
    <div v-show="isFocus" class="search-panel">
      <!--历史记录-->
      <div>
        历史记录
      </div>
      <!--热搜榜-->
      <div>
        热搜榜
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from "element-plus";
import {ref, watch} from "vue";
import SvgIcon from "@/components/icon/SvgIcon.vue";
// 是否聚焦
const isFocus = ref(false)
// 是否显示清除按钮
const hasClean = ref(false)
// 搜索内容
const searchContent = ref('')

const handleFocus = (e:Event) => {
  isFocus.value = true;
  console.log(e)
  console.log('相关元素:', e.relatedTarget);
}
const handleBlur = (event: Event) => {
  console.log('输入框失去焦点');
  console.log('相关元素:', event.relatedTarget);
}
/**
 * 监听搜索内容变化
 */
watch(searchContent, (val) => {
  if (val != '') {
    hasClean.value = true
  } else {
    hasClean.value = false
  }
})

/**
 * 点击搜索框与搜索面板之外的目标区域触发该事件
 */
const handleTargetClick = () => {
  // 一旦isFocus为false，则搜索面板就会关闭
  console.log("触发事件")
  isFocus.value = false
}
/**
 * 清空搜索内容
 */
const handleClear = () => {
  searchContent.value = ''
}
</script>

<style scoped lang="scss">
.search-container {
  position: relative;
  margin: 0 auto;
  min-width: 181px;
  max-width: 500px;

  .nav-searchForm {
    display: flex;
    align-items: center;
    padding: 0 48px 0 4px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    line-height: 38px;
    border: 1px solid #E3E5E7;
    height: 40px;
    width: 500px;
    background-color: #fff;
    opacity: 0.9;
    transition: background-color 0.3s;
    border-radius: 8px;

    .nav-search-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      padding: 0 8px;
      width: 100%;
      height: 32px;
      border: 2px solid transparent;
      border-radius: 6px;


      .nav-search-input {
        flex: 1;
        overflow: hidden;
        padding-right: 8px;
        border: none;
        background-color: transparent;
        box-shadow: none;
        color: #18191c;
        font-size: 14px;
        line-height: 20px;
        outline: none;
      }

      .nav-search-clean {
        width: 16px;
        height: 16px;
        right: 10px;
        cursor: pointer;
      }

      .clear_content {
        display: flex;
        align-items: center;
      }
    }

    .focus {
      background-color: #e3e5e7;
    }

    .nav-search-btn {
      position: absolute;
      top: 3.5px;
      right: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 6px;
      line-height: 32px;
      cursor: pointer;
      transition: background-color .3s;
    }
    .nav-search-btn:hover {
      background-color: #e3e5e7;
    }
  }

  .actived {
    border-radius: 8px 8px 0 0;
    border-bottom: none;
  }

  .close-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: #c9ccd0;
    overflow: hidden;
  }

  .close-icon:hover {
    fill: #61666d;
  }

  .search-panel {
    position: absolute;
    width: 100%;
    max-height: 612px;
    overflow-y: auto;
    background: #FFFFFF;
    border: 1px solid #E3E5E7;
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 13px 0 16px;
    -webkit-font-smoothing: antialiased;
  }
}

</style>
