<script setup>
  import { RouterView } from 'vue-router'
  import useScalePage from '@/hooks/useScalePage'

  let option = {
    targetX: 1920,
    tragetY: 1080,
    targetRatio: 1920 / 1080
  }
  useScalePage(option)

</script>

<template>
  <div class="app">
    <!-- 路由占位 -->
    <router-view />
  </div>
</template>

<style lang="less" scoped></style>
