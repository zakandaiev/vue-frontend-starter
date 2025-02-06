import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { defineStore } from 'pinia';
import { request } from '@/util/request';
import debounce from '@/util/debounce';
import Config from '@/config';

const useSearchStore = defineStore('searchStore', () => {
  const { locale } = useI18n();
  const currentLanguage = locale.value;
  const isLoading = ref(false);
  const resultHistory = ref({});
  const result = computed(() => resultHistory.value[currentLanguage] || []);

  function goSearch(searchText) {
    if (typeof searchText !== 'string' || searchText.length < 2) {
      return false;
    }

    return debounce(async () => {
      const url = `${Config.api.backend}/search`;

      const options = {
        method: 'POST',
        body: {
          keyword: searchText.trim(),
          language: currentLanguage,
        },
      };

      const data = await request(url, options);

      if (data.status !== 'success') {
        return false;
      }

      return data.data || [];
    }, Config.api.delayMs);
  }

  return {
    isLoading,
    result,
    goSearch,
  };
});

export default useSearchStore;
