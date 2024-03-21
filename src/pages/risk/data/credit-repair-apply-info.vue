<template>
  <view class="container">
    <view class="cell">
      <u-cell-group title="信用修复">
        <u-cell
          v-for="(creditRepairApply, index) in creditRepairApplyList"
          :key="index"
          :border="index !== creditRepairApplyList.length - 1"
        >
          <template #title>
            <view style="flex: 1">{{ creditRepairApply[0] }}：</view>
          </template>
          <template #value>
            <view style="flex: 3">{{ creditRepairApply[1] }}</view>
          </template>
        </u-cell>
      </u-cell-group>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { request } from '@/utils/request.js'
import { onLoad } from '@dcloudio/uni-app'

const creditRepairApplyList = ref([
  ['商户名称', '象山丹东临溪文体用品店'],
  ['商户名称', '象山丹东临溪文体用品店'],
  ['商户名称', '象山丹东临溪文体用品店'],
  ['商户名称', '象山丹东临溪文体用品店'],
  ['商户名称', '象山丹东临溪文体用品店']
])

onLoad(options => {
  creditRepairApplyPageInfo(options['creditRepairApply.Id'])
})

const creditRepairApplyPageInfo = id => {
  const params = {
    'creditRepairApply.Id': id
  }
  request('/creditRepairApplyPageInfo.action', params)
    .then(res => {
      if (list.value.length === 0) {
        list.value = res.creditRepairApplyNode
      } else {
        list.value = list.value.concat(res.creditRepairApplyNode)
      }
    })
    .catch(err => console.error(err))
}
</script>
<style scoped lang="scss">
::v-deep .u-cell-group__title > .u-cell-group__title__text {
  color: $uni-color-primary;
}
.container {
  min-height: 100vh;
  padding: $uni-spacing-col-lg $uni-spacing-row-lg
    calc(env(safe-area-inset-bottom) + 100rpx);
  background-color: $uni-bg-color-grey;
  box-sizing: border-box;
  .cell {
    border-radius: $uni-border-radius-lg;
    background-color: #fff;
  }
}
</style>
