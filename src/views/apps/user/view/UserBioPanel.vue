<script setup>
import { useUserListStore } from "@/views/apps/user/useUserListStore";
import { avatarText } from "@core/utils/formatters";
import { defineProps, ref } from "vue";

const userListStore = useUserListStore();
const route = useRoute();
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

const standardPlan = {
  plan: "Standard",
  price: 99,
  benefits: ["10 Users", "Up to 10GB storage", "Basic Support"],
};
const resolveUserStatusText = (stat) => {
  if (stat === "0") return "Deactive";
  if (stat === "1") return "Online";
  if (stat === "2") return "Offline";

  return "";
};
const isUserInfoEditDialogVisible = ref(false);
const isUpgradePlanDialogVisible = ref(false);

const resolveUserStatusVariant = (stat) => {
  const statLowerCase = stat;
  if (statLowerCase === "0") return "warning";
  if (statLowerCase === "1") return "success";
  if (statLowerCase === "2") return "secondary";

  return "primary";
};

const resolveUserRoleVariant = (role) => {
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
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->1
          <VAvatar
            rounded="sm"
            :size="120"
            :color="!props.userData.avatar ? 'primary' : undefined"
            :variant="!props.userData.avatar ? 'tonal' : undefined"
          >
            <VImg v-if="props.userData.avatar" :src="props.userData.avatar" />
            <span v-else class="text-5xl font-weight-medium">
              {{ avatarText(props.userData.fullName) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->

          <!-- 👉 Role chip -->
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">Details</h6>

          <VDivider class="my-4" />

          <!-- 👉 User Details list -->
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Name:
                  <span class="text-body-2"> @{{ props.userData.name }} </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Billing Email:
                  <span class="text-body-2">{{ props.userData.email }}</span>
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
                    :color="resolveUserStatusVariant(props.userData.status)"
                    class="text-capitalize"
                  >
                    {{ resolveUserStatusText(props.userData.status) }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Phone:
                  <span class="text-capitalize text-body-2">{{
                    props.userData.phone
                  }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Company:
                  <span class="text-body-2">
                    {{ props.userData.company }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Street:
                  <span class="text-body-2">{{ props.userData.street }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  City:
                  <span class="text-body-2">{{ props.userData.city }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Zip Code:
                  <span class="text-body-2">{{ props.userData.zip_code }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Country:
                  <span class="text-body-2">{{ props.userData.country }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center gap-4">
          <VBtn variant="elevated" @click="isUserInfoEditDialogVisible = true">
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

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    @userUpdateInfo="$emit('userUpdateInfo', true)"
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
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
