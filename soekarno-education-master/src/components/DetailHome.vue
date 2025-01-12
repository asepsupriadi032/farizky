<template>
  <!-- <img src="../assets/dev/detail1.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

  <div id="DetailHome">
    <div id="image-bg"
      :style="{
        'background-image': `url(${item.Image_BG})`
      }"
    ></div>

    <div class="detail-bg-box color-primary-light text-center">
      <transition name="slide-left">
        <div v-if="detailStep == 1 && ready">
          <h4 id="db-tahun" class="roboto-regular fs-30 lh-40"><i>{{ item.Waktu }}</i></h4>
          <h3 id="db-title" class="roboto-serif-medium fs-80 lh-80">{{ item.Sekolah }}</h3>
          <h4 class="roboto-regular fs-30 lh-40"><i>{{ item.Sekolah_Lang }}</i></h4>
        </div>
      </transition>

      <div id="db-scroll-down" @click="emitUpdate">
        <h5 class="roboto-regular fs-24 lh-28">{{ words.scroll_kebawah }}</h5>
        <a href="javascript:;"><img src="../assets/svg/circle-arrow-down.svg" style="width: 40px;"></a>
      </div>
    </div>
  </div>
</template> 

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import { lang } from '../stores/lang';

const words = computed(() => lang().words);
const emit = defineEmits(['update']);
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

const ready = ref(false);

onMounted(() => {
  setTimeout(() => {
    ready.value = true
  }, 100)
});

function emitUpdate() {
  emit('update', 2);
}
</script>

<style lang="scss">
#DetailHome {
  position: relative;
  background-color: $gray;
  height: 100%;

  #image-bg {
    position: absolute;
    width: 100%;
    height: 90%;
    background-size: cover;
    background-position: center;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0, 0.5) 50%, rgba(0,0,0,0) 100%);
      top: 0;
      left: 0;
    }
  }

  .back-btn {
    position: absolute;
    left: 128px;
    top: 82px;
    border: 1px solid $white;
    border-radius: 50px;
    color: $white;
    padding: 8px 20px;

    &:hover {
      opacity: 0.8;
    }
  }

  .detail-bg-box {
    position: relative;
    top: 264px;
    width: 1000px;
    height: 552px;
    margin: auto;

    #db-tahun {
      margin-bottom: 40px;
    }

    #db-title {
      margin-bottom: 20px;
    }

    #db-scroll-down {
      position: absolute;
      transform: translate(-50%, 0);
      bottom: 1px;
      left: 50%;

      h5 {
        margin-bottom: 14px;
      }
    }
  }
}
</style>