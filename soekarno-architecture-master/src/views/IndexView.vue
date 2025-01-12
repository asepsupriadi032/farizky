<template>
  <!-- <img src="../assets/dev/Intro.jpg" style="position: absolute; top: 0; left: 0; width: 100%; z-index: 100; opacity: 0.3; display: block;"> -->

  <div id="IndexView">
    <div class="container position-relative">
      <h4 id="iv-title" class="c-white roboto-serif-medium fs-65 lh-76">{{ words.karya_sukarno }}</h4>

      <div id="head-logo">
        <img src="../../assets/logo/kemenkebud.png" alt="kemenkebud">
        <img src="../../assets/logo/mojokerto.png" alt="mojokerto">
      </div>
    </div>
    
    <div id="iv-content" class="d-flex justify-content-between container">
      <a href="javascript:;" id="ic-arsitektur" @click="link('/home?cat=Arsitektur')">
        <span class="roboto-serif-medium fs-65 lh-76">{{ words.arsitektur }}</span>
      </a>
      <a href="javascript:;" id="ic-seni" @click="link('/home?cat=Seni')">
        <span class="roboto-serif-medium fs-65 lh-76">{{ words.seni }}</span>
      </a>
    </div>

    <div id="iv-footer" class="container">
      <hr class="if-hr">
      <p class="roboto-regular fs-20 lh-23">Galeri Sejarah Sukarno © 2023. All Rights Reserved.</p>

      <LangButton></LangButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from "vue-router"
import LangButton from '@/components/LangButton.vue'
import { lang } from '../stores/lang'

const router = useRouter()
const exit = ref(true)
const words = computed(() => {
  return lang().words
})

onMounted(() => {
  exit.value = false
  document.body.style.overflow = 'hidden'
})

function link(to) {
  setTimeout(() => {
    exit.value = true
    router.push(to)
  }, 200)
}
</script>

<style lang="scss">
#IndexView {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 50px;
  background-image: url('../assets/images/bg_primary.jpg');
  background-size: cover;

  #head-logo {
    top: 32px;
    right: 0.94%;
  }

  #iv-title {
    position: relative;
    top: 28px;
    left: 10px;
  }

  #iv-content {
    position: relative;
    top: 10px;

    #ic-arsitektur {
      background-image: url('../../assets/intro-bg/arsitektur.png');
    }
    #ic-seni {
      background-image: url('../../assets/intro-bg/seni.png');
    }

    a {
      width: 610px;
      height: 610px;
      border-radius: 40px;
      margin: 0 11px;
      background-color: $gray;
      color: $white;
      position: relative;
      top: 90px;
      background-size: cover;

      &::before {
        content: '';
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
        width: 100%;
        height: 80%;
        transition: all 0.2s ease-in-out;
      }

      // hover and add before
      &:hover {
        &::before {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 40px;
        }
      }

      span {
        text-align: center;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        top: 50%;
      }
    }
  }

  #iv-footer {
    position: absolute;
    width: 91%;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 32px;
    color: $white;
    text-align: right;

    .if-hr {
      border-top: 1px solid $white;
      width: 100%;
    }
    p {
      position: relative;
      top: 15px;
      letter-spacing: 0.012rem;
    }
  }

  #LangButton {
    position: absolute;
    bottom: -2px;
    left: 2px;
  }
}
</style>