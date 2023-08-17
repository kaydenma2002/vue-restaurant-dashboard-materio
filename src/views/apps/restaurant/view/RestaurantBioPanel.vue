<script setup>
import { avatarText, kFormatter } from "@core/utils/formatters";
import ApexChartAreaChart from '@/views/charts/apex-chart/ApexChartAreaChart.vue'

const props = defineProps({
  restaurantData: {
    type: Object,
    required: true,   
  },
});

const standardPlan = {
  plan: "Standard",
  price: 99,
  benefits: ["10 Restaurants", "Up to 10GB storage", "Basic Support"],
};
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
const isRestaurantInfoEditDialogVisible = ref(false);
const isUpgradePlanDialogVisible = ref(false);

const resolveRestaurantRoleVariant = (role) => {
  if (role === "subscriber")
    return {
      color: "primary",
      icon: "mdi-account-outline",
    };
  if (role === "author")
    return {
      color: "warning",
      icon: "mdi-cog-outline",
    };
  if (role === "maintainer")
    return {
      color: "success",
      icon: "mdi-database-outline",
    };
  if (role === "editor")
    return {
      color: "info",
      icon: "mdi-pencil-outline",
    };
  if (role === "admin")
    return {
      color: "error",
      icon: "mdi-dns-outline",
    };

  return {
    color: "primary",
    icon: "mdi-account-outline",
  };
};
const totalOrders = (orders) => {
  return orders.reduce((accumulator, data) => {
    return accumulator + parseFloat(data.total);
  }, 0);
};

</script>

<template>
  <VRow>
    <!-- SECTION Restaurant Details -->
    <VCol cols="12">
      <VCard v-if="props.restaurantData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="sm"
            :size="120"
            :color="!props.restaurantData.avatar ? 'primary' : undefined"
            :variant="!props.restaurantData.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="props.restaurantData.avatar"
              :src="props.restaurantData.avatar"
            />
            <span v-else class="text-5xl font-weight-medium">
              {{ avatarText(props.restaurantData.fullName) }}
            </span>
          </VAvatar>

          <!-- 👉 Restaurant fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.restaurantData.fullName }}
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            :color="
              resolveRestaurantRoleVariant(props.restaurantData.role).color
            "
            density="comfortable"
            class="text-capitalize mt-4"
          >
            {{ props.restaurantData.role }}
          </VChip>
        </VCardText>

        <VCardText class=" flex-wrap mt-1">
          <!-- 👉 Done task -->
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon size="24" icon="mdi-check" />
            </VAvatar>

            <div>
              <h6 class="text-h6">Total Restaurant Sales</h6>
              <span>${{ totalOrders(props.restaurantData.orders) }}</span>
            </div>
            
          </div>

          <!-- 👉 Done Project -->
          <!-- <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon size="24" icon="mdi-star-outline" />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                Daily Order
              </h6>
              <span>{{ props.restaurantData.totalOrdersToday }}</span>
            </div>
          </div>
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon size="24" icon="mdi-star-outline" />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                Weekly Order: <span>{{ props.restaurantData.totalOrdersThisWeek }}</span>
              </h6>
              
            </div>
          </div>
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon size="24" icon="mdi-star-outline" />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                Monthly Order: <span>{{ props.restaurantData.totalOrdersThisMonth }}</span>
              </h6>
              
            </div>
          </div> -->
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">Details</h6>

          <VDivider class="my-4" />

          <!-- 👉 Restaurant Details list -->
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Name:
                  <span class="text-body-2">
                    {{ props.restaurantData.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Owner Email:
                  <span class="text-body-2">{{
                    props.restaurantData?.user?.email
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Status:

                  <VChip
                    label
                    density="comfortable"
                    :color="
                      resolveRestaurantStatusVariant(
                        props.restaurantData.status
                      )
                    "
                    class="text-capitalize"
                  >
                    {{
                      resolveRestaurantStatusText(props.restaurantData.status)
                    }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  City:
                  <span class="text-capitalize text-body-2">{{
                    props.restaurantData.city
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  State:
                  <span class="text-body-2">
                    {{ props.restaurantData.state }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Zip code:
                  <span class="text-body-2">{{
                    props.restaurantData.zip_code
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Contact:
                  <span class="text-body-2">{{
                    props.restaurantData.phone
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Country:
                  <span class="text-body-2">{{
                    props.restaurantData.country
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center gap-4">
          <VBtn
            variant="elevated"
            @click="isRestaurantInfoEditDialogVisible = true"
          >
            Edit
          </VBtn>
          <VBtn variant="outlined" color="error"> Deactivate </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Current Plan -->
    <VCol cols="12">
      <VCard flat class="current-plan">
        <VCardText class="d-flex">
          <!-- 👉 Standard Chip -->
          <VChip label color="primary" density="comfortable"> Standard </VChip>

          <VSpacer />

          <!-- 👉 Current Price  -->
          <div class="d-flex align-center">
            <sup class="text-primary text-sm font-weight-regular">$</sup>
            <h3 class="text-h3 text-primary font-weight-regular">99</h3>
            <sub class="mt-3"
              ><h6 class="text-sm font-weight-regular">/ month</h6></sub
            >
          </div>
        </VCardText>

        <VCardText>
          <!-- 👉 Price Benefits -->
          <VList class="card-list">
            <VListItem v-for="benefit in standardPlan.benefits" :key="benefit">
              <VIcon
                size="10"
                color="#E0E0E0"
                class="me-2"
                icon="mdi-checkbox-blank-circle"
              />
              <span>{{ benefit }}</span>
            </VListItem>
          </VList>

          <!-- 👉 Days -->
          <div class="my-6">
            <div class="d-flex mt-3 mb-2">
              <h6 class="text-sm font-weight-medium">Days</h6>
              <VSpacer />
              <h6 class="text-sm font-weight-medium">26 of 30 Days</h6>
            </div>

            <!-- 👉 Progress -->
            <VProgressLinear
              rounded
              :model-value="86"
              height="8"
              color="primary"
            />

            <p class="text-xs mt-2">4 days remaining</p>
          </div>

          <!-- 👉 Upgrade Plan -->
          <VBtn block @click="isUpgradePlanDialogVisible = true">
            Upgrade Plan
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit restaurant info dialog -->
  <RestaurantInfoEditDialog
    @restaurantUpdateInfo="$emit('restaurantUpdateInfo', true)"
    v-model:isDialogVisible="isRestaurantInfoEditDialogVisible"
    :restaurant-data="props.restaurantData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <RestaurantUpgradePlanDialog
    v-model:isDialogVisible="isUpgradePlanDialogVisible"
  />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
