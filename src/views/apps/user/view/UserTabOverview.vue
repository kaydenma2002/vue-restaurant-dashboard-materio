<script setup>
import { VDataTable } from "vuetify/labs/VDataTable";
import UserRestaurantTable from "./UserRestaurantTable.vue";

// Images
import avatar2 from "@images/avatars/avatar-2.png";
import figma from "@images/icons/project-icons/figma.png";
import html5 from "@images/icons/project-icons/html5.png";
import python from "@images/icons/project-icons/python.png";
import react from "@images/icons/project-icons/react.png";
import sketch from "@images/icons/project-icons/sketch.png";
import vue from "@images/icons/project-icons/vue.png";
import xamarin from "@images/icons/project-icons/xamarin.png";
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

const resolveUserProgressVariant = (progress) => {
  if (progress <= 25) return "error";
  if (progress > 25 && progress <= 50) return "warning";
  if (progress > 50 && progress <= 75) return "primary";
  if (progress > 75 && progress <= 100) return "success";

  return "secondary";
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <UserRestaurantTable :user-data="userData" />
    </VCol>

    <VCol cols="12">
      <!-- 👉 Activity timeline -->
      <VCard title="User Activity Timeline">
        <VCardText>
          <VTimeline
            density="compact"
            align="start"
            truncate-line="both"
            class="v-timeline-density-compact"
          >
            <VTimelineItem dot-color="error" size="x-small">
              <div
                class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3"
              >
                <span class="app-timeline-title">
                  12 Invoices have been paid
                </span>

                <span class="app-timeline-meta">12 min ago</span>
              </div>

              <p class="app-timeline-text mb-2">
                Invoices have been paid to the company
              </p>

              <div class="d-flex align-center mt-2">
                <VIcon
                  color="error"
                  icon="mdi-file-pdf-box"
                  size="24"
                  class="me-2"
                />

                <h6 class="font-weight-medium text-sm">Invoices.pdf</h6>
              </div>
            </VTimelineItem>

            <VTimelineItem dot-color="primary" size="x-small">
              <div
                class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3"
              >
                <span class="app-timeline-title"> Meeting with john </span>

                <span class="app-timeline-meta">45 min ago</span>
              </div>

              <p class="app-timeline-text mb-1">
                React Project meeting with john @10:15am
              </p>

              <div class="d-flex align-center mt-2">
                <VAvatar size="34" class="me-2" :image="avatar2" />

                <div>
                  <h6 class="text-sm font-weight-medium mb-0">
                    John Doe (Client)
                  </h6>

                  <span class="text-sm">CEO of Kelly Group</span>
                </div>
              </div>
            </VTimelineItem>

            <VTimelineItem dot-color="info" size="x-small">
              <div
                class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3"
              >
                <span class="app-timeline-title">
                  Create a new react project for client
                </span>

                <span class="app-timeline-meta">2 day ago</span>
              </div>

              <p class="app-timeline-text mb-0">
                Add files to new design folder
              </p>
            </VTimelineItem>

            <VTimelineItem dot-color="primary" size="x-small">
              <div
                class="d-flex justify-space-between align-center flex-wrap gap-2 mb-3"
              >
                <span class="app-timeline-title">
                  12 Create invoices for client
                </span>

                <span class="app-timeline-meta">5 day ago</span>
              </div>

              <p class="app-timeline-text mb-0">
                Weekly review of freshly prepared design for our new app.
              </p>
            </VTimelineItem>
          </VTimeline>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
