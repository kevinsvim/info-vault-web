<template>
  <header :class="{ isHide: hideNav }" class="navbar">
    <h1 class="logo"><a href="">Vault</a></h1>
    <nav>
      <ul>
        <li><a href=""></a>Home</li>
        <li><a href=""></a>About</li>
        <li><a href=""></a>CSS</li>
        <li><a href=""></a>Vault</li>
        <li><a href=""></a>AIGC</li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
// 是否隐藏导航栏
const hideNav = ref(false)
const oldScrollY = ref(0)

/**
 * 计算导航栏是否隐藏
 */
const handleScroll = () => {
  // 获取滚动的垂直距离
  const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  let scrollTop = scrollY - oldScrollY.value
  oldScrollY.value = scrollY
  hideNav.value = scrollTop > 0 && window.scrollY > window.innerHeight
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
  align-items: center;
  position: fixed;
  top: 0;
  opacity: 0.95;
  width: 100%;
  height: 60px;
  padding: 0 10%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.navbar.isHide {
  top: -104px;
}
.logo {
  flex: 10%;

  a {
    color: #409eff;
  }
}

header ul {
  flex: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
