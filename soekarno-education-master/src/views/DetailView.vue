<template>
  <div id="DetailView">
    <div @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @mousedown="touchstart"
      @mousemove="touchmove" @mouseup="touchend" class="w-100 h-100">
      <DetailHome @update="changeStep" :detailStep="detailStep" :item="item"></DetailHome>
      <transition>
        <DetailContent v-if="ready" @update="changeStep" :detailStep="detailStep" :item="item"></DetailContent>
      </transition>
    </div>

    <a href="javascript:;" @click="linkToHome" class="back-btn btn">
      <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.395508 6.06445C0.395508 6.18294 0.418294 6.29232 0.463867 6.39258C0.50944 6.49284 0.577799 6.58854 0.668945 6.67969L5.99414 11.8887C6.14453 12.0436 6.33138 12.1211 6.55469 12.1211C6.70052 12.1211 6.83496 12.0846 6.95801 12.0117C7.08105 11.9434 7.17904 11.8477 7.25195 11.7246C7.32031 11.6061 7.35449 11.474 7.35449 11.3281C7.35449 11.1094 7.27246 10.9157 7.1084 10.7471L2.30957 6.06445L7.1084 1.38184C7.27246 1.21322 7.35449 1.02181 7.35449 0.807617C7.35449 0.657227 7.32031 0.522786 7.25195 0.404297C7.17904 0.285807 7.08105 0.192383 6.95801 0.124023C6.83496 0.0511068 6.70052 0.0146484 6.55469 0.0146484C6.33138 0.0146484 6.14453 0.0898438 5.99414 0.240234L0.668945 5.44922C0.577799 5.54036 0.50944 5.63607 0.463867 5.73633C0.418294 5.83659 0.395508 5.94596 0.395508 6.06445Z"
          fill="#FFFAF5" />
      </svg>
      <span class="roboto-regular fs-18 lh-21" style="margin-left: 11px;">{{ words.kembali }}</span>
    </a>
  </div>
</template> 

<script setup>
import DetailHome from '../components/DetailHome.vue';
import DetailContent from '../components/DetailContent.vue';
import { computed, onMounted, ref } from 'vue';
import { items } from '../stores/items.js';
import { useRouter } from 'vue-router';
import { deviceSize } from '../stores/deviceSize';
import { lang } from '../stores/lang';

const router = useRouter();
const store = items();
const storeDeviceSize = deviceSize();
const words = computed(() => lang().words);

const detailStep = ref(1);
const ready = ref(false);
const id = router.currentRoute.value.params.id;
const item = store.getByID(id);

function changeStep(step) {
  detailStep.value = step;
  if (step == 2) {
    setOpacityHeadLogo(0)
  } else {
    setOpacityHeadLogo(1)
  }
}

onMounted(() => {
  ready.value = true

  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
      if (detailStep.value == 1) changeStep(2)
    }
  })

  // event on scroll down detailStep += 1
  window.addEventListener('wheel', function (e) {
    if (e.deltaY > 0) {
      if (detailStep.value == 1) changeStep(2)
    }
  })
})

let startTouch = false;
let startY = 0;
let endY = 0;
let multiplier = 1 / storeDeviceSize.scale;
function touchstart(e) {
  startTouch = true;

  if (e.touches) {
    startY = e.touches[0].pageY;
  } else {
    startY = e.pageY;
  }
}
function touchmove(e) {
  if (!startTouch) return;

  if (e.touches) {
    endY = e.touches[0].pageY;
  } else {
    endY = e.pageY;
  }

  const delta = (startY - endY) * multiplier;
  // get #DetailContent
  const detailContent = document.getElementById('DetailContent');
  if (detailStep.value == 1 && delta > 0) {
    // change style top of #DetailContent
    detailContent.style.transition = 'all 0.2s ease-out';
    detailContent.style.top = `${880 - delta}px`;
  }
}
function touchend() {
  startTouch = false;

  // remove style top
  const detailContent = document.getElementById('DetailContent');
  detailContent.style.transition = '';
  detailContent.style.top = '';
  if (endY < startY) {
    if (detailStep.value == 1) changeStep(2)
  }
}

function setOpacityHeadLogo(opacity = 1) {
  const headLogo = document.getElementById('head-logo');
  if (opacity == 0) {
    headLogo.style.opacity = 0;
  } else {
    headLogo.style.opacity = 1;
  }
}

function linkToHome() {
  setOpacityHeadLogo(1);
  router.push('/');
}
</script>

<style lang="scss">
#DetailView {
  position: absolute;
  width: 100%;
  height: 100%;
  background: $black;
  overflow: hidden;

  >div {
    width: 100%;
  }
}

.back-btn {
  position: absolute;
  left: calc(50% - 830px);
  top: 92px;
}
</style>