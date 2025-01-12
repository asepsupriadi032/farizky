<template>
  <div id="HomeContent">
    <div id="FilterNav" class="d-flex justify-content-center">
      <transition-group name="list">
        <div class="nav-item"
          :class="{ active: store.filters.Sub_Category == 'All' }"
          @click="store.setFilterSub('All')"
          :key="store.filters.Category"
        >{{ store.filters.Category == 'Arsitektur' ? words.semua_kota : words.semua_seni }}</div>

        <div v-for="(cat) in store.subCategories" :key="cat">
          <div :class="navItemClass(cat)" @click="store.setFilterSub(cat)">{{ words[cats[cat]] || cat }}</div>
        </div>
      </transition-group>
    </div>

    <LangButton></LangButton>

    <HomeSliderClock></HomeSliderClock>
  </div>
</template>

<script setup>
import HomeSliderClock from '@/components/HomeSliderClock.vue'
import LangButton from '@/components/LangButton.vue';
import { items } from '../stores/items';
import bgPrimary from '../assets/images/bg_primary.jpg'
import bgPrimary2 from '../assets/images/bg_primary2.jpg'
import { computed, onMounted, watch } from 'vue';
import { lang } from '../stores/lang';

const store = items()
const words = computed(() => {
  return lang().words
})

const cats = {
  Patung: 'patung',
  Lagu: 'lagu',
  Lukisan: 'lukisan',
}

watch(() => store.filters.Category, (val) => {
  changeBg()
})

onMounted(() => {
  changeBg()
})

function changeBg() {
  if (store.filters.Category == 'Arsitektur') {
    document.getElementById('HomeContent').style.backgroundImage = `url(${bgPrimary})`
  } else {
    document.getElementById('HomeContent').style.backgroundImage = `url(${bgPrimary2})`
  }
}

function navItemClass(cat) {
  return {
    "nav-item": true,
    "active": store.filters.Sub_Category == cat
  }
}
</script>

<style scoped>
.list-enter-active {
  transition: all 0.5s;
  opacity: 0;
}
.list-leave-active {
  display: none;
}

.list-enter-to {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}
</style>

<style lang="scss">
#HomeContent {
  background-image: url('../assets/images/bg_primary.jpg');
  background-size: cover;
  width: 100%;
  min-height: 772px;
  top: calc(100% - 915px);
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease-in-out;

  #HomeSlider {
    top: 120px;
  }

  #FilterNav {
    position: relative;
    top: 22px;
    transition: all 2s ease-in-out;

    .nav-item {
      padding: 10px 18px;
      border: 1px solid $secondary;
      margin: 0 10px;
      color: $secondary;
      font-size: 24px;
      font-weight: 400;
      line-height: 25px;
      letter-spacing: 0.7px;
      border-radius: 50px;
      cursor: pointer;
      font-family: $font-family-roboto;

      &.active, &:hover {
        background-color: #F46E53;
        border: none;
      }
    }
  }

  #LangButton {
    position: absolute;
    top: 22px;
    left: calc(50% + 525px)
  }
}
</style>