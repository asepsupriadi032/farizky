<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { deviceSize } from './stores/deviceSize';
import LogoVue from './components/LogoVue.vue';
import LangButton from './components/LangButton.vue';

const route = useRoute();
const path = computed(() => route.path)
const storeDeviceSize = deviceSize()
const routerName = computed(() => route.name)

const AppVueClass = computed(() => {
  return {
    zoom: storeDeviceSize.scale
  }
})
</script>

<template>
  <div id="AppVue" :style="AppVueClass">
    <router-view v-slot="{ Component }">
      <transition name="fade-app" mode="in-out">
        <component :is="Component" :key="path" />
      </transition>
    </router-view>

    <div class="container position-relative">
      <LogoVue :class="`router-${routerName}`"></LogoVue>
      <LangButton :class="`router-${routerName}`"></LangButton>
    </div>
  </div>
</template>

<style lang="scss">
body {
  overflow: hidden;
}

#app {
  position: relative;
  height: 100vh;
}

#AppVue {
  position: relative;
  transform-origin: left top;
  height: 100%;

  #head-logo {
    position: absolute;
    left: 120px;
    top: 80px;
    transition: all 0.3s ease-out;

    &.router-detail {
      position: absolute;
      transform: translate(-100%, 0);
      top: 82px;
      left: calc(50% + 840px);
    }
  }

  #LangButton {
    position: fixed;
    transform: translate(-100%, 0);
    left: calc(50% + 830px);
    top: 190px;
    transition: all 0.3s ease-out;

    &.router-detail {
      position: fixed;
      transform: translate(-100%, 0);
      top: 88%;
      left: calc(50% - 736px);
    }
  }
}

// default fade
.fade-app-enter-active,
.fade-app-leave-active {
  transition: opacity 0.5s ease;
}

.fade-app-enter-from, .fade-app-leave-to {
  opacity: 0;
}
</style>