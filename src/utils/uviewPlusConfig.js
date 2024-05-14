import { setConfig } from 'uview-plus'

// 调用setConfig方法，方法内部会进行对象属性深度合并，可以放心嵌套配置
// 需要在app.use(uview-plus)之后执行
setConfig({
  // 修改$u.config对象的属性
  config: {
    // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
    unit: 'px'
  },
  // 修改$u.props对象的属性
  props: {
    // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
    button: {
      size: 'large'
    }
    // 其他组件属性配置
    // ......
  }
})
