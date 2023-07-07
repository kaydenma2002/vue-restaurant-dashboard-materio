<script setup>
import { VDataTableServer } from "vuetify/labs/VDataTable";
import { paginationMeta } from "@/@fake-db/utils";
import AddNewRestaurantDrawer from "@/views/apps/restaurant/list/AddNewRestaurantDrawer.vue";
import { useRestaurantListStore } from "@/views/apps/restaurant/useRestaurantListStore";
import { avatarText } from "@core/utils/formatters";
import { debounce } from "lodash";
const restaurantListStore = useRestaurantListStore();
const searchQuery = ref("");
const selectedRole = ref("");
const selectedPlan = ref("");
const selectedStatus = ref("null");
const totalPage = ref(1);
const totalRestaurants = ref(0);
const restaurants = ref([]);

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

// Headers
const headers = [
  {
    title: "RESTAURANT",
    key: "name",
    sortable:true
  },
  {
    title: "OWNER",
    key: "owner.name",
    sortable:false
  },
  {
    title: "PHONE",
    key: "phone",
  },

  {
    title: "STATE",
    key: "state",
  },
  {
    title: "STATUS",
    key: "status",
    sortable:true
  },
  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];
// 👉 Fetching restaurants
const fetchRestaurants = debounce(() => {
  restaurantListStore
    .fetchRestaurants({
      q: searchQuery.value,
      status: selectedStatus.value,
      
      options: options.value,
    })
    .then((response) => {
      console.log(response)
      restaurants.value = response.data.data;
      totalPage.value = response.data.total;
      totalRestaurants.value = response.data.total;
      options.value.page = response.data.current_page;
    })
    .catch((error) => {
      console.error(error);
    });
}, 100);
fetchRestaurants();
watch(
  () => options.value.itemsPerPage,
  (count) => {
    fetchRestaurants()
    
  }
);

watch(
  () => options.value.page,
  (count) => {
    fetchRestaurants()
    
  }
);
watch(
  () => options.value.sortBy,
  (count) => {
    console.log(options)
    fetchRestaurants()
    
  }
);
watch([searchQuery,selectedStatus],() =>{
  fetchRestaurants()
  
})
// 👉 search filters
const roles = [
  {
    title: "Admin",
    value: "admin",
  },
  {
    title: "Author",
    value: "author",
  },
  {
    title: "Editor",
    value: "editor",
  },
  {
    title: "Maintainer",
    value: "maintainer",
  },
  {
    title: "Subscriber",
    value: "subscriber",
  },
];

const plans = [
  {
    title: "Basic",
    value: "basic",
  },
  {
    title: "Company",
    value: "company",
  },
  {
    title: "Enterprise",
    value: "enterprise",
  },
  {
    title: "Team",
    value: "team",
  },
];

const status = [
  {
    title: "All",
    value: "null",
  },
  {
    title: "Pending",
    value: "Pending",
  },
  {
    title: "Active",
    value: "Active",
  },
  {
    title: "Deactive",
    value: "Deactive",
  },
];

// const resolveRestaurantRoleVariant = role => {
//   const roleLowerCase = role.toLowerCase()
//   if (roleLowerCase === 'subscriber')
//     return {
//       color: 'primary',
//       icon: 'mdi-account-outline',
//     }
//   if (roleLowerCase === 'author')
//     return {
//       color: 'warning',
//       icon: 'mdi-cog-outline',
//     }
//   if (roleLowerCase === 'maintainer')
//     return {
//       color: 'success',
//       icon: 'mdi-chart-donut',
//     }
//   if (roleLowerCase === 'editor')
//     return {
//       color: 'info',
//       icon: 'mdi-pencil-outline',
//     }
//   if (roleLowerCase === 'admin')
//     return {
//       color: 'error',
//       icon: 'mdi-laptop',
//     }

//   return {
//     color: 'primary',
//     icon: 'mdi-account-outline',
//   }
// }

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

const isAddNewRestaurantDrawerVisible = ref(false);

const addNewRestaurant = (restaurantData) => {
  restaurantListStore.addRestaurant(restaurantData);

  // refetch Restaurant
  fetchRestaurants();
};

const deleteRestaurant = (id) => {
  restaurantListStore.deleteRestaurant(id);

  // refetch Restaurant
  fetchRestaurants();
};
</script>

<template>
  <section>
    <VCard title="Filters" class="mb-6">
      <VCardText>
        <VRow>
          <!-- 👉 Select Role -->
          <VCol cols="12" sm="4">
            <VSelect
              v-model="selectedRole"
              label="Select Role"
              :items="roles"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>

          <!-- 👉 Select Plan -->
          <VCol cols="12" sm="4">
            <VSelect
              v-model="selectedPlan"
              label="Select Plan"
              :items="plans"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>

          <!-- 👉 Select Status -->
          <VCol cols="12" sm="4">
            <VSelect
              
              v-model="selectedStatus"
              label="Select Status"
              :items="status"
              clearable
              clear-icon="mdi-close"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->
        <VBtn
          variant="outlined"
          color="secondary"
          prepend-icon="mdi-tray-arrow-up"
        >
          Export
        </VBtn>

        <VSpacer />

        <div class="app-restaurant-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search Restaurant"
            density="compact"
          />

          <!-- 👉 Add Owner button -->
          <VBtn @click="isAddNewRestaurantDrawerVisible = true">
            Add Restaurant
          </VBtn>
        </div>
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="restaurants"
        :items-length="totalRestaurants"
        :headers="headers"
        show-select
        class="rounded-0"
        @update:options="options = $event"
      >
        <!-- Restaurant -->
        <template #item.name="{ item }">
          <div class="d-flex">
            <!-- <VAvatar
              size="34"
              :variant="!item.raw.avatar ? 'tonal' : undefined"
              :color="!item.raw.avatar ? resolveRestaurantRoleVariant(item.raw.role).color : undefined"
              class="me-3"
            >
              <VImg
                v-if="item.raw.avatar"
                :src="item.raw.avatar"
              />
              <span v-else>{{ avatarText(item.raw.name) }}</span>
            </VAvatar> -->

            <div class="d-flex flex-column">
              <h6 class="text-sm">
                <RouterLink
                  :to="{
                    name: 'apps-restaurant-view-id',
                    params: { id: item.raw.id },
                  }"
                  class="font-weight-medium restaurant-list-name"
                >
                  {{ item.raw.name }}
                </RouterLink>
              </h6>

              
            </div>
          </div>
        </template>
        
        <!-- Email -->
        <template #item.owner.name="{ item }">
          <span class="text-sm">
            {{ item.raw.user?.name }}
          </span>
        </template>

      

        <!-- Status -->
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

            <span class="d-flex align-center text-sm me-2 text-high-emphasis">{{
              paginationMeta(options, totalRestaurants)
            }}</span>

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn
                icon="mdi-chevron-left"
                class="flip-in-rtl"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="options.page <= 1"
                @click="options.page <= 1 ? (options.page = 1) : options.page--"
              />

              <VBtn
                icon="mdi-chevron-right"
                class="flip-in-rtl"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="
                  options.page >=
                  Math.ceil(totalRestaurants / options.itemsPerPage)
                "
                @click="
                  options.page >=
                  Math.ceil(totalRestaurants / options.itemsPerPage)
                    ? (options.page = Math.ceil(
                        totalRestaurants / options.itemsPerPage
                      ))
                    : options.page++
                "
              />
            </div>
          </div>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New Restaurant -->
    <AddNewRestaurantDrawer
      v-model:isDrawerOpen="isAddNewRestaurantDrawerVisible"
      @restaurant-data="addNewRestaurant"
    />
  </section>
</template>

<style lang="scss">
.app-restaurant-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.restaurant-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
