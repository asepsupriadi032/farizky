<template>
  <Teleport to="body">
    <transition name="modal">
      <div class="modal-mask" v-if="show">
        <div class="modal-wrapper">
          <div class="modal-container" ref="modalContainer">
            <slot name="close-btn">
              <svg @click="emitClose()" id="closeBtn" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/></svg>
            </slot>
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { defineProps, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const modalContainer = ref(null)
const readyToClose = ref(false)

watch(() => props.show, (val) => {
  if (val) {
    setTimeout(() => {
      readyToClose.value = true
    }, 300)
  }
})

const handleClickOutside = (event) => {
  if (modalContainer.value && !modalContainer.value.contains(event.target)) {
    if (readyToClose.value) {
      emitClose()
    }
  }
}

function emitClose() {
  emit('close', false)
  readyToClose.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      emitClose()
    }
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease-in-out;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100px;
  max-width: 95%;
  margin: auto 0;
  padding: 7px;
  background-color: $white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease-in-out;

  > * {
    max-height: 90vh;
  }
}

#closeBtn {
  background-color: $dark;
  border-radius: 50%;
  padding: 4px;
  max-width: 20px;
  fill: $white;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;

  &:hover {
    opacity: 0.8;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transform: transform(-50%, -50%);
}
</style>