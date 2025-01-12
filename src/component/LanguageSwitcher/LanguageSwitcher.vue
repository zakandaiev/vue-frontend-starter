<script setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import Translation from '@/i18n/translation';

const { t, locale } = useI18n();
const router = useRouter();
const { supportedLocales } = Translation;

watch(
  () => locale.value,
  async (l) => {
    await Translation.switchLanguage(l);
    await router.replace({ params: { locale: l } });
  },
);
</script>

<template>
  <div class="language-switcher">
    <button
      v-for="sLocale in supportedLocales"
      :key="`locale-${sLocale}`"
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
