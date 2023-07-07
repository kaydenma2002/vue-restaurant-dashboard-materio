<script setup>
import NavBarI18n from '@core/components/I18n.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'

const { isAppRtl } = useThemeConfig()

const i18nCompLanguages = [
  {
    label: 'English',
    i18nLang: 'en',
  },
  {
    label: 'French',
    i18nLang: 'fr',
  },
  {
    label: 'Arabic',
    i18nLang: 'ar',
  },
  {
    label: 'Chinese',
    i18nLang: 'cn',
  },
  {
    label: 'Vietnamese',
    i18nLang: 'vn',
  },
]

const handleLangChange = lang => {
  isAppRtl.value = lang === 'ar'
}
</script>

<template>
  <NavBarI18n
    :languages="i18nCompLanguages"
    @change="handleLangChange"
  />
</template>
