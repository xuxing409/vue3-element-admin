<template>
  <div class="upload-excel">
    <!-- 上传按钮 -->
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t('msg.uploadExcel.upload') }}
      </el-button>
    </div>

    <input
      ref="excelUploadInputRef"
      type="file"
      class="excel-upload-input"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- 拖拽上传 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="upload-icon">
        <Upload></Upload>
      </el-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'
const props = defineProps({
  // 上传前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})
const loading = ref(false)
const excelUploadInputRef = ref(null)

// 触发隐藏的input 上传的点击事件
const handleUpload = () => {
  excelUploadInputRef.value.click()
}

/**
 * 处理input 文件选择确定
 * @param {*} e 资源管理器选中的文件
 */
const handleChange = (e) => {
  const files = e.target.files
  // file[0]就是选中的文件
  const rawFile = files[0]
  if (!rawFile) return
  // 上传
  upload(rawFile)
}

/**
 * 拖拽松手
 */
const handleDrop = (e) => {
  if (loading.value) return

  // 获取拖拽传递的文件
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  // 判断文件类型是否excel文件
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是.xlsx, .xls, .csv 格式')
    return
  }
  upload(rawFile)
}
/**
 * 被拽到目标区域后
 */
const handleDragover = (e) => {
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = 'copy'
}

/**
 * 触发上传事件
 * @param {*} rawFile 文件
 */
const upload = (rawFile) => {
  // 清空选中的文件
  excelUploadInputRef.value.value = null

  // 如果没有指定上传前的回调
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果用户指定了上传前的回调,那么只有返回为true的时候才会执行对应的后续操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 读取数据(异步)
 */
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    // 读取文件完成时
    reader.onload = (e) => {
      // 1.获取到解析后的数据
      const data = e.target.result
      // 2.利用xlsx对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3.获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0]
      // 4.读取sheet1(第一张表格) 的数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 5.解析数据表头(固定方式, 通用解析逻辑)
      const header = getHeaderRow(workSheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7.传入解析后的数据
      generateData({ header, results })
      // 8.处理loaoding
      loading.value = false
      // 9.成功回调
      resolve()
    }
    // 读取文件,读取完后自动回调onload
    reader.readAsArrayBuffer(rawFile)
  })
}

/**
 * 根据导入内容 生成数据
 * @param {*} excelData 解析后的数组内容
 */
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;
    .upload-icon {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
