<script setup>
import Loader from '@/component/loader/Loader.vue';
import { useUserStore } from '@/store';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();

const isAppDataLoading = ref(true);

onMounted(async () => {
  await userStore.init();
  isAppDataLoading.value = false;
});
</script>

<template>
  <template v-if="isAppDataLoading">
    <div class="m-auto">
      <Loader />
    </div>
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<style lang="scss">
@import "@/sass/main.scss";
</style>
