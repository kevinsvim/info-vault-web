<template>
  <div>
    <el-switch v-model="isDark" @click="toggleTheme($event)" id="btn">
      <template #active-action>
        <span class="custom-active-action">
          <svg-icon icon-name="icon-moon"></svg-icon>
        </span>
      </template>
      <template #inactive-action>
        <span class="custom-inactive-action">
          <svg-icon icon-name="icon-sun"></svg-icon>
        </span>
      </template>
    </el-switch>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'
import {ref, watch} from 'vue'

// 是否开启暗黑主题
const isDark = ref(false)
/**
 * 切换主题时触发
 */
const toggleTheme = (event: PointerEvent) => {
  console.log(event)
  // 获取定位坐标
  document.documentElement.style.setProperty('--x', event.clientX + 'px')
  document.documentElement.style.setProperty('--y', event.clientY + 'px')
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
    });
  } else {
    document.documentElement.classList.toggle('dark')
  }
  // 以该（X, Y）为圆点向外扩散和向内收缩

}

</script>
<style lang="scss">
::view-transition-old(*) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(*) {
  mix-blend-mode: normal;
  animation: clip 1s ease-in;
}
@keyframes clip {
  from {
    clip-path: circle(0% at var(--x) var(--y));
  }
  to {
    clip-path: circle(100% at var(--x) var(--y));
  }
}
.dark{
  background-color: #111 !important;
  color-scheme: dark !important;
}
</style>
