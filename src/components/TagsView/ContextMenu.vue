<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">{{ $t('msg.tagsView.refresh') }}</li>
    <li @click="onCloseRightClick">{{ $t('msg.tagsView.closeRight') }}</li>
    <li @click="onCloseOtherClick">{{ $t('msg.tagsView.closeOther') }}</li>
    <li @click="onCloseCurrent">{{ $t('msg.tagsView.close') }}</li>
  </ul>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
import appStore from '@/stores'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

// 利用history go(0)刷新
const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}

const { removeTagsView } = appStore.useAppStore
const emit = defineEmits(['close'])
// 关闭右侧
const onCloseRightClick = () => {
  removeTagsView({ type: 'right', index: props.index })
  emit('close')
}
// 关闭其他
const onCloseOtherClick = () => {
  removeTagsView({ type: 'other', index: props.index })
  emit('close')
}
// 关闭选中
const onCloseCurrent = () => {
  removeTagsView({ type: 'index', index: props.index })
  emit('close')
}

</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
