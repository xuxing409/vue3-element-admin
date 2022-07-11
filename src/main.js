import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
// 初始样式
import '@/styles/index.scss'
// 导入svgIcon
import 'virtual:svg-icons-register'
import installIcons from '@/icons'
import { createPinia } from 'pinia'
import './permission.js'

const app = createApp(App)
app.use(createPinia())
installIcons(app)
app.use(router).mount('#app')
