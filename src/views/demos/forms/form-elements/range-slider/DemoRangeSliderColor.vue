<script setup>
const sliderValues = ref([10, 60]);
</script>

<template>
  <VRangeSlider
    v-model="sliderValues"
    color="primary"
    track-color="secondary"
  />
</template>
