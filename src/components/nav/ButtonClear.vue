<template>
  <div class="history-item" @mouseenter="isHover = true; spanColor = '#00aeec'" @mouseleave="isHover = false; spanColor = ''">
    <div class="history-text" :style="{ color: spanColor }">{{ searchContent }}</div>
    <div v-show="isHover" class="close">
      <svg-icon icon-name="icon-close"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/icon/SvgIcon.vue";
import {ref} from "vue";
const { searchContent } = defineProps<{
  searchContent?: string
}>()

const isHover = ref()
const spanColor = ref()
</script>

<style scoped lang="scss">
.history-item {
  position: relative;
  box-sizing: border-box;
  height: 30px;
  padding: 7px 10px 8px;
  font-size: 12px;
  line-height: 15px;
  background: #F6F7F8;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  .history-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 96px;
  }

  .close {
    box-sizing: border-box;
    position: absolute;
    width: 16px;
    height: 16px;
    top: -6px;
    right: -6px;
    padding: 2px;
  }
}
</style>
