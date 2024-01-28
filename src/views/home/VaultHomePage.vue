<template>
  <div class="home-container">
    <div v-for="i in 200">
      {{i}}12-22--2-2-2-3-2-3-2332-2-32-3-2-3-2-3-23-2
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import "@/styles/theme/handle";
.home-container {
  margin-top: $base-nav-height;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
