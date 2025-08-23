/* eslint-disable no-undef */
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import onLanguageChange from '@/composable/on-language-change';

const useStore = {};

function updateSEO(options = {}) {
  const route = useRoute();

  onMounted(() => {
    update();
  });

  onLanguageChange(() => {
    update();
  });

  function update() {
    useStore.t = options.t;
    useStore.te = options.te;
    useStore.route = route;

    updateSEOTitle(options);
    updateSEODescription(options);
    updateSEOKeywords(options);
  }
}

function updateSEOTitle(options = {}) {
  const { t, te, route } = useStore;
  if (!t || !te || !route) {
    return false;
  }

  const { title: routeMetaTitle } = route.meta;

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

function updateSEODescription(options = {}) {
  const { t, te, route } = useStore;
  if (!t || !te || !route) {
    return false;
  }

  const { description: routeMetaDescription } = route.meta;

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

function updateSEOKeywords(options = {}) {
  const { t, te, route } = useStore;
  if (!t || !te || !route) {
    return false;
  }

  const { keywords: routeMetaKeywords } = route.meta;

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

export {
  updateSEOTitle,
  updateSEODescription,
  updateSEOKeywords,
};

export default updateSEO;
