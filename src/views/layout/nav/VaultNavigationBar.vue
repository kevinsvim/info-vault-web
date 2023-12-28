<template>
  <header :class="{ isHide: hideNav }" class="navbar">
    <!-- logo -->
    <a href="">
      <h1 class="logo">
        <LogoTitle :title="'Vault'" />
      </h1>
    </a>
    <!-- nav -->
    <nav class="main-nav">
      <ul class="nav-list">
        <!-- 左侧功能 -->
        <li class="left-side-nav">
          <ul class="main-nav-left-list">
            <li><a class="nav-font" href="">首页</a></li>
            <li><a class="nav-font" href="">文章</a></li>
            <li><a class="nav-font" href="">实战项目</a></li>
            <li><a class="nav-font" href="">AI导航</a></li>
            <li><a class="nav-font" href="">编码工具</a></li>
            <li><a class="nav-font" href="">下载</a></li>
          </ul>
        </li>
        <!-- 中间搜索 -->
        <li class="mid-search-nav">
          <div class="toolbar-search-input">
            <SearchBox />
          </div>
        </li>
        <!-- 右侧功能 -->
        <li class="right-side-nav">
          <ul class="main-nav-right-list">
            <!-- 登录注册 -->
            <li>
              <div class="sign-btn">
                <span>登录</span>
              </div>
            </li>
            <!-- 历史 -->
            <li class="right-nav-mix">
              <svg-icon icon-name="icon-record" size="18"></svg-icon>
              <a class="nav-font" href="">历史</a>
            </li>
            <!-- 收藏 -->
            <li class="right-nav-mix">
              <svg-icon icon-name="icon-collect" size="18" style="vertical-align: top"></svg-icon>
              <a class="nav-font" href="">收藏</a>
            </li>
            <!-- 消息 -->
            <li class="right-nav-mix">
              <svg-icon icon-name="icon-message" size="18"></svg-icon>
              <a class="nav-font" href="">消息</a>
            </li>
            <!-- 主题切换 -->
            <li>
              <ThemeToggle />
            </li>
            <!-- 创作中心 -->
            <li>
              <el-button type="primary" class="create-button" color="#1e80ff">创作中心</el-button>
              <el-button
                type="primary"
                size="small"
                class="select-button"
                color="#1e80ff"
                @mouseenter="showDownIcon = false"
                @mouseleave="showDownIcon = true"
              >
                <svg-icon v-if="showDownIcon" icon-name="icon-arrow-down"></svg-icon>
                <svg-icon v-else icon-name="icon-arrow-up"></svg-icon>
              </el-button>
              <!-- 当鼠标移入的时候 TODO -->
              <div v-if="!showDownIcon" class="more-list"></div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import LogoTitle from '@/components/common/LogoTitle.vue'
import SearchBox from '@/components/common/SearchBox.vue'
import SvgIcon from '@/components/icon/SvgIcon.vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
// 是否隐藏导航栏
const hideNav = ref(false)
const oldScrollY = ref(0)
// 滚动条状态(初始处于下降状态)
const scrollDownStatus = ref(true)
// 记录持续移动距离（滚动条一直处于某个状态）
const moveDistance = ref(0)
// 是否显示下降图标
const showDownIcon = ref(true)

/**
 * 计算导航栏是否隐藏
 */
const handleScroll = () => {
  // 获取滚动的垂直距离
  const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  let scrollTop = scrollY - oldScrollY.value
  oldScrollY.value = scrollY
  // 如果滚动条处于下降状态，并且下降距离已经累积超过200px，则隐藏导航栏
  if (scrollDownStatus.value && scrollTop > 0 && moveDistance.value > 400) {
    hideNav.value = true
    // 如果滚动条处于上升状态，并且持续上升超过200px，则显示导航栏
  } else if (!scrollDownStatus.value && scrollTop < 0 && moveDistance.value > 400) {
    hideNav.value = false
  } else {
    // 否者如果滚动条会改变方向，则进行距离累加处理
    if ((scrollDownStatus.value && scrollTop > 0) || (!scrollDownStatus.value && scrollTop < 0)) {
      moveDistance.value += Math.abs(scrollTop)
    } else {
      // 一旦滚动条方向发生改变，则重置初始值
      scrollDownStatus.value = !scrollDownStatus.value
      moveDistance.value = 0
    }
  }
}
/**
 * 监听滚动条的移动
 */
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
/**
 * 销毁监听器
 */
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
@import '@/styles/themes/_handle.scss';

.navbar {
  display: flex;
  position: fixed;
  top: 0;
  padding: 0 24px;
  align-items: center;
  width: 100%;
  height: $base-nav-height;
  color: #222226;
  @include background("base-nav-background");
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: top 0.2s ease-in-out;
  z-index: 100;

  .logo {
    margin-right: 1rem;
    display: inline-block;
    width: auto;
  }

  .main-nav {
    height: 100%;
    flex: 1 0 auto;
    line-height: normal;
  }
}

.nav-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
  width: 100%;
  margin: 0;

  .left-side-nav {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;

    .main-nav-left-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }
  }

  .mid-search-nav {
    flex: 1;
    height: 100%;

    .toolbar-search-input {
      width: 100%;
      height: 100%;
    }
  }

  .right-side-nav {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    .main-nav-right-list {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-around;
      align-items: center;

      .create-button {
        width: 94px;
        height: 36px;
        margin: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .select-button {
        width: 10px;
        height: 36px;
        margin: 0;
        border-left: 1px solid hsla(0, 0%, 100%, 0.1);
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .more-list {
        position: absolute;
        top: 47px;
        right: 0;
        width: 402px;
        max-height: 344px;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #e4e6eb;
        box-shadow: 0 0 24px rgba(81, 87, 103, 0.16);
        border-radius: 4px;
        z-index: 10;
      }

      .sign-btn {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: #00aeec;
        text-align: center;
        cursor: pointer;

        span {
          color: #fff;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 40px;
        }
      }
    }
  }
}

.nav-font {
  padding: 0 1rem;
  font-size: 0.9rem;
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: inherit;
}

.right-nav-mix {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.navbar.isHide {
  top: -$base-nav-height;
}
</style>
