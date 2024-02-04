<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import SvgIcon from "@/components/icon/SvgIcon.vue";

type Pointer = {
  x: number;
  y: number;
}
type CaptchaType = {
  bgImg: any;
  ctx: any;
  fontArr: any[];
  tips: any[];
  pointer: Pointer[];
  state: string;
  timeIns: number;
}
interface IProps {
  width?: number;
  height?: number;
  // 文字集
  fontStr?: string;
  // 显示字数
  fontNum?: number;
  // 点击验证数
  checkNum?: number;
  // 精度
  accuracy?: number;
  // 背景集合
  bgList?: string[];
}
const props = withDefaults(defineProps<IProps>(), {
  width: 320,
  height: 160,
  fontStr: '赵钱孙李周吴郑王朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭',
  fontNum: 5,
  checkNum: 3,
  accuracy: 15,
  bgList: function () {
    return [
      'https://th.bing.com/th/id/R.9c71046c87f2ff80e420620c187f3a20?rik=Ma8irdWBpLQMGA&pid=ImgRaw&r=0',
      'https://th.bing.com/th/id/R.b16b9b116836d478e3640622b9aba8c3?rik=89bQlvm6B8zQ2g&pid=ImgRaw&r=0',
    ]
  }
});
const captcha: CaptchaType = reactive({
  bgImg: null,
  ctx: null,
  fontArr: [],
  tips: [],
  pointer: [],
  state: '',
  timeIns: -1,
});
const canvasRef = ref();
onMounted(() => {
  init();
})
onBeforeUnmount(() => {
  if (captcha.timeIns != -1) {
    clearTimeout(captcha.timeIns)
  }
})
const init = () => {
  captcha.ctx = canvasRef.value.getContext('2d');
  getCaptcha()
}
/**
 * 加载图片
 */
const getCaptcha = () => {
  const img = document.createElement('img');
  const imagesLen = props.bgList.length;
  const randomIndex = Math.floor(Math.random() * imagesLen);
  img.crossOrigin = "Anonymous";
  img.src = props.bgList[randomIndex]
  captcha.bgImg = img;
  img.onload = () => {
    console.log('图片加载完成');
    draw();
  }
  console.log('背景图：', captcha.bgImg)
}
/**
 * 画图
 */
const draw = () => {
  // 绘制背景图
  captcha.ctx.drawImage(captcha.bgImg, 0, 0, props.width, props.height);
  // 遍历文字显示的数量
  for (let i = 0; i < props.fontNum; i++) {
    // 随机获取文字
    const word = getRandomCharacter();
    console.log('word:', word);
    const fontSize = randomNum(20, props.height / 4);
    const fontWeight = Math.random() > 0.5 ? 'bold' : 'normal';
    const fontStyle = Math.random() > 0.5 ? 'italic' : 'normal';
    const fontFamily = Math.random() > 0.5 ? 'HarmonyOS_Sans_SC_Regular' : 'sans-serif';
    const x = props.width / props.fontNum * i + 10;
    const y = Math.random() * (props.height - fontSize);

    captcha.ctx.fillStyle = randomColor(0, 255);
    captcha.ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    captcha.ctx.textBaseline = 'top';
    captcha.ctx.fillText(word, x, y);

    captcha.fontArr.push({word, x, y})
    console.log(captcha.fontArr)
  }
  for (let i = 0; i < props.checkNum; i++) {
    const randomIndex = Math.floor(Math.random() * captcha.fontArr.length);
    const character = captcha.fontArr.splice(randomIndex, 1)[0];
    captcha.tips.push(character)
  }
  console.log('选中的词:', captcha.tips);
}
/**
 * 随机获取文字
 */
const getRandomCharacter = () => {
  const wordLen = props.fontStr.length;
  const randomIndex = Math.floor(Math.random() * wordLen);
  return props.fontStr.charAt(randomIndex);
}
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
}
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
const createPointer = (e: any) => {
  const x = e.offsetX - 15;
  const y = e.offsetY - 15;
  if (captcha.pointer.length < captcha.tips.length) {
    captcha.pointer.push({x, y})
    captcha.state = 'active';
    if (captcha.pointer.length === captcha.tips.length) {
      const isPass = verify();
      if (isPass) {
        captcha.state = 'success';
      } else {
        captcha.state = 'fail';
        captcha.timeIns = setTimeout(() => {
          reset();
        }, 1000)
      }
    }
  }
}
/**
 * 验证函数
 * @return true 验证通过 false 验证失败
 * @description 遍历所有已经点击的集合
 */
const verify = () => {
  return captcha.pointer.every((item, index) => {
    return item.x > captcha.tips[index].x - props.accuracy
    && item.x < captcha.tips[index].x + props.accuracy
    && item.y > captcha.tips[index].y - props.accuracy
    && item.y < captcha.tips[index].y + props.accuracy
  })
}
const reset = () => {
  captcha.pointer = [];
  captcha.state = '';
  captcha.tips = [];
  captcha.fontArr = [];
  captcha.timeIns && clearTimeout(captcha.timeIns);
  captcha.ctx.clearRect(0, 0, props.width, props.height);
  getCaptcha();
}
</script>

<template>
  <div class="captcha">
    <div >
      <p v-if="captcha.state==='fail'">验证失败</p>
      <p v-else-if="captcha.state==='success'">验证通过</p>
      <p v-else>请依次点击文字【<span v-for="(item, index) in captcha.tips" :key="index">{{ item.word }}</span>】</p>
    </div>
    <div class="captcha-container" :style="{width: `${props.width}px`}">
      <!-- 刷新 -->
      <div class="refresh" @click="reset">
      </div>
      <div class="pic">
        <canvas class="canvas" ref="canvasRef" :width="props.width" :height="props.height" @click="createPointer"></canvas>
        <span class="pointer"
              v-for="(item, index) in captcha.pointer"
              :key="index"
              :style="{left: `${item.x}px`, top: `${item.y}px`}">
        <i>{{ index + 1 }}</i>
      </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
[v-cloak] {
  display: none;
}
.captcha {
  position: relative;
  width: 400px;
  height: 300px;
  border-radius: 20px;
  background-color: #f0f0f0;
  padding: 10px;
  box-shadow: 8px 8px 16px #d0d0d0, -8px -8px 16px #ffffff;
  transition: all 0.3s ease;
}
.captcha-container {
  border: 1px solid #e4e4e4;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  user-select: none;
}
.pic {
  position: relative;
}
.canvas {
  display: block;
}
.pointer {
  background: #1abd6c;
  border-radius: 50%;
  padding: 15px;
  position: absolute;
}
.pointer i {
  color: #fff;
  font-style: normal;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.toolbar {
  width: 100%;
  height: 40px;
  border: 1px solid #e4e4e4;
  background: #f7f7f7;
  color: #666;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.toolbar.active {
  color: #fff;
  background: #1991FA;
  border: 1px solid #1991FA;
}
.toolbar.success {
  color: #fff;
  background: #52CCBA;
  border: 1px solid #52CCBA;
}
.toolbar.fail {
  color: #fff;
  background: #f57a7a;
  border: 1px solid #f57a7a;
}
.refresh {
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
  cursor: pointer;
}
</style>