import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'

const wordsID = {
  karya_sukarno: 'Karya Sukarno',
  arsitektur: 'Arsitektur',
  seni: 'Seni',
  kembali: 'Kembali',
  semua_kota: 'Semua Kota',
  semua_seni: 'Semua Seni',
  patung: 'Patung',
  lagu: 'Lagu',
  lukisan: 'Lukisan',
  lihat: 'Lihat',
  lokasi: 'Lokasi',
  saat_ini: 'Saat Ini',
  tentang: 'Tentang',
  pencipta: 'Pencipta',
  dinyanyikan_oleh: 'Dinyanyikan oleh',
  diiringi_oleh: 'Diiringi oleh',
}
const wordsEN = {
  karya_sukarno: "Sukarno's Works",
  arsitektur: 'Architecture',
  seni: 'Art',
  kembali: 'Back',
  semua_kota: 'All City',
  semua_seni: 'All Art',
  patung: 'Statue',
  lagu: 'Music',
  lukisan: 'Painting',
  lihat: 'View',
  lokasi: 'Location',
  saat_ini: 'Current',
  tentang: 'About',
  pencipta: 'Creator',
  dinyanyikan_oleh: 'Sung by',
  diiringi_oleh: 'Played by',
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