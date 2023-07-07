<script setup>
import { useClaimListStore } from '@/views/apps/claim/useClaimListStore'
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue'
import UserTabBillingsPlans from '@/views/apps/user/view/UserTabBillingsPlans.vue'
import UserTabConnections from '@/views/apps/user/view/UserTabConnections.vue'
import UserTabNotifications from '@/views/apps/user/view/UserTabNotifications.vue'
import UserTabOverview from '@/views/apps/user/view/UserTabOverview.vue'
import UserTabSecurity from '@/views/apps/user/view/UserTabSecurity.vue'

const claimListStore = useClaimListStore()
const route = useRoute()
const claimData = ref()
const userTab = ref(null)

const tabs = [
  {
    icon: 'mdi-account-outline',
    title: 'Overview',
  },
  {
    icon: 'mdi-lock-outline',
    title: 'Security',
  },
  {
    icon: 'mdi-bookmark-outline',
    title: 'Billing & Plan',
  },
  {
    icon: 'mdi-bell-outline',
    title: 'Notifications',
  },
  {
    icon: 'mdi-link-variant',
    title: 'Connections',
  },
]

claimListStore.fetchClaim(Number(route.params.id)).then(response => {
  claimData.value = response.data
})
</script>

<template>
  <VRow v-if="claimData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :user-data="claimData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            start
            :icon="tab.icon"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabOverview />
        </VWindowItem>

        <VWindowItem>
          <UserTabSecurity />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>

        <VWindowItem>
          <UserTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <UserTabConnections />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
