<script setup>
import Header from '@/component/Header/Header.vue';
import Hero from '@/component/Hero/Hero.vue';
import Footer from '@/component/Footer/Footer.vue';
import updateSEO from '@/composable/seo';

updateSEO();
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <Hero />

      <div class="section section_offset">
        <div class="row cols-xs-1 cols-sm-2 cols-md-3 gap-xs">
          <div
            v-for="(feature, key) in $tm('features')"
            :key="key"
            class="col"
          >
            <div class="box h-100">
              <div class="box__icon">
                {{ $rt(feature.icon) }}
              </div>

              <h4 class="box__title">
                {{ $rt(feature.title) }}
              </h4>

              <div class="box__text">
                {{ $rt(feature.text) }}
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
