<script setup>
import Swal from "sweetalert2";
import { VDataTableServer } from "vuetify/labs/VDataTable";

import { paginationMeta } from "@/@fake-db/utils";
import AddNewOrderDrawer from "@/views/apps/order/list/AddNewOrderDrawer.vue";
import { useOrderListStore } from "@/views/apps/order/useOrderListStore";
import { debounce } from "lodash";

const orderListStore = useOrderListStore();
const searchQuery = ref("");
const selectedRole = ref("");
const selectedPlan = ref("");
const selectedStatus = ref("null");
const totalPage = ref(1);
const totalOrders = ref(0);
const orders = ref([]);
const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};
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
    title: "#",
    key: "order_id",
  },
  {
    title: "CUSTOMER",
    key: "customer_name",
  },
  {
    title: "RESTAURANT",
    key: "restaurant_name",
  },
  {
    title: "ADDRESS",
    key: "address",
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
    title: "TOTAL",
    key: "total",
  },
  {
    title: "ISSUED DATE",
    key: "created_date",
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
];

// 👉 Fetching orders
const fetchOrders = debounce(() => {
  orderListStore
    .fetchOrders({
      q: searchQuery.value,
      status: selectedStatus.value,

      options: options.value,
    })
    .then((response) => {
      console.log(response);
      orders.value = response.data.data;
      totalPage.value = response.data.total;
      totalOrders.value = response.data.total;
      options.value.page = response.data.current_page;
    })
    .catch((error) => {
      console.error(error);
    });
}, 100);
fetchOrders();

watch(
  () => options.value.itemsPerPage,
  (count) => {
    fetchOrders();
  }
);

watch(
  () => options.value.page,
  (count) => {
    fetchOrders();
  }
);
watch(
  () => options.value.sortBy,
  (count) => {
    fetchOrders();
  }
);
watch([searchQuery, selectedStatus], () => {
  fetchOrders();
  console.log(searchQuery);
});
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

const status = [
  {
    title: "All",
    value: "null",
  },
  {
    title: "Deactive",
    value: "0",
  },
  {
    title: "Online",
    value: "1",
  },
  {
    title: "Offline",
    value: "2",
  },
];

// const resolveOrderRoleVariant = role => {
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

const resolveOrderStatusVariant = (stat) => {
  const statLowerCase = stat;
  if (statLowerCase === "0") return "warning";
  if (statLowerCase === "1") return "success";
  if (statLowerCase === "2") return "secondary";

  return "primary";
};
const resolveOrderStatusText = (stat) => {
  if (stat === "0") return "Deactive";
  if (stat === "1") return "Online";
  if (stat === "2") return "Offline";

  return "";
};

const isAddNewOrderDrawerVisible = ref(false);

const addNewOrder = (orderData) => {
  orderListStore.addOrder(orderData);

  // refetch Order
  fetchOrders();
};

const deleteOrder = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#9155FD",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      orderListStore.deleteOrder(id);

      // refetch Order
      fetchOrders();
    }
  });
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

        <div class="app-order-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search Order"
            density="compact"
          />

          <!-- 👉 Add Owner button -->
          <VBtn @click="isAddNewOrderDrawerVisible = true"> Add Owner </VBtn>
        </div>
      </VCardText>

      <!-- SECTION data table -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="orders"
        :items-length="totalOrders"
        :headers="headers"
        show-select
        class="rounded-0"
        @update:options="options = $event"
      >
        <!-- Order -->
        <template #item.order.name="{ item }">
          <div class="d-flex">
            <!-- <VAvatar
              size="34"
              :variant="!item.raw.avatar ? 'tonal' : undefined"
              :color="!item.raw.avatar ? resolveOrderRoleVariant(item.raw.role).color : undefined"
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
                    name: 'apps-order-view-id',
                    params: { id: item.raw.id },
                  }"
                  class="font-weight-medium order-list-name"
                >
                  {{ item.raw.name }}
                </RouterLink>
              </h6>

              <span class="text-xs text-medium-emphasis"
                >@{{ item.raw.username }}</span
              >
            </div>
          </div>
        </template>

        <!-- Email -->
        <template #item.customer_name="{ item }">
          <span class="text-sm">
            {{ item.raw.user.name }}
          </span>
        </template>
        <template #item.total="{ item }">
          <span class="text-sm"> ${{ item.raw.total }} </span>
        </template>
        <template #item.order_id="{ item }">
          <span class="text-sm">
            {{ item.raw.id }}
          </span>
        </template>
        <template #item.restaurant_name="{ item }">
          <span class="text-sm">
            {{ item.raw.restaurant.name }}
          </span>
        </template>
        <template #item.address="{ item }">
          <span class="text-sm">
            {{ item.raw.restaurant.address }}
          </span>
        </template>
        <template #item.city="{ item }">
          <span class="text-sm">
            {{ item.raw.restaurant.city }}
          </span>
        </template>
        <template #item.zip_code="{ item }">
          <span class="text-sm">
            {{ item.raw.restaurant.zip_code }}
          </span>
        </template>
        <template #item.created_date="{ item }">
          <span class="text-sm">
            {{ formatDate(item.raw.created_at) }}
          </span>
        </template>

        <!-- Role -->
        <!-- <template #item.user_type="{ item }">
          <span class="text-capitalize text-high-emphasis">{{
            item.raw.user_type
          }}</span>
        </template>

         Plan -->
        <!-- <template #item.plan="{ item }">
          <span class="text-capitalize text-high-emphasis">{{
            item.raw.currentPlan
          }}</span>
        </template> -->

        <!-- Status -->
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

                <VListItem @click="deleteOrder(item.raw.id)">
                  <template #prepend>
                    <VIcon icon="mdi-delete-outline" />
                  </template>
                  <VListItemTitle>Delete</VListItemTitle>
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
              paginationMeta(options, totalOrders)
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
                  options.page >= Math.ceil(totalOrders / options.itemsPerPage)
                "
                @click="
                  options.page >= Math.ceil(totalOrders / options.itemsPerPage)
                    ? (options.page = Math.ceil(
                        totalOrders / options.itemsPerPage
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

    <!-- 👉 Add New Order -->
    <AddNewOrderDrawer
      v-model:isDrawerOpen="isAddNewOrderDrawerVisible"
      @order-data="addNewOrder"
    />
  </section>
</template>

<style lang="scss">
.app-order-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.order-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
