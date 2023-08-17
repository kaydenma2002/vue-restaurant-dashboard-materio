<script setup>
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import { ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";

const props = defineProps({
  saleData: {
    type: Object,
    required: true,
  },
});
const vuetifyTheme = useTheme();
const { theme } = useThemeConfig();

const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors);
  const variableTheme = ref(vuetifyTheme.current.value.variables);
  const disabledColor = `rgba(${hexToRgb(currentTheme.value["on-surface"])},${
    variableTheme.value["disabled-opacity"]
  })`;

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityTo: 0.2,
        opacityFrom: 1,
        shadeIntensity: 0,
        type: "horizontal",
        stops: [0, 100, 100],
      },
    },
    stroke: {
      width: 5,
      curve: "smooth",
      lineCap: "round",
    },
    legend: { show: false },
    colors: [currentTheme.value.success],
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
        bottom: -10,
      },
    },
    xaxis: {
      axisTicks: { show: true },
      axisBorder: { show: true },
      categories: categories.value,
      labels: { style: { colors: disabledColor } },
    },
    yaxis: { labels: { show: true } },
    tooltip: { enabled: true },
  };
});
const customSeries = ref([]);

const categories = ref([])
watch(
  () => props.saleData.monthlySales,
  (monthlySales) => {
    customSeries.value = [
      {
        name: "Total Sales",
        data: monthlySales?.map((item) => item.sale.toFixed(2)) || [],
      },
    ];
    monthlySales?.map(item =>{
      categories.value.push(item.month)
    })
  }
);
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>
        <p class="text-base font-weight-medium mb-1">Total Sales</p>
        <p class="text-xl mb-0"></p>
      </VCardTitle>

      <template #append>
        <div class="mt-n7 me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText v-if="categories.length && customSeries.length">
      <VueApexCharts
        type="line"
        :options="options"
        :series="customSeries"
        :categories="categories"
        :height="220"
      />
    </VCardText>
  </VCard>
</template>
