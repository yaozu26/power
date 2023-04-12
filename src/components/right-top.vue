<script setup>
  import wallBall from './wall-ball.vue';

  const props = defineProps({
    percentage: {
      type: Number,
      default: 0
    },
    chargingTop4Data: {
      type: Array,
      default: () => []
    }
  })
</script>

<template>
  <div class="content">
    <div class="left">
      <wallBall :percentage="percentage"/>
    </div>
    <div class="right">
      <template v-for="item in chargingTop4Data" :key="item.id">
        <div class="city-item">
          <span class="circle"></span>
          <span class="text">{{ item.name }}</span>
          <span class="percentage">{{ item.percentage }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .left {
      width: 66.7%;
    }
    .right {
      height: 70%;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .city-item {
        font-size: 20px;
        .circle {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-color: aqua;
          border-radius: 50%;
        }
        .text {
          padding: 0 10px;
          color: #fff;
        }
        .percentage {
          color: rgb(14, 135, 231);
        }
      }
    }
  }
</style>
