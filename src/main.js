import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
// 初始样式
import '@/styles/index.scss'
// 解决自动导入 elmessage 没有正常弹出
import 'element-plus/es/components/message/style/css'
// 导入svgIcon
import 'virtual:svg-icons-register'
import installIcons from '@/icons'
import { createPinia } from 'pinia'
import { registerStore } from '@/stores'
import './permission.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import i18n from '@/i18n'
// 全局属性
import installFilter from '@/filter/index.js'
// 指令
import installDirective from '@/directives'
const app = createApp(App)
// 注册小菠萝
app.use(createPinia())
// 注册pinia状态管理库
registerStore()
// 注册svg-icon
installIcons(app)
// 注册全局属性
installFilter(app)
installDirective(app)
// 注册element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(i18n).use(router).mount('#app')
