<script setup>
import { onMounted } from "vue";

import dbx from "@/plugins/dropbox";
import { useClaimListStore } from "@/views/apps/claim/useClaimListStore";
import router from "@/router";
import { avatarText, kFormatter } from "@core/utils/formatters";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const route = useRoute();

const claimListStore = useClaimListStore();
const props = defineProps({
  claimData: {
    type: Object,
    required: true,
  },
});
const claim = ref(null)
const saleTaxClaimUrl = ref("");
const mealTaxClaimUrl = ref("");
const businessPropertyReturnClaimUrl = ref("");
const billOfSaleClaimUrl = ref("");
const sCorpClaimUrl = ref("");
const reSaleClaimUrl = ref("");
const businessLicenseClaimUrl = ref("");
const ss4ClaimUrl = ref("");
onMounted(() => {
  console.log(props.claimData)
  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/sale_tax/${props.claimData.sale_tax}`,
    })
    .then((response) => {
      saleTaxClaimUrl.value = response.result.link;

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });

  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/meal_tax/${props.claimData.meal_tax}`,
    })
    .then((response) => {
      mealTaxClaimUrl.value = response.result.link;

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });
  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/business_property_return/${props.claimData.business_property_return}`,
    })
    .then((response) => {
      businessPropertyReturnClaimUrl.value = response.result.link;
      console.log(businessPropertyReturnClaimUrl.value);

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });

  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/bill_of_sale/${props.claimData.bill_of_sale}`,
    })
    .then((response) => {
      billOfSaleClaimUrl.value = response.result.link;

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });
  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/s_corp/${props.claimData.s_corp}`,
    })
    .then((response) => {
      sCorpClaimUrl.value = response.result.link;
      console.log(sCorpClaimUrl.value);

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });

  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/resale/${props.claimData.resale}`,
    })
    .then((response) => {
      reSaleClaimUrl.value = response.result.link;

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });
  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/business_license/${props.claimData.business_license}`,
    })
    .then((response) => {
      businessLicenseClaimUrl.value = response.result.link;
      console.log(businessLicenseClaimUrl.value);

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });

  dbx
    .filesGetTemporaryLink({
      path: `/kayden/${props.claimData.restaurant.web_id}/ss4/${props.claimData.ss4}`,
    })
    .then((response) => {
      ss4ClaimUrl.value = response.result.link;

      // Do something with the claim URL
    })
    .catch((error) => {
      console.error("Error retrieving claim URL:", error);
    });
});

const standardPlan = {
  plan: "Standard",
  price: 99,
  benefits: ["10 Claims", "Up to 10GB storage", "Basic Support"],
};
const resolveClaimStatusVariant = (stat) => {
  const statLowerCase = stat;
  if (statLowerCase === "0") return "warning";
  if (statLowerCase === "1") return "success";
  if (statLowerCase === "2") return "secondary";

  return "primary";
};
const resolveClaimStatusText = (stat) => {
  if (stat === "0") return "Pending";
  if (stat === "1") return "Active";
  if (stat === "2") return "Deactive";

  return "";
};
const approveClaim = (id) => {
  claimListStore.approveClaim(id).then((res) => {
    toast.success('Restaurant approved successfully !');
  }).then(res =>{
    claimListStore.fetchClaim(id).then((response) => {
  claim.value = response.data;
});
  })
}

const resolveClaimRoleVariant = (role) => {
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

claimListStore.fetchClaim(props.claimData.id).then((response) => {
  claim.value = response.data;
});
</script>

<template>
  <VRow>
    <!-- SECTION Claim Details -->
    <VCol cols="12">
      <VCard v-if="props.claimData">
        

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">Details</h6>

          <VDivider class="my-4" />

          <!-- 👉 Claim Details list -->
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Name:
                  <span class="text-body-2">
                    {{ props.claimData.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Owner Email:
                  <span class="text-body-2">{{
                    props.claimData?.user?.email
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
                    :color="resolveClaimStatusVariant(claim?.status)"
                    class="text-capitalize"
                  >
                    {{ resolveClaimStatusText(claim?.status) }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  City:
                  <span class="text-capitalize text-body-2">{{
                    props.claimData.city
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  State:
                  <span class="text-body-2">
                    {{ props.claimData.state }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Zip code:
                  <span class="text-body-2">{{
                    props.claimData.zip_code
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Contact:
                  <span class="text-body-2">{{ props.claimData.phone }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  SALE TAX:
                  <span class="text-body-2"><a :href="saleTaxClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  MEAL TAX:
                  <span class="text-body-2"><a :href="mealTaxClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  BUSINESS PROPERTY RETURN:
                  <span class="text-body-2"><a :href="businessPropertyReturnClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  BILL OF SALE:
                  <span class="text-body-2"><a :href="billOfSaleClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  S CORP:
                  <span class="text-body-2"><a :href="sCorpClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                   RESALE:
                  <span class="text-body-2"><a :href="reSaleClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  BUSINESS LICENSE:
                  <span class="text-body-2"><a :href="businessLicenseClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  SS4 FILE:
                  <span class="text-body-2"><a :href="ss4ClaimUrl">Click to download</a></span>
                </h6>
              </VListItemTitle>
            </VListItem>
            
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center gap-4">
          
          <VBtn v-if="claim?.status == 0" @click.prevent="approveClaim(claim.id)" variant="outlined" color="success">ACTIVATE</VBtn>
          <VBtn v-if="claim?.status == 1" @click.prevent="approveClaim(claim.id)" variant="outlined" color="error">DEACTIVATE</VBtn>
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

  <!-- 👉 Edit claim info dialog -->
  <ClaimInfoEditDialog
    @claimUpdateInfo="$emit('claimUpdateInfo', true)"
    v-model:isDialogVisible="isClaimInfoEditDialogVisible"
    :claim-data="props.claimData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <ClaimUpgradePlanDialog
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
