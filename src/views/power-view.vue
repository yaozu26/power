<script setup>
  import { onMounted, ref } from 'vue';
  import pieEcharts from '../components/pie-echarts.vue';
  import lineEcharts from '../components/line-echarts.vue';
  import barEcharts from '../components/bar-echarts.vue';
  import centerSvg from '../components/center-svg.vue';
  import bottom from '../components/bottom.vue';
  import rightTop from '../components/right-top.vue';
  import rightBottom from '../components/right-bottom.vue';
  import { 
    chargingPileData, 
    processMonitoringData, 
    chargingStatisticsData,
    exceptionMonitoringData 
  } from './config/home-data'
  import { getPowerScreenData } from '../services';

  const chargingPile = ref(chargingPileData)
  const processMonitoring = ref(processMonitoringData)
  const chargingStatistics = ref(chargingStatisticsData)
  const exceptionMonitoring = ref(exceptionMonitoringData)
  const dataAnalysis = ref(null)
  const chargingTop4 = ref(null)
  const totalPercentage = ref(null)

  onMounted(() => {
    getPowerScreenData().then(res => {
      chargingPile.value = res.data.chargingPile.data
      processMonitoring.value = res.data.processMonitoring.data
      chargingStatistics.value = res.data.chargingStatistics.data
      exceptionMonitoring.value = res.data.exceptionMonitoring.data
      dataAnalysis.value = res.data.dataAnalysis.data
      chargingTop4.value = res.data.chargingTop4.data
      totalPercentage.value = res.data.chargingTop4.totalPercentage
    })
  })
</script>

<template>
  <main class="screen-bg">
    <div class="header"></div>

    <div class="left-top">
      <pieEcharts :echartsData="chargingPile"/>
    </div>
    <div class="left-bottom">
      <lineEcharts :echartsData="processMonitoring"/>
    </div>

    <div class="center">
      <centerSvg/>
    </div>
    <div class="bottom">
      <bottom :AnalysisListData="dataAnalysis"/>
    </div>

    <div class="right-top">
      <rightTop :chargingTop4Data="chargingTop4" :percentage="totalPercentage"/>
    </div>
    <div class="right-center">
      <barEcharts :echartsData="chargingStatistics"/>
    </div>
    <div class="right-bottom">
      <rightBottom :dots="exceptionMonitoring"/>
    </div>
  </main>
</template>

<style lang="less" scoped>
  .screen-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/bg.png);

    .header {
      position: absolute;
      top: 21px;
      left: 0;
      right: 0;
      height: 56px;
      background-image: url(@/assets/images/bg_header.svg);
    }

    .left-top {
      position: absolute;
      top: 116px;
      left: 16px;
      width: 536px;
      height: 443px;
      background-image: url(@/assets/images/bg_left-top.svg);
      background-repeat: no-repeat;
    }

    .left-bottom {
      position: absolute;
      bottom: 49px;
      left: 16px;
      width: 536px;
      height: 443px;
      background-image: url(@/assets/images/bg_left_bottom.svg);
      background-repeat: no-repeat;
    }

    .center {
      position: absolute;
      right: 540px;
      bottom: 272px;
      width: 823px;
      height: 710px;
    }

    .bottom {
      position: absolute;
      right: 540px;
      bottom: 49px;
      width: 823px;
      height: 209px;
      background-image: url(@/assets/images/bg_bottom.svg);
      background-repeat: no-repeat;
    }

    .right-top {
      position: absolute;
      right: 17px;
      top: 96px;
      width: 519px;
      height: 327px;
      background-image: url(@/assets/images/bg_right_top.svg);
      background-repeat: no-repeat;
    }

    .right-center {
      position: absolute;
      right: 17px;
      top: 443px;
      width: 519px;
      height: 327px;
      background-image: url(@/assets/images/bg_right_center.svg);
      background-repeat: no-repeat;
    }

    .right-bottom {
      position: absolute;
      right: 17px;
      bottom: 49px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 519px;
      height: 242px;
      background-image: url(@/assets/images/bg_right_bottom.svg);
      background-repeat: no-repeat;
    }
  }
</style>
