<template>
  <div>
    <el-switch v-model="isDark" @click="toggleTheme" id="btn">
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
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = (ev: PointerEvent) => {
  // 获取圆心位置
  document.documentElement.style.setProperty('--x', ev.clientX + 'px')
  document.documentElement.style.setProperty('--y', ev.clientY + 'px')
  // 处理兼容性
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
    })
  } else {
    document.documentElement.classList.toggle('dark')
  }
}
</script>
<style lang="scss">
.dark {
  background-color: #111;
  color-scheme: dark;
}

html{
  background-color: #fff;
}
#btn{
  padding: 5px 16px;
  background-color: transparent;
  border-radius: 8px;
  line-height: 1.4;
  box-shadow: 0 2px #00000004;
  cursor: pointer;
  transition: .3s;
  transform: scale(1);
  border-color: transparent;
  background-color: royalblue;
  color: #fff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px #0000000b;
}
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
  to{
    clip-path: circle(100% at var(--x) var(--y));
  }
}
</style>
