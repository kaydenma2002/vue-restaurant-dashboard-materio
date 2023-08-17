<script setup>
import { avatarText, kFormatter } from "@core/utils/formatters";

const props = defineProps({
  orderData: {
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
  if (statLowerCase === "0") return "warning";
  if (statLowerCase === "1") return "success";
  if (statLowerCase === "2") return "secondary";

  return "primary";
};
const resolveRestaurantStatusText = (stat) => {
  if (stat === "0") return "Pending";
  if (stat === "1") return "Active";
  if (stat === "2") return "Deactive";

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
const subTotal = (item) => {
  return item.reduce((sum, current) => {
    return sum + parseFloat(current.price * current.quantity);
  }, 0);
};
</script>

<template>
  <VRow>
    <!-- SECTION Order Details -->
    <VCol cols="12">
      <VCard v-if="props.orderData">
        <VCardText
          v-for="item in props.orderData.order_items"
          class="d-flex flex-row"
        >
          <!-- 👉 Left Content -->
          <div class="mb-5">
            <div class="d-flex align-center mb-6">
              <!-- 👉 Logo -->

              <!-- 👉 Title -->
              <h6 class="text-xl text-uppercase">Image</h6>
            </div>

            <!-- 👉 Address -->
          </div>

          <!-- 👉 Right Content -->
          <div class="mb-4 ml-4">
            <!-- 👉 Invoice ID -->
            <h6 class="text-h5 mb-4">Item # {{ item.item.id }}</h6>

            <!-- 👉 Issue Date -->
            <p class="mb-2">
              <span>Name: </span>
              <span>{{ item.item.title }}</span>
            </p>

            <!-- 👉 Due Date -->
            <p class="mb-2">
              <span>Price: </span>
              <span>${{ item.item.price }}</span>
            </p>
            <p class="mb-2">
              <span>Quantity: </span>
              <span>{{ item.quantity }}</span>
            </p>
          </div>
        </VCardText>
        <VCardText>
          <div class="text-right">
            Subtotal: ${{ subTotal(props.orderData.order_items) }}
            <br />SaleTax: ${{ (subTotal(props.orderData.order_items) * 6) / 100 }} <br />MealTax: ${{
              ((subTotal(props.orderData.order_items) * 4) / 100).toFixed(2)
            }}
            <br />Fee: ${{ ((subTotal(props.orderData.order_items) * 3) / 100 + 0.3).toFixed(2) }}
            <br />Total: ${{ props.orderData.total }}
          </div>
        </VCardText>
        <!-- !SECTION -->

        <VDivider />

        <VCardText class="d-flex justify-space-between flex-wrap mt-1">
          <!-- 👉 Done task -->
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">Customer Details</h6>

          <VDivider class="my-4" />

          <!-- 👉 Order Details list -->
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Name:
                  <span class="text-body-2">
                    {{ props.orderData?.user?.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Email:
                  <span class="text-body-2">{{
                    props.orderData?.user?.email
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
                        props.orderData?.user?.status
                      )
                    "
                    class="text-capitalize"
                  >
                    {{
                      resolveRestaurantStatusText(props.orderData?.user?.status)
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
                    props.orderData?.user?.city
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  State:
                  <span class="text-body-2">
                    {{ props.orderData?.user?.state }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Zip code:
                  <span class="text-body-2">{{
                    props.orderData?.user?.zip_code
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Contact:
                  <span class="text-body-2">{{
                    props.orderData?.user?.phone
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Country:
                  <span class="text-body-2">{{ props.orderData.country }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Current Plan -->
    
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit order info dialog -->
  
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
