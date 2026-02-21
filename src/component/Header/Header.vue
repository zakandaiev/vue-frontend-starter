<script setup>
import LanguageSwitcher from '@/component/language-switcher/LanguageSwitcher.vue';
import Config from '@/config';
import { IconBrandGithub, IconMoon, IconSun } from '@tabler/icons-vue';
import { onMounted, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';

const appNameFormatted = Config.appMeta.nameFormatted;
const appRepository = Config.appMeta.repository;

const { t, tm, rt } = useI18n();

const header = useTemplateRef('header');

onMounted(() => {
  setHeader();

  window.addEventListener('scroll', setHeader);
});

function setHeader() {
  if (!header.value) {
    return false;
  }

  const scrolledPxs = document.documentElement.scrollTop;

  if (scrolledPxs > 0) {
    header.value.classList.add('is-scrolled');
  } else {
    header.value.classList.remove('is-scrolled');
  }
}
</script>

<template>
  <header
    id="header"
    ref="header"
    class="header"
  >
    <div class="container">
      <div class="header__wrapper">
        <router-link
          :to="$tr.i18nRoute({ name: 'home' })"
          class="header__logo"
        >
          <img
            class="header__logo-image"
            src="@/img/vue-logo.svg"
            :alt="t('logo')"
            height="24"
          >
          <span class="header__logo-text">{{ appNameFormatted }}</span>
          <span class="label label_primary header__logo-label">v{{ Config.app.version }}</span>
        </router-link>

        <nav class="header__nav">
          <router-link
            v-for="nav in tm('nav')"
            :key="rt(nav.route)"
            :to="$tr.i18nRoute({ name: rt(nav.route) })"
            class="header__nav-item"
            :class="{ active: $route.name === rt(nav.route) }"
          >
            {{ rt(nav.name) }}
          </router-link>
        </nav>

        <LanguageSwitcher class="header__language-switcher" />

        <div class="header__appearance">
          <span
            data-theme-set="dark"
            class="header__appearance-item"
            :title="t('switch_to_dark_theme')"
          >
            <IconSun />
          </span>
          <span
            data-theme-set="light"
            class="header__appearance-item"
            :title="t('switch_to_light_theme')"
          >
            <IconMoon />
          </span>
        </div>

        <div class="header__social">
          <a
            :href="appRepository"
            target="_blank"
            class="header__social-item"
            :title="t('view_on_git')"
          >
            <IconBrandGithub />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './Header.scss';
</style>

<i18n src="./Header.json" />
