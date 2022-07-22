<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import {} from 'vue'
import { userBatchImport } from '@/api/user-manage'
import { USER_RELATIONS, formatDate } from './utils.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
const onSuccess = async ({ header, results }) => {
  // 处理中文键 转成 英文键
  const uploadData = generateData(results)
  await userBatchImport(uploadData)

  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/user/manage')
}
/**
 * 筛选数据
 */
const generateData = (results) => {
  const arr = []
  results.forEach((item) => {
    const userInfo = {}
    Object.keys(item).forEach((key) => {
      // excel时间特殊处理 拿到的整数值是日期距离1900年1月1日的天数，这时需要formatDate 函数转换
      if (USER_RELATIONS[key] === 'openTime') {
        userInfo[USER_RELATIONS[key]] = formatDate(item[key])
        return
      }
      userInfo[USER_RELATIONS[key]] = item[key]
    })

    arr.push(userInfo)
  })
  return arr
}
</script>

<style lang="scss" scoped></style>
