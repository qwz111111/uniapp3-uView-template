<template>
  <view class="form-container">
    <view class="form-warp">
      <u-form
        ref="refForm"
        labelWidth="100"
        :model="creditRepairApply"
        :rules="creditRepairApplyRules"
      >
        <u-form-item label="联系电话" prop="mobile" :borderBottom="true">
          <u-input
            v-model="creditRepairApply.mobile"
            type="number"
            placeholder="请输入联系电话"
            border="none"
          ></u-input>
        </u-form-item>

        <u-form-item
          label="修复事项"
          prop="repairType"
          :borderBottom="true"
          @click="showRepairType = true"
        >
          <u-input
            v-model="creditRepairApply.repairType"
            placeholder="请选择修复事项"
            border="none"
            readonly
          ></u-input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>

        <u-form-item label="申请理由" prop="applyContent" :borderBottom="true">
          <u-textarea
            v-model="creditRepairApply.applyContent"
            placeholder="请输入申请理由"
            border="none"
            customStyle="padding: 0;"
            :count="true"
          ></u-textarea>
        </u-form-item>

        <u-form-item
          label="经营地址"
          prop="townName"
          :borderBottom="true"
          @click="showCity = true"
        >
          <u-input
            :modelValue="
              creditRepairApply.townName &&
              `${creditRepairApply.townName} ${creditRepairApply.communityName}`
            "
            placeholder="请选择经营地址所在镇街村社"
            border="none"
            readonly
          ></u-input>
          <template #right>
            <u-icon name="arrow-right"></u-icon>
          </template>
        </u-form-item>

        <u-form-item label="信用修复附件" prop="filePath">
          <u-upload
            name="filePath"
            accept="image"
            :fileList="creditRepairApply.filePath"
            :maxCount="9"
            :previewFullImage="true"
            :multiple="false"
            @afterRead="onAfterRead"
            @delete="onDeleteFile"
          ></u-upload>
        </u-form-item>
      </u-form>
    </view>
    <view class="form-button">
      <u-button text="提交" type="primary" @click="onSubmit"></u-button>
    </view>

    <u-picker
      ref="refPicker"
      :show="showCity"
      :columns="columnsCity"
      @confirm="onConfirmCity"
      @cancel="showCity = false"
      @change="onChangeCity"
    ></u-picker>
    <u-picker
      :show="showRepairType"
      :columns="columnsRepairType"
      @confirm="onConfirmRepairType"
      @cancel="showRepairType = false"
    ></u-picker>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { transDate } from '@/utils/util.js'
import { request, uploadFile } from '@/utils/request.js'

let regionBasisNode = []

const refForm = ref(null)
const refPicker = ref(null)
const creditRepairApply = reactive({
  mobile: '',
  repairType: '',
  repairTypeValue: '',
  applyContent: '',
  townName: '',
  townCode: '',
  communityName: '',
  communityCode: '',
  filePath: []
})
const creditRepairApplyRules = reactive({
  mobile: [
    {
      type: 'number',
      required: true,
      message: '联系电话不能为空',
      trigger: ['blur', 'change']
    },
    {
      validator: (rule, value) => {
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        return reg.test(value)
      },
      message: '联系电话不正确',
      trigger: ['blur', 'change']
    }
  ],
  repairType: [
    {
      required: true,
      message: '修复事项不能为空',
      trigger: ['change']
    }
  ],
  applyContent: [
    {
      required: true,
      message: '申请理由不能为空',
      trigger: ['blur', 'change']
    }
  ],
  townName: [
    {
      type: 'string',
      required: true,
      message: '经营地址不能为空',
      trigger: ['change']
    }
  ],
  communityName: [
    {
      type: 'string',
      required: true,
      message: '经营地址不能为空',
      trigger: ['change']
    }
  ],
  filePath: [
    {
      type: 'array',
      required: true,
      message: '异议附件不能为空',
      trigger: ['blur', 'change']
    },
    {
      message: '需要上传信用修复申请书,守信承诺书',
      validator: (rule, value) => {
        return value.length >= 2
      },
      trigger: ['blur', 'change']
    }
  ]
})
const showCity = ref(false)
const columnsCity = ref([])
const showRepairType = ref(false)
const columnsRepairType = reactive([
  [
    { text: '行政处罚公示信息', value: 1 },
    { text: '严重违法失信名单', value: 2 }
  ]
])

onMounted(() => {
  refForm.value.setRules(creditRepairApplyRules)
  getAddress()
})

const onConfirmRepairType = e => {
  showRepairType.value = false
  creditRepairApply.repairType = e.value[0].text
  creditRepairApply.repairTypeValue = e.value[0].value
}
/* 选择镇村 */
const onChangeCity = e => {
  const { columnIndex, index, picker = refPicker.value } = e
  if (columnIndex === 0) {
    picker.setColumnValues(
      1,
      regionBasisNode[index].child.map(item => item.communityName)
    )
  }
}
const onConfirmCity = e => {
  creditRepairApply.townName = e.value[0]
  creditRepairApply.townCode = regionBasisNode.find(
    item => item.townName === e.value[0]
  ).townCode

  creditRepairApply.communityName = e.value[1]
  creditRepairApply.communityCode = regionBasisNode
    .find(item => item.townName === e.value[0])
    .child.find(el => el.communityName === e.value[1]).communityCode
  showCity.value = false
}
// 获取镇村
const getAddress = () => {
  request('/regionBasisInfo.action').then(res => {
    regionBasisNode = res.regionBasisNode
    let arr = res.regionBasisNode.map(item => item.townName)
    let arr2 = res.regionBasisNode[0].child.map(item => item.communityName)
    columnsCity.value[0] = arr
    columnsCity.value[1] = arr2
  })
}
/* 文件上传 */
const onAfterRead = e => {
  creditRepairApply[e.name].push(e.file)
}
/* 文件删除 */
const onDeleteFile = e => {
  creditRepairApply[e.name].splice(e.index, 1)
}
/* 点击提交按钮 */
const onSubmit = () => {
  refForm.value
    .validate()
    .then(() => {
      creditRepairApplyAddSave()
    })
    .catch(() => uni.$u.toast('校验失败'))
}

const creditRepairApplyAddSave = () => {
  const params = {
    'creditRepairApply.mobile': creditRepairApply.mobile,
    'creditRepairApply.repairType': creditRepairApply.repairType,
    'creditRepairApply.repairTypeValue': creditRepairApply.repairTypeValue,
    'creditRepairApply.applyContent': creditRepairApply.applyContent,
    'creditRepairApply.townName': creditRepairApply.townName,
    'creditRepairApply.townCode': creditRepairApply.townCode,
    'creditRepairApply.writtenDate': transDate(void 0, 'yyyy-MM-dd'),
    'creditRepairApply.communityName': creditRepairApply.communityName,
    'creditRepairApply.communityCode': creditRepairApply.communityCode
  }
  request('/creditRepairApplyAddSave.action', params)
    .then(res => {
      upload(res.creditRepairApplyID, creditRepairApply.filePath)
    })
    .catch(err => console.error(err))
}
/* 循环提交文件 */
const upload = (creditRepairApplyID, files, index = 0) => {
  if (files.length <= index) {
    return uni.showModal({
      title: '温馨提示',
      content: '提交成功',
      showCancel: false,
      success: () => {
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        prevPage.$vm.creditRepairApplySearch()
        uni.navigateBack({ delta: 1 })
      }
    })
  }
  const params = {
    'creditRepairApply.id': creditRepairApplyID,
    'creditRepairApplyDatum.datumName': files[index].name
  }
  uploadFile(
    '/creditRepairApplyUploadAttach.action',
    files[index].url,
    params,
    void 0,
    'uploadAttach'
  )
    .then(res => {
      upload(creditRepairApplyID, files, index + 1)
    })
    .catch(err => console.error(err))
}
</script>
<style scoped lang="scss">
.form-container {
  min-height: 100vh;
  padding: $uni-spacing-col-lg $uni-spacing-row-lg 0;
  box-sizing: border-box;
  background-color: $uni-bg-color-grey;
  .form-warp {
    padding: 0 $uni-spacing-row-base;
    border-radius: $uni-border-radius-lg;
    box-sizing: border-box;
    background-color: $uni-bg-color;
  }
  .form-button {
    margin-top: calc($uni-spacing-col-lg * 2);
    padding-bottom: calc(env(safe-area-inset-bottom) + $uni-spacing-col-lg);
  }
}
</style>
