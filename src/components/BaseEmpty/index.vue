<template>
  <view class="base-empty">
    <image class="empty-image" :src="imageSrc" mode="aspectFill"> </image>
    <view class="empty-title">{{ title }}</view>
    <view class="empty-subtitle" v-if="subtitle">{{ subtitle }}</view>
    <view class="empty-btn" v-if="text">
      <u-button :text="text" type="primary" @click="onClick"> </u-button>
    </view>
  </view>
</template>

<script>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  mode: {
    type: String,
    default: 'success',
    validator: val => {
      const legalValue = ['success', 'fail', 'under']
      if (legalValue.indexOf(val) !== -1) {
        return true
      } else {
        throw new Error(
          `你的值是"${val}",mode的值只能是${legalValue.join('|')}`
        )
      }
    }
  },
  title: { type: String, default: '审核通过' },
  subtitle: { type: String, default: '' },
  text: { type: String, default: '' }
})

const imageSrc = computed(() => {
  const mode = {
    success: '/static/components/success.png',
    fail: '/static/components/fail.png',
    under: '/static/components/under.png'
  }
  return mode[props.mode]
})

const onClick = () => emit('click')
</script>
<style scoped lang="scss">
.base-empty {
  .empty-image {
    width: 200rpx;
    height: 200rpx;
    margin: 15vh auto 0;
    display: block;
  }
  .empty-title {
    text-align: center;
    font-size: $uni-font-size-xl;
    margin-top: 30rpx;
    color: $uni-color-title;
  }
  .empty-subtitle {
    text-align: center;
    margin-top: $uni-spacing-col-lg;
    font-size: 30rpx;
    color: $uni-color-subtitle;
  }
  .empty-btn {
    width: 80%;
    margin: 100rpx auto;
  }
}
</style>
