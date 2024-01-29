import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
      viteMockServe({
        mockPath: './mock',
      })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // scss全局变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/settings/variable.scss";`,
        // scss中解析js
        // javascriptEnabled: true
      }
    }
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  }
})
