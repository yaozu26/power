import { onMounted, onUnmounted } from 'vue'
import _ from 'lodash'

export default function useScalePage(option) {
  const resizeFn = _.throttle(function () {
    triggerScale()
  }, 100)

  onMounted(() => {
    triggerScale()
    window.addEventListener('resize', resizeFn)
  })


  onUnmounted(()=>{
    window.removeEventListener('resize', resizeFn)
  })

  // 大屏的适配
  function triggerScale() {
    let targetX = option.targetX || 1920
    let targetY = option.targetY || 1080
    let targetRatio = option.targetRatio || targetX / targetY

    let currentX = document.documentElement.clientWidth || document.body.clientWidth
    let currentY = document.documentElement.clientHeight || document.body.clientHeight

    let scaleRatio = currentX / targetX
    let currentRatio = currentX / currentY

    if (currentRatio > targetRatio) {
      scaleRatio = currentY / targetY
      document.body.style = `width:${targetX}px;height: ${targetY}px;transform: scale(${scaleRatio}) translate(-50%);left: 50%;`
    } else {
      document.body.style = `width:${targetX}px;height: ${targetY}px; transform: scale(${scaleRatio})`
    }
  }
}

