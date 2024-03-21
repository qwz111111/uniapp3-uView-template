<template>
  <view class="page-container">
    <view class="page-search">
      <u-search
        placeholder="请输入异议内容"
        v-model="condition"
        @search="onSearch"
        @custom="onSearch"
      ></u-search>
    </view>
    <view class="page-tabs">
      <u-tabs
        :current="current"
        :list="stateList"
        @click="onTabsClick"
      ></u-tabs>
    </view>
    <view class="page-warp">
      <template v-if="list.length === 0">
        <u-empty mode="list" marginTop="100" text="信用修复信息没有数据">
        </u-empty>
      </template>
      <template v-else>
        <view
          v-for="(creditRepairApply, index) in list"
          :key="index"
          class="list-item"
        >
          <view class="tag">
            {{
              stateList.find(item => item.state == creditRepairApply.applyState)
                .name
            }}
          </view>
          <view class="item-title">{{ creditRepairApply.repairType }}</view>
          <view class="item-i"
            >提交时间：{{ creditRepairApply.applyDate }}</view
          >
          <view class="item-i"
            >提交时间：{{ creditRepairApply.applyDate }}</view
          >
          <view class="item-i"
            >提交时间：{{ creditRepairApply.applyDate }}</view
          >
          <view class="item-btn flex justify-end items-center">
            <view>
              <u-button
                text="查看"
                size="mini"
                type="primary"
                @click="onInfo(creditRepairApply.id)"
              >
              </u-button>
            </view>
            <view>
              <u-button
                text="修改"
                size="mini"
                type="primary"
                @click="onEdit(creditRepairApply.id)"
              >
              </u-button>
            </view>
            <view>
              <u-button
                text="删除"
                size="mini"
                type="error"
                @click="onDelete(creditRepairApply.id, index)"
              >
              </u-button>
            </view>
          </view>
        </view>
        <u-loadmore nomoreText="信用修复信息已经显示完全" status="nomore" />
      </template>
    </view>
    <view class="page-button">
      <u-button
        type="primary"
        text="信用修复"
        shape="circle"
        @click="onAdd"
      ></u-button>
    </view>
  </view>
</template>
<script setup>
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
import { request } from '@/utils/request.js'

const current = ref(0)
const stateList = reactive([
  { name: '全部', state: '' },
  { name: '申请中', state: '1' },
  { name: '受理退回', state: '2' },
  { name: '受理中', state: '3' },
  { name: '核实处理', state: '4' },
  { name: '已反馈', state: '5' }
])
const currentPage = ref(1)
const list = ref([
  {
    applyState: 1,
    repairType: '标题标题标题标题标题标题',
    applyDate: '2023-01-11'
  },
  {
    applyState: 2,
    repairType: '标题标题标题标题',
    applyDate: '2023-01-11'
  },
  {
    applyState: 3,
    repairType: '标题标题标题',
    applyDate: '2023-01-11'
  },
  {
    applyState: 1,
    repairType: '标题标题标题标题标题标题',
    applyDate: '2023-01-11'
  },
  {
    applyState: 2,
    repairType: '标题标题标题标题',
    applyDate: '2023-01-11'
  },
  {
    applyState: 3,
    repairType: '标题标题标题',
    applyDate: '2023-01-11'
  }
])
const condition = ref('')

/* 页面初始化的处理函数 */
onLoad(() => {
  creditRepairApplyPageInfo()
})

/* 页面上拉触底事件的处理函数 */
onReachBottom(() => {
  creditRepairApplyPageInfo()
})

/* 搜素 */
const onSearch = () => {
  currentPage.value = 1
  list.value = []
  creditRepairApplyPageInfo()
}

/* 查看记录 */
const onInfo = id => {
  uni.navigateTo({
    url: `/pages/risk/data/credit-repair-apply-info?creditRepairApply.Id=${id}`
  })
}

/* 编辑记录 */
const onEdit = id => {
  uni.navigateTo({
    url: `/pages/risk/data/credit-repair-apply-edit?creditRepairApply.Id=${id}`
  })
}

/* 删除记录 */
const onDelete = (id, index) => {
  uni.showModal({
    title: '提示',
    content: '是否删除该条信息？',
    success: res => {
      if (res.confirm) {
        request('/creditRepairApplyDeleteUploadAttach.action', {
          'creditRepairApply.Id': id
        }).then(res => {
          list.value.splice(index, 1)
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
        })
      }
    }
  })
}

/* 改变 */
const onTabsClick = tab => {
  current.value = tab.index
  currentPage.value = 1
  list.value = []
  creditRepairApplyPageInfo()
}

/* 新增 */
const onAdd = () => {
  uni.navigateTo({
    url: `/pages/risk/data/credit-repair-apply-add`
  })
}

/* 获取申请贷款分页查询信息 */
const creditRepairApplyPageInfo = () => {
  const params = {
    currentPage: currentPage.value,
    condition: condition.value,
    applyStateSearch: stateList[current.value].state
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
.page-container {
  min-height: 100vh;
  padding-bottom: calc(env(safe-area-inset-bottom) + 100rpx);
  background-color: $uni-bg-color-grey;
  box-sizing: border-box;

  .page-search {
    padding: $uni-spacing-row-sm $uni-spacing-row-base;
    background-color: $uni-bg-color;
  }

  .page-tabs {
    background-color: $uni-bg-color;
  }

  .list-item {
    position: relative;
    margin: $uni-spacing-col-base $uni-spacing-row-base;
    background-color: $uni-bg-color;
    border-radius: $uni-border-radius-lg;
    padding: $uni-spacing-col-base $uni-spacing-row-base;
    box-sizing: border-box;
    overflow: hidden;

    .tag {
      position: absolute;
      top: 0;
      right: 0;
      background-color: $uni-color-primary;
      color: white;
      font-size: 24rpx;
      border-bottom-left-radius: $uni-border-radius-lg;
      padding: 4rpx $uni-spacing-row-sm;
    }

    .item-title {
      font-size: 28rpx;
      font-weight: bold;
      margin-bottom: $uni-spacing-col-sm;
      width: 80%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    .item-i {
      font-size: 26rpx;
      color: $uni-text-color-grey;
      margin-bottom: $uni-spacing-col-sm;
    }

    .item-btn {
      margin-top: $uni-spacing-col-lg;

      > view {
        margin-left: $uni-spacing-row-base;
      }
    }
  }

  .page-button {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom) + $uni-spacing-col-lg);
    width: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
