<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()
const { theme } = useThemeConfig()
const currentTheme = controlledComputed(theme, () => vuetifyTheme.current.value.colors)
const variableTheme = controlledComputed(theme, () => vuetifyTheme.current.value.variables)
const series = [78]

const chartOptions = controlledComputed(theme, () => {
  return {
    chart: { sparkline: { enabled: true } },
    colors: [currentTheme.value.info],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: '65%' },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '1.25rem',
            fontWeight: '600',
            offsetY: 0,
            color: `rgba(${ hexToRgb(currentTheme.value['on-surface']) },${ variableTheme.value['high-emphasis-opacity'] })`,
          },
        },
        track: { background: currentTheme.value.background },
      },
    },
    stroke: { lineCap: 'round' },
  }
})
</script>

<template>
  <VCard>
    <VCardText>
      <h6 class="text-h6">
        135k
      </h6>
      <VueApexCharts
        id="stats-radial-bar-chart"
        :options="chartOptions"
        :series="series"
        type="radialBar"
        :height="110"
      />

      <h6 class="text-sm text-center font-weight-medium mt-9">
        Total Sales
      </h6>
    </VCardText>
  </VCard>
</template>

  <style lang="scss">
  #stats-radial-bar-chart {
    .apexcharts-canvas {
      .apexcharts-text {
        &.apexcharts-datalabel-value {
          font-weight: 500;
        }
      }
    }
  }
  </style>
