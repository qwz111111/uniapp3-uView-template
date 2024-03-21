import { request } from '@/utils/request'

export default {
  /**
   *
   * 图片管理
   *
   */
  // 主体图片信息查询
  imagePageInfo(data) {
    return request('/mainImageInfoPageInfo.action', data)
  }
}
