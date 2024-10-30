import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), viteCompression()],
  base: './',
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api_template': {
        target: process.env.APP_API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
