<script setup>
import { useOrderListStore } from "@/views/apps/order/useOrderListStore";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import { computed, ref, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useTheme } from "vuetify";

const orderListStore = useOrderListStore();

const vuetifyTheme = useTheme();
const { theme } = useThemeConfig();
const props = defineProps({
  saleData: {
    type: Object,
    required: true,
  },
});

const labels = ref([]);
const sales = ref([]);
const totalSales = ref("");
const options = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors;
  const variableTheme = vuetifyTheme.current.value.variables;
  const secondaryTextColor = `rgba(${hexToRgb(currentTheme["on-surface"])},${
    variableTheme["medium-emphasis-opacity"]
  })`;
  const primaryTextColor = `rgba(${hexToRgb(currentTheme["on-surface"])},${
    variableTheme["high-emphasis-opacity"]
  })`;

  return {
    chart: { sparkline: { enabled: true } },
    colors: [
      currentTheme.primary,
      `rgba(${hexToRgb(currentTheme.primary)}, 0.7)`,
      `rgba(${hexToRgb(currentTheme.primary)}, 0.5)`,
      currentTheme["grey-100"],
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: labels.value,
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              offsetY: 25,
              color: secondaryTextColor,
            },
            value: {
              offsetY: -15,
              fontWeight: 600,
              fontSize: "24px",
              color: primaryTextColor,
              formatter: (value) => `$${Number(value).toFixed(2)}`,
            },
            total: {
              show: true,
              label: "Sales Overview",
              fontSize: "12px",
              color: secondaryTextColor,
              formatter: (value) => {
                const total = value.globals.seriesTotals.reduce(
                  (acc, num) => acc + num
                );
                return `$${total?.toFixed(2)}`;
              },
            },
          },
        },
      },
    },
    tooltip: { enabled: false },
  };
});

const series = ref([]);
const timeRange = ref(["Today"]);
watch(
  () => props.saleData.topRestaurants,
  (newTopRestaurants) => {
    sales.value = newTopRestaurants?.map((item) => ({
      total_sales: item.total_sales,
      name: item.name,
    }));
    totalSales.value = props.saleData.sales;

    series.value = newTopRestaurants?.map((item) => item.total_sales) || [];
    labels.value = newTopRestaurants?.map((item) => item.name) || [];

    if (series.value?.length === 0 && labels.value?.length === 0) {
      series.value.push(0);
      labels.value.push("No sales yet");
      console.log(1);
    }
  }
);
watch(timeRange, () => {
  orderListStore.fetchSales(timeRange.value).then((res) => {
    console.log(res);
    totalSales.value = res.data.sales;
    sales.value = res.data.topRestaurants?.map((item) => ({
      total_sales: item.total_sales,
      name: item.name,
    }));
    series.value =
      res.data.topRestaurants?.map((item) => item.total_sales) || [];
    labels.value = res.data.topRestaurants?.map((item) => item.name) || [];
    console.log(series.value);
    if (series.value?.length === 0 && labels.value?.length === 0) {
      series.value.push(0);
      labels.value.push("No sales yet");
    }
  });
});
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Sales Overview</VCardTitle>

      <template #append>
        <div style="inline-size: 13.5rem">
          <VSelect
            v-model="timeRange"
            label="Select Time Range"
            :items="['Today', 'This Week', 'This Month']"
          />
        </div>
      </template>
    </VCardItem>

    <VCardText class="pt-4">
      <VRow>
        <VCol sm="6" cols="12">
          <VueApexCharts
            type="donut"
            :options="options"
            :series="series"
            :height="220"
            :labels="labels.value"
          />
        </VCol>

        <VCol cols="12" sm="6">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar rounded color="primary" variant="tonal">
                <VIcon icon="mdi-currency-usd" />
              </VAvatar>
            </div>

            <div>
              <p class="mb-0">Number of Sales</p>
              <h6 class="text-h6">
                {{ parseFloat(totalSales)?.toFixed(2) }}
              </h6>
            </div>
          </div>

          <VDivider class="my-3" />
          <VRow>
            <VCol v-for="sale in sales" :key="sale.id" cols="6">
              <p class="mb-1">
                <VIcon
                  icon="mdi-checkbox-blank-circle"
                  color="primary"
                  size="12"
                  class="me-2"
                />
                <span class="text-ellipsis overflow-hidden">{{
                  sale.name
                }}</span>
              </p>
              <p class="text-base font-weight-medium mb-0">
                ${{ sale?.total_sales?.toFixed(2) }}
              </p>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
