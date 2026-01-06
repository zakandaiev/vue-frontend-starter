import { getStorage, setStorage } from '@/util/storage';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useUserStore = defineStore('userStore', () => {
  const storageKey = 'user-data';

  const dataSession = ref({});
  const dataStorage = ref({});

  const data = computed(() => ({
    ...dataSession.value,
    ...dataStorage.value,
  }));

  watch(
    () => dataSession.value,
    () => {
      setStorage(storageKey, dataSession.value, 'session');
    },
    { deep: true },
  );

  watch(
    () => dataStorage.value,
    () => {
      setStorage(storageKey, dataStorage.value, 'local');
    },
    { deep: true },
  );

  function init() {
    dataSession.value = getStorage(storageKey, 'session') || {};
    dataStorage.value = getStorage(storageKey, 'local') || {};

    return true;
  }

  function flushSession() {
    dataSession.value = {};
    return true;
  }

  function flushStorage() {
    dataStorage.value = {};
    return true;
  }

  function flush() {
    flushSession();
    flushStorage();
    return true;
  }

  return {
    dataSession,
    dataStorage,
    data,
    init,
    flushSession,
    flushStorage,
    flush,
  };
});

export default useUserStore;
