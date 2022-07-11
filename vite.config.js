import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
  base: './',

  // 引入第三方的配置
  optimizeDeps: {
    include: ['axios']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/api',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      styles: path.resolve(__dirname, 'src/styles'),
      views: path.resolve(__dirname, 'src/views'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[name]'
    })
  ]
})
