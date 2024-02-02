<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";

interface CaptchaType {
  bgImg: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  fontArr: any[];
  tips: [];
  pointer: [];
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
      'http://cdn.dooring.cn/dr/bg3.jpg'
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
  timeIns: null,
});
const canvasRef = ref();
onMounted(() => {
  init();
})
const init = () => {
  captcha.ctx = canvasRef.value.getContext('2d');
  getCaptcha()
}
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

    for (let i = 0; i < props.checkNum; i++) {
      const randomIndex = Math.floor(Math.random() * captcha.fontArr.length);
      const character = captcha.fontArr.splice(randomIndex, 1)[0];
    }
  }
}
/**
 * 随机获取文字
 */
const getRandomCharacter = () => {
  const wordLen = captcha.fontArr.length;
  const randomIndex = Math.floor(Math.random() * wordLen);
  return captcha.fontArr[randomIndex];
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
</script>

<template>
  <div class="verify-container" :style="{width: `${width}px`}">
    <div class="refresh" @click="reset">
      <svg t="1637315258145" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2420" width="20" height="20"><path d="M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z" p-id="2421" fill="#8a8a8a"></path></svg>
    </div>
    <div class="pic">
      <canvas class="canvas" ref="canvasRef" :width="width" :height="height" @click="createPointer"></canvas>
      <span class="pointer"
            v-for="(item, index) in captcha.pointer"
            :style="{left: `${item.x}px`, top: `${item.y}px`}">
        <i>{{ index + 1 }}</i>
      </span>
    </div>
    <div :class="['toolbar', captcha.state]">
      <p v-if="captcha.state==='fail'">验证失败</p>
      <p v-else-if="captcha.state==='success'">验证通过</p>
      <p v-else>请顺序点击【<span v-for="(item, index) in captcha.tips" :key="index">{{ item.character }}</span>】</p>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>