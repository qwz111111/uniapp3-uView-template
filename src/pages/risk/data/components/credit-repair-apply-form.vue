<template>
  <view class="form-container">
    <view class="form-warp">
      <up-form
        ref="refForm"
        labelWidth="100"
        :model="formData"
        :rules="formRules"
      >
        <up-form-item label="小店名称" prop="storeName" :borderBottom="true">
          <up-input
            v-model="formData.storeName"
            placeholder="请输入小店名称"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="法定代表人" prop="legaler" :borderBottom="true">
          <up-input
            v-model="formData.legaler"
            placeholder="请输入法定代表人"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="联系人" prop="applier" :borderBottom="true">
          <up-input
            v-model="formData.applier"
            placeholder="请输入联系人"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="联系电话" prop="mobile" :borderBottom="true">
          <up-input
            v-model="formData.mobile"
            type="number"
            placeholder="请输入联系电话"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item
          label="社会信用代码"
          prop="creditCode"
          :borderBottom="true"
        >
          <up-input
            v-model="formData.creditCode"
            placeholder="请输入社会信用代码"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="身份证号" prop="idNumber" :borderBottom="true">
          <up-input
            v-model="formData.idNumber"
            type="idcard"
            placeholder="请输入身份证号"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="登记机关" prop="registration" :borderBottom="true">
          <up-input
            v-model="formData.registration"
            placeholder="请输入登记机关"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item
          label="修复事项"
          prop="repairType"
          :borderBottom="true"
          @click="showRepairType = true"
        >
          <up-input
            v-model="formData.repairType"
            placeholder="请选择修复事项"
            border="none"
            readonly
          ></up-input>
          <template #right>
            <up-icon name="arrow-right"></up-icon>
          </template>
        </up-form-item>

        <up-form-item label="申请理由" prop="applyContent" :borderBottom="true">
          <up-textarea
            v-model="formData.applyContent"
            placeholder="请输入申请理由"
            border="none"
            customStyle="padding: 0;"
            :count="true"
          ></up-textarea>
        </up-form-item>

        <up-form-item
          label="经营地址"
          prop="townName"
          :borderBottom="true"
          @click="showCity = true"
        >
          <up-input
            :modelValue="
              formData.townName &&
              `${formData.townName} ${formData.communityName}`
            "
            placeholder="请选择经营地址所在镇街村社"
            border="none"
            readonly
          ></up-input>
          <template #right>
            <up-icon name="arrow-right"></up-icon>
          </template>
        </up-form-item>

        <up-form-item
          label="门牌号"
          prop="businessAddress"
          :borderBottom="true"
        >
          <up-input
            v-model="formData.businessAddress"
            placeholder="请输入经营地址所在门牌号"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="决定文书号" prop="writtenNo" :borderBottom="true">
          <up-input
            v-model="formData.writtenNo"
            placeholder="请输入决定文书号"
            border="none"
          ></up-input>
        </up-form-item>

        <up-form-item label="信用修复附件" prop="filePath">
          <up-upload
            name="filePath"
            accept="image"
            :fileList="formData.filePath"
            :maxCount="9"
            :previewFullImage="true"
            :multiple="false"
            @afterRead="afterRead"
            @delete="deleteFile"
          ></up-upload>
        </up-form-item>
      </up-form>
    </view>
    <view class="form-button">
      <up-button text="提交" type="primary" @click="onSubmit"></up-button>
    </view>
    <up-picker
      ref="refPicker"
      :show="showCity"
      :columns="columnsCity"
      @confirm="confirmCity"
      @cancel="showCity = false"
      @change="changeCity"
    ></up-picker>
    <up-picker
      :show="showRepairType"
      :columns="columnsRepairType"
      @confirm="confirmRepairType"
      @cancel="showRepairType = false"
    ></up-picker>
  </view>
</template>

<script setup>
import { request } from '@/utils/request.js'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['deleteFile', 'submit'])

const props = defineProps({
  modelValue: Object
})

let regionBasisNode = []

const refForm = ref(null)
const refPicker = ref(null)
const formData = ref({
  applier: '',
  mobile: '',
  storeName: '',
  registration: '',
  repairType: '',
  repairTypeValue: '',
  applyContent: '',
  creditCode: '',
  legaler: '',
  idNumber: '',
  townName: '',
  townCode: '',
  communityName: '',
  communityCode: '',
  businessAddress: '',
  writtenNo: '',
  filePath: []
})
const formRules = ref({
  applier: [
    {
      type: 'string',
      required: true,
      message: '联系人不能为空',
      trigger: ['blur', 'change']
    }
  ],
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
  storeName: [
    {
      type: 'string',
      required: true,
      message: '小店名称不能为空',
      trigger: ['blur', 'change']
    }
  ],
  registration: [
    {
      type: 'string',
      required: true,
      message: '登记机关不能为空',
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
  creditCode: [
    {
      required: true,
      message: '社会信用代码不能为空',
      trigger: ['blur', 'change']
    }
  ],
  legaler: [
    {
      required: true,
      message: '法定代表人不能为空',
      trigger: ['blur', 'change']
    }
  ],
  idNumber: [
    {
      type: 'string',
      required: true,
      message: '身份证号不能为空',
      trigger: ['blur', 'change']
    },
    {
      message: '身份证号格式错误',
      validator: (rule, value) => {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        return reg.test(value)
      },
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
  businessAddress: [
    {
      type: 'string',
      required: true,
      message: '经营地址不能为空',
      trigger: ['blur', 'change']
    }
  ],
  writtenNo: [
    {
      required: true,
      message: '决定文书号不能为空',
      trigger: ['blur', 'change']
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
const columnsRepairType = ref([
  [
    { text: '行政处罚公示信息', value: 1 },
    { text: '严重违法失信名单', value: 2 }
  ]
])

onMounted(() => {
  refForm.value.setRules(formRules.value)
  getAddress()
})

const confirmRepairType = e => {
  showRepairType.value = false
  formData.value.repairType = e.value[0].text
  formData.value.repairTypeValue = e.value[0].value
}
/* 选择镇村 */
const changeCity = e => {
  const { columnIndex, index, picker = refPicker.value } = e
  if (columnIndex === 0) {
    picker.setColumnValues(
      1,
      regionBasisNode[index].child.map(item => item.communityName)
    )
  }
}
const confirmCity = e => {
  formData.value.townName = e.value[0]
  formData.value.townCode = regionBasisNode.find(
    item => item.townName === e.value[0]
  ).townCode

  formData.value.communityName = e.value[1]
  formData.value.communityCode = regionBasisNode
    .find(item => item.townName === e.value[0])
    .child.find(el => el.communityName === e.value[1]).communityCode
  showCity.value = false
  console.log(formData.value)
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
const afterRead = e => {
  formData.value[e.name].push(e.file)
}
/* 文件删除 */
const deleteFile = e => {
  emit('deleteFile', e)
  formData.value[e.name].splice(e.index, 1)
}
/* 点击提交按钮 */
const onSubmit = () => {
  refForm.value
    .validate()
    .then(() => emit('submit', formData.value))
    .catch(() => uni.$u.toast('校验失败'))
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
