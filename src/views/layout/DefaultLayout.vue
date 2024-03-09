<template>
  <div style="">
    <VaultNavigationBar></VaultNavigationBar>
    <router-view class="content-wrap"></router-view>
    <VaultFooter></VaultFooter>
  </div>
</template>
<script setup lang="ts">

import VaultNavigationBar from "@/views/layout/nav/VaultNavigationBar.vue";
import VaultFooter from "@/views/layout/footer/VaultFooter.vue";
</script>

<style scoped lang="scss">
.content-wrap {
  margin-top: 60px;
}
</style>
