import Translation from '@/i18n/translation';
import { watch } from 'vue';

function onLanguageChange(callback) {
  watch(
    () => Translation.currentLocale,
    (newLocale, oldLocale) => {
      if (typeof callback === 'function') {
        callback(newLocale, oldLocale);
      }
    },
  );
}

export default onLanguageChange;
