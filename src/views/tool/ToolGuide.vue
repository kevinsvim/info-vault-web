<template>
  <div class="tool-main">
    <div class="tool-container">
      <div class="main">
        <div class="main-wrap">
          <SearchNavbar></SearchNavbar>
          <div v-for="item in anchorList" :key="item.id">
            <h2 :id="item.anchor">
              <strong>
                <i id="Hot" class="hot" title="hot-tool">{{ item.text }}</i>
              </strong>
            </h2>
            <el-row :gutter="20">
              <el-col :span="spanCol" :key="tool.id" v-for="tool in item.tools">
                <ToolCard class="tool-card"
                          :href="item.path + tool.filename"
                          :title="tool.title"
                          :description="tool.description"
                          :img="tool.icon"
                ></ToolCard>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="sidebar-anchor">
        <ul>
          <li
            class="sidebar-anchor-item"
            v-for="item in anchorList"
            :key="item.id"
            :class="{ active: item.anchor === selectedAnchor }"
            @click="anchorPosition(item.anchor)"
          >
            <a @click="$event.defaultPrevented" class="sidebar-anchor-item-link">
              <i class="sidebar-icon">
                <svg-icon :icon-name="item.iconClass" size="20"></svg-icon>
              </i>
              <span class="sidebar-anchor-item-text">{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/icon/SvgIcon.vue'
import SearchNavbar from '@/components/common/SearchNavbar.vue'
import ToolCard from '@/components/card/ToolCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { debounce } from 'lodash';

const anchorList = [
      {
        id: 1,
        anchor: 'hot',
        text: '热门工具',
        iconClass: 'icon-tool',
        path: '/tool/hot/',
        tools: [
          {
            id: 1,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          },
          {
            id: 2,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          },
          {
            id: 3,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          },
          {
            id: 4,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          },          {
            id: 5,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          },
          {
            id: 6,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          },
          {
            id: 7,
            title: 'JSON 在线解析',
            icon: 'https://media.wowkie.com/uploads/20230417/20b49d8fffb76055a2061aafaba6ecd4.png',
            filename: 'JsonFormat',
            description: '方便快捷地解析和查看JSON数据结构，支持美化、高亮、错误提示、压缩、多格式输出',
          }
        ]
      },
      {
        id: 2,
        anchor: 'online',
        text: '在线工具',
        iconClass: 'icon-tool',
        path: '/tool/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 3,
        anchor: 'text',
        text: '文本工具',
        iconClass: 'icon-tool',
        path: '/tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 4,
        anchor: 'usually',
        text: '常用工具',
        iconClass: 'icon-tool',
        path: '/tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 5,
        anchor: 'compile',
        text: '编译工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 6,
        anchor: 'other1',
        text: '其它工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 7,
        anchor: 'hot1',
        text: '热门工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 8,
        anchor: 'online1',
        text: '在线工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 9,
        anchor: 'text1',
        text: '文本工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 10,
        anchor: 'usually1',
        text: '常用工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      },
      {
        id: 11,
        anchor: 'compile1',
        text: '编译工具',
        iconClass: 'icon-tool',
        path: 'tools/online/',
        tools: [
          {
            id: 1,
            title: 'JSON 格式化工具',
            icon: 'icon-tool',
            filename: 'json_format.html',
            description: 'json格式化',
          }
        ]
      }
    ]
const selectedAnchor = ref('hot')
const spanCol = ref<number>(4)

const anchorPosition = (anchor: string) => {
  selectedAnchor.value = anchor
  // 如果是第一个元素，将滚动条其移动到顶部
  if (anchor === 'hot') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const el = document.getElementById(anchor)
    const offset = -100;
    const rect = el?.getBoundingClientRect() || { top: 0 };
    window.scrollTo({
      top: window.scrollY  + rect.top + offset,
      behavior: 'smooth'
    });
    // el?.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" })
  }
}
/**
 * 内容滚动到一定高度时，紧接着改变选中功能
 * 防抖
 */
const handleScroll = debounce(() => {
  // 遍历所有功能集合
  anchorList.forEach((item) => {
    const el = document.getElementById(item.anchor)
    const rect = el?.getBoundingClientRect() || { top: 0 }
    const offset = -100;
    if (rect.top <= window.innerHeight + offset) {
      selectedAnchor.value = item.anchor
      return
    }
  })
}, 200)

onMounted(() => {
  // 监听滚动条变化
  window.addEventListener('scroll', handleScroll)
  checkScreenWidth()
  // 监听屏幕宽度
  window.addEventListener('resize', checkScreenWidth)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkScreenWidth)
})
const checkScreenWidth = () => {
  // 判断是否小于1300px
  const screenWidth = window.innerWidth
  if (screenWidth < 750) {
    spanCol.value = 12
  } else if (screenWidth < 1000 && screenWidth >= 750) {
    spanCol.value = 8
  } else if (screenWidth < 1392 && screenWidth >= 1000) {
    spanCol.value = 6
  } else {
    spanCol.value = 4
  }
}
</script>
<style scoped lang="scss">
.tool-container {
  position: relative;
  box-sizing: content-box;
}

.sidebar-anchor {
  position: fixed;
  z-index: 2;
  flex: 5;
  top: 50%;
  transform: translateY(-50%);
  left: 50px;
  width: 100px;
  max-height: 840px;
  overflow: hidden;
  direction: rtl;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(74, 89, 111, 0.2);
  transition: all 0.2s;
  &-item {
    height: 68px;
    border-bottom: 1px solid #eff3f8;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-flow: row wrap;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    transition: all 200ms;
    &:hover {
      background-color: #009cff;
    }
  }
}

.sidebar-anchor.fixed {
  position: fixed;
  z-index: 2;
  top: 94px;
}
.sidebar-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 6px;
  font-size: 16px;
  line-height: 1;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.sidebar-anchor-item-link {
  display: block;
  width: 100%;
  color: rgba(74, 89, 111, 0.6);
  cursor: pointer;
  .sidebar-anchor-item-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'HarmonyOS_Sans_SC_Medium', 'PingFang_Bold SC', sans-serif;
  }
}

.tool-sidebar {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 127px;
  .sidebar-title {
    margin-bottom: 15px;
  }

  .st-btn {
    display: flex;
    align-items: center;
    line-height: 20px;
    padding: 11px 20px 11px 15px;
    color: #3a3a3a;
    white-space: nowrap;
    background-color: #fff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    font-family: HarmonyOS_Sans_SC_Regular, sans-serif;
    position: relative;
    span {
      margin-left: 3px;
    }
  }

  .sidebar-menu-wrap {
    position: relative;
    padding-left: 17px;
    max-height: -webkit-calc(100vh - 170px);
    max-height: calc(100vh - 170px);
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-transition: all 0.2s;
    -o-transition: all 0.2s;
    transition: all 0.2s;
  }
}

.main .main-wrap {
  max-width: 1660px;
  margin: 0 auto;
}

.sidebar-menu-wrap {
  position: relative;
}

.menu-item {
  display: block;
  width: 150px;
}

.menu-a {
  display: block;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  font-size: 14px;
  padding: 11px 20px 11px 15px;
  position: relative;
  color: #5a5a5a;
  &:hover {
    background-color: #fff;
    color: #ff6000;
  }

  .in {
    display: flex;
    align-items: center;
    line-height: 20px;
    span {
      margin-left: 5px;
      font-size: 14px;
      font-weight: 500;
      font-family:
        'PingFang_Bold SC',
        微软雅黑 sans-serif;
    }
  }

  .ico {
    margin-right: 5px;
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: inherit;
    text-align: center;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
}

.menu-a.active {
  background-color: #ff6000;
  color: #fff;
}

.hot {
  display: block;
  margin-top: 30px;
  font-weight: bold;
  color: #3c3c3c;
  font-size: 20px;
}

.active {
  background-color: #00b5e5;
}

.tool-card {
  margin-top: 20px;
}

@media (min-width: 750px) {
  .tool-main {
    padding-top: 15px;
  }
  .main {
    padding: 15px;
  }
}


@media (min-width: 992px) {
  .tool-main {
    padding-top: 30px;
  }

  .tool-container {
    padding-left: 170px;
  }

  .tool-sidebar {
    display: block;
  }
}

@media (max-width: 992px) {
  .sidebar-anchor {
    display: none;
  }
}

@media (min-width: 1900px) {
  .sidebar-anchor {
    width: 130px;
    left: auto;
    margin-left: -177px;
  }
}

@media (min-width: 1990px) {
  .sidebar-anchor {
    margin-left: 30px;
  }
}
</style>
