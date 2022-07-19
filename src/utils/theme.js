import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import axios from 'axios'
import { version } from 'element-plus/package.json'
// **实现步骤：**

// 对应原理总体可分为四步：

// 1. 获取当前 `element-plus` 的所有样式
// 2. 定义我们要替换之后的样式
// 3. 在原样式中，利用正则替换新样式
// 4. 把替换后的样式写入到 `style` 标签中

/**
 * 把生成的样式表 写入到style中
 */
export const writeNewStyle = (newStyle) => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 * 根据主题色 生成最新的样式表(根据主题色生成配合色)
 */

export const generateNewStyle = async (primaryColor) => {
  // 1. 根据主色生成色值表
  const colors = generateColors(primaryColor)
  // 2. 获取当前element-plus 的默认样式表， 并把需要进行替换的色值打上标记
  let cssText = await getOriginalStyle()

  // 3.遍历生成的色值表,在默认样式表 进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    ) // --el-color-primary: primary; 转成  --el-color-primary: #FF7800
  })

  return cssText
}

/**
 * 根据主色(formula文件)生成色值表
 * @param {*} primary "#FF7800"
 * @returns
light-1: "#ff8619"
light-2: "#ff9333"
light-3: "#ffa14d"
light-4: "#ffae66"
light-5: "#ffbc80"
light-6: "#ffc999"
light-7: "#ffd7b3"
light-8: "#ffe4cc"
light-9: "#fff2e6"
menuBg: "#ff7800"
menuHover: "#fff2e6"
primary: "#FF7800"
shade-1: "#e66c00"
subMenuBg: "#ffe4cc"
subMenuHover: "#ffd7b3"
 */
export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  // 正则替换色值
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    // 解析色的value
    // 如menuHover: color(primary tint(90%)) 转换成 menuHover: "#fff2e6"
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取element plus 的样式表
 */
export const getOriginalStyle = async () => {
  // 请求对应版本的css
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)

  // 把获取到的css数据 对照为原样式模板
  return getStyleTemplate(data)
}

/**
 * 返回 style 的 template
 */
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  // 如--el-primary: #409eff替换为--el-primary: primary
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}
