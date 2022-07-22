// 未使用export default 默认导入 就得使用 import * as  将所有输出到一个对象中
import * as XLSX from 'xlsx'
/**
 * 获取表头（通用方式）
 */
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

export const isExcel = (file) => {
  // ^以什么开头 $ 以什么结尾
  return /\.(xls|xlsx|csv)$/.test(file.name)
}
