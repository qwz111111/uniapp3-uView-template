import { onMounted } from 'vue'

/**
 * 小程序更新检查 Hook
 * @returns {Object} 更新相关方法
 */
export const useUpdate = () => {
  /**
   * 检查小程序更新
   */
  const checkUpdate = () => {
    if (uni.canIUse('getUpdateManager')) {
      const updateManager = uni.getUpdateManager()

      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })

          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            uni.showModal({
              title: '更新提示',
              content: '新版本下载失败，请检查网络设置',
              showCancel: false
            })
          })
        }
      })
    }
  }

  /**
   * 初始化更新检查
   */
  const initUpdateCheck = () => {
    onMounted(() => {
      checkUpdate()
    })
  }

  return {
    checkUpdate,
    initUpdateCheck
  }
}
