<script setup>
import { useOrderListStore } from '@/views/apps/order/useOrderListStore'
import OrderBioPanel from '@/views/apps/order/view/OrderBioPanel.vue'
import OrderTabBillingsPlans from '@/views/apps/order/view/OrderTabBillingsPlans.vue'
import OrderTabConnections from '@/views/apps/order/view/OrderTabConnections.vue'
import OrderTabNotifications from '@/views/apps/order/view/OrderTabNotifications.vue'
import OrderTabOverview from '@/views/apps/order/view/OrderTabOverview.vue'
import OrderTabSecurity from '@/views/apps/order/view/OrderTabSecurity.vue'
import router from '@/router'

const orderListStore = useOrderListStore()
const route = useRoute()
const orderData = ref()
const orderTab = ref(null)
import { ref, watch } from 'vue'

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
orderListStore.fetchItemsByOrderId(Number(route.params.id)).then(response => {
  orderData.value = response.data
  console.log(response.data)
  console.log(orderData)
})
const orderUpdateInfo =() => {
  orderListStore.fetchItemsByOrderId(Number(route.params.id)).then(response => {
  orderData.value = response.data
  
})
}
watch(() => route.params.id, async (newOrderId) => {
  try {
    const response = await orderListStore.fetchItemsByOrderId(Number(newOrderId))
    orderData.value = response.data
  } catch (error) {
    console.error('Error fetching order data', error)
  }
})
</script>

<template>
  <VRow v-if="orderData">
    <VCol
      cols="12"
      md="12"
      lg="12"
    >
      <OrderBioPanel :order-data="orderData" @orderUpdateInfo="orderUpdateInfo()" />
    </VCol>

    
  </VRow>
</template>
