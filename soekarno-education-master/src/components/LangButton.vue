<template>
  <div id="LangButton">
    <div class="d-flex" :class="{ right: langStore.lang == 'EN' }" @click="langStore.toggleLang()">
      <span :class="{ 'active': langStore.lang == 'ID' }">IND</span>
      <span :class="{ 'active': langStore.lang == 'EN' }">EN</span>
    </div>
  </div>
</template>

<script setup>
import { lang } from '../stores/lang'

const langStore = lang()
</script>

<style lang="scss">
#LangButton {
  position: relative;
  width: 96px;
  height: 46px;
  border-radius: 24px;
  padding: 4px 7px;
  background-color: $cream;
  font-family: $font-family-roboto;
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  .d-flex {
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 10px;

    &::before {
      content: '';
      transform: translate(-50%);
      left: 27.5px;
      position: absolute;
      width: 38px;
      height: 38px;
      background-color: $black-1;
      border-radius: 100%;
      transition: all 0.2s ease-in-out;
    }

    &.right::before {
      left: 70px;
    }

    span {
      position: relative;
      color: $gray;
      transform: translate(-50%, -50%);
      left: 17%;
      top: 30%;

      &.active {
        color: $white;
      }
    }
  }
}
</style>