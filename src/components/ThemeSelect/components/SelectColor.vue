<template>
  <el-dialog
    :title="$t('msg.universal.title')"
    :model-value="modelValue"
    @close="closed"
    width="22%"
  >
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker
        v-model="mColor"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="comfirm">{{
        $t('msg.universal.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { defineEmits, ref } from 'vue'
import appStore from '@/stores'
import { writeNewStyle, generateNewStyle } from '@/utils/theme'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]

const { mainColor } = storeToRefs(appStore.useThemeStore)
const { setMainColor } = appStore.useThemeStore
// 默认颜色
const mColor = ref(mainColor)
const closed = () => {
  emits('update:modelValue', false)
}

const comfirm = async () => {
  const newStyle = await generateNewStyle(mColor.value)
  writeNewStyle(newStyle)
  setMainColor(mColor.value)
  closed()
}
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  .title {
    margin-bottom: 12px;
  }
}
</style>
