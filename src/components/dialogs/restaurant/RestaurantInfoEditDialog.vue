<script setup>
import { useRestaurantListStore } from "@/views/apps/restaurant/useRestaurantListStore";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
  restaurantData: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      name: '',
      company: '',
      role: '',
      username: '',
      country: '',
      contact: '',
      email: '',
      currentPlan: '',
      status: '',
      avatar: '',
      taskDone: null,
      projectDone: null,
      taxId: '',
      language: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})
const restaurantListStore = useRestaurantListStore();

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])

const restaurantData = ref(structuredClone(toRaw(props.restaurantData)))
const isUseAsBillingAddress = ref(false)
watch(props, () => {
  restaurantData.value = structuredClone(toRaw(props.restaurantData))
  console.log(restaurantData.value)
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  restaurantListStore.editRestaurant(JSON.parse(JSON.stringify(restaurantData.value))).then(res =>{
    toast.success('User edited successfully !');
  })
  emit('restaurantUpdateInfo', true)
}

const onFormReset = () => {
  restaurantData.value = structuredClone(toRaw(props.restaurantData))
  emit('update:isDialogVisible', false)
}

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900 "
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="onFormReset"
      />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-6">
          Edit Restaurant Information
        </VCardTitle>
        <VCardSubtitle>
          Updating restaurant details will receive a privacy audit.
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Full Name -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.name"
                label="Restaurant Name"
              />
            </VCol>

            <!-- 👉 Username -->
            

            <!-- 👉 Billing Email -->
            

            <!-- 👉 Status -->
            <!-- <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.status"
                label="Status"
              />
            </VCol> -->

            <!-- 👉 Tax Id -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.address"
                label="Address"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.city"
                label="City"
              />
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.state"
                label="State"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.zip_code"
                label="Zip code"
              />
            </VCol>
            

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="restaurantData.phone"
                label="Contact"
              />
            </VCol>

            

            <!-- 👉 Switch -->
            <VCol cols="12">
              <VSwitch
                v-model="isUseAsBillingAddress"
                density="compact"
                label="Use as a billing address?"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Submit
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
