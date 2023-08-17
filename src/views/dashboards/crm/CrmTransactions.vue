<script setup>
const props = defineProps({
  saleData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <VCard title="Dashboard">
    <VCardText>
      <VRow>
        <VCol cols="12" sm="4">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar color="primary" rounded size="40" class="elevation-1">
                <VIcon size="24" icon="mdi-trending-up" />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-xs">Sales</span>
              <span class="text-h6"
                >${{ props.saleData.sales?.toFixed(2) }}</span
              >
            </div>
          </div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar color="primary" rounded size="40" class="elevation-1">
                <VIcon size="24" icon="mdi-account-outline" />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-xs"> Customers </span>
              <span class="text-h6">{{ props.saleData.owners }}</span>
            </div>
          </div>
        </VCol>
        <VCol cols="12" sm="4">
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar color="primary" rounded size="40" class="elevation-1">
                <VIcon size="24" icon="mdi-cellphone-link" />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-xs"> Products </span>
              <span class="text-h6">{{ props.saleData.items }} </span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
