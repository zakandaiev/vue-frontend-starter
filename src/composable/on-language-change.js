import Translation from '@/i18n/translation';
import { watch } from 'vue';

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
