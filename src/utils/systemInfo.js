export function getSystemInfo() {
  let statusBar = 0 //状态栏高度
  let customBar = 0 // 状态栏高度 + 导航栏高度
  let navbar = 0 // 自定义标题与胶囊对齐高度

  uni.getSystemInfo({
    success: e => {
      // #ifdef MP
      statusBar = e.statusBarHeight
      customBar = e.statusBarHeight + 45
      if (e.platform === 'android') {
        // this.$store.commit('SET_SYSTEM_IOSANDROID', false)
        customBar = e.statusBarHeight + 50
      }
      // #endif

      // #ifdef MP-WEIXIN
      statusBar = e.statusBarHeight
      const custom = wx.getMenuButtonBoundingClientRect()
      customBar = custom.bottom + custom.top - e.statusBarHeight

      navbar = (custom.top - e.statusBarHeight) * 2 + custom.height
      // #endif

      // #ifdef MP-ALIPAY
      statusBar = e.statusBarHeight
      customBar = e.statusBarHeight + e.titleBarHeight
      // #endif

      // #ifdef APP-PLUS
      statusBar = e.statusBarHeight
      customBar = e.statusBarHeight + 45
      // #endif

      // #ifdef H5
      statusBar = 0
      customBar = e.statusBarHeight + 45
      // #endif
    }
  })

  return {
    statusBar,
    customBar,
    navbar
  }
}
