<template>
  <div id="DetailSeni">
    <!-- image with svg -->
    <!-- <img src="../assets/dev/detail-seni.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

    <div id="header" class="container">
      <h2 class="roboto-serif-medium text-center mb-0">{{ item.Nama_Karya }}</h2>
      <h3 class="roboto-regular text-center color-black mt-1">
        <i>
        {{ item.Tahun }}
        {{ item.Tahun && item.Sub_Category ? ' • ' : '' }}
        {{ item.Sub_Category }}
        </i>
      </h3>
    </div>

    <div id="ds-content" class="container m-auto row mt-5">
      <transition name="slide-left">
        <div v-if="isReady" class="col-sm-6">
          <video id="video" preload="metadata" controls :style="videoStyle">
            <source src="../../assets/lagu/Bung-Karno_Bersuka-Ria.mp4#t=1" type="video/mp4">
            Your browser does not support HTML video.
          </video>

          <div style="height: 30px;"></div>
        </div>
      </transition>

      <transition name="slide-right">
        <div v-if="isReady" class="col-sm-6 align-self-end">
          <div id="detailContent" style="margin-bottom: 30px;">
            <div class="cright col-sm-12">
              <p id="caption" class="roboto-regular">{{ item.Caption }}</p>

              <template v-if="item.Lagu_Content">
                <div v-if="item.Lagu_Content.Pencipta" class="dc-lokasi" style="margin-top: 20px;">
                  <label class="color-gray roboto-regular fs-24 lh-28">{{ words.pencipta }}</label>
                  <p class="roboto-regular fs-24 lh-28">{{ item.Lagu_Content.Pencipta }}</p>
                </div>
                <div v-if="item.Lagu_Content.Dinyanyikan" class="dc-lokasi" style="margin-top: 20px;">
                  <label class="color-gray roboto-regular fs-24 lh-28">{{ words.dinyanyikan_oleh }}</label>
                  <p class="roboto-regular fs-24 lh-28">{{ item.Lagu_Content.Dinyanyikan }}</p>
                </div>
                <div v-if="item.Lagu_Content.Diiringi" class="dc-lokasi" style="margin-top: 20px;">
                  <label class="color-gray roboto-regular fs-24 lh-28">{{ words.diiringi_oleh }}</label>
                  <p class="roboto-regular fs-24 lh-28">{{ item.Lagu_Content.Diiringi }}</p>
                </div>
              </template>

              <div v-if="item.Alamat" class="dc-lokasi" style="margin-top: 20px;">
                <label class="color-gray roboto-regular fs-24 lh-28">{{ words.lokasi }}</label>
                <p class="roboto-regular fs-24 lh-28">{{ item.Alamat }}</p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <ModelVue :show="isShowModal" @close="isShowModal = false">
      <img v-if="isShowModal" :src="listGambar[showModalIndex]" alt="preview" style="max-width: 100%;">
    </ModelVue>
  </div>
</template> 

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import ModelVue from './ModalVue.vue'
import { lang } from '../stores/lang';

const words = computed(() => {
  return lang().words
})
const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  isReady: {
    type: Boolean,
    default: false
  }
})

const isShowModal = ref(false);
const showModalIndex = ref(0);

const videoStyle = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const object_fit = urlParams.get('object-fit') || 'cover';

  return {
    objectFit: object_fit
  }
});

const listGambar = computed(() => {
  const list = props.item.List_Gambar
  if (list == undefined || list?.length <= 0) {
    return [
      props.item.Gambar_Preview
    ]
  }
  return list
})
function showModal(index) {
  showModalIndex.value = index
  if (listGambar.value[index] == "") return
  isShowModal.value = true
}

onMounted(() => {
  document.body.style.overflow = 'auto'
});
</script>

<style lang="scss">
#DetailSeni {
  position: absolute;
  min-height: 1024px;
  width: 100%;
  background-color: $cream;
  background-image: url('../assets/svg/detail-bg-vector.svg');
  background-position: left 0;
  background-repeat: repeat-y;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/svg/detail-bg-vector.svg');
    background-position: left -600px;
    background-repeat: repeat-y;
    transform: scaleX(-1);
  }

  #header {
    color: $primary;
    padding-top: 60px;
    margin-bottom: 60px;

    h2 {
      letter-spacing: -0.065rem;
      max-width: calc(100% - 500px);
      margin: auto;
    }

    h3 {
      letter-spacing: 0.07rem;
      font-size: 30px;
      line-height: 40px;
    }
  }

  #ds-content {
    max-width: 1366px;
    padding-bottom: 40px;
  }

  #video {
    position: relative;
    height: 730px;
    width: 93%;
    left: 50px;
    margin-top: 3px;
    background-color: $gray;
    border-radius: 40px;
  }

  #detailContent {
    margin-left: 24px;
    width: 97%;
    color: $black-1;
    font-size: 24px;
    letter-spacing: 0.5px;

    .row {
      margin: 0 50px;
    }

    .cleft {
      .cleft-item {
        margin-bottom: 20px;

        label {
          margin-bottom: 0px;
        }
      }
    }

    .cright {
      margin-left: -22px;
      padding: 0 34.5px;

      h3 {
        font-size: 30px;
        font-weight: 500;
        line-height: 42px;
        letter-spacing: -0.075rem;
        margin-bottom: 17px;
      }

      #caption {
        font-size: 28px;
        line-height: 42px;
        margin-top: 25px;
      }
    }
  }
}
</style>