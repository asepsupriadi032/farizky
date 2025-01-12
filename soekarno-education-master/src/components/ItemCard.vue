<template>
  <div id="ItemCard" class="card" :class="{active: active}">
    <div class="card-body d-flex flex-column justify-content-center text-left">
      <div class="cContent d-flex flex-column justify-content-end">
        <h4 class="color-primary-light roboto-regular">
          {{ item.Tahun }}
          {{ item.Tahun && item.Sub_Category ? ' • ' : ''}}
          {{ item.Sub_Category }}
        </h4>
        <h3 class="card-title color-primary-light roboto-serif-regular">{{ item.Nama_Karya }}</h3>
        <transition>
          <h3 v-if="active && item.Saat_Ini" class="current color-primary-light roboto-regular">Saat Ini: {{ item.Saat_Ini }}</h3>
        </transition>
      </div>

      <Transition>
        <div class="itemLink" v-if="active">
          <div href="javascript:;" class="btn btn-danger roboto-regular">
            {{ words.lihat }}
            <img src="../assets/svg/arrow-right.svg" alt="">
          </div>
        </div>
      </Transition>
    </div>
  </div>

  <div class="bgImage"
    :style="{
      'background-image': `url(${item.Gambar_Preview})`,
      filter: item.Category == 'Arsitektur' ? 'grayscale(1)' : 'none',
    }"
  ></div>
</template>

<script setup>
import { computed } from 'vue';
import { lang } from '../stores/lang';

const words = computed(() => lang().words)
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss">
$border-radius: 40px;

.bgImage {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: $border-radius;
  background-size: auto 105%;
  background-position: 50% 50%;
}

#ItemCard {
  width: 100%;
  height: 100%;
  border-radius: $border-radius;
  transition: all 0.3s ease-out;
  
  .cContent {
    transition: all 1s ease-out;
    height: 100%;
    padding: 0 8px;
  }
  &.active {
    .cContent {
      padding: 20px;
      margin-bottom: 0;
    }
  }

  h3.card-title {
    font-size: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    margin: 0;
    line-height: 40px;
  }
  h4 {
    font-weight: 400;
    line-height: 28px;
    margin-bottom: 22px;
  }
  h3.current {
    font-size: 24px;
    margin-top: 10px;
    margin-bottom: -3px;
    width: 318px;
  }
  &.active {
    h4 {
      margin-bottom: 20px;
      transition: all 0.3s ease-out;
    }

    h3.card-title {
      font-size: 40px;
      line-height: 50px;
      transition: all 0.3s ease-out;
    }
  }

  &::before {
    content: '';
    position: absolute;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    left: -1px;
    top: -1px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
    border-radius: $border-radius;
  }

  .SubCategory .badge {
    padding: 8px;
    border-radius: 16px;
    font-size: 24px;
  }

  .itemLink .btn {
    border-radius: 21px;
    padding: 3px;
    width: 82px;
    height: 33px;
    font-size: 17px;
    position: absolute;
    top: 32px;
    right: 26px;

    a {
      font-weight: 600;
    }

    img {
      position: relative;
      top: -1.5px;
      margin-left: 1px;
    }
  }
}
</style>