<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumData"
        :key="item.path"

      >
        <!-- 不可点击 -->
        <span class="no-redirect" v-if="breadcrumData.length - 1 === index">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击 -->
        <span class="redirect" @click="onLinkClick(item)" v-else>{{
          generateTitle(item.meta.title)
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import appStore from '@/stores'
import { storeToRefs } from 'pinia'
import { generateTitle } from '@/utils/i18n'
const route = useRoute()

// 生成数组数据
const breadcrumData = ref([])
const getBreadcrumData = () => {
  // route.matched获取当前的路由的标准化记录
  breadcrumData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}
// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumData()
  },
  {
    immediate: true
  }
)
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 主题替换，hover设置为主色
const { cssVar } = storeToRefs(appStore.useThemeStore)
const linkHoverColor = ref(cssVar.value.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
  ::v-deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
}
</style>
