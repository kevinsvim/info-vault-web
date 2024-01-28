<template>
  <div>
    <dialog id="dialog" class="dialog-component" open>
      <div class="dialog-main">
        <!-- 标题栏区域 -->
        <div class="dialog-header"><span class="dialog-title">这是对话框标题</span></div>
        <!-- 右上角的关闭按钮 -->
        <span class="dialog-close-btn">X</span>
        <!-- 对话框的中间主要的内容区域 -->
        <div class="dialog-container">这是对话框的内容部分</div>
        <!-- 底部显示按钮的区域 -->
        <div class="dialog-footer">
          <button>取消</button>
          <button>确认</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.dialog-component {
  border: none;
  padding: 0;
  border-radius: 5px;
}
.dialog-component::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
}
.dialog-main {
  width: 320px;
  position: relative;
}
/* 标题栏 */
.dialog-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid #dedede;
}
.dialog-title {
  font-weight: bold;
}

/* 右上角关闭按钮 */
.dialog-close-btn {
  font-size: 14px;
  position: absolute;
  display: inline-block;
  right: 5px;
  width: auto;
  height: auto;
  top: 6px;
  padding: 5px;
}

/* 主体内容 */
.dialog-container {
  padding: 15px 10px;
  font-size: 14px;
}

/* 底部按钮 */
.dialog-footer {
  padding: 10px;
  text-align: right;
  border-top: 1px solid #dedede;
}
</style>
