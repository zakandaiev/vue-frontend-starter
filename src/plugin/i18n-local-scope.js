import { useI18n } from 'vue-i18n';

const i18nLocalScope = {
  install(app) {
    // wrap native i18n's translation functions
    // to avoid importing it in every component
    // due to local scope in composition api

    // $t()
    app.config.globalProperties.$t = (...args) => {
      const { t } = useI18n();
      return t(...args);
    };

    // $tm()
    app.config.globalProperties.$tm = (...args) => {
      const { tm } = useI18n();
      return tm(...args);
    };

    // $rt()
    app.config.globalProperties.$rt = (...args) => {
      const { rt } = useI18n();
      return rt(...args);
    };
  },
};

export default i18nLocalScope;
