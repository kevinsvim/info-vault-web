<template>
  <div class="tool-main">
    <div class="tool-container">
      <div class="main">
        <div class="main-wrap">
          <SearchNavigation></SearchNavigation>
          <div v-for="i in 3">
            <h2 :id="'part' + i">
              <strong>
                <i id="Hot" class="hot" title="hot-tool">热门工具</i>
              </strong>
            </h2>

            <el-row :gutter="20">
              <el-col :span="4" v-for="i in 20">
                <ToolCard
                    style="width: 100%; height: 100%; margin-top: 20px"
                ></ToolCard>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="tool-sidebar">
        <div class="sidebar-title">
          <h3 class="st">
            <i class="st-btn">
              <svg-icon icon-name="icon-tool-guide" size="30"></svg-icon>
              <span>全部工具导航</span>
            </i>
          </h3>
        </div>
        <div class="sidebar-menu-wrap">
          <ul class="menu">
            <li class="menu-item">
              <!--<el-anchor-->
              <!--    :container="containerRef"-->
              <!--    direction="vertical"-->
              <!--    type="defalut"-->
              <!--    @click="handleClick"-->
              <!--&gt;-->
              <!--  <el-anchor-link href="#part3" title="part3">-->
              <!--    <a href="#" class="menu-a active">-->
              <!--      <i class="in">-->
              <!--        <svg-icon icon-name="icon-tool-guide" size="20"></svg-icon>-->
              <!--        <span>热门工具</span>-->
              <!--      </i>-->
              <!--    </a>-->
              <!--  </el-anchor-link>-->
              <!--</el-anchor>-->
              <a href="#" class="menu-a active">
                <i class="in">
                  <svg-icon icon-name="icon-tool-guide" size="20"></svg-icon>
                  <span>热门工具</span>
                </i>
              </a>
            </li>


            <li class="menu-item">
              <a href="#" class="menu-a">
                <i class="in">
                  <svg-icon icon-name="icon-tool-guide" size="20"></svg-icon>
                  <span>资源搜索</span>
                </i>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-a">
                <i class="in">
                  <svg-icon icon-name="icon-tool-guide" size="20"></svg-icon>
                  <span>在线工具</span>
                </i>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-a">
                <i class="in">
                  <svg-icon icon-name="icon-tool-guide" size="20"></svg-icon>
                  <span>文本工具</span>
                </i>
              </a>
            </li>
            <li class="menu-item">
              <a href="#" class="menu-a">
                <i class="in">
                  <svg-icon icon-name="icon-tool-guide" size="20"></svg-icon>
                  <span>开发工具</span>
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import SvgIcon from "@/components/icon/SvgIcon.vue";
import SearchNavigation from "@/views/tool/SearchNavigation.vue";
import ToolCard from "@/components/card/ToolCard.vue";
import { ref } from "vue";

const containerRef = ref<HTMLElement | null>(null)
const handleClick = (e: MouseEvent) => {
  e.preventDefault()
}
</script>

<style scoped lang="scss">
@media (min-width: 750px) {
  .tool-main {
    padding-top: 15px;
  }

  .main {
    padding: 0 15px;
  }
}
@media (min-width: 1000px) {
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

@media (min-width: 1330px) {
  .main {
    padding: 0 30px;
  }
}

@media (min-width: 1660px) {
  .tool-sidebar {
    width: 177px;
    .st {
      padding-left: 17px;
    }
  }

  .tool-container {
    padding-left: 180px;
  }

  .sidebar-menu {
    padding-left: 27px;
  }
}

@media (min-width: 1900px) {
  .tool-sidebar {
    left: auto;
  }

  .tool-container {
    width: 1720px;
    margin: 0 auto;
  }
}

.tool-container {
  position: relative;
  box-sizing: content-box;
}

.tool-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 167px;
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
    -webkit-transition: all .2s;
    -o-transition: all .2s;
    transition: all .2s;
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
      font-family: "PingFang_Bold SC", 微软雅黑 sans-serif;
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
</style>
