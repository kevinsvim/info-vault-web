<template>
  <div class="tool-search">
    <div class="bg-l"></div>
    <div class="search-main">
      <h2 class="search-title">旅途导航指南与行进艺术</h2>
      <div class="search-form">
        <div class="part-search-form">
          <div class="search-form">
            <div class="s-titles">
              <i class="item" :key="engine.id" v-for="engine in searchEngines" :class="{current: engine.current}" @click="() => handleToggleEngine(engine)">
                <i class="item-a">{{ engine.name }}</i>
              </i>
            </div>
            <div class="s-form">
              <form :action="searchEngines[currentEngineIndex].url" method="get" target="_blank">
                <input type="text" autocomplete="off" :name="searchEngines[currentEngineIndex].param" class="s placeholder" :placeholder="'有问题就用' + searchEngines[currentEngineIndex].name + '搜索'"/>
                <button type="submit" class="s-btn">{{ searchEngines[currentEngineIndex].title }}</button>
              </form>
            </div>
            <div>
              <el-countdown format="DD [days] HH:mm:ss" :value="currentTime">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    <svg-icon icon-name="icon-calendar" size="16"></svg-icon>
                    <span class="ml_4">Still to go until next month</span>
                  </div>
                </template>
              </el-countdown>
              <div class="countdown-footer">{{ currentTime.format('YYYY-MM-DD') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-r"></div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import dayjs from "dayjs";
import SvgIcon from "@/components/icon/SvgIcon.vue";
interface SearchEngine {
  id: number
  name: string
  url: string
  current: boolean
  title: string
  param: string
}
const currentTime = ref(dayjs().add(1, 'month').startOf('month'))
const currentEngineIndex = ref<number>(0)
const searchEngines = reactive<SearchEngine[]>([
  {
    id: 0,
    current: true,
    name: '百度',
    url: 'https://www.baidu.com/s',
    title: '百度一下',
    param: 'wd'
  },
  {
    id: 1,
    current: false,
    name: 'Google',
    url: 'https://www.google.com/search',
    title: 'Google搜索',
    param: 'q'
  },
  {
    id: 2,
    current: false,
    name: 'Bing',
    url: 'https://www.bing.com/',
    title: 'Bing一下',
    param: 'wd'
  },
  {
    id: 3,
    current: false,
    name: '360',
    url: 'https://www.so.com/',
    title: '360搜索',
    param: 'wd'
  }
])
/**
 * 处理搜索引擎的切换
 */
const handleToggleEngine = (engine: SearchEngine) => {
  if (engine.current) {
    return
  }
  // 将当前节点的current置为false，将点击的节点的current置为true
  searchEngines.forEach(item => {
    if (engine.id === item.id) {
      item.current = true
      currentEngineIndex.value = item.id
    } else {
      item.current = false
    }
  })
}
</script>

<style scoped lang="scss">
@media (min-width: 750px) {
  .tool-search {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: top;
    -webkit-align-items: top;
    -moz-box-align: top;
    -ms-flex-align: top;
    align-items: top;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    height: 346px;

    .s {
      padding: 15px 200px 15px 20px;
    }

    .s-btn {
      width: 126px;
    }
  }

  .bg-l,
  .bg-r {
    display: block;
  }
}

@media (min-width: 1000px) {
  .tool-search {
    margin-bottom: 30px;
  }
}

.tool-search {
  background: -webkit-gradient(linear, left top, left bottom, from(#4a89f0), to(#7bb3f4));
  background: -webkit-linear-gradient(top, #4a89f0 0%, #7bb3f4 100%);
  background: -o-linear-gradient(top, #4a89f0 0%, #7bb3f4 100%);
  background: linear-gradient(180deg, #4a89f0 0%, #7bb3f4 100%);
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;

  .bg-l {
    background-position: right center;
    background-image: url(@/assets/bg/banner-left.png);
  }

  .search-main {
    padding: 48px 120px 80px;
    position: relative;
    text-align: center;
    width: calc(100% - 620px);
  }

  .bg-r {
    background-position: left center;
    background-image: url(@/assets/bg/banner-right.png);
  }

  .bg-l,
  .bg-r {
    width: 310px;
    -webkit-box-flex: 0;
    -webkit-flex-grow: 0;
    -moz-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -webkit-flex-shrink: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }

  .s {
    display: block;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 12px 170px 12px 20px;
    background-color: #fff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    font-size: inherit;
    color: #3c3c3c;
    width: 100%;
    border: none;
  }

  .s-btn {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 96px;
    height: 100%;
    -webkit-border-radius: 0 6px 6px 0;
    -moz-border-radius: 0 6px 6px 0;
    border-radius: 0 6px 6px 0;
    background-color: #ff6000;
    color: #fff;
    font-size: inherit;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #e65600;
    }
  }
}

.search-title {
  font-size: 40px;
  line-height: 1.17647059em;
  margin-bottom: 0.88235294em;
  color: #fff;
  white-space: nowrap;
  font-family:
    YShayuTi,
    PingFang_Bold SC,
    serif;
  font-weight: normal;
}

.s-titles {
  font-size: 14px;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
  color: #fff;

  .item {
    display: inline-block;
    margin: 0 3px;
    height: 30px;
  }

  .current .item-a {
    background-color: #fff;
    color: #000;
  }

  .item-a {
    display: block;
    padding: 0 20px;
    -webkit-border-radius: 6px 6px 0 0;
    -moz-border-radius: 6px 6px 0 0;
    border-radius: 6px 6px 0 0;
    cursor: pointer;
  }
}

.s-form {
  position: relative;
  font-size: 14px;
  margin-bottom: 30px;

  .placeholder {
    color: #8f8f8f;
    font-family: "PingFang SC", "HarmonyOS_Sans_SC_Medium", sans-serif;
  }

  form,
  input {
    outline: none;
    margin: 0;
    text-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}

.tool-search::before {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 20%;
  right: 20%;
  padding-top: 60px;
  background-image: url(https://image.uisdc.com/wp-content/uploads/hao.uisdc.com/banner-bottom-3.png);
  background-position: center bottom;
  background-repeat: no-repeat;
  -webkit-background-size: contain;
  background-size: contain;
}
</style>
