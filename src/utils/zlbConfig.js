// 浙里办应用配置项
export const appConfig = {
  miniAppId: '2002311541',
  miniAppName: '橘农服务',
  appKey: 'ysdrvhqb+2002311541+jfqyos', // 应用APPKey
  serviceCode: '', // 单点登录代码 BCDSGA_95efbd7f3388b2396fc6069ecce2efc2
  servicePwd: '', // 单点登录密码
  appCode: 'A330225298132202109000002', // 应用编码,
  accessKey: 'dc5517a0780e4946629277097d394c14', // AK,IRS组件商店查看
  secret: '553837ee3650431085876209d79a8821' // SK,IRS组件商店查看
}

/**
 * 基础信息埋点配置
 * @param {String} userName
 * @param {String} userId
 */
export const buryingPoint = (userName = '', userId = '') => {
  ;(function (w, d, s, q, i) {
    w[q] = w[q] || []
    var f = d.getElementsByTagName(s)[0]
    var j = d.createElement(s)
    j.async = true
    j.id = 'beacon-aplus'
    j.src = `https://d.alicdn.com/alilog/mlog/aplus.js?id=202951085`
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'aplus_queue')
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn']
  })
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn']
  })
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_hold', 'BLOCK']
  })
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_user_nick', userName]
  })
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_user_id', userId]
  })
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['_hold', 'START']
  })
  // 这个会落到 app_key 字段上
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['appId', appConfig.miniAppId]
  })
  // 单页应用 或 “单个页面”需异步补充 PV 日志参数还需进行如下埋点：
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-waiting', 'MAN']
  })
  // 单页应用路由切换后 或 在异步获取到 pv 日志所需的参数后再执行 sendPV：
  aplus_queue.push({
    action: 'aplus.sendPV',
    arguments: [{ is_auto: false }, { miniAppId: appConfig.miniAppId }]
  })
}