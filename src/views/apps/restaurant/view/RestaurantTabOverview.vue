<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import RestaurantOrderTable from './RestaurantOrderTable.vue'
import ApexChartAreaChart from '@/views/charts/apex-chart/ApexChartAreaChart.vue'

// Images
import avatar2 from '@images/avatars/avatar-2.png'
import figma from '@images/icons/project-icons/figma.png'
import html5 from '@images/icons/project-icons/html5.png'
import python from '@images/icons/project-icons/python.png'
import react from '@images/icons/project-icons/react.png'
import sketch from '@images/icons/project-icons/sketch.png'
import vue from '@images/icons/project-icons/vue.png'
import xamarin from '@images/icons/project-icons/xamarin.png'
const props = defineProps({
  restaurantData: {
    type: Object,
    required: true,
  },
})



</script>

<template>
  <VRow>
    <VCol cols="12">
      <RestaurantOrderTable :restaurant-data="restaurantData" />
    </VCol>

    <VCol cols="12">
      <!-- 👉 Activity timeline -->
      <VCard :title="'Total Restaurant sales last week: $' + restaurantData.totalWeekSales.toFixed(2) ">
        <VCardText>
          <ApexChartAreaChart :restaurant-data="restaurantData"/>
        </VCardText>
      </VCard>
    </VCol>

    
  </VRow>
</template>
