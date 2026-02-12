<script setup>
import Footer from '@/component/footer/Footer.vue';
import Header from '@/component/header/Header.vue';
import Loader from '@/component/loader/Loader.vue';
import { updateSEO } from '@/composable';
import Translation from '@/i18n/translation';
import { useAuthStore } from '@/store';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, te } = useI18n();
const authStore = useAuthStore();
const router = useRouter();

updateSEO({ t, te });

onMounted(() => {
  handleLogout();
});

async function handleLogout() {
  await authStore.logout();
  await router.replace(
    Translation.i18nRoute({
      name: 'login',
    }),
  );
}
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <div class="logout">
        <h1 class="logout__title">
          {{ t('title') }}
        </h1>

        <div class="box logout__loader">
          <Loader />
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style lang="scss" scoped>
@import './Logout.scss';
</style>

<i18n src="./Logout.json" />
