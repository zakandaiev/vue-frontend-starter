import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import Config from '@/config';

const useSearchStore = defineStore('search', () => {
  const keyword = ref('');
  const history = ref({});
  const page = ref(1);
  const isLoading = ref(false);
  const isTyping = ref(false);

  const currentPageData = computed(() => {
    if (!keyword.value.length || !isKeywordExists()) {
      return [];
    }

    return history.value[keyword.value][`page-${page.value}`] || [];
  });

  const currentKeywordPageCount = computed(() => {
    if (!keyword.value.length || !isKeywordExists()) {
      return 1;
    }

    return history.value[keyword.value].pagesCount || 1;
  });

  watch(
    () => keyword.value,
    () => {
      page.value = 1;

      searchByKeyword();
    },
  );

  watch(
    () => page.value,
    () => {
      if (!keyword.value.length || !isKeywordExists() || !history.value[keyword.value][`page-${page.value}`]?.length) {
        searchByKeyword();
      }
    },
  );

  let debounceTimeout = null;

  async function searchByKeyword(options = {}) {
    clearTimeout(debounceTimeout);

    isLoading.value = false;
    isTyping.value = false;

    if (!keyword.value.length) {
      return false;
    }

    isTyping.value = true;

    debounceTimeout = setTimeout(async () => {
      if (keyword.value.length && isKeywordExists() && history.value[keyword.value][`page-${page.value}`]?.length) {
        isTyping.value = false;

        return true;
      }

      isLoading.value = true;

      try {
        const res = await fetch(`${Config.api.backend}/search?text=${keyword.value}&size=${Config.search.pagination_limit || 10}&from=${page.value}&quality=1`, options);
        const data = await res.json();

        if (!data.objects.length) {
          return false;
        }

        assignHistory(data);
      } catch (error) {
        // do nothing
      } finally {
        isLoading.value = false;
        isTyping.value = false;
      }
    }, (Config.search.debounceMs || 1000));
  }

  function assignHistory(data) {
    if (!data || !data.total) {
      return false;
    }

    if (!isKeywordExists() || data.total !== history.value[keyword.value].total) {
      history.value[keyword.value] = {
        total: data.total,
        pagesCount: Math.ceil(data.total / Config.search.pagination_limit),
      };
    }

    history.value[keyword.value][`page-${page.value}`] = data.objects;
  }

  function isKeywordExists() {
    return keyword.value in history.value;
  }

  return {
    keyword,
    history,
    page,
    isLoading,
    isTyping,
    currentPageData,
    currentKeywordPageCount,
    searchByKeyword,
  };
});

export default useSearchStore;
