<script setup>
/* eslint-disable no-undef */
const appNameFormatted = APP_NAME_FORMATTED;
const appRepository = APP_REPOSITORY;
</script>

<template>
  <div class="hero section_offset">
    <div class="hero__main">
      <h1 class="hero__title">
        {{ appNameFormatted }}
      </h1>

      <h2 class="hero__subtitle">
        {{ $t('subtitle') }}
      </h2>

      <h3 class="hero__text">
        {{ $t('text') }}
      </h3>

      <div class="hero__actions">
        <router-link
          :to="$tr.i18nRoute({ name: 'guide' })"
          class="btn btn_primary"
        >
          {{ $t('action.primary') }}
        </router-link>

        <a
          :href="appRepository"
          target="_blank"
          class="btn"
        >
          {{ $t('action.secondary') }}
        </a>
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
</template>

<style lang="scss" scoped>
// @import './Hero.scss';
</style>

<i18n src="./Hero.json" />
