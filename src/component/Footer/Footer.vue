<script setup>
import Config from '@/config';
import { useI18n } from 'vue-i18n';

const appAuthor = Config.appMeta.author;
const appAuthorUrl = Config.appMeta.authorUrl;

const { t } = useI18n();
</script>

<template>
  <footer
    id="footer"
    class="footer section_offset"
  >
    <div class="container">
      {{ t('made_by') }}

      <a
        :href="appAuthorUrl"
        target="_blank"
      >{{ appAuthor }}</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import './Footer.scss';
</style>

<i18n src="./Footer.json" />
