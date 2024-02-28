<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'

interface IProps {
  // 背景图片/颜色
  background?: string
  // 自定义class
  customClass?: string
  // 图标
  icon?: string
  // 用户昵称
  nickname?: string
  // 话题内容
  topicText?: string
}

const props = withDefaults(defineProps<IProps>(), {
  background: 'skyblue',
  customClass: 'topic-wrap',
  icon: 'icon-logo',
  nickname: '一块等于十分',
  topicText: 'ChatGPT及相关产品的思考与交流，也包括关于LLM模型的想法交流'
})
const { background, customClass, icon, nickname, topicText } = props
</script>

<template>
  <div :class="customClass">
    <div class="topic-group">
      <!-- cover -->
      <slot name="bg" v-if="$slots.bg"></slot>
      <div v-else>
        <span class="logo">
          <img src="@/assets/bg/cover.jpg" alt="" class="topic-cover" />
        </span>
      </div>
      <!-- text -->
      <slot name="text" v-if="$slots.text"></slot>
      <div v-else class="topic-text-wrap">
        <div class="topic-text-title">
          <svg-icon :icon-name="icon" size="30"></svg-icon>
          <div>{{ nickname }}</div>
        </div>
        <div class="topic-text-content">
          {{ topicText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topic-wrap {
  width: 250px;
  height: 223px;
  background: hsla(0, 0%, 100%, 0.18);
  border-radius: 10px;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 0 10px 3px hsla(0, 0%, 100%, 0.16);
  }

  .topic-group {
    border-radius: 10px;
    margin-bottom: 25px;
  }
}

.topic-cover {
  border-radius: 8px 8px 0 0;
  height: 167.28px;
  margin: 0;
  max-width: 250px;
  transition: all 0.3s;
  width: 250px;
}

.logo {
  border-radius: 10px 10px 0 0;
  display: flex;
  height: 125px;
  overflow: hidden;
  width: 255px;
}

.topic-text-wrap {
  display: flex;
  flex-direction: column;
  margin: 8px 10px 15px;
  width: 232px;
  a {
    color: #fff;
    font-size: 14px;
    -webkit-text-decoration: none;
    text-decoration: none;
  }
}

.topic-text-title {
  display: flex;
  align-items: center;
  > div {
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: HarmonyOS_Sans_SC_Medium, sans-serif;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
  }
}
.topic-text-content {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #aaa;
  display: -webkit-box;
  font-size: 12px;
  height: 35px;
  line-height: 1.5;
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>