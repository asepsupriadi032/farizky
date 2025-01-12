import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { lang } from './lang'

const storeLang = lang()

import dataJson from '../../assets/data.json'

export const items = defineStore('items', () => {
  const jsonData = reactive(dataJson)
  const filters = reactive({
    Category: 'Arsitektur',
    Sub_Category: 'All'
  })
  const index = ref(0)

  // map items
  const items = computed(() => {
    return jsonData.map((item) => {
      if (typeof item.Lagu_Content == 'object') {
        item.Lagu_Content.Diiringi = storeLang.lang == 'ID'
          ? item.Lagu_Content.Diiringi_ID : item.Lagu_Content.Diiringi_EN
      }

      return {
        ...item,
        Nama_Karya: storeLang.lang == 'ID' ? item.Nama_Karya_ID : item.Nama_Karya_EN,
        Saat_Ini: storeLang.lang == 'ID' ? item.Saat_Ini_ID : item.Saat_Ini_EN,
        Caption: storeLang.lang == 'ID' ? item.Caption_ID : item.Caption_EN,
        Gambar_Preview: getAssetURL(item.Gambar_Preview),
        List_Gambar: item.List_Gambar?.map((img) => getAssetURL(img))
      }
    })
  })

  const categories = computed(() => {
    return pluck(items.value, 'Category')
  })
  const subCategories = computed(() => {
    const catItems = items.value.filter((item) => item.Category === filters.Category)
    return pluck(catItems, 'Sub_Category')
  })

  const data = computed(() => {
    const catItems = items.value.filter((item) => item.Category === filters.Category)

    if (filters.Sub_Category === 'All') return catItems
    return catItems.filter((item) => item.Sub_Category === filters.Sub_Category)
  })

  function setFilterCat(cat) {
    filters.Category = cat
    setFilterSub('All')
  }
  function setFilterSub(sub) {
    filters.Sub_Category = sub
  }
  function setIndex(val) {
    index.value = val
  }
  function getItem(ID) {
    return computed(() => items.value.find((item) => item.ID === ID))
  }

  return {
    items,
    data,
    index,
    filters,
    categories,
    subCategories,
    setFilterCat,
    setFilterSub,
    setIndex,
    getItem
  }
})

function pluck(items, keyName) {
  let resp = []
  items.forEach((item) => {
    if (!item[keyName]) return

    if (!resp.includes(item[keyName])) {
      resp.push(item[keyName])
    }
  })
  return resp
}

function getAssetURL(assetName) {
  const url = new URL(`../../${assetName}`, import.meta.url).href
  // if url has undefined, return empty string
  if (url.includes('undefined')) return ''
  return url
}