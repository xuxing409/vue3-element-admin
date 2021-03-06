<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in tagsViewList"
      :key="tag.fullPath"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      :to="{ path: tag.fullPath }"
      :style="{
        backgroundColor: isActive(tag) ? cssVar.menuBg : '',
        borderColor: isActive(tag) ? cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <el-icon v-show="!isActive(tag)" @click.prevent.stop="onCloseClick(index)"
        ><Close
      /></el-icon>
    </router-link>

    <context-menu
      @close="closeMenu"
      :style="position"
      :index="selectIndex"
      v-show="visible"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import appStore from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import ContextMenu from './ContextMenu.vue'
const { tagsViewList } = storeToRefs(appStore.useAppStore)
const { cssVar } = storeToRefs(appStore.useThemeStore)

const route = useRoute()
const isActive = (tag) => {
  return tag.path === route.path
}
// 关闭tag 的点击事件
const { removeTagsView } = appStore.useAppStore
const onCloseClick = (index) => {
  console.log(index)
  removeTagsView({ type: 'index', index })
}

// 鼠标右键
const visible = ref(false)
const position = reactive({
  top: '',
  left: ''
})
const selectIndex = ref(0)
const openMenu = (e, index) => {
  const { x, y } = e
  position.left = x + 'px'
  position.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}
const closeMenu = () => {
  visible.value = false
}
// 点击其他位置处理
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.addEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      /* 活跃状态下  title前的圆点 */
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
