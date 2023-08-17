<script setup>
import { useOrderListStore } from "@/views/apps/order/useOrderListStore";
import CrmDeveloperMeetup from "@/views/dashboards/crm/CrmDeveloperMeetup.vue";
import CrmMeetingSchedule from "@/views/dashboards/crm/CrmMeetingSchedule.vue";
import CrmSalesOverview from "@/views/dashboards/crm/CrmSalesOverview.vue";
import CrmTotalSales from "@/views/dashboards/crm/CrmTotalSales.vue";
import CrmTransactions from "@/views/dashboards/crm/CrmTransactions.vue";
import CrmUpgradeYourPlan from "@/views/dashboards/crm/CrmUpgradeYourPlan.vue";
import illustration1 from "@images/cards/illustration-1.png";
import illustration2 from "@images/cards/illustration-2.png";
const orderListStore = useOrderListStore();
const totalSales = ref(0);
const fetchSales = () => {
  orderListStore
    .fetchSales()
    .then((response) => {
      totalSales.value = response.data;
      console.log(response.data);
    })
    .catch((error) => console.log(error));
};

const statisticsWithImages = [
  {
    title: "Ratings",
    subtitle: "Year of 2021",
    stats: "13k",
    change: 15.6,
    image: illustration1,
    color: "primary",
  },
  {
    title: "Sessions",
    subtitle: "Last Week",
    stats: "24.5k",
    change: -22,
    image: illustration2,
    color: "secondary",
  },
];

const statistic = {
  title: "New Project",
  color: "primary",
  icon: "mdi-briefcase-variant-outline",
  stats: "862",
  change: -18,
  subtitle: "Yearly Project",
};
fetchSales();
</script>

<template>
  <section>
    <VRow class="match-height">
      <!-- <VCol
        v-for="statistics in statisticsWithImages"
        :key="statistics.title"
        cols="12"
        md="3"
        sm="6"
        class="d-flex flex-column align-self-end"
      >
        <CardStatisticsWithImages v-bind="statistics" />
      </VCol> -->

      <VCol cols="12" md="12">
        <CrmTransactions :sale-data="totalSales" />
      </VCol>

      <VCol cols="12" sm="12" md="12">
        <CrmTotalSales :sale-data="totalSales" />
      </VCol>

      <!-- <VCol
        cols="12"
        sm="6"
        md="2"
      >
        <CrmRevenueReport />
      </VCol> -->

      <VCol cols="12" sm="12" md="12">
        <CrmSalesOverview :sale-data="totalSales" />
      </VCol>
    </VRow>

    <VRow class="match-height">
      <VCol cols="12" md="4">
        <CrmUpgradeYourPlan />
      </VCol>

      <VCol cols="12" md="4">
        <CrmMeetingSchedule />
      </VCol>

      <VCol cols="12" md="4">
        <CrmDeveloperMeetup />
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
