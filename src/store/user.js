import { dummy as getDummydata } from '@/api';
import route from '@/util/route';
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

  const isAuthenticated = computed(() => (data.value.pharmacyId && data.value.kassaId ? true : false));

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

  async function init() {
    dataSession.value = getStorage(storageKey, 'session') || {};
    dataStorage.value = getStorage(storageKey, 'local') || {};

    dataSession.value.dummyId = route.query.dummyId || dataSession.value.dummyId || null;
    if (dataSession.value.dummyId) {
      const dummyData = await getDummydata({
        dummyId: dataSession.value.dummyId,
      });
      dataSession.value.dummy = dummyData.status === 'success' ? dummyData.data : null;
    }

    return true;
  }

  return {
    dataSession,
    dataStorage,
    data,
    isAuthenticated,
    init,
  };
});

export default useUserStore;
