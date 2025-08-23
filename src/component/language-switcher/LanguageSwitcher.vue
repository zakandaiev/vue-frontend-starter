<script setup>
import { useRoute, useRouter } from 'vue-router';
import Translation from '@/i18n/translation';

const route = useRoute();
const router = useRouter();

async function switchLanguage(newLocale) {
  const result = await Translation.switchLocale(newLocale);
  if (!result) {
    return false;
  }

  router.replace({
    params: {
      locale: newLocale,
    },
    query: route.query,
  });
}
</script>

<template>
  <div class="language-switcher">
    <button
      v-for="locale in Translation.supportedLocales"
      :key="locale"
      type="button"
      class="language-switcher__item"
      :class="{
        active: locale === Translation.currentLocale,
      }"
      @click="switchLanguage(locale)"
    >
      <span>{{ $t(`locale_short.${locale}`) }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import './LanguageSwitcher.scss';
</style>

<!-- <i18n src="./LanguageSwitcher.json" /> -->
