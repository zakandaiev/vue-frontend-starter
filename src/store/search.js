import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { getSearchResultByText } from '@/api';
import Translation from '@/i18n/translation';
import debounce from '@/util/debounce';
import Config from '@/config';

// USE CASE
// import { useSearchStore } from '@/store';
// ...
// <input v-model="searchStore.searchText" @input="searchStore.handleSearch" />

const useSearchStore = defineStore('searchStore', () => {
  const SEARCH_TEXT_MIN_LENGTH = 2;

  const searchText = ref('');
  const isLoading = ref(false);
  const isSearching = computed(() => searchText.value.length > SEARCH_TEXT_MIN_LENGTH);

  const resultHistory = ref({});
  const resultKey = computed(() => `${Translation.currentLocale}_${searchText.value}`);
  const result = computed(() => resultHistory.value[resultKey.value] || {});

  function reset(fullReset = false) {
    searchText.value = '';
    isLoading.value = false;

    if (fullReset) {
      resultHistory.value = {};
    }
  }

  function handleSearch() {
    if (!isSearching.value || resultHistory.value[resultKey.value]) {
      isLoading.value = false;
      return false;
    }

    isLoading.value = true;

    return debounce(async () => {
      if (!isSearching.value || resultHistory.value[resultKey.value]) {
        isLoading.value = false;
        return false;
      }

      const data = await getSearchResultByText(searchText.value, SEARCH_TEXT_MIN_LENGTH);
      if (data.status !== 'success') {
        isLoading.value = false;
        return false;
      }

      resultHistory.value[resultKey.value] = data.data || [];

      isLoading.value = false;

      return result.value;
    }, Config.search.debounceMs);
  }

  return {
    searchText,
    isLoading,
    isSearching,
    result,
    reset,
    handleSearch,
  };
});

export default useSearchStore;
