<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { USER_RELATIONS } from './Export2ExcelConstants'
import { dateFilter } from '@/filter'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const emits = defineEmits(['update:modelValue'])

/**
 * 导出按钮点击事件
 */
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  // 数据获取
  const allUser = (await getUserManageAllList()).list
  // 动态导入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据
    data,
    // 文件名称
    filename: excelName.value || exportDefaultName
  })
  loading.value = false
  closed()
}

// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理 转成字符串 并且只要title
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        return JSON.stringify(roles.map((role) => role.title))
      }
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>
<style lang="scss" scoped></style>
