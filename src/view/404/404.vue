<script setup>
import Header from '@/component/Header/Header.vue';
import Footer from '@/component/Footer/Footer.vue';
import updateSEO from '@/composable/seo';

updateSEO();
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <div class="hero section_offset">
        <div class="hero__main">
          <h1 class="hero__title">
            {{ $t('title') }}
          </h1>

          <h2 class="hero__subtitle">
            {{ $t('subtitle') }}
          </h2>

          <h3 class="hero__text">
            {{ $t('text') }}
          </h3>

          <div class="hero__actions">
            <router-link
              :to="$tr.i18nRoute({ name: 'home' })"
              class="btn btn_primary"
            >
              {{ $t('button') }}
            </router-link>
          </div>
        </div>

        <div class="hero__image">
          <img
            src="@/img/vue-logo.svg"
            alt="Vue Logo"
            height="320"
          >
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style lang="scss" scoped>
// @import './404.scss';
</style>

<i18n src="./404.json" />
