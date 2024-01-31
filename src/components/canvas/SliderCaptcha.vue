<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getRandomNumberByRange } from '@/utils/tool'

interface SliderType {
  spliced: boolean
  verified: boolean
  // 滑块移动位置
  left: number
  // 滑块的目标位置
  destX: number
}
interface IProps {
  width?: number
  visible?: boolean
  height?: number
  refreshIcon?: string
  l?: number
  t?: number
  imageUrl?: string
  text?: string
  /**
   * 拖拽滑块时的回调
   * @param l 拖拽的距离
   */
  onDraw?: (l: number) => {}
  /**
   * 自定义验证逻辑
   * @param arg 配置参数
   */
  onCustomVertify?: (arg: SliderType) => {}
  /**
   * 重置刷新前的回调
   * @param arg 配置参数
   */
  onBeforeVertify?: (arg: SliderType) => {}
  /**
   * 验证成功的回调
   */
  onSuccess?: VoidFunction
  /**
   * 验证失败的回调
   */
  onFail?: VoidFunction
  /**
   * 刷新时的回调
   */
  onRefresh?: VoidFunction
}
// 定义默认值
const props = withdefaults(defineProps<IProps>(), {
  width: 320,
  visible: true,
  height: 40,
  refreshIcon: 'http://cdn.dooring.cn/dr/icon12.png',
  l: 42,
  r: 9,
  imgUrl: '',
  text: ''
})
const {
  text,
  l,
  r,
  imgUrl,
  width,
  height,
  visible,
  onBeforeRefresh,
  onRefresh,
  onFail,
  onSuccess,
  onCustomVertify,
  onDraw
} = props

</script>

<template>
  <div
    className="vertifyWrap"
    :style="{
      width: width + 'px',
      margin: '0 auto',
      display: visible ? '' : 'none'
    }"
    @mousemove="handleDragMove"
    @mouseup="handleDragEnd"
    @touchmove="handleDragMove"
    @touchend="handleDragEnd"
  >
    <div className="canvasArea">
      <canvas ref="canvasRef" :width="width" :height="height"></canvas>
      <canvas
        ref="blockRef"
        className="block"
        :width="width"
        :height="height"
        @mousedown="handleDragStart"
        @touchstart="handleDragStart"
      ></canvas>
    </div>
    <div
      :className="sliderClass"
      :style="{
        pointerEvents: isLoading ? 'none' : 'auto',
        width: width + 'px'
      }"
    >
      <div className="sliderMask" :style="{ width: sliderLeft + 'px' }">
        <div
          className="slider"
          :style="{ left: sliderLeft + 'px' }"
          @mousedown="handleDragStart"
          @touchstart="handleDragStart"
        >
          <div className="sliderIcon">&rarr;</div>
        </div>
      </div>
      <div className="sliderText">{{ textTip }}</div>
    </div>
    <div
      className="refreshIcon"
      @click="handleRefresh"
      :style="{ backgroundImage: `url(${refreshIcon})` }"
    ></div>
    <div
      className="loadingContainer"
      :style="{
        width: width + 'px',
        height: height + 'px',
        display: isLoading ? '' : 'none'
      }"
    >
      <div className="loadingIcon"></div>
      <span>加载中...</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.vertifyWrap {
  position: relative;

  .block {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    cursor: grab;
  }

  .block:active {
    cursor: grabbing;
  }

  .sliderContainer {
    position: relative;
    text-align: center;
    width: 310px;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    background: #f7f9fa;
    color: #45494c;
    border: 1px solid #e4e7eb;
  }

  .sliderContainer_active .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #486cd6;
  }

  .sliderContainer_active .sliderMask {
    height: 38px;
    border-width: 1px;
  }

  .sliderContainer_success .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #0db87f;
    background-color: #0ca14a !important;
  }

  .sliderContainer_success .sliderMask {
    height: 38px;
    border: 1px solid #0db87f;
    background-color: #d2f4ef;
  }

  .sliderContainer_success .sliderIcon {
    background-position: 0 -26px !important;
  }

  .sliderContainer_fail .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #f57a7a;
    background-color: #f57a7a !important;
  }

  .sliderContainer_fail .sliderMask {
    height: 38px;
    border: 1px solid #f57a7a;
    background-color: #fce1e1;
  }

  .sliderContainer_fail .sliderIcon {
    top: 14px;
    background-position: 0 -82px !important;
  }

  .sliderContainer_active .sliderText,
  .sliderContainer_success .sliderText,
  .sliderContainer_fail .sliderText {
    display: none;
  }

  .sliderMask {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    border: 0 solid #486cd6;
    background: #d1e9fe;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    transition: background 0.2s linear;
    cursor: pointer;
    cursor: grab;
  }

  .slider:active {
    cursor: grabbing;
  }

  .slider:hover {
    background: #486cd6;
  }

  .sliderIcon {
    font-size: 18px;
    color: #000;
  }

  .slider:hover .sliderIcon {
    color: #fff;
  }

  .refreshIcon {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-size: 32px;
  }

  .loadingContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 310px;
    height: 155px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #45494c;
    z-index: 2;
    background: #edf0f2;
  }

  .loadingIcon {
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
    background: url(http://cdn.dooring.cn/dr/icon12.png);
    background-size: 32px;
    animation: loading-icon-rotate 0.8s linear infinite;
  }

  @keyframes loading-icon-rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>