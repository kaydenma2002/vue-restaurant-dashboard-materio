<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { paginationMeta } from '@/@fake-db/utils'
import { useRestaurantListStore } from "@/views/apps/restaurant/useRestaurantListStore";

const RestaurantListStore = useRestaurantListStore()
const searchQuery = ref('')
const route = useRoute()
const selectedStatus = ref()
const totalPage = ref(1)
const totalRestaurants = ref(0)
const Restaurants = ref([])
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})
const options = ref({
  page: 1,
  itemsPerPage: 7,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const isLoading = ref(false)

// 👉 headers
const headers = [
  {
    title: 'NAME',
    key: 'restaurant_name',
  },
  {
    title: "PHONE",
    key: "phone",
  },
  {
    title: "COMPANY",
    key: "company",
  },
  {
    title: "STREET",
    key: "street",
  },
  {
    title: "CITY",
    key: "city",
  },
  {
    title: "ZIP CODE",
    key: "zip_code",
  },


  {
    title: "STATUS",
    key: "status",
  },
  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
  
]

// 👉 Fetch Restaurants
const fetchRestaurantsByUserId = (user_id) => {
  isLoading.value = true
  RestaurantListStore.fetchRestaurantsByUserId(user_id).then(response => {
    console.log(response)
    
    Restaurants.value = response.data
    // totalPage.value = response.data.totalPage
    // totalRestaurants.value = response.data.totalRestaurants
    // options.value.page = response.data.page
  }).catch(error => {
    console.log(error)
  })
  isLoading.value = false
}
const resolveRestaurantStatusVariant = (stat) => {
  const statLowerCase = stat;
  if (statLowerCase === "Pending") return "warning";
  if (statLowerCase === "Active") return "success";
  if (statLowerCase === "Deactive") return "secondary";

  return "primary";
};
const resolveRestaurantStatusText = (stat) => {
  if (stat === "Pending") return "Pending";
  if (stat === "Active") return "Active";
  if (stat === "Deactive") return "Deactive";

  return "";
};
const resolveRestaurantStatusVariantAndIcon = status => {
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


const closeRestaurant = (id) => {

  RestaurantListStore.closeRestaurant(id)
  
  fetchRestaurantsByUserId(route.params.id)
}

// 👉 watch for data table options like itemsPerPage,page,searchQuery,sortBy etc...
watchEffect(() => {
   fetchRestaurantsByUserId(props.userData.id)
})
</script>

<template>
  <section v-if="Restaurants">
    <VCard id="Restaurant-list">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <!-- 👉 Actions  -->
        <div class="me-3 text-h6">
          Restaurant List
        </div>

        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
          <!-- 👉 Export Restaurant -->
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
        :items-length="totalRestaurants"
        :headers="headers"
        :items="Restaurants"
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
          <RouterLink :to="{ name: 'apps-restaurant-preview-id', params: { id: item.value } }">
            #{{ item.raw.id }}
          </RouterLink>
        </template> -->

        <!-- trending -->
        <template #item.restaurant_name="{ item }">
          {{ item.raw.name }}
        </template>

        <!-- Total -->
        <template #item.company="{ item }">
          {{ item.raw.company }}
        </template>

        <!-- issued Date -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveRestaurantStatusVariant(item.raw.status)"
            density="comfortable"
            class="text-capitalize"
          >
            {{ resolveRestaurantStatusText(item.raw.status) }}
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
                    name: 'apps-restaurant-view-id',
                    params: { id: item.raw.id },
                  }"
                >
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>View/Edit</VListItemTitle>
                </VListItem>

                
                
                <VListItem v-if="item.raw.status != 'Deactive' " @click="closeRestaurant(item.raw.restaurant_id)">
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

            <span class="d-flex align-center text-sm text-high-emphasis">{{ paginationMeta(options, totalRestaurants) }}</span>

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
                :disabled="options.page >= Math.ceil(totalRestaurants / options.itemsPerPage)"
                @click="options.page >= Math.ceil(totalRestaurants / options.itemsPerPage) ? options.page = Math.ceil(totalRestaurants / options.itemsPerPage) : options.page++ "
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
#Restaurant-list {
  .Restaurant-list-actions {
    inline-size: 8rem;
  }

  .Restaurant-list-search {
    inline-size: 12rem;
  }
}
</style>
