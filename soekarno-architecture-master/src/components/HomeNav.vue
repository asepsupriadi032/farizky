<template>
  <div id="HomeNav">
    <div class="d-flex justify-content-around">
      <template v-for="(cat, key) in categories" :key="key">
        <div :class="navItemClass(cat)" @click="setFilterCat(cat)">{{ words[cats[cat]] }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { items } from '../stores/items';
import { lang } from '../stores/lang';
import { computed } from 'vue';

const { categories, filters, setFilterCat } = items()
const words = computed(() => {
  return lang().words
})
const cats = {
  'Arsitektur': 'arsitektur',
  'Seni': 'seni',
}

// get parameter ?cat from url
const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get('cat');
if (cat) setFilterCat(cat)

function navItemClass(cat){
  return {
    "nav-item": true,
    "w-100": true,
    "text-center": true,
    "roboto-serif-medium": true,
    "active": filters.Category == cat
  }
}
</script>

<style lang="scss">
#HomeNav {
  position: absolute;
  top: calc(100% - 836px);
  width: 100%;

  .nav-item {
    padding: 12px 10px;
    font-size: 30px;
    line-height: 42px;
    border: 0.5px solid $primary;
    border-radius: 40px 40px 0 0;
    letter-spacing: -0.015rem;
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &.active {
      background: $primary;
      color: $secondary;
    }
  }
}
</style>