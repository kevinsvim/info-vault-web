<template>
  <div class="home-container">
    <div>
      <WordCaptcha style="margin: auto">

      </WordCaptcha>
    </div>
  </div>
</template>

<script setup lang="ts">
import WordCaptcha from "@/components/canvas/WordCaptcha.vue";
</script>

<style scoped lang="scss">
.home-container {
  margin-top: $base-nav-height;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
