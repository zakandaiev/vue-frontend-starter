<script setup>
import Footer from '@/component/footer/Footer.vue';
import Header from '@/component/header/Header.vue';
import Hero from '@/component/hero/Hero.vue';
import updateSEO from '@/composable/seo';
import { useI18n } from 'vue-i18n';

const {
  t, te, tm, rt,
} = useI18n();

updateSEO({ t, te });
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <Hero />

      <div class="section section_offset">
        <div class="row cols-xs-1 cols-sm-2 cols-md-3 gap-xs">
          <div
            v-for="(feature, key) in tm('features')"
            :key="key"
            class="col"
          >
            <div class="box h-100">
              <div class="box__icon">
                {{ rt(feature.icon) }}
              </div>

              <h4 class="box__title">
                {{ rt(feature.title) }}
              </h4>

              <div class="box__text">
                {{ rt(feature.text) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style lang="scss" scoped>
// @import './Home.scss';
</style>

<i18n src="./Home.json" />
