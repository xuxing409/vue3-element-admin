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
const app = createApp(App)
app.use(createPinia())
// 注册pinia状态管理库
registerStore()
// 注册svg-icon
installIcons(app)

// 注册element-plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(i18n).use(router).mount('#app')
