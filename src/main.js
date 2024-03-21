import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'
import App from './App.vue'
import uviewPlusConfig from './utils/uviewPlusConfig.js'
// ios联系触摸放大问题
// #ifdef H5
import './utils/ios.js'
// #endif

export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  uviewPlusConfig()
  return { app }
}
