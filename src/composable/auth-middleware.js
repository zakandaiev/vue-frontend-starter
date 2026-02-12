import Translation from '@/i18n/translation';
import { useAuthStore } from '@/store';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

function useAuthMiddleware(options = {}) {
  const {
    preReadyCallback,
    postReadyCallback,
    redirectToLoginPage = true,
  } = options;

  const authStore = useAuthStore();
  const router = useRouter();
  const isReady = ref(false);

  onMounted(() => {
    init();
  });

  watch(
    () => authStore.isAuthenticated,
    () => {
      // Current page is not "login" and user is not authenticated so redirect him to "login" page
      // Or
      // Current page is "login" and user is authenticated so redirect him to "home" page
      if (
        (redirectToLoginPage && !authStore.isAuthenticated)
        || (!redirectToLoginPage && authStore.isAuthenticated)
      ) {
        doRedirect();
      }
    },
  );

  async function init() {
    // Current page is not "login" and user is not authenticated so redirect him to "login" page
    // Or
    // Current page is "login" and user is authenticated so redirect him to "home" page
    if (
      (redirectToLoginPage && !authStore.isAuthenticated)
      || (!redirectToLoginPage && authStore.isAuthenticated)
    ) {
      await doRedirect();
      return true;
    }

    if (typeof preReadyCallback === 'function') {
      await preReadyCallback();
    }

    isReady.value = true;

    if (typeof postReadyCallback === 'function') {
      await postReadyCallback();
    }

    return true;
  }

  async function doRedirect() {
    await router.replace(
      Translation.i18nRoute({
        name: redirectToLoginPage ? 'login' : 'home',
      }),
    );
    return true;
  }

  return {
    isReady,
    doRedirect,
  };
}

export default useAuthMiddleware;
