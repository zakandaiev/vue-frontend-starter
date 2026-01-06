import Config from '@/config';
import i18n from '@/i18n';
import { getStorage, setStorage } from '@/util/storage';
import { nextTick } from 'vue';

const Translation = {
  storageKey: 'user-language',
  storageType: 'local',

  install: (app) => {
    app.config.globalProperties.$tr = Translation;
  },

  get i18n() {
    return i18n.global;
  },

  get currentLocale() {
    return Translation.i18n.locale.value;
  },

  set currentLocale(newLocale) {
    Translation.i18n.locale.value = newLocale;
  },

  get defaultLocale() {
    return Translation.i18n.fallbackLocale.value;
  },

  get supportedLocales() {
    return Config.i18n.supported || Translation.i18n.availableLocales;
  },

  isLocaleSupported(locale) {
    return Translation.supportedLocales.includes(locale);
  },

  getUserLocale() {
    const storedLanguage = getStorage(Translation.storageKey, Translation.storageType);
    if (Translation.isLocaleSupported(storedLanguage)) {
      return storedLanguage;
    }

    const systemLanguage = window?.navigator?.language?.split('-')[0]?.toLowerCase();
    if (Translation.isLocaleSupported(systemLanguage)) {
      return systemLanguage;
    }

    return Translation.defaultLocale;
  },

  async loadLocaleMessages(locale) {
    if (!Translation.supportedLocales.includes(locale)) {
      const messages = await import(`@/i18n/locale/${locale}.json`);
      Translation.i18n.setLocaleMessage(locale, messages.default);
    }
    return nextTick();
  },

  async switchLocale(newLocale) {
    if (!Translation.isLocaleSupported(newLocale)) {
      return false;
    }

    await Translation.loadLocaleMessages(newLocale);

    Translation.currentLocale = newLocale;
    document.documentElement.setAttribute('lang', newLocale);
    setStorage(Translation.storageKey, newLocale, Translation.storageType);

    return true;
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
        return next(Translation.getUserLocale() + to.path);
      }

      return next(Translation.i18nRoute({
        name: to.name,
        params: {
          ...to.params,
          locale: Translation.getUserLocale(),
        },
        query: {
          ...to.query,
        },
      }));
    }

    await Translation.switchLocale(paramLocale);

    return next();
  },
};

export default Translation;
