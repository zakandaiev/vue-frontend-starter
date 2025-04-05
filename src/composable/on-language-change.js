import { nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import Translation from '@/i18n/translation';

function onLanguageChange(callback) {
  const { locale } = useI18n();

  const route = useRoute();
  const router = useRouter();

  watch(
    () => locale.value,
    async (newLocale) => {
      await Translation.switchLanguage(newLocale);

      const routeToReplace = {
        params: {
          locale: newLocale,
        },
      };
      if (route.query) {
        routeToReplace.query = route.query;
      }
      router.replace(routeToReplace);

      await nextTick();

      if (typeof callback === 'function') {
        callback(newLocale);
      }
    },
  );
}

export default onLanguageChange;
