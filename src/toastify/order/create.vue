<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ToastOptions } from "vue3-toastify";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Create",
  props: {
    closeToast: {
      type: Function as PropType<(e?: MouseEvent) => void>,
      required: true
    },
    toastProps: {
      type: Object as PropType<ToastOptions>,
      required: true
    }
  },
  setup() {
    const router = useRouter();
    console.log(router)
    return {
      router
    };
  }
});
</script>

<template>
  <div>
    <div @click="router.push({ name: 'apps-user-list' })" class="text-primary ms-2">
      Sign in instead
    </div>
  </div>
</template>
