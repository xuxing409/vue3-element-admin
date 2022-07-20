import i18n from '@/i18n'
import { watch } from 'vue'
import appStore from '@/stores'
import { storeToRefs } from 'pinia'

// 国际化处理
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  const { language } = storeToRefs(appStore.useAppStore)

  watch(language, () => {
    cbs.forEach((cb) => cb(language))
  })
}
