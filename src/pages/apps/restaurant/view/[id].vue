<script setup>
import { useRestaurantListStore } from '@/views/apps/restaurant/useRestaurantListStore'
import RestaurantBioPanel from '@/views/apps/restaurant/view/RestaurantBioPanel.vue'
import RestaurantTabBillingsPlans from '@/views/apps/restaurant/view/RestaurantTabBillingsPlans.vue'
import RestaurantTabConnections from '@/views/apps/restaurant/view/RestaurantTabConnections.vue'
import RestaurantTabNotifications from '@/views/apps/restaurant/view/RestaurantTabNotifications.vue'
import RestaurantTabOverview from '@/views/apps/restaurant/view/RestaurantTabOverview.vue'
import RestaurantTabSecurity from '@/views/apps/restaurant/view/RestaurantTabSecurity.vue'

const restaurantListStore = useRestaurantListStore()
const route = useRoute()
const restaurantData = ref()
const restaurantTab = ref(null)

const tabs = [
  {
    icon: 'mdi-account-outline',
    title: 'Overview',
  },
  {
    icon: 'mdi-lock-outline',
    title: 'Security',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: 'Billing & Plan',
  },
  {
    icon: 'mdi-bell-outline',
    title: 'Notifications',
  },
  {
    icon: 'mdi-link-variant',
    title: 'Connections',
  },
]

restaurantListStore.fetchRestaurant(Number(route.params.id)).then(response => {
  restaurantData.value = response.data
  console.log(response.data)
})
const restaurantUpdateInfo = () => {
  restaurantListStore.fetchRestaurant(Number(route.params.id)).then(response => {
  restaurantData.value = response.data
  console.log(response.data)
})
  

}
</script>

<template>
  <VRow v-if="restaurantData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <RestaurantBioPanel @restaurantUpdateInfo="restaurantUpdateInfo()" :restaurant-data="restaurantData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="restaurantTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            start
            :icon="tab.icon"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="restaurantTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <RestaurantTabOverview :restaurant-data="restaurantData" />
        </VWindowItem>

        <VWindowItem>
          <RestaurantTabSecurity />
        </VWindowItem>

        <VWindowItem>
          <RestaurantTabBillingsPlans />
        </VWindowItem>

        <VWindowItem>
          <RestaurantTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <RestaurantTabConnections />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
