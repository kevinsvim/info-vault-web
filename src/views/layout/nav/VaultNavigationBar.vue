<template>
  <header :class="{ isHide: hideNav }" class="navbar">
    <nav>
      <!-- 主要功能 -->
      <div>
        <ul>
          <li>
            <a href="">
              <h1 class="logo"><LogoTitle :title="'Vault'" /></h1>
            </a>
          </li>
          <li><a href="">首页</a></li>
          <li><a href="">文章</a></li>
          <li><a href="">实战项目</a></li>
          <li><a href="">AI导航</a></li>
          <li><a href="">编码工具</a></li>
          <li><a href="">下载</a></li>
        </ul>
      </div>
      <!-- 搜索功能 -->
      <div>
        <input class="search">
      </div>
      <!-- 用户相关功能 -->
      <div>
        <ul>
          <li>

          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import LogoTitle from '@/components/common/LogoTitle.vue'
// 是否隐藏导航栏
const hideNav = ref(false)
const oldScrollY = ref(0)
// 滚动条状态(初始处于下降状态)
const scrollDownStatus = ref(true)
// 记录持续移动距离（滚动条一直处于某个状态）
const moveDistance = ref(0)
/**
 * 计算导航栏是否隐藏
 */
const handleScroll = () => {
  // 获取滚动的垂直距离
  const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  let scrollTop = scrollY - oldScrollY.value
  oldScrollY.value = scrollY
  // 如果滚动条处于下降状态，并且下降距离已经累积超过200px，则隐藏导航栏
  if (scrollDownStatus.value && moveDistance.value > 200) {
    hideNav.value = true
  } else if (!scrollDownStatus.value && moveDistance.value > 200) {
    hideNav.value = false
  } else {
    if ((scrollDownStatus.value && scrollTop > 0) || !scrollDownStatus.value && scrollTop < 0) {
      moveDistance.value += Math.abs(scrollTop)
    } else {
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
.navbar {
  display: flex;
  position: fixed;
  top: 0;
  padding: 0 24px;
  align-items: center;
  width: 100%;
  height: 60px;
  opacity: 0.95;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  background: #fff;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      li a {
        color: #86909c;
        padding: 0 1rem;
        font-size: 0.85rem;
        margin: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
.search {

}
.navbar.isHide {
  top: -104px;
}



</style>
