<script setup>
import Footer from '@/component/footer/Footer.vue';
import Header from '@/component/header/Header.vue';
import { updateSEO } from '@/composable';
import Config from '@/config';
import copyToClipboard from '@/util/clipboard';
import { randomString } from '@/util/random';
import smoothScroll from '@/util/smooth-scroll';
import { slugify } from '@/util/text';
import toast from '@/util/toast';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const appName = Config.appMeta.name;
const appDescription = Config.appMeta.description;
const appRepository = Config.appMeta.repository;

const { t, te } = useI18n();

updateSEO({ t, te });

onMounted(() => {
  const navigation = document.querySelector('.section__navigation');
  const navigationTitles = document.querySelectorAll('.section__title');

  if (!navigation || !navigationTitles.length) {
    return false;
  }

  navigationTitles.forEach((title) => {
    const link = document.createElement('a');
    const linkId = `${slugify(title.textContent)}-${randomString()}`;

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
    parentNode.style.top = `calc(3.2rem + ${headerHeight}px)`;
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

function copyCmd(event) {
  copyToClipboard(event.target.textContent);
  toast('Copied to clipboard');
}
</script>

<template>
  <Header />

  <main class="page-content">
    <div class="container">
      <div class="row gap-xs">
        <div class="col-xs-12 col-md-8 order-xs-2 order-md-1">
          <div class="section section_offset-bottom">
            <h1>Getting Started</h1>
          </div>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              Overview
            </h2>

            <div class="section__body">
              <p>{{ appDescription }}.</p>

              <p>
                Vue's requirements and documentation you'll find on
                <a
                  href="https://vuejs.org/"
                  target="_blank"
                >its official website</a>.
              </p>

              <p>
                This starter is delivering with ready-to-use utils, styled components, helpers and much more. Its overview is available in
                <router-link :to="$tr.i18nRoute({ name: 'components' })">
                  <span>components</span>
                </router-link>
                section.
              </p>
            </div>
          </section>

          <section class="section section_offset border-top">
            <h2 class="section__title">
              How to use
            </h2>

            <div class="section__body">
              <h4 class="font-regular">
                Instalation
              </h4>
              <div class="box">
                <pre>
<span class="color-muted"># Clone the repository</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">git clone</span> {{ appRepository }}.git</span>

<span class="color-muted"># Go to the folder</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">cd</span> {{ appName }}</span>

<span class="color-muted"># Install packages</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> i</span>
<span class="color-muted"># or</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> install</span>

<span class="color-muted"># Remove link to the original repository</span>
<span class="color-muted"># - if you use Windows system</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">Remove-Item</span> .git <span class="color-info">-Recurse -Force</span></span>
<span class="color-muted"># - or if you use Unix system</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">rm</span> <span class="color-info">-rf</span> .git</span>
</pre>
              </div>

              <h4 class="font-regular">
                Develop
              </h4>
              <div class="box">
                <pre>
<span class="color-muted"># Start development mode with live-server</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run dev</span>
<span class="color-muted"># or with options</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run dev <span class="color-info">-- --port=3000</span></span>
</pre>
              </div>

              <h4 class="font-regular">
                Build
              </h4>
              <div class="box">
                <pre>
<span class="color-muted"># Build static files for production</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run build</span>
<span class="color-muted"># or</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run prod</span>
<span class="color-muted"># or with options</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run build <span class="color-info">-- --base=/subdomain --outDir=/dest</span></span>

<span class="color-muted"># Start server for build preview</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run preview</span>
<span class="color-muted"># or with options</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run preview <span class="color-info">-- --port=3001</span></span>
</pre>
              </div>

              <h4 class="font-regular">
                Lint
              </h4>
              <div class="box">
                <pre>
<span class="color-muted"># ESLint</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run lint:js</span>
<span class="color-muted"># or</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run lint:js<span class="color-info">:fix</span></span>

<span class="color-muted"># StyleLint</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run lint:css</span>
<span class="color-muted"># or</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run lint:css<span class="color-info">:fix</span></span>
</pre>
              </div>

              <h4 class="font-regular">
                Backend emulation
              </h4>
              <div class="box">
                <pre>
<span class="color-muted"># Fastify listen backend.js</span>
<span
class="cursor-pointer"
@click="copyCmd"
><span class="color-primary">npm</span> run backend</span>
</pre>
              </div>
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
// @import './Guide.scss';
</style>

<i18n src="./Guide.json" />
