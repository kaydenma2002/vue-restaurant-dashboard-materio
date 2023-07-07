<script setup>
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const {
  syncInitialLoaderTheme,
  syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme,
  isAppRtl,
  handleSkinChanges,
} = useThemeConfig()

const { global } = useTheme()

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
<style>
/* For Webkit-based browsers */
::-webkit-scrollbar {
  width: 8px;
  
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  border-radius: 4px;
}



/* For Firefox */
* {
  
  scrollbar-color: #bdbdbd #f5f5f5;
}

*::-webkit-scrollbar {
  width: 10px;
  
}

*::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  
}

*::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  border-radius: 4px;
  
}


</style>