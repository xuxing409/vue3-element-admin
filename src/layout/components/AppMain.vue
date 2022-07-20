<template>
  <div class="app-main">
    <router-view />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import appStore from '@/stores'
import { isTags } from '@/utils/tags.js'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'
import { storeToRefs } from 'pinia'
// 生成title
const getTitle = (route) => {
  let title = ''
  // 没有元信息
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    // 国际化处理
    title = generateTitle(route.meta.title)
  }
  return title
}
const { tagsViewList } = storeToRefs(appStore.useAppStore)
const { addTagsViewList, changeTagsView } = appStore.useAppStore

const route = useRoute()
// 监听当前路由 添加新的tag加入tagList中
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to)
    })
  },
  {
    immediate: true
  }
)

// 监听语言变化, tag国际化
watchSwitchLang(() => {
  tagsViewList.value.forEach((route, index) => {
    changeTagsView({ index, tag: { ...route, title: getTitle(route) } })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
