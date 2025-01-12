import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'

const design = {
  width: 1366,
  height: 1024
}

export const deviceSize = defineStore('deviceSize', () => {
  const deviceWidth = ref(design.width)
  const deviceHeight = ref(design.height)
  const aspectRatio = ref(design.width / design.height)
  const aspectRatioDesign = ref(design.width / design.height)
  const scale = ref(1)

  function getSize() {
    deviceWidth.value = document.documentElement.clientWidth
    deviceHeight.value = document.documentElement.clientHeight
    aspectRatio.value = deviceWidth.value / deviceHeight.value
    if (aspectRatio.value > aspectRatioDesign.value) {
      scale.value = deviceHeight.value / design.height
    } else {
      scale.value = deviceWidth.value / design.width
    }
  }

  onMounted(() => {
    getSize();
    window.addEventListener('resize', getSize);
  })

  return { deviceWidth, deviceHeight, aspectRatio, aspectRatioDesign, scale, design }
})