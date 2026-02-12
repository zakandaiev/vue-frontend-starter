<script setup>
import Footer from '@/component/footer/Footer.vue';
import Header from '@/component/header/Header.vue';
import Loader from '@/component/loader/Loader.vue';
import { updateSEO, useAuthMiddleware } from '@/composable';
import { useAuthStore } from '@/store';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, te } = useI18n();
const { doRedirect, isReady } = useAuthMiddleware({ redirectToLoginPage: false });
const authStore = useAuthStore();

updateSEO({ t, te });

const email = ref('');
const password = ref('');
const isLoading = ref(false);

async function handleLogin(event) {
  event.preventDefault();

  if (isLoading.value) {
    return false;
  }

  isLoading.value = true;

  const result = await authStore.login({
    email: email.value,
    password: password.value,
  });

  isLoading.value = false;

  if (!result) {
    return false;
  }

  doRedirect();
}
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <div class="login">
        <h1 class="login__title">
          {{ t('title') }}
        </h1>

        <form
          v-if="isReady"
          class="box login__form"
          :disabled="isLoading"
          @submit="handleLogin"
        >
          <label>
            {{ t('email_label') }}
          </label>
          <input
            v-model="email"
            type="email"
            minlength="8"
            :placeholder="t('email_placeholder')"
          >

          <label class="mt-2">
            {{ t('password_label') }}
          </label>
          <input
            v-model="password"
            type="password"
            minlength="8"
            :placeholder="t('password_placeholder')"
          >

          <div
            v-if="isLoading"
            class="login__loader mt-2"
          >
            <Loader />
          </div>
          <button
            v-else
            type="submit"
            class="btn btn_primary mt-2"
            :disabled="isLoading"
            @click="handleLogin"
          >
            {{ t('submit') }}
          </button>
        </form>

        <div
          v-else
          class="box login__loader"
        >
          <Loader />
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style lang="scss" scoped>
@import './Login.scss';
</style>

<i18n src="./Login.json" />
