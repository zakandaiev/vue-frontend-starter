<script setup>
import Loader from '@/component/loader/Loader.vue';

defineProps({
  back: {
    type: String,
    default: 'home',
  },
  backOptions: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
  grow: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: Boolean,
    default: false,
  },
  offsetTop: {
    type: Boolean,
    default: false,
  },
  offsetBottom: {
    type: Boolean,
    default: false,
  },
  stickyHeader: {
    type: Boolean,
    default: false,
  },
  stickyFooter: {
    type: Boolean,
    default: false,
  },
  centerBody: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <section
    :class="[
      'section',
      {
        section_grow: grow,
        section_offset: offset,
        'section_offset-top': offsetTop,
        'section_offset-bottom': offsetBottom,
        'section_sticky-header': stickyHeader,
        'section_sticky-footer': stickyFooter,
      }
    ]"
  >
    <div
      v-if="$slots.back || $slots.title"
      class="section__header"
    >
      <div class="container">
        <div class="section__header-wrapper">
          <div
            v-if="loading && $slots.back"
            class="section__skeleton"
          />
          <router-link
            v-else-if="$slots.back"
            class="section__back"
            :to="$tr.i18nRoute({
              name: back,
              ...backOptions
            })"
          >
            <i class="ti ti-chevron-left" />
            <slot name="back" />
          </router-link>

          <div
            v-if="loading && $slots.title"
            class="section__skeleton section__skeleton_wide"
          />
          <h2
            v-else-if="$slots.title"
            class="section__title"
          >
            <slot name="title" />
          </h2>
        </div>
      </div>
    </div>

    <div
      v-if="loading"
      class="section__loader"
    >
      <Loader />
    </div>
    <div
      v-else-if="$slots.default"
      class="section__body"
      :class="{ section__body_centered: centerBody }"
    >
      <div class="container">
        <slot name="default" />
      </div>
    </div>

    <div
      v-if="!loading && $slots.footer"
      class="section__footer"
    >
      <div class="container">
        <slot name="footer" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import './Section.scss';
</style>

<!-- <i18n src="./Section.json" /> -->
