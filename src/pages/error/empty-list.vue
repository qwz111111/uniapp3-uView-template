<template>
  <div>
    <div class="mx-auto pt-36 w-52 m-a">
      <img
        src="@/assets/images/dev.png"
        class="w-full object-contain"
        alt="500"
      />
      <p class="mt-1 text-center text-gray-600">
        暂无相关搜索结果，请更换关键字搜索
      </p>
    </div>
    <div class="mt-6 mx-4 px-1">
      <div class="flex justify-between items-center py-4">
        <p>应用归属单位</p>
        <p>余杭区农业农村局</p>
      </div>
      <div class="flex justify-between items-center py-4">
        <p>应用管理员</p>
        <p>刘坚</p>
      </div>
      <div class="flex justify-between items-center py-4">
        <p>联系方式</p>
        <p>13093704316</p>
      </div>
    </div>
    <div class="flex justify-center items-center mt-6">
         
      <van-button type="primary" @click="router.push('/index')"
        >返回首页 </van-button
      > 
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped lang="less"></style>
