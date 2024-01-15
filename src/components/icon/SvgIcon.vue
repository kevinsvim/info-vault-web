<template>
  <svg :class="iconStyle" class="svg-icon" aria-hidden="true" :style="{ 'font-size': size + 'px' }">
    <use :xlink:href="iconClassName"/>
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  iconName: {
    type: String,
    required: true
  },
  //图标的font-size，单位是px
  size: {
    type: String,
    default: ''
  },
  iconStyle: {
    type: String,
    default: ''
  }
});
// 图标在 iconfont 中的名字
const iconClassName = computed(()=>{
  return `#${props.iconName}`;
})

</script>
<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
