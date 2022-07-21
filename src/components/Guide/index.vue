<template>
  <div id="guide-start">
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from './steps.js'

const i18n = useI18n()
let driver = null

onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})
const onClick = () => {
  console.log(driver.defineSteps)
  // 1. 定义步骤
  driver.defineSteps(steps(i18n))
  console.log(driver)
  // 2. 启动引导
  driver.start()
}
</script>

<style scoped></style>
