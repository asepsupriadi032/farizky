<template>
  <!-- <img src="../assets/dev/detail-logo.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

  <div id="DetailView">
    <template v-if="isLagu">
      <DetailLagu :item="item" :isReady="isReady"></DetailLagu>
    </template>
    <template v-else-if="item.Category == 'Seni'">
      <DetailSeni :item="item" :isReady="isReady"></DetailSeni>
    </template>
    <template v-else>
      <DetailArchitecture :item="item" :isReady="isReady"></DetailArchitecture>
    </template>

    <div class="container abs">
      <a @click="link('/home?exit=false&defaultState=1')">
        <div class="backBtn btn btn-outline-white">
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.395508 6.06445C0.395508 6.18294 0.418294 6.29232 0.463867 6.39258C0.50944 6.49284 0.577799 6.58854 0.668945 6.67969L5.99414 11.8887C6.14453 12.0436 6.33138 12.1211 6.55469 12.1211C6.70052 12.1211 6.83496 12.0846 6.95801 12.0117C7.08105 11.9434 7.17904 11.8477 7.25195 11.7246C7.32031 11.6061 7.35449 11.474 7.35449 11.3281C7.35449 11.1094 7.27246 10.9157 7.1084 10.7471L2.30957 6.06445L7.1084 1.38184C7.27246 1.21322 7.35449 1.02181 7.35449 0.807617C7.35449 0.657227 7.32031 0.522786 7.25195 0.404297C7.17904 0.285807 7.08105 0.192383 6.95801 0.124023C6.83496 0.0511068 6.70052 0.0146484 6.55469 0.0146484C6.33138 0.0146484 6.14453 0.0898438 5.99414 0.240234L0.668945 5.44922C0.577799 5.54036 0.50944 5.63607 0.463867 5.73633C0.418294 5.83659 0.395508 5.94596 0.395508 6.06445Z" fill="#282828"/>
          </svg>
          <span style="margin-left: 10px">{{ words.kembali }}</span>
        </div>
      </a>

      <div id="head-logo">
        <img src="../../assets/logo/kemenkebud.png" alt="kemenkebud">
        <img src="../../assets/logo/mojokerto.png" alt="mojokerto">
      </div>
    </div>

    <LangButton></LangButton>
  </div>
</template>

<script setup>
import { items } from '@/stores/items';
import { useRouter } from 'vue-router';
import { computed, defineProps, onMounted, ref } from 'vue';
import DetailArchitecture from '@/components/DetailArchitecture.vue';
import DetailSeni from '@/components/DetailSeni.vue';
import DetailLagu from '@/components/DetailLagu.vue';
import LangButton from '@/components/LangButton.vue';
import { lang } from '../stores/lang';

const words = computed(() => {
  return lang().words
})
const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const store = items();
const router = useRouter();
const id = props.id || router.currentRoute.value.params.id;
const item = store.getItem(id)
const isReady = ref(false);

const isLagu = computed(() => {
  if (item.value.Sub_Category === 'Lagu') {
    return true
  }
  return false
});

onMounted(() => {
  setTimeout(() => {
    isReady.value = true
  }, 100)
});

function link(to) {
  isReady.value = false
  router.push(to)
}
</script>

<style scoped>
#LangButton {
  position: fixed;
  left: calc(50% - 570px);
  transform: translate(-50%);
  bottom: 50px;
}
</style>