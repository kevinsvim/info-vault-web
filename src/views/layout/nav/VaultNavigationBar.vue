<template>
  <header :class="{ isHide: hideNav }" class="navbar">
    <h1 class="logo"><a href=""><LogoTitle :title="'Vault'"/></a></h1>
    <nav>
      <ul>
        <li><a href="">首页</a></li>
        <li><a href="">文章</a></li>
        <li><a href="">实战项目</a></li>
        <li><a href="">AI导航</a></li>
        <li><a href="">编码工具</a></li>
        <li><a href="">下载</a></li>
        <li>
          <el-input placeholder="搜索"></el-input>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue'
import LogoTitle from "@/components/common/LogoTitle.vue";
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
  hideNav.value = scrollTop > 0 && window.scrollY > 200
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
.navbar nav {
  flex: 9;
}
.logo {
  flex: 1;
  text-align: center;
}
.navbar nav ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.navbar nav ul li a {
  font-size: 0.8rem;
}
</style>
