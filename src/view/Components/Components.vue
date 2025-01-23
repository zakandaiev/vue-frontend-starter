<script setup>
import { onMounted } from 'vue';
import Header from '@/component/header/Header.vue';
import Footer from '@/component/footer/Footer.vue';
import Loader from '@/component/loader/Loader.vue';
import updateSEO from '@/composable/seo';
import { getSlug } from '@/util/cyr-to-lat';
import { randomString } from '@/util/random';
import copyToClipboard from '@/util/clipboard';
import smoothScroll from '@/util/smooth-scroll';
import toast from '@/util/toast';

updateSEO();

onMounted(() => {
  const navigation = document.querySelector('.section__navigation');
  const navigationTitles = document.querySelectorAll('.section__title');

  if (!navigation || !navigationTitles.length) {
    return false;
  }

  navigationTitles.forEach((title) => {
    const link = document.createElement('a');
    const linkId = `${getSlug(title.textContent)}-${randomString()}`;

    title.id = linkId;

    link.href = `#${linkId}`;
    link.innerHTML = `<span>${title.textContent}</span>`;
    link.classList.add('section__navigation-item');
    link.onclick = (event) => {
      const anchor = event.target.closest('.section__navigation-item');
      if (!anchor.hash) {
        return false;
      }

      const target = document.querySelector(anchor.hash);
      if (target) {
        event.preventDefault();

        smoothScroll(target, (document.getElementById('header')?.offsetHeight || 0) + 32);
      }
    };

    navigation.appendChild(link);
  });

  setSticky(navigation);
  sclollSpy();
});

function setSticky(navigation) {
  const parentNode = navigation.closest('.position-sticky');

  if (!parentNode) {
    return false;
  }

  const headerHeight = document.getElementById('header')?.offsetHeight || 0;

  if (window.innerWidth >= 768) {
    parentNode.style.top = `calc(2em + ${headerHeight}px)`;
  } else {
    parentNode.style.top = `${headerHeight}px`;
  }
}

function sclollSpy() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeSectionTitle = entry.target.querySelector('.section__title');

          if (!activeSectionTitle) {
            return false;
          }

          document.querySelectorAll('.section__navigation-item').forEach((item) => {
            if (item.hash === `#${activeSectionTitle.id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    },
    {
      root: document,
      rootMargin: '-10% 0px -90% 0px',
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <div class="row gap-xs">
        <div class="col-xs-12 col-md-8 order-xs-2 order-md-1">
          <div class="section section_offset-bottom">
            <h1>Components</h1>
          </div>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Overview
            </h2>

            <div class="section__body">
              <p>This starter is delivering with ready-to-use utils, styled components, helpers and much more. Some majors of these are described in this section.</p>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Button
            </h2>

            <div class="section__body">
              <div class="d-flex flex-wrap gap-1">
                <button
                  type="button"
                  class="btn"
                >
                  Default
                </button>
                <button
                  type="button"
                  class="btn btn_cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn_primary"
                >
                  Primary
                </button>
                <button
                  type="button"
                  class="btn btn_secondary"
                >
                  Secondary
                </button>
                <button
                  type="button"
                  class="btn btn_success"
                >
                  Success
                </button>
                <button
                  type="button"
                  class="btn btn_info"
                >
                  Info
                </button>
                <button
                  type="button"
                  class="btn btn_warning"
                >
                  Warning
                </button>
                <button
                  type="button"
                  class="btn btn_error"
                >
                  Error
                </button>
              </div>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Label
            </h2>

            <div class="section__body">
              <div class="d-flex flex-wrap gap-1">
                <span class="label">Default</span>
                <span class="label label_cancel">Cancel</span>
                <span class="label label_primary">Primary</span>
                <span class="label label_secondary">Secondary</span>
                <span class="label label_success">Success</span>
                <span class="label label_info">Info</span>
                <span class="label label_warning">Warning</span>
                <span class="label label_error">Error</span>
              </div>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Loader
            </h2>

            <div class="section__body">
              <div class="d-flex align-items-center flex-wrap gap-1">
                <Loader size="xs" />
                <Loader size="sm" />
                <Loader />
                <Loader size="lg" />
                <Loader size="xl" />
              </div>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Grid
            </h2>

            <div class="section__body">
              <h4 class="mt-8">
                Grow and auto width columns controlled with
                <span class="label label_info">.fill</span>
                class
              </h4>

              <div class="row fill">
                <div class="col">
                  <div class="border radius p-2 text-center">
                    Grow column
                  </div>
                </div>
                <div class="col col-auto">
                  <div class="border radius p-2 text-center">
                    Auto column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    Grow column
                  </div>
                </div>
              </div>

              <h4 class="mt-8">
                Equal-width columns defined in
                <span class="label label_info">.row</span>
                with
                <span class="label label_info">.cols-{breakpoint}-{size}</span>
                syntax
              </h4>

              <div class="row cols-xs-2 cols-md-4">
                <div class="col">
                  <div class="border radius p-2 text-center">
                    1 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    2 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    3 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    4 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    5 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    6 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    7 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    8 column
                  </div>
                </div>
              </div>

              <h4 class="mt-8">
                Control column width in each
                <span class="label label_info">.col</span>
                with
                <span class="label label_info">.col-{breakpoint}-{size}</span>
                syntax
              </h4>

              <div class="row">
                <div class="col-xs-12 col-md-3">
                  <div class="border radius p-2 text-center">
                    1 column
                  </div>
                </div>
                <div class="col-xs-12 col-md-6">
                  <div class="border radius p-2 text-center">
                    2 column
                  </div>
                </div>
                <div class="col-xs-12 col-md-3">
                  <div class="border radius p-2 text-center">
                    3 column
                  </div>
                </div>
                <div class="col-xs-12">
                  <div class="border radius p-2 text-center">
                    4 column
                  </div>
                </div>
              </div>

              <h4 class="mt-8">
                Offset columns with
                <span class="label label_info">.offset-{breakpoint}-{size}</span>
                syntax
              </h4>

              <div class="row">
                <div class="col-xs-12 col-md-3">
                  <div class="border radius p-2 text-center">
                    1 column
                  </div>
                </div>
                <div class="col-xs-12 col-md-3 offset-md-3">
                  <div class="border radius p-2 text-center">
                    2 column
                  </div>
                </div>
                <div class="col-xs-12 col-md-3 offset-md-3">
                  <div class="border radius p-2 text-center">
                    3 column
                  </div>
                </div>
                <div class="col-xs-12 col-md-3 offset-md-3">
                  <div class="border radius p-2 text-center">
                    4 column
                  </div>
                </div>
              </div>

              <h4 class="mt-8">
                Gaps controlled with
                <span class="label label_info">.gap-{breakpoint}</span>
                for XY axes,
                <span class="label label_info">.gap-{breakpoint}-x</span>
                for X axis or
                <span class="label label_info">.gap-{breakpoint}-y</span>
                for Y axis syntax defined in
                <span class="label label_info">.row</span>
                class
              </h4>

              <div class="row fill gap-xs cols-xs-2 cols-md-4">
                <div class="col">
                  <div class="border radius p-2 text-center">
                    1 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    2 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    3 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    4 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    5 column
                  </div>
                </div>
                <div class="col">
                  <div class="border radius p-2 text-center">
                    6 column
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Helper
            </h2>

            <div class="section__body">
              <p>
                There are a bunch of different css helper classes such as
                <span class="label label_info">.d-flex</span>,
                <span class="label label_info">.mt-4</span>,
                <span class="label label_info">.bg-primary</span>,
                <span class="label label_info">.color-error</span>
                etc.
              </p>

              <p>
                Full list you can view in
                <span class="label label_info">@/src/sass/component/helper.scss</span>
                file.
              </p>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Table
            </h2>

            <div class="section__body">
              <h4 class="mt-8">
                Default table
              </h4>

              <table>
                <thead>
                  <tr>
                    <th>Lorem ipsum</th>
                    <th>Dolor sit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                </tbody>
              </table>

              <h4 class="mt-8">
                Table with
                <span class="label label_info">.table_striped</span>
                and
                <span class="label label_info">.table_sm</span>
                class
              </h4>

              <table class="table_striped table_sm">
                <thead>
                  <tr>
                    <th>Lorem ipsum</th>
                    <th>Dolor sit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                </tbody>
              </table>

              <h4 class="mt-8">
                Table with
                <span class="label label_info">.table_borderless</span>
                and
                <span class="label label_info">.table_sm</span>
                class
              </h4>

              <table class="table_borderless table_sm">
                <thead>
                  <tr>
                    <th>Lorem ipsum</th>
                    <th>Dolor sit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                  <tr>
                    <td>Lorem ipsum</td>
                    <td>Dolor sit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Toast
            </h2>

            <div class="section__body">
              <p>
                Just import
                <span class="label label_info">import toast from "@/util/toast"</span>
                and use it with
                <span class="label label_info">v-on:click</span>
                or
                <span class="label label_info">@click</span>
                event.
              </p>

              <div class="d-flex flex-wrap gap-1">
                <button
                  type="button"
                  class="btn"
                  @click="toast($event.target.textContent)"
                >
                  Default
                </button>
                <button
                  type="button"
                  class="btn btn_success"
                  @click="toast($event.target.textContent, 'success')"
                >
                  Success
                </button>
                <button
                  type="button"
                  class="btn btn_info"
                  @click="toast($event.target.textContent, 'info')"
                >
                  Info
                </button>
                <button
                  type="button"
                  class="btn btn_warning"
                  @click="toast($event.target.textContent, 'warning')"
                >
                  Warning
                </button>
                <button
                  type="button"
                  class="btn btn_error"
                  @click="toast($event.target.textContent, 'error')"
                >
                  Error
                </button>
              </div>

              <p>Example with custom text, secondary type and 10s duration.</p>

              <button
                type="button"
                class="btn btn_cancel"
                @click="toast($event.target.textContent, 'secondary', 10000)"
              >
                Customization example
              </button>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Copy to clipboard
            </h2>

            <div class="section__body">
              <p>
                Just import
                <span class="label label_info">import copyToClipboard from '@/util/clipboard'</span>
                and use it with
                <span class="label label_info">v-on:click</span>
                or
                <span class="label label_info">@click</span>
                event.
              </p>

              <p>
                Also you can combine it with toast to notify user.
              </p>

              <button
                type="button"
                class="btn btn_cancel"
                @click="copyToClipboard('Lorem ipsum'); toast('Copied to clipboard', 'info');"
              >
                Example
              </button>
            </div>
          </section>
        </div>

        <div class="col-xs-12 col-md-3 offset-md-1 align-self-start position-sticky order-xs-1 order-md-2 bg-body">
          <div class="section__navigation" />
        </div>
      </div>
    </div>
  </main>

  <Footer />
</template>

<style lang="scss" scoped>
// @import './Components.scss';
</style>

<i18n src="./Components.json" />
