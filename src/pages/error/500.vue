<template>
  <div>
    <div class="mx-auto pt-36 w-52 m-a">
      <img
        src="@/assets/images/500.png"
        class="w-full object-contain"
        alt="500"
      />
      <p class="mt-1 text-center text-gray-600">
        抱歉，系统错误，您可以选择尝试清除缓存或联系管理员
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
