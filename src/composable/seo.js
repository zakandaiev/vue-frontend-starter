/* eslint-disable no-undef */
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

function updateSEO(options = {}) {
  const { t, te, locale } = useI18n();

  const route = useRoute();
  const {
    title: routeMetaTitle,
    description: routeMetaDescription,
    keywords: routeMetaKeywords,
  } = route.meta;

  onMounted(() => {
    update();
  });

  watch(
    () => locale.value,
    () => {
      update();
    },
  );

  function update() {
    updateTitle();
    updateDescription();
    updateKeywords();
  }

  function updateTitle() {
    const appName = te('app.name') ? t('app.name') : APP_NAME_FORMATTED;

    // DEFINE PREFIX
    let titlePrefix = typeof options.titlePrefix === 'string' ? options.titlePrefix : '';

    // DEFINE SUFFIX
    let titleSuffix = typeof options.titleSuffix === 'string' ? options.titleSuffix : ` — ${appName}`;

    // DEFINE TITLE
    let title = appName;
    if (options.title) {
      title = options.title;
    } else if (te(options.i18nTitleKey)) {
      title = t(options.i18nTitleKey);
    } else if (te('seo.title')) {
      title = t('seo.title');
    } else if (routeMetaTitle) {
      title = routeMetaTitle;
    }

    if (titlePrefix === title) {
      titlePrefix = '';
    }
    if (titleSuffix === ` — ${title}`) {
      titleSuffix = '';
    }

    // UPDATE
    document.title = titlePrefix + title + titleSuffix;
  }

  function updateDescription() {
    // DEFINE
    let description = APP_DESCRIPTION;
    if (options.description) {
      description = options.description;
    } else if (te(options.i18nDescriptionKey)) {
      description = t(options.i18nDescriptionKey);
    } else if (te('seo.description')) {
      description = t('seo.description');
    } else if (routeMetaDescription) {
      description = routeMetaDescription;
    }

    // UPDATE
    let descriptionElement = document.querySelector('head meta[name="description"]');
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }

    descriptionElement.setAttribute('content', description);
  }

  function updateKeywords() {
    // DEFINE
    let keywords = APP_KEYWORDS;
    if (options.keywords) {
      keywords = options.keywords;
    } else if (te(options.i18nKeywordsKey)) {
      keywords = t(options.i18nKeywordsKey);
    } else if (te('seo.keywords')) {
      keywords = t('seo.keywords');
    } else if (routeMetaKeywords) {
      keywords = routeMetaKeywords;
    }

    if (Array.isArray(keywords)) {
      keywords = keywords.join(', ');
    }

    // UPDATE
    let keywordsElement = document.querySelector('head meta[name="keywords"]');
    if (!keywordsElement) {
      keywordsElement = document.createElement('meta');
      keywordsElement.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsElement);
    }

    keywordsElement.setAttribute('content', keywords);
  }
}

export default updateSEO;
