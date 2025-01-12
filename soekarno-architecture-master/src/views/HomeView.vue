<template>
  <!-- <img src="../assets/dev/home-logo.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

  <div id="HomeView">
    <div class="container abs">
      <a href="javascript:;" @click="link('/')">
        <div class="backBtn btn btn-outline-white">
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.395508 6.06445C0.395508 6.18294 0.418294 6.29232 0.463867 6.39258C0.50944 6.49284 0.577799 6.58854 0.668945 6.67969L5.99414 11.8887C6.14453 12.0436 6.33138 12.1211 6.55469 12.1211C6.70052 12.1211 6.83496 12.0846 6.95801 12.0117C7.08105 11.9434 7.17904 11.8477 7.25195 11.7246C7.32031 11.6061 7.35449 11.474 7.35449 11.3281C7.35449 11.1094 7.27246 10.9157 7.1084 10.7471L2.30957 6.06445L7.1084 1.38184C7.27246 1.21322 7.35449 1.02181 7.35449 0.807617C7.35449 0.657227 7.32031 0.522786 7.25195 0.404297C7.17904 0.285807 7.08105 0.192383 6.95801 0.124023C6.83496 0.0511068 6.70052 0.0146484 6.55469 0.0146484C6.33138 0.0146484 6.14453 0.0898438 5.99414 0.240234L0.668945 5.44922C0.577799 5.54036 0.50944 5.63607 0.463867 5.73633C0.418294 5.83659 0.395508 5.94596 0.395508 6.06445Z" fill="#282828"/>
          </svg>
          <span style="margin-left: 10px">{{ langStore.words.kembali }}</span>
        </div>
      </a>

      <div id="head-logo">
        <img src="../../assets/logo/kemenkebud.png" alt="kemenkebud">
        <img src="../../assets/logo/mojokerto.png" alt="mojokerto">
      </div>
    </div>

    <div id="header">
      <h2 class="roboto-serif-medium fs-65 lh-76 text-center">{{ langStore.words.karya_sukarno }}</h2>
    </div>

    <HomeNav></HomeNav>

    <HomeContent></HomeContent>
  </div>
</template>

<script setup>
import HomeNav from '@/components/HomeNav.vue'
import HomeContent from '@/components/HomeContent.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { lang } from '../stores/lang'

const router = useRouter()
const langStore = lang()
const exit = ref(router.currentRoute.value.query.exit == 'false' ? false : true)

onMounted(() => {
  exit.value = false
  document.body.style.overflow = 'hidden'
})

function link(to) {
  exit.value = true
  return router.push(to)
}
</script>

<style lang="scss">
#HomeView {
  background-color: $white;
  position: absolute;
  width: 100%;
  height: 100%;

  #btn-back {
    position: absolute;
    top: 80px;
    left: 63px;
  }

  .red-dot {
    width: 60px;
    height: 60px;
    position: absolute;
    background-color: $primary;
    left: 92.2%;
    top: 68px;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;

    &.exit {
      background-color: $white;
      left: 64px;
    }
  }

  #header {
    color: $primary;
    padding-top: 60px;
  }
}
</style>