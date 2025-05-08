/**
 * 页面导航hooks
 * @param {Object} options - 配置选项
 * @param {string} options.developingTip - 开发中提示文案
 * @returns {Object} 返回导航相关方法
 */
export const useNavigation = (options = {}) => {
  const { developingTip = '功能开发中，敬请期待...' } = options

  // 判断路径是否有效
  const isValidPath = path => {
    return path && typeof path === 'string' && path.trim() !== ''
  }

  /**
   * 页面跳转方法
   * @param {string} path - 跳转路径
   * @param {Object} params - 跳转参数
   */
  const navigateTo = (path, params = {}) => {
    if (!isValidPath(path)) {
      uni.showToast({
        title: developingTip,
        icon: 'none',
        duration: 2000
      })
      return
    }

    // 构建带参数的url
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&')

    const url = query ? `${path}?${query}` : path

    uni.navigateTo({
      url,
      fail: err => {
        console.error('页面跳转失败:', err)
        uni.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  }

  /**
   * 带返回的页面跳转方法
   * @param {string} path - 跳转路径
   * @param {Object} params - 跳转参数
   */
  const navigateBack = (delta = 1) => {
    uni.navigateBack({
      delta,
      fail: () => {
        uni.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }

  /**
   * Tab页面跳转方法
   * @param {string} path - 跳转路径
   */
  const switchTab = path => {
    if (!isValidPath(path)) {
      uni.showToast({
        title: developingTip,
        icon: 'none',
        duration: 2000
      })
      return
    }

    uni.switchTab({
      url: path,
      fail: err => {
        console.error('Tab切换失败:', err)
        uni.showToast({
          title: 'Tab切换失败',
          icon: 'none'
        })
      }
    })
  }

  return {
    navigateTo,
    navigateBack,
    switchTab
  }
}
