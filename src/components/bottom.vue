<script setup>
  import { nextTick, onMounted, watch } from 'vue';
  import { CountUp } from 'countup.js'

  const props = defineProps({
    AnalysisListData: {
      type: Array,
      default: () => []
    }
  })

  watch(() => props.AnalysisListData, (newV, oldV) => {
    // nextTick：下一次dom更新完成之后才会回调这个函数
    nextTick(() => {
      startAnima(newV)
    })
  })

  onMounted(() => {
    startAnima(props.AnalysisListData)
  })

  // ------封装函数-------
  function startAnima(arrList) {
    if(!arrList) {
      return
    }

    const option1 = {
      decimalPlaces: 1,
      duration: 2,
      useGrouping: false
    }
    const option2 = {
      decimalPlaces: 1,
      duration: 2,
      useGrouping: false,
      suffix: '%'
    }

    arrList.forEach(item => {
      new CountUp(`total-num-${item.id}`, item.totalNum, option1).start()
      new CountUp(`percentage-${item.id}`, item.percentage, option2).start()
    })
  }
</script>

<template>
  <div class="bottom-content">
    <template v-for="item in AnalysisListData" :key="item.id">
      <div class="item">
        <div class="item-left">
          <div class="title">{{ item.title }}</div>
          <div class="text">
            <span :id="`total-num-${item.id}`" class="num">{{ item.totalNum }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
        <div class="item-right">
          <span :class="item.isUp ? 'down-triangle' : 'up-triangle'"></span>
          <span :id="`percentage-${item.id}`" :style="{color: item.isUp ? 'red' : 'green'}">{{ item.percentage }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
  .bottom-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      position: relative;
      width: 100%;
      padding-left: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item-left {
        .title {
          padding-bottom: 16px;
          font-size: 18px;
          color: #fff;
        }
        .text {
          color: rgb(14, 135, 231);
          .num {
            font-size: 36px;
            font-weight: 700;
          }
          .unit {
            padding-left: 3px;
            font-size: 22px;
          }
        }
      }
      .item-right {
        position: absolute;
        right: 0;
        bottom: 6px;
        font-size: 18px;
        .down-triangle {
          position: absolute;
          left: -18px;
          bottom: 8px;

          border: 6px solid transparent;
          border-bottom-color: red;
        }
        .up-triangle {
          position: absolute;
          left: -18px;
          top: 8px;

          border: 6px solid transparent;
          border-top-color: green;
        }
      }
    }
  }
</style>
