<script setup>
const props = defineProps({
  mobileNumber: {
    type: String,
    required: false,
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'submit',
])

const phoneNumber = ref(structuredClone(toRaw(props.mobileNumber)))

const formSubmit = () => {
  if (phoneNumber.value) {
    emit('submit', phoneNumber.value)
    emit('update:isDialogVisible', false)
  }
}

const resetPhoneNumber = () => {
  phoneNumber.value = structuredClone(toRaw(props.mobileNumber))
  emit('update:isDialogVisible', false)
}
</script>

<template>
  <VDialog
    max-width="600"
    :model-value="props.isDialogVisible"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <VCard
      title="Verify Your Mobile Number for SMS"
      subtitle="Enter your mobile phone number with country code and  we will send you a verification code."
      class="pa-5 pa-sm-8"
    >
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="resetPhoneNumber"
      />

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VTextField
            v-model="phoneNumber"
            name="mobile"
            label="Phone Number"
            type="number"
            class="mb-4"
          />

          <div class="d-flex flex-wrap justify-end gap-3">
            <VBtn
              color="secondary"
              variant="tonal"
              @click="resetPhoneNumber"
            >
              Cancel
            </VBtn>
            <VBtn
              type="submit"
              @click="formSubmit"
            >
              continue
              <VIcon
                end
                icon="mdi-arrow-right"
                class="flip-in-rtl"
              />
            </VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
