import { nextTick } from 'vue';
import i18n from '@/i18n';
import Config from '@/config';
import { setStorage, getStorage } from '@/util/storage';

const Translation = {
  storageKey: 'user-language',
  storageType: 'local',

  install: (app) => {
    app.config.globalProperties.$tr = Translation;
  },

  get defaultLocale() {
    return Config.i18n.default;
  },

  get supportedLocales() {
    return Config.i18n.supported;
  },

  get currentLocale() {
    return i18n.global.locale.value;
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale;
  },

  async switchLanguage(newLocale) {
    await Translation.loadLocaleMessages(newLocale);
    Translation.currentLocale = newLocale;
    document.querySelector('html').setAttribute('lang', newLocale);
    setStorage(Translation.storageKey, newLocale, Translation.storageType);
  },

  async loadLocaleMessages(locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const messages = await import(`@/i18n/locale/${locale}.json`);
      i18n.global.setLocaleMessage(locale, messages.default);
    }

    return nextTick();
  },

  isLocaleSupported(locale) {
    return Translation.supportedLocales.includes(locale);
  },

  getUserLocale() {
    const locale = window.navigator.language
      || window.navigator.userLanguage
      || Translation.defaultLocale;

    return {
      locale,
      localeNoRegion: locale.split('-')[0],
    };
  },

  getPersistedLocale() {
    const persistedLocale = getStorage(Translation.storageKey, Translation.storageType);

    if (Translation.isLocaleSupported(persistedLocale)) {
      return persistedLocale;
    }
    return null;
  },

  guessDefaultLocale() {
    // SAVED LANGUAGE
    const userPersistedLocale = Translation.getPersistedLocale();
    if (userPersistedLocale) {
      return userPersistedLocale;
    }

    // SYSTEM LANGUAGE
    // const userPreferredLocale = Translation.getUserLocale()
    // if (Translation.isLocaleSupported(userPreferredLocale.locale)) {
    //   return userPreferredLocale.locale
    // }
    // if (Translation.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
    //   return userPreferredLocale.localeNoRegion
    // }

    // APP DEFAULT LANGUAGE
    return Translation.defaultLocale;
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Translation.currentLocale,
        ...to.params,
      },
    };
  },

  async routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale;

    if (!Translation.isLocaleSupported(paramLocale)) {
      if (to.name === 'home' && to.path !== '/') {
        return next(Translation.guessDefaultLocale() + to.path);
      }

      return next(Translation.i18nRoute({
        name: to.name,
        params: {
          ...to.params,
          locale: Translation.guessDefaultLocale(),
        },
        query: {
          ...to.query,
        },
      }));
    }

    await Translation.switchLanguage(paramLocale);

    return next();
  },
};

export default Translation;
