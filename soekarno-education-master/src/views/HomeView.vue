<template>
  <!-- <img src="../assets/dev/home.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

  <div id="HomeView">
    <h2 id="h-title" class="container roboto-serif-medium">{{ words.masa_sekolah_sukarno }}</h2>

    <div class="home-card justify-content-center d-flex">
      <div v-for="(item, key) in data"
        @click="goToDetail(item.ID)"
        :key="key" class="card-item color-primary-light"
        :style="{ 'background-image': `url(${item.Image_Card_BG})` }"
      >
        <div class="btn btn-black roboto-regular linkBtn">
          {{ words.lihat }}
          <img src="../assets/svg/arrow-right.svg" alt="">
        </div>

        <div class="card-content">
          <h4 class="label-waktu roboto-regular">{{ item.Waktu }}</h4>
          <h3 class="roboto-serif-medium">{{ item.Sekolah }}</h3>
          <h4 class="label-id roboto-regular">{{ item.Sekolah_Lang }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { items } from '../stores/items.js'
import { lang } from '../stores/lang'

const router = useRouter()
const push = (path) => router.push(path)
const data = computed(() => items().data)
const ready = ref(true)
const words = computed(() => lang().words)

onMounted(() => {
  ready.value = true
  setTimeout(() => {
    const headLogo = document.getElementById('head-logo');
    headLogo.style.opacity = 1;
  }, 500)
})

function goToDetail(id) {
  setTimeout(() => {
    push(`/detail/${id}`)
  }, 150)
}
</script>

<style lang="scss">
#HomeView {
  background-color: $cream;
  padding-bottom: 50px;
  position: absolute;
  width: 100%;
  height: 100%;

  #h-title {
    padding-top: 160px;
    padding-left: 130px;
    font-size: 80px;
    line-height: 80px;
    letter-spacing: -0.2rem;
  }

  .home-card {
    .card-item {
      cursor: pointer;
      position: relative;
      width: 398px;
      background-color: $gray;
      margin: 12px;
      margin-top: 35px;
      border-radius: 40px;
      background-size: contain;
      background-position: center;
      transition: all 0.15s ease-in-out;

      &:hover {
        transform: scale(1.05);
        color: $white;
      }

      &::before {
        content: "";
        display: block;
        padding-top: calc(735/398 * 100%);
      }
    }

    .card-content {
      position: absolute;
      width: 100%;
      padding: 37px 30px;
      bottom: 0;

      * {
        margin: 0;
      }

      h3 {
        font-size: 40px;
        line-height: 50px;
        padding-bottom: 10px;
      }

      .label-waktu {
        font-size: 30px;
        line-height: 40px;
        font-style: italic;
        padding-bottom: 22px;
        letter-spacing: 0.065rem;
      }

      .label-id {
        font-size: 30px;
        line-height: 40px;
        font-style: italic;
        letter-spacing: -0.03rem;
      }
    }
  }

  .linkBtn {
    border-radius: 21px;
    padding: 2px;
    width: 100px;
    height: 36px;
    line-height: 32px;
    letter-spacing: 0.04rem;
    font-size: 18px;
    position: absolute;
    top: 41px;
    right: 40px;

    a {
      font-weight: 400;
    }

    img {
      position: relative;
      top: -1.5px;
      margin-left: 1px;
    }
  }
}
</style>