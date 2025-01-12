<script setup>
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router'
import { deviceSize } from './stores/deviceSize';
import './components/vue3-carousel/styles/index'

const route = useRoute();

const path = computed(() => route.path)
const storeDeviceSize = deviceSize()

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
  </div>
</template>

<style lang="scss">
#app {
  position: relative;
  height: 100vh;
}

#AppVue {
  position: relative;
  transform-origin: left top;
  height: 100%;
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