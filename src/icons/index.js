// 1. 导入所有 svg 图标
// 2. 完成 SvgIcon 的全局注册
import SvgIcon from '@/components/SvgIcon/index.vue'

// vite 使用vite-plugin-svg-icons 跳过该步骤
// // const svgRequire = require.context('./svg', false, /\.svg$/)
// const svgRequire = import.meta.globEager('./svg/*.svg')
// // 此时返回了一个Require 函数，该函数可以接收一个request的参数，用于require导入
// // 该函数提供了三个属性，可以通过require.keys()获得所有的svg图标
// // 遍历图标，把图标作为request的参数传入到svgRequire 导入函数中，完成本地svg图标导入
// Object.keys(svgRequire).forEach((svgIcon) => new URL(svgIcon, import.meta.url))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
