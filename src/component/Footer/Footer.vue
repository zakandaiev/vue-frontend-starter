<script setup>
/* eslint-disable no-undef */
const appAuthor = APP_AUTHOR;
const appAuthorUrl = APP_AUTHOR_URL;
</script>

<template>
  <footer
    id="footer"
    class="footer section_offset"
  >
    <div class="container">
      {{ $t('made_by') }}

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
