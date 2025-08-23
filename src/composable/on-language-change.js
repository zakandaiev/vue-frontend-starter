import { watch } from 'vue';
import Translation from '@/i18n/translation';

function onLanguageChange(callback) {
  watch(
    () => Translation.currentLocale,
    async (newLocale, oldLocale) => {
      if (typeof callback === 'function') {
        callback(newLocale, oldLocale);
      }
    },
  );
}

export default onLanguageChange;
