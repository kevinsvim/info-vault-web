<template>
  <div class="search-container" v-click-outside="handleTargetClick">
    <!-- 搜索框 -->
    <form class="nav-searchForm" :class="{ active: isFocus }">
      <div class="nav-search-content" :class="{ focus: isFocus }">
        <input
          class="nav-search-input"
          type="text"
          autocomplete="off"
          accesskey="s"
          maxlength="100"
          v-model="searchContent"
          placeholder="空白的心丶z ·23分钟前更新"
          title="空白的心丶z ·23分钟前更新"
          @click.stop="handleFocus"
          ref="historyRef"
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
        <div class="header">
          <div class="title">搜索历史</div>
          <div class="clear">清空</div>
        </div>
        <!-- 历史记录列表 -->
        <div class="histories-wrap" :style="[{maxHeight: isExpand ? 172 + 'px' : 92 + 'px'}]">
          <div class="histories" ref="historyRef">
            <button-clear
              v-for="i in 15"
              :key="i"
              :search-content="'Gin路由封装呀HelloWorld'"
            ></button-clear>
          </div>
        </div>
        <!-- 展开更多 -->
        <div class="history-fold-wrap" v-if="showMoreBtn">
          <div v-if="!isExpand">
            <div class="fold-text " @click.stop="handExpand">展开更多<svg-icon icon-name="icon-arrow-d" icon-style="arrow-d" size="12"></svg-icon></div>
          </div>
          <div v-else>
            <div class="fold-text" @click.stop="handFold">收起<svg-icon icon-name="icon-arrow-u" icon-style="arrow-u" size="12"></svg-icon></div>
          </div>
        </div>
      </div>
      <!--热搜榜-->
      <div>
        热搜榜
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import SvgIcon from '@/components/icon/SvgIcon.vue'
import ButtonClear from '@/components/nav/ButtonClear.vue'
// 是否聚焦
const isFocus = ref<boolean>(false)
// 是否显示清除按钮
const hasClean = ref<boolean>(false)
// 搜索内容
const searchContent = ref<string>('')
// 历史记录ref
const historyRef = ref<any>()
// 是否显示展开更多按钮
const showMoreBtn = ref<boolean>(false)
// 是否处理展开状态
const isExpand = ref<boolean>(false)
const handleFocus = () => {
  isFocus.value = true
}

/**
 * 监听搜索内容变化
 */
watch(searchContent, (val) => {
  hasClean.value = val != ''
})


/**
 * 点击搜索框与搜索面板之外的目标区域触发该事件
 */
const handleTargetClick = () => {
  // 一旦isFocus为false，则搜索面板就会关闭
  isFocus.value = false
}
/**
 * 清空搜索内容
 */
const handleClear = () => {
  searchContent.value = ''
}

watch(isFocus, (val) => {
  if (val) {
    nextTick(() => {
      console.log(historyRef.value.clientHeight)
      console.log('选中焦点')
      historyRef.value.clientHeight > 80 ? (showMoreBtn.value = true) : (showMoreBtn.value = false)
    })
  } else {
    console.log('取消焦点')
  }
})
/**
 * 点击展开更多
 */
const handExpand = () => {
  isExpand.value = true
}
/**
 * 收起
 */
const handFold = () => {
  isExpand.value = false
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
    border: 1px solid #e3e5e7;
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
      transition: background-color 0.3s;
    }
    .nav-search-btn:hover {
      background-color: #e3e5e7;
    }
  }

  .active {
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
    background: #ffffff;
    border: 1px solid #e3e5e7;
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 13px 0 16px;
    -webkit-font-smoothing: antialiased;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;

      .title {
        height: 24px;
        font-size: 16px;
        line-height: 24px;
      }

      .clear {
        font-size: 12px;
        line-height: 15px;
        height: 15px;
        color: #9499a0;
        cursor: pointer;
      }
      .clear:hover {
        color: #3cc1f0;
      }
    }

    .histories-wrap {
      padding: 0 16px;
      overflow: hidden;

      .histories {
        display: flex;
        flex-wrap: wrap;
        margin-top: 12px;
        margin-right: -10px;
        margin-bottom: 4px;
      }
    }

    .history-fold-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      margin: 0 auto 14px;

      .fold-text {
        font-size: 12px;
        line-height: 15px;
        margin-right: 1px;
        height: 15px;
        color: #9499A0;
        cursor: pointer;
      }

      .arrow-d {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: #9499A0;
        overflow: hidden;
      }

      .arrow-u {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: #9499A0;
        overflow: hidden;
      }
    }
    .history-fold-wrap:hover {
      .fold-text {
        color: #3cc1f0;
      }
      .arrow-d {
        fill: #3cc1f0;
      }
      .arrow-u {
        fill: #3cc1f0;
      }
    }
  }
}
</style>
