<template>
  <view class="base-error">
    <view class="header">
      <image :src="imageSrc" mode="widthFix" alt="dev" />
      <view>{{ modeText }}</view>
    </view>
    <view class="info">
      <view>
        <view>应用归属单位</view>
        <view>{{ unit }}</view>
      </view>
      <view>
        <view>应用管理员</view>
        <view>{{ admin }}</view>
      </view>
      <view>
        <view>联系方式</view>
        <view>{{ phone }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    required: true,
    validator: val => {
      const legalValue = [
        '404',
        '500',
        'auth',
        'dev',
        'empty-list',
        'empty',
        'network'
      ]
      if (legalValue.indexOf(val) !== -1) {
        return true
      } else {
        throw new Error(
          `你的值是"${val}",mode的值只能是${legalValue.join('|')}`
        )
      }
    }
  },
  unit: { type: String, default: '市场监管局和发改局' },
  admin: { type: String, default: '监管局，发改局' },
  phone: { type: String, default: '0574-65722471' }
})

const imageSrc = computed(() => {
  const mode = {
    404: '/static/components/404.png',
    500: '/static/components/500.png',
    auth: '/static/components/500.png',
    dev: '/static/components/dev.png',
    'empty-list': '/static/components/dev.png',
    empty: '/static/components/dev.png',
    network: '/static/components/404.png'
  }
  return mode[props.mode]
})

const modeText = computed(() => {
  const mode = {
    404: '抱歉，系统错误，您可以选择尝试清除缓存或联系管理员',
    500: '抱歉，系统错误，您可以选择尝试清除缓存或联系管理员',
    auth: '抱歉，您暂无当前页面的访问权限，请联系管理员',
    dev: '正在建设中，敬请期待',
    'empty-list': '暂无相关搜索结果，请更换关键字搜索',
    empty: '暂无相关内容，请退回上一页',
    network: '网络错误，请检查网络连接是否正常'
  }
  return mode[props.mode]
})
</script>
<style scoped lang="scss">
.base-error {
  font-size: $uni-font-size-base;
  .header {
    padding-top: 270rpx;
    width: 390rpx;
    margin-left: auto;
    margin-right: auto;
    image {
      object-fit: contain;
      width: 100%;
    }
    view {
      text-align: center;
      margin-top: 7.5rpx;
      color: $uni-text-color-grey;
    }
  }
  .info {
    padding-left: 7.5rpx;
    padding-right: 7.5rpx;
    margin-top: 45rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
    > view {
      padding-top: 30rpx;
      padding-bottom: 30rpx;
      justify-content: space-between;
      align-items: center;
      display: flex;
    }
  }
}
</style>
