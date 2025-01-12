<template>
  <router-link :to="`/detail/${item.ID}`" id="NextItem" :class="classItem">
    <div>
      <div class="ni-image"
        :style="{
          'background-image': 'url(' + item.Image_SQ + ')',
          'background-size': 'cover',
          'background-position': 'center'
        }"
      ></div>

      <transition>
        <div v-if="active" class="ni-content">
          <p class="roboto-regular fs-30 lh-40" style="margin-bottom: 95px;">
            {{ item.ID == 1 ? words.kembali_ke_awal : words.selanjutnya }}
          </p>
          <p class="roboto-regular fs-30 lh-40" style="margin-bottom: 22px;">{{ item.Waktu }}</p>
          <h4 class="roboto-serif-medium fs-40 lh-50">{{ item.Sekolah }}</h4>
        </div>
      </transition>

      <transition>
        <div v-if="active" class="ni-lihat btn btn-primary">
          <span class="roboto-regular fs-18 lh-21" style="margin-right: 10px;">{{ words.lihat }}</span>
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.10449 6.56445C7.10449 6.68294 7.08171 6.79232 7.03613 6.89258C6.99056 6.99284 6.9222 7.08854 6.83105 7.17969L1.50586 12.3887C1.35547 12.5436 1.16862 12.6211 0.945312 12.6211C0.799479 12.6211 0.665039 12.5846 0.541992 12.5117C0.418945 12.4434 0.320964 12.3477 0.248047 12.2246C0.179688 12.1061 0.145508 11.974 0.145508 11.8281C0.145508 11.6094 0.227539 11.4157 0.391602 11.2471L5.19043 6.56445L0.391602 1.88184C0.227539 1.71322 0.145508 1.52181 0.145508 1.30762C0.145508 1.15723 0.179688 1.02279 0.248047 0.904297C0.320964 0.785807 0.418945 0.692383 0.541992 0.624023C0.665039 0.551107 0.799479 0.514648 0.945312 0.514648C1.16862 0.514648 1.35547 0.589844 1.50586 0.740234L6.83105 5.94922C6.9222 6.04036 6.99056 6.13607 7.03613 6.23633C7.08171 6.33659 7.10449 6.44596 7.10449 6.56445Z" fill="#FFFAF5"/>
          </svg>
        </div>
      </transition>
    </div>
  </router-link>
</template> 

<script setup>
import { computed, defineProps } from 'vue';
import { lang } from '../stores/lang';

const words = computed(() => lang().words)
const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  index: {
    type: Number,
    default: 0
  },
  dataLength: {
    type: Number,
    default: 0
  }
});

const active = computed(() => {
  return props.index == props.dataLength
})
const showBot = computed(() => {
  return props.index == props.dataLength - 1
})

const classItem = computed(() => {
  return {
    active: active.value,
    showBot: showBot.value
  }
})
</script>

<style lang="scss">
#NextItem {
  position: absolute;
  top: 150%;
  left: 50%;
  width: 340px;
  transform: translate(-50%, -50%);
  background-color: $white;
  border-radius: 16px;
  padding: 40px;
  transition: $transition-detail-card;

  &.active {
    top: 50%;
    width: 824px;
    height: 374px;
  }

  &.showBot {
    top: 108%;
  }

  .ni-image {
    width: 258px;
    height: 293px;
    background-color: $gray;
    border-radius: 16px;
  }

  .ni-content {
    position: absolute;
    top: 38px;
    left: 335px;
    width: 448px;
    color: $black-1;
    transition: $transition-detail-card;

    p {
      font-style: italic;
      letter-spacing: -0.03rem;
    }
  }

  .ni-lihat {
    position: absolute;
    top: 38px;
    right: 40px;
    padding: 9px 20px;
    transition: $transition-detail-card;
  }
}
</style>