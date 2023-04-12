<script setup>
  import { ref, onMounted, watch } from 'vue'
  import useEcharts from '../hooks/useEcharts';

  const props = defineProps({
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    echartsData: {
      type: Array,
      default: () => []
    }
  })

  watch(() => props.echartsData, (newV, oldV) => {
    // 侦听数据的变化
    setupEchart(newV)
  })

  const divRef = ref(null)
  let yzChart = null

  onMounted(() => {
    setupEchart(props.echartsData)
  })

  // ------封装函数-------
  function setupEchart(echartData) {
    if(!yzChart) {
      yzChart = useEcharts(divRef.value)
    }
    let option = getOption(echartData)
    yzChart.setOption(option)
  }

  function getOption(echartsData = []) {
    let color = echartsData.map((item) => {
      return item.color
    })

    let total = echartsData.reduce((a, b) => {
      return a + b.value * 1
    }, 0)

    let data = echartsData.map(item => {
      return {
        value: item.value,
        name: item.name
      }
    })

    let option = {
      color: color,
      title: {
        text: `{nameSty| 充电桩总数}\n{number| ${total}}`,
        top: "50%",
        left: "30%",
        textStyle: {
          rich: {
            nameSty: {
              fontSize: 19,
              color: "white",
              padding: [10, 0]
            },
            number: {
              fontSize: 24,
              color: "white",
              padding: [4, 0, 0, 20]
            }
          }
        }
      },
      legend: {
        orient: "vertical",
        right: "10%",
        top: "18%",
        itemGap: 10,
        itemWidth: 16,
        itemHeight: 16,
        icon: "rect",
        formatter: function (name) {
          let currentItem = echartsData.find((item) => item.name === name)
          return (
            "{nameSty|" + currentItem.name + "}\n" + "{numberSty|"+ currentItem.value +"个}"
            + "{preSty|"+ currentItem.percentage +"}"
          )
        }
      },
      textStyle: {
        rich: {
          nameSty: {
            fontSize: 12,
            color: "#FFFFFF",
            padding: [10, 14],
          },
          numberSty: {
            fontSize: 12,
            color: "#40E6ff",
            padding: [0, 0, 0, 14],
          },
          preSty: {
            fontSize: 12,
            color: "#40E6ff",
          },
        },
      },
      series: [
        {
          type: 'pie',
          center: ['40%', '57%'],
          radius: ['30%', '75%'],
          label: {
            show: false
          },
          data: data,
          roseType: 'area'
        }
      ]
    }
    return option
  }


</script>

<template>
  <!-- echarts的容器 -->
  <div ref="divRef" :style="{ width: width, height: height }"></div>
</template>

<style lang="less" scoped></style>
