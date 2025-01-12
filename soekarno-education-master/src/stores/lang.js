import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

const wordsID = {
  masa_sekolah_sukarno: 'Masa Sekolah Sukarno',
  lihat: 'Lihat',
  kembali: 'Kembali',
  scroll_kebawah: 'Scroll Kebawah',
  selanjutnya: 'Selanjutnya',
  kembali_ke_awal: 'Kembali ke Awal',
}
const wordsEN = {
  masa_sekolah_sukarno: 'Sukarno\'s School Years',
  lihat: 'View',
  kembali: 'Back',
  scroll_kebawah: 'Scroll Down',
  selanjutnya: 'Next',
  kembali_ke_awal: 'Start from beginning',
}

export const lang = defineStore('lang', () => {
  const lang = ref('ID')

  const localLang = localStorage.getItem('lang')
  if (localLang) {
    lang.value = localLang
  }

  function toggleLang() {
    if (lang.value === 'ID') {
      lang.value = 'EN'
    } else {
      lang.value = 'ID'
    }
  }

  watch(lang, (val) => {
    localStorage.setItem('lang', val)
  })

  const words = computed(() => {
    if (lang.value === 'ID') {
      return wordsID
    } else {
      return wordsEN
    }
  })

  return { lang, toggleLang, words }
})
