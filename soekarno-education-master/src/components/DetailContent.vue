<template>
  <!-- <img src="../assets/dev/detail1.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

  <div id="DetailContent" :class="{active: isActive}"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
    >
    <transition>
      <div v-if="isActive" class="dc-box color-primary-light text-right">
        <h3 id="db-title" class="roboto-serif-medium fs-30 lh-42" style="letter-spacing: -0.05rem;">
          {{ item.Sekolah }}
        </h3>
        <h4 id="db-tahun" class="roboto-regular fs-24 lh-28">{{ item.Waktu }}</h4>
      </div>
    </transition>

    <transition>
      <div v-if="isActive" id="vline"></div>
    </transition>

    <div id="content-image">
      <div v-for="(val, key) in data" :key="key">
        <div
          class="d-none"
          :class="{
            'ci-item-top plus': key == index-2,
            'ci-item-top': key == index-1,
            'ci-item-center': key == index,
            'ci-item-bottom': key == index+1,
            'ci-item-bottom plus': key == index+2,
            'left': key % 2 == 1,
            'last': index == dataLength
          }"
        >
          <div class="ci-image" :style="{
            'background-image': 'url(' + val.image_url + ')',
            'background-size': 'cover',
            'background-position': 'left top'
          }"></div>
          <div class="roboto-medium ci-text">{{ val.text }}</div>
        </div>
      </div>

      <NextItem :item="item.nextItem" :index="index" :dataLength="dataLength"></NextItem>
    </div>

    <div id="content-navigation" class="d-flex flex-column" style="width: 52px">
      <img @click="minIndex"
        :src="index == 0 ? arrowUpW : arrowUp"
        style="margin-bottom: 20px;"
      >
      <img @click="plusIndex"
        :src="index >= dataLength ? arrowDownW : arrowDown"
      >
    </div>
  </div>
</template> 

<script setup>
import { computed, defineProps, onMounted, ref, watch } from 'vue';
import { deviceSize } from '../stores/deviceSize';
import arrowUp from '../assets/svg/circle-arrow-up.svg'
import arrowDown from '../assets/svg/circle-arrow-down.svg'
import arrowUpW from '../assets/svg/circle-arrow-w-up.svg'
import arrowDownW from '../assets/svg/circle-arrow-w-down.svg'
import NextItem from '../components/NextItem.vue';

const emit = defineEmits(['update']);
const storeDeviceSize = deviceSize()

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  detailStep: {
    type: Number,
    default: 1
  }
});

const index = ref(0)
const data = computed(() => props.item.highlights);
const startIndex = 0
let scrollReady = true
let startTouch = false
const delayReadyTime = 700

const isActive = computed(() => {
  return props.detailStep == 2
})
const dataLength = computed(() => {
  return data.value.length
})

watch(() => props.detailStep, (val) => {
  scrollReady = false
  setReady()
});

onMounted(() => {
  setReady()
  window.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowUp') {
      minIndex()
    } else if (e.key === 'ArrowDown') {
      plusIndex()
    }
  })

  // event on scroll down change index
  let stopScroll = false;
  window.addEventListener('wheel', function (e) {
    const deltaY = parseInt(e.deltaY);
    if (stopScroll) return;

    if (Math.abs(deltaY) > 20) {
      stopScroll = true
      setTimeout(() => {
        stopScroll = false
      }, delayReadyTime + 400);
    }

    if (deltaY > 0) {
      plusIndex()
    } else {
      minIndex()
    }
  })

  // event mouseup starttouch false
  const detailView = document.getElementById('DetailView');
  detailView.addEventListener('mousedown', function (e) {
    touchstart(e)
  })
  detailView.addEventListener('mousemove', function (e) {
    touchmove(e)
  })
  detailView.addEventListener('mouseup', function (e) {
    touchend(e)
  })
})

let touchstartY = 0
let touchendY = 0
let delta = 0
let stateDragDetailContent = false
let multiple = 1 / storeDeviceSize.scale
function touchstart(event) {
  startTouch = true;

  if (event.changedTouches) {
    touchstartY = event.changedTouches[0].screenY
  } else {
    touchstartY = event.screenY
  }
}
function touchmove(event) {
  if (!startTouch) return;

  if (event.changedTouches) {
    touchendY = event.changedTouches[0].screenY
    delta = (touchstartY - touchendY) * multiple
  } else {
    touchendY = event.screenY
    delta = touchstartY - touchendY
  }
  if (props.detailStep == 2 && index.value == 0 && delta < 0) {
    stateDragDetailContent = true
    const detailContent = document.getElementById('DetailContent');
    detailContent.style.transition = 'all 0.3s ease-out';
    detailContent.style.top = `${0 - (delta * 1.8)}px`;
  }
}
function touchend(event) {
  startTouch = false;

  if (Math.abs(delta) < 40) return;

  if (delta < 0) {
    if (stateDragDetailContent && delta < -180) {
      minIndex()
    } else if (index.value > 0) {
      minIndex()
    }
  } else if (!stateDragDetailContent) {
    plusIndex()
  }
  stateDragDetailContent = false
}

function setReady() {
  if (props.detailStep == 2) {
    index.value = startIndex
    setTimeout(() => {
      scrollReady = true
    }, delayReadyTime)
  } else {
    scrollReady = true
  }
}
function delayReady() {
  scrollReady = false
  setTimeout(() => {
    scrollReady = true
  }, delayReadyTime)
}

function minIndex() {
  if (index.value > 0) {
    if (scrollReady) {
      index.value--
      delayReady()
    }
  } else {
    if (scrollReady) {
      emit('update', 1)
    }
  }
}
function plusIndex() {
  const lengthCheck = dataLength.value
  if (scrollReady && (index.value + 1) <= lengthCheck) {
    index.value++
    delayReady()
  }
}
</script>

<style lang="scss">
  #DetailContent {
    display: block;
    background-color: #212121;
    background-image: url('../assets/images/bg-detail-content.png');
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    top: calc(100% - 200px);
    left: 0;
    transition: all 0.5s ease-in-out;
    border-radius: 80px 80px 0 0;

    &.active {
      top: 0;
      border-radius: 0;
    }

    .dc-box {
      position: absolute;
      transform: translate(-100%, 0);
      top: 80px;
      left: calc(50% + 830px);
      width: 50%;

      #db-title {
        margin-bottom: 5px;
      }

      #db-tahun {
        letter-spacing: 0rem;
      }

      #db-scroll-down {
        margin-top: 170px;

        h5 {
          margin-bottom: 14px;
        }
      }
    }

    #vline {
      position: absolute;
      top: 10px;
      left: 50%;
      width: 2px;
      height: 98.5%;
      background-color: #f2a83a;
      transform: translate(-50%, 0);
    }

    #content-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .ci-item-top, .ci-item-center, .ci-item-bottom {
        position: absolute;
        transform: translate(-50%, -50%);
        left: -50%;
        display: block !important;
        background-color: $orange;

        .ci-text {
          position: absolute;
          opacity: 0;
          transform: translate(0, -50%);
          top: 50%;
          left: 50%;
          width: 337px;
          color: $white;
          font-size: 27px;
          line-height: 38px;
          transition: $transition-detail-card;
        }
        .ci-image {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          left: 50%;
          top: 50%;
          border-radius: 40px;
          transition: $transition-detail-card;
        }
      }

      .ci-item-top {
        top: -125px;
        left: 50%;
        width: 538px;
        height: 420px;
        border-radius: 40px;
        transition: $transition-detail-card;

        &.plus {
          top: -1000px;
        }
        &.last {
          top: -500px;
        }
      }

      .ci-item-center {
        top: 51.5%;
        left: 50%;
        width: 1382px;
        height: 688px;
        border-radius: 24px;
        transition: $transition-detail-card;
        
        .ci-text {
          opacity: 1;
          top: 50%;
          left: 2.4%;
        }
        &.left .ci-text {
          left: 73.4%;
        }

        .ci-image {
          border-radius: 24px;
          left: 63%;
          width: 69.1%;
          height: 93%;
          transition: $transition-detail-card;
        }
        &.left .ci-image{
          left: 36.9%;
        }
      }

      .ci-item-bottom {
        top: 110%;
        left: 50%;
        width: 538px;
        height: 420px;
        border-radius: 40px;
        transition: $transition-detail-card;

        &.plus {
          top: 1500px;
        }
      }
    }

    #content-navigation {
      position: absolute;
      transform: translate(-100%, 0);
      left: calc(50% + 830px);
      bottom: 126px;

      img {
        cursor: pointer;
        width: 40px;
      }
    }
  }
</style>