<template>
  <div id="HomeSlider" @mousedown="mouseDown" @mousemove="mouseMove" @touchstart="mouseDown" @touchmove="mouseMove">
    <transition name="fade-fast">
      <div v-if="!refresh" class="wrapper">
        <div class="clock" :style="{
          transform: `rotate(${rotate}deg)`
        }">
          <label v-for="key in clockLength" :style="{
            '--i': (key - 1) - startIndex,
            transform: cLabel()
          }" :key="key" :lkey="key" :class="{ active: isActive(key) }">
            <div class="item" :style="{ transform: cSpan() }">
              <transition>
                <div v-if="showedItem(key)">
                  <div class="content" :class="{ active: isActive(key) }">
                    <ItemCard :item="showedItem(key)" :active="isActive(key)"></ItemCard>
                  </div>

                  <div class="dot"></div>
                </div>
              </transition>
            </div>
          </label>
        </div>
      </div>
    </transition>

    <div id="cardLeftPlus" @click="indexChange(+2)" v-if="index < 1"></div>
    <div id="cardLeft" @click="indexChange(+1)" v-if="index < 2"></div>
    <div id="cardRight" @click="indexChange(-1)" v-if="trueIndex + 1 < slideItems.length"></div>
    <div id="cardRightPlus" @click="indexChange(-2)" v-if="trueIndex + 2 < slideItems.length"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue';
import { items } from '@/stores/items';
import ItemCard from './ItemCard.vue';
import { deviceSize } from '../stores/deviceSize';
import { useRouter } from 'vue-router';

const router = useRouter()
const defaultState = ref(router.currentRoute.value.query.defaultState ? true : false)

function indexChange(val) {
  const indexLength = slideItems.value.length - 1;

  if (val < 0 && trueIndex.value >= indexLength) return;
  if (val > 0 && trueIndex.value <= 0) return;

  index.value = index.value + val;
  activeIndex.value = activeIndex.value - val;
  trueIndex.value = trueIndex.value + val;
}

const store = items();
const storeDeviceSize = deviceSize()

const index = ref(0);
const startIndex = ref(2);
const activeIndex = ref(0);
const rotate = ref(0);
const rotateOnDown = ref(0);
const circleWidth = ref(0);
const slideLength = ref(8);
const clockLength = ref(25);
const isDragging = ref(false);
const dotDistance = ref(360);
const filter = ref('all');
const eachRotateDeg = computed(() => {
  return 360 / clockLength.value;
})
const refresh = ref(false);

watch(store.filters, (val) => {
  refresh.value = true;
  setTimeout(() => {
    refresh.value = false;
  }, 300);
})

const slideItems = computed(() => {
  let storeData = store.data;

  if (filter.value != 'all') {
    storeData = storeData.filter((item) => {
      return item.Category == filter.value;
    })
  }

  return storeData;
})

const trueIndex = computed(() => {
  return Math.abs(startIndex.value) - index.value;
})

onBeforeMount(() => {
  init(store.index)
})

onMounted(() => {
  circleWidth.value = document.querySelector('#HomeSlider').offsetWidth * 2;

  window.addEventListener('mouseup', function (e) {
    mouseUp();
  }, false);
  window.addEventListener('touchend', function (e) {
    mouseUp();
  }, false);
})

function init(defaultIndex = 0) {
  const slideLength = slideItems.value.length;
  if (defaultState.value) {
    index.value = defaultIndex
    defaultState.value = false
  } else if (slideLength < startIndex.value) {
    index.value = 2
  } else if (slideLength <= 4) {
    index.value = 1
  } else {
    index.value = defaultIndex 
  }
  rotate.value = index.value * eachRotateDeg.value;
  activeIndex.value = trueIndex.value
}

watch(index, (val) => {
  rotate.value = val * eachRotateDeg.value;
  store.setIndex(val)
})
watch(trueIndex, (val) => {
  if (val < 0) {
    index.value = startIndex.value
    rotate.value = index.value * eachRotateDeg.value;
  } else if (val > slideItems.value.length - 1) {
    index.value = startIndex.value - slideItems.value.length + 1
    rotate.value = index.value * eachRotateDeg.value;
  }
})
watch(filter, (val) => {
  index.value = 0
})
watch(slideItems, (val) => {
  init()
})

function cLabel() {
  return `rotate(calc(var(--i) * (360deg / ${clockLength.value})))`;
}
function cSpan() {
  return `rotate(calc(var(--i) * (-360deg / ${clockLength.value}) - ${rotate.value}deg))`;
}

const screenX = ref(0);
function mouseDown(val) {
  isDragging.value = true;
  rotateOnDown.value = rotate.value;
  if (val instanceof TouchEvent) {
    screenX.value = val.touches[0].clientX;
  } else {
    screenX.value = (val.clientX / storeDeviceSize.scale);
  }
}
function mouseMove(val) {
  if (!isDragging.value) return;
  let value = 0
  if (val instanceof TouchEvent) {
    value = (val.touches[0].clientX - screenX.value) / storeDeviceSize.scale
  } else {
    value = (val.clientX / storeDeviceSize.scale) - screenX.value
  }
  let rotateValue = rotateOnDown.value + (eachRotateDeg.value * value / dotDistance.value);

  rotate.value = rotateValue;
  let realIndex = Math.abs(startIndex.value) - Math.round(rotate.value / eachRotateDeg.value);
  if ((realIndex >= 0) && (realIndex < slideItems.value.length)) {
    activeIndex.value = realIndex;
  }
}
function mouseUp() {
  isDragging.value = false;
  setTimeout(() => {
    index.value = Math.round(rotate.value / eachRotateDeg.value);
    rotate.value = index.value * eachRotateDeg.value;
  }, 100);
}
function showedItem(key) {
  let i = key - 1;
  if ((i - activeIndex.value) > slideLength.value) return false;

  if (activeIndex.value < (clockLength.value - slideLength.value)) {
    return slideItems.value[i];
  }

  if (activeIndex.value > slideLength.value && i < slideLength.value) {
    return slideItems.value[i + clockLength.value]
  }
  return slideItems.value[i];
}
function isActive(key) {
  return slideItems.value[activeIndex.value] == showedItem(key);
}
</script>

<style lang="scss">
#linkDetail {
  width: 84px;
  height: 34px;
  position: absolute;
  left: calc(50% + 131px);
  top: 159px;
  z-index: 1000;
  transform: translateX(-50%);
}

#HomeSlider {
  overflow: hidden;
  width: 100%;
  height: 700px;
  min-height: 100vh;
  position: absolute;

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .wrapper .clock {
    display: flex;
    height: 3000px;
    width: 3000px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: var(--light);
    border: 2px solid $secondary;
    position: absolute;
    top: 540px;
  }

  .clock label {
    position: absolute;
    inset: -10px;
    text-align: center;
    margin: 0;
    z-index: -1;

    &.active {
      z-index: 2;
    }

    >* {
      z-index: 1;
      position: relative;
    }
  }

  .clock label .item {
    display: inline-block;
    font-weight: 600;
    color: var(--dark);
    position: relative;

    .content {
      position: absolute;
      bottom: 17px;
      left: 50%;
      transform: translate(-50%, -50px);
      width: 294px;
      height: 320px;

      &.active {
        width: 400px;
        height: 488px;
        bottom: 11px;
      }

      transition: all 0.3s ease-in-out;
    }

    .dot {
      width: 24px;
      height: 24px;
      background-color: $secondary;
      border-radius: 50%;
      top: -3px;
      position: relative;
    }
  }

  // add clock transition
  .clock,
  .clock label,
  .clock label .item {
    transition: transform 0.3s ease-out;
  }

  #cardRight {
    position: absolute;
    top: 215px;
    left: calc(50% + 225px);
    width: 295px;
    height: 320px;
    border-radius: 40px;
    cursor: pointer;
  }
  #cardLeft {
    position: absolute;
    transform: translate(-100%);
    top: 215px;
    left: calc(50% - 225px);
    width: 295px;
    height: 320px;
    border-radius: 40px;
    cursor: pointer;
  }
  #cardLeftPlus {
    position: absolute;
    transform: translate(-100%);
    top: 354px;
    left: calc(50% - 574px);
    width: 295px;
    height: 320px;
    border-radius: 40px;
    cursor: pointer;
  }
  #cardRightPlus {
    position: absolute;
    top: 354px;
    left: calc(50% + 574px);
    width: 295px;
    height: 320px;
    border-radius: 40px;
    cursor: pointer;
  }
}
</style>