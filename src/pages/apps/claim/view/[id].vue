<script setup>
import { useClaimListStore } from "@/views/apps/claim/useClaimListStore";
import ClaimBioPanel from "@/views/apps/claim/view/ClaimBioPanel.vue";

const claimListStore = useClaimListStore();
const route = useRoute();
const claimData = ref();
const userTab = ref(null);



claimListStore.fetchClaim(Number(route.params.id)).then((response) => {
  claimData.value = response.data;
});
</script>

<template>
  <VRow v-if="claimData">
    <VCol cols="12" md="12" lg="12">
      <ClaimBioPanel :claim-data="claimData" />
    </VCol>

    
  </VRow>
</template>
