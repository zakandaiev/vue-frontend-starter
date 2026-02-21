import Translation from '@/i18n/translation';
import { isFunction } from '@/util/misc';
import { watch } from 'vue';

function onLanguageChange(callback) {
  watch(
    () => Translation.currentLocale,
    (newLocale, oldLocale) => {
      if (isFunction(callback)) {
        callback(newLocale, oldLocale);
      }
    },
  );
}

export default onLanguageChange;
