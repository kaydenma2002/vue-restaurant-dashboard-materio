<script setup>
import { defineProps, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";
import { getAreaChartSplineConfig } from "@core/libs/apex-chart/apexCharConfig";

const props = defineProps({
  restaurantData: {
    type: Object,
    required: true,
  },
});

const vuetifyTheme = useTheme();
const chartConfig = computed(() => {
  const config = getAreaChartSplineConfig(vuetifyTheme.current.value);
  const xaxisCategories = Object.keys(
    props.restaurantData.totalOrdersAndSalesPerDay
  );
  config.yaxis.labels.formatter = (value) => "$" + value.toFixed(2)
  config.xaxis.categories = xaxisCategories;
  return config;
});
const series = [
  {
    name: "Sales",
    data: Object.values(props.restaurantData.totalOrdersAndSalesPerDay).map(
      (item) => + `${parseInt(item.totalSales)}`
    ),
  },
  {
    name: "Orders",
    data: Object.values(props.restaurantData.totalOrdersAndSalesPerDay).map(
      (item) => parseInt(item.totalOrders)
    ),
  },
];
</script>

<template>
  <VueApexCharts
    type="area"
    height="400"
    :options="chartConfig"
    :series="series"
  />
</template>
