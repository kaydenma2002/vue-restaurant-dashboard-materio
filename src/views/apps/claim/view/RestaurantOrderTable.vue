<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@/@fake-db/utils'
import { useOrderListStore } from "@/views/apps/order/useOrderListStore";

const OrderListStore = useOrderListStore()
const searchQuery = ref('')
const route = useRoute()
const selectedStatus = ref()
const totalPage = ref(1)
const totalOrders = ref(0)
const Orders = ref([])
const props = defineProps({
  restaurantData: {
    type: Object,
    required: true,
  },
})
const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const isLoading = ref(false)

// 👉 headers
const headers = [
  {
    title: '#',
    key: 'order_id',
  },
  {
    title: "TOTAL",
    key: "total",
  },
  {
    title: "CUSTOMER NAME",
    key: "customer_name",
  },
  {
    title: "NOTE",
    key: "note",
  },
  
  {
    title: "STATUS",
    key: "status",
  },
  
]

// 👉 Fetch Orders
const fetchOrdersByRestaurantId = (restaurant_id) => {
  isLoading.value = true
  OrderListStore.fetchOrdersByRestaurantId(restaurant_id).then(response => {
    console.log(response)
    
    Orders.value = response.data
    
  }).catch(error => {
    console.log(error)
  })
  isLoading.value = false
}
const resolveOrderStatusVariant = (stat) => {
  const statLowerCase = stat;
  if (statLowerCase === "Pending") return "warning";
  if (statLowerCase === "Active") return "success";
  if (statLowerCase === "Deactive") return "secondary";

  return "primary";
};
const resolveOrderStatusText = (stat) => {
  if (stat === "Pending") return "Pending";
  if (stat === "Active") return "Active";
  if (stat === "Deactive") return "Deactive";

  return "";
};
const resolveOrderStatusVariantAndIcon = status => {
  if (status === 'Partial Payment')
    return {
      variant: 'warning',
      icon: 'mdi-chart-timeline-variant',
    }
  if (status === 'Paid')
    return {
      variant: 'success',
      icon: 'mdi-check',
    }
  if (status === 'Downloaded')
    return {
      variant: 'info',
      icon: 'mdi-arrow-down',
    }
  if (status === 'Draft')
    return {
      variant: 'secondary',
      icon: 'mdi-content-save-outline',
    }
  if (status === 'Sent')
    return {
      variant: 'primary',
      icon: 'mdi-email-outline',
    }
  if (status === 'Past Due')
    return {
      variant: 'error',
      icon: 'mdi-alert-circle-outline',
    }
  
  return {
    variant: 'secondary',
    icon: 'mdi-close',
  }
}




// 👉 watch for data table options like itemsPerPage,page,searchQuery,sortBy etc...
watchEffect(() => {
   fetchOrdersByRestaurantId(props.restaurantData.restaurant_id)
})
</script>

<template>
  <section v-if="Orders">
    <VCard id="Order-list">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Actions  -->
        <div class="me-3 text-h6">
          Order List
        </div>

        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Export Order -->
          <VBtn append-icon="mdi-chevron-down">
            <VMenu activator="parent">
              <VList :items="['PDF', 'XLSX', 'CSV']" />
            </VMenu>
            Export
          </VBtn>
        </div>
      </VCardText>

      <!-- SECTION Datatable -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :loading="isLoading"
        :items-length="totalOrders"
        :headers="headers"
        :items="Orders"
        class="text-sm rounded-0"
        @update:options="options = $event"
      >
        <!-- Trending Header -->
        <template #column.trending>
          <VIcon
            size="22"
            icon="mdi-trending-up"
          />
        </template>

        <!-- id -->
        <!-- <template #item.id="{ item }">
          <RouterLink :to="{ name: 'apps-order-preview-id', params: { id: item.value } }">
            #{{ item.raw.id }}
          </RouterLink>
        </template> -->

        <!-- trending -->
        <template #item.order_id="{ item }">
          {{ item.raw.id }}
        </template>
        <template #item.customer_name="{ item }">
          {{ item.raw.user.name }}
        </template>
        <template #item.note="{ item }">
          {{ item.raw.note }}
        </template>
        <!-- Total -->
        

        <!-- issued Date -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveOrderStatusVariant(item.raw.status)"
            density="comfortable"
            class="text-capitalize"
          >
            {{ resolveOrderStatusText(item.raw.status) }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn icon variant="text" size="small" color="medium-emphasis">
            <VIcon size="24" icon="mdi-dots-vertical" />

            <VMenu activator="parent">
              <VList>
                <VListItem
                  :to="{
                    name: 'apps-order-view-id',
                    params: { id: item.raw.id },
                  }"
                >
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>View/Edit</VListItemTitle>
                </VListItem>

                
                
                <VListItem v-if="item.raw.status != 'Deactive' " @click="closeOrder(item.raw.Order_id)">
                  <template #prepend>
                    <VIcon icon="mdi-cancel" />
                  </template>
                  <VListItemTitle>Close</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect
                v-model="options.itemsPerPage"
                class="per-page-select text-high-emphasis"
                variant="plain"
                density="compact"
                :items="[10, 20, 25, 50, 100]"
              />
            </div>

            <span class="d-flex align-center text-sm text-high-emphasis">{{ paginationMeta(options, totalOrders) }}</span>

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn
                class="flip-in-rtl"
                icon="mdi-chevron-left"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="options.page <= 1"
                @click="options.page <= 1 ? options.page = 1 : options.page--"
              />

              <VBtn
                icon="mdi-chevron-right"
                class="flip-in-rtl"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="options.page >= Math.ceil(totalOrders / options.itemsPerPage)"
                @click="options.page >= Math.ceil(totalOrders / options.itemsPerPage) ? options.page = Math.ceil(totalOrders / options.itemsPerPage) : options.page++ "
              />
            </div>
          </div>
        </template>
      </VDataTableServer>

      <!-- !SECTION -->
      <VDivider />
    </VCard>
  </section>
</template>

<style lang="scss">
#Order-list {
  .Order-list-actions {
    inline-size: 8rem;
  }

  .Order-list-search {
    inline-size: 12rem;
  }
}
</style>
