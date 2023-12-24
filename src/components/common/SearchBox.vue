<template>
  <div class="toolbar-search-container">
    <form>
      <!-- 热度标识 -->
      <span class="icon-fire" style="display: none"></span>
      <input id="toolbar-search-input" maxlength="2000" autocomplete="off" type="text" value placeholder="旅行商问题" style="text-indent: 12px">
      <button id="toolbar-search-button">
        <svg-icon icon-name="icon-sousuo"></svg-icon>
        <span>搜索</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from "@/components/icon/SvgIcon.vue";
</script>

<style scoped lang="scss">
.toolbar-search-container {
  width: 100%;
  height: 100%;
  line-height: $base-nav-height;
  text-align: center;


  input {
    font-size: 0.8rem;
    display: inline-block;
    height: 32px;
    width: calc(100% - 88px);
    outline: 0;
    background: #f5f6f7;
    color: #222226;
    border-radius: 16px 0 0 16px;
    border: 1px solid #e8e8ed;
    border-right: none;
  }
  #toolbar-search-button {
    display: inline-block;
    width: 88px;
    height: 32px;
    outline: 0;
    border: 0 none;
    border-radius: 0 16px 16px 0;
    font-size: 14px;
    line-height: 32px;
    cursor: pointer;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;
    background-color: #fc5531;
    text-align: left;

    svg-icon {
      color: #fff;
    }

    span {
      display: inline-block;
      vertical-align: top;
      color: #fff;
    }
  }
}


</style>
