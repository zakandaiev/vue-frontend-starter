<script setup>
defineProps({
  size: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <span
    class="loader"
    :class="`loader_${size}`"
  >
    <svg viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
      />
    </svg>
  </span>
</template>

<style lang="scss" scoped>
@import './Loader.scss';
</style>

<!-- <i18n src="./Loader.json" /> -->
