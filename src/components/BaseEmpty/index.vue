<template>
  <up-empty :mode="mode" :icon="icon" :text="text" :margin-top="marginTop">
    <slot></slot>
  </up-empty>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    validator: value =>
      ['car', 'order', 'data', 'permission', '404', 'search', 'list'].includes(
        value
      )
  },
  text: {
    type: String,
    default: ''
  },
  marginTop: {
    type: Number,
    default: 0
  }
})

const icon = computed(() => {
  return `/static/components/${props.mode}.jpg`
})
</script>
<style lang="scss" scoped></style>
