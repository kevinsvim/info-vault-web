<template>
  <div>
    <VaultNavigationBar></VaultNavigationBar>
    <router-view></router-view>
    <VaultFooter></VaultFooter>
  </div>
</template>
<script setup lang="ts">

import VaultNavigationBar from "@/views/layout/nav/VaultNavigationBar.vue";
import VaultFooter from "@/views/layout/footer/VaultFooter.vue";
</script>

<style scoped>

</style>