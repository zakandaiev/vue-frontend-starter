/* eslint-disable no-undef */
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

function updateSEO(options = {}) {
  const { t, te, locale } = useI18n();

  const route = useRoute();
  const { title: routeMetaTitle, description: routeMetaDescription } = route.meta;

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
    // TITLE - PREFIX
    let titlePrefix = typeof options.titlePrefix === 'string' ? options.titlePrefix : '';

    // TITLE - SUFFIX
    let titleSuffix = typeof options.titleSuffix === 'string' ? options.titleSuffix : ` - ${APP_NAME_FORMATTED}`;

    // TITLE - DEFINE
    let title = APP_NAME_FORMATTED;
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
    if (titleSuffix === ` - ${title}`) {
      titleSuffix = '';
    }

    // TITLE - SET
    document.title = titlePrefix + title + titleSuffix;

    // DESCRIPTION - DEFINE
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

    // DESCRIPTION - SET
    let descriptionElement = document.querySelector('head meta[name="description"]');
    if (!descriptionElement) {
      descriptionElement = document.createElement('meta');
      descriptionElement.setAttribute('name', 'description');
      document.head.appendChild(descriptionElement);
    }

    descriptionElement.setAttribute('content', description);
  }
}

export default updateSEO;
