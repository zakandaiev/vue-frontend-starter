<script setup>
import { useI18n } from 'vue-i18n';
import Translation from '@/i18n/translation';

const { t, locale } = useI18n();

const { supportedLocales } = Translation;
</script>

<template>
  <div class="language-switcher">
    <button
      v-for="sLocale in supportedLocales"
      :key="sLocale"
      type="button"
      class="language-switcher__item"
      :class="{ active: locale === sLocale }"
      @click="locale = sLocale"
    >
      <span>{{ t(`locale_short.${sLocale}`) }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import './LanguageSwitcher.scss';
</style>

<!-- <i18n src="./LanguageSwitcher.json" /> -->
