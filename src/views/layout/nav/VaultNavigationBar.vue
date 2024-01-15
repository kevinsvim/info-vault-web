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
              <div>
                <el-popover :width="359">
                  <template #reference>
                    <el-avatar class="vault-sign" :size="38">
                      <span>登录</span>
                    </el-avatar>
                  </template>
                  <template #default>
                    <div class="login-panel-popover">
                      <div>
                        <span style=" font-family: HarmonyOS_Sans_SC_Medium;">登录后你可以：</span>
                      </div>
                      <div class="login-panel-container">
                        <div class="login-panel-item">
                          <svg-icon icon-name="icon-idea" size="19"></svg-icon>
                          <span>不容错过的技术见解</span>
                        </div>
                        <div class="login-panel-item">
                          <svg-icon icon-name="icon-publish" size="19"></svg-icon>
                          <span>发表文章/资源</span>
                        </div>
                        <div class="login-panel-item">
                          <svg-icon icon-name="icon-resource" size="17"></svg-icon>
                          <span>免费获取高品质资源</span>
                        </div>
                        <div class="login-panel-item">
                          <svg-icon icon-name="icon-tool" size="19"></svg-icon>
                          <span>使用便捷的在线工具</span>
                        </div>
                      </div>
                      <div class="login-panel-btn">
                        <el-button type="primary" class="soon-login" color="#00b5e5">立即登录</el-button>
                      </div>
                      <div class="to-signup">
                        <span>首次使用？</span>
                        <span style="color: #00b5e5; cursor:pointer;">点我注册</span>
                      </div>
                    </div>
                  </template>
                </el-popover>
              </div>
            </li>
            <!-- 消息 -->
            <li class="right-nav-mix">
              <el-badge :value="8" :max="99" class="item">
                <div class="vault-message">
                  <svg-icon icon-name="icon-light-message" size="20"></svg-icon>
                </div>
              </el-badge>
              <span>消息</span>
            </li>
            <!-- 创作中心 -->
            <li>
              <el-button type="primary" class="create-button" color="#00aeec"><span style="color: #fff">创作中心</span></el-button>
              <el-button
                type="primary"
                size="small"
                class="select-button"
                color="#00aeec"
                @mouseenter="showDownIcon = false"
                @mouseleave="showDownIcon = true"
              >
                <svg-icon v-if="showDownIcon" icon-name="icon-arrow-down"></svg-icon>
                <svg-icon v-else icon-name="icon-arrow-up"></svg-icon>
              </el-button>
              <!-- 当鼠标移入的时候 TODO -->
              <div v-if="!showDownIcon" class="more-list"></div>
            </li>
            <!-- 主题切换 -->
            <li>
              <ThemeToggle />
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
@import '@/styles/theme/handle';

.navbar {
  display: flex;
  position: fixed;
  top: 0;
  padding: 0 24px;
  align-items: center;
  width: 100%;
  height: $base-nav-height;
  color: #222226;
  @include background_color('nav-bg-color');
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);

  transition: top 0.2s ease-in-out;
  z-index: 1000;

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
    }
  }
}

.nav-font {
  padding: 0 1rem;
  font-size: 0.9rem;
  @include font_color('nav-font-color');
  margin: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.nav-font:hover,
.vault-message:hover {
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.right-nav-mix {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  span {
    cursor: pointer;
    @include font_color('nav-font-color');
  }
}

.navbar.isHide {
  top: -$base-nav-height;
}
.vault-sign {
  cursor: pointer;
  background-color: #00aeec;
  span {
    font-size: 0.9rem;
    font-weight: 600;
  }
}
.login-panel-popover {
  padding: 12px 10px;
  border-radius: 8px;
  text-align: left;

  .login-panel-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-top: 5px;

    .login-panel-item {
      display: flex;
      align-items: center;
      margin-top: 10px;

      span {
        margin-left: 5px;
        color: #141414;
      }
    }

  }
  .login-panel-btn {
    margin: 15px 0;
    text-align: center;

    .soon-login {
      width: 312px;
      height: 40px;
      border-radius: 10px;
      color: #fff;
    }
  }
  .to-signup {
    text-align: center;
  }
}
</style>
