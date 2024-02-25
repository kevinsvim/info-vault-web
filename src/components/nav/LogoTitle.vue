<template>
  <div>
    <span style="font-family: HarmonyOS_Sans_SC_Regular, sans-serif" v-for="(ch, index) in charArray" :key="index" :style="{ color: colors[index % colors.length] }">{{
      ch
    }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  fontSize?: number
}>()
const colors = [
  '#409eff',
  '#67c23a',
  '#e6a23c',
  '#9966ff',
  '#666633',
  '#66ff99',
  '#f56c6c',
  '#ff6699',
  '#0033cc',
  '#3333cc',
  '#ccccff',
  '#9966ff'
]
const charArray = props.title?.split('') || []
</script>

<style scoped></style>
