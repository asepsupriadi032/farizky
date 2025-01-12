import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { lang } from './lang'

const storeLang = lang()

import jsonItems from '../../assets/data.json'

export const items = defineStore('items', () => {
  const items = reactive(jsonItems)
  const data = computed(() => {
    return items.map((item) => {
      // map item.hightlights
      item.highlights = item.highlights.map((highlight) => {
        return {
          ...highlight,
          text: storeLang.lang == 'ID' ? highlight.text_id : highlight.text_en,
          image_url: getAssetURL(highlight.image),
        }
      })

      return {
        ...item,
        Sekolah_Lang: storeLang.lang == 'ID' ? item.Sekolah_ID : item.Sekolah_EN,
        Image_Card_BG: getAssetURL(item.Image_Card_BG),
        Image_BG: getAssetURL(item.Image_BG),
        Image_SQ: getAssetURL(item.Image_SQ),
      }
    })
  })
  
  const getByID = (id) => {
    return computed(() => {
      let item = data.value.filter((item) => item.ID == id)[0]
      let nextItem = data.value[data.value.indexOf(item) + 1]
      if (!nextItem) {
        nextItem = data.value[0]
      }

      return {
        ...item,
        nextItem
      }
    })
  }

  return {
    data,
    getByID
  }
})

function getAssetURL(assetName) {
  const url = new URL(`../../${assetName}`, import.meta.url).href
  // if url has undefined, return empty string
  if (url.includes('undefined')) return ''
  return url
}