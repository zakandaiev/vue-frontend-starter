import Config from '@/config';
import { useUserStore } from '@/store';
import { request as requestUtil } from '@/util/request';
import { getStorage, setStorage } from '@/util/storage';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

const useAuthStore = defineStore('authStore', () => {
  const storageKey = 'auth-data';

  const userStore = useUserStore();

  const data = ref(getStorage(storageKey, 'local') || {});

  const accessToken = computed(() => data.value.accessToken);
  const isAuthenticated = computed(() => !!accessToken.value);

  watch(
    () => data.value,
    () => {
      setStorage(storageKey, data.value, 'local');
    },
    { deep: true },
  );

  function flush() {
    data.value = {};
    return true;
  }

  async function login(body = {}) {
    const url = `${Config.api.backend}/auth/login`;
    const options = {
      method: 'POST',
      credentials: 'include',
      body: {
        ...body,
      },
    };

    const result = await requestUtil(url, options);
    if (result.status !== 'success') {
      return false;
    }

    data.value.accessToken = result.data.accessToken;
    Object.assign(userStore.dataSession, result.data.user);

    return true;
  }

  async function logout() {
    const url = `${Config.api.backend}/auth/logout`;
    const options = {
      method: 'POST',
      credentials: 'include',
      body: {},
    };

    await requestUtil(url, options);
    userStore.flush();
    flush();

    return true;
  }

  async function request(resource, options = {}, timeout = null, delay = null) {
    if (!options.headers) {
      options.headers = {
        'Content-Type': 'application/json',
      };
    }

    if (accessToken.value) {
      options.headers.Authorization = `Bearer ${accessToken.value}`;
    }

    let result = await requestUtil(resource, options, timeout, delay);
    if (result.code !== 401) {
      return result;
    }

    const resultRefresh = await refresh();
    if (!resultRefresh) {
      flush();
      userStore.flushSession();
      return result;
    }

    options.headers.Authorization = `Bearer ${resultRefresh}`;

    result = await requestUtil(resource, options, timeout, delay);
    if (result.code === 401) {
      flush();
      userStore.flushSession();
      return result;
    }

    data.value.accessToken = resultRefresh;

    return result;
  }

  async function refresh() {
    const url = `${Config.api.backend}/auth/refresh`;
    const options = {
      method: 'POST',
      credentials: 'include',
      body: {},
    };

    const result = await requestUtil(url, options);
    if (result.status !== 'success') {
      return false;
    }

    return result.data.accessToken;
  }

  return {
    data,
    accessToken,
    isAuthenticated,
    flush,
    login,
    logout,
    request,
    refresh,
  };
});

export default useAuthStore;
