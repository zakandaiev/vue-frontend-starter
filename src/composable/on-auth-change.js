import { useAuthStore } from '@/store';
import { isFunction } from '@/util/misc';
import { watch } from 'vue';

function onAuthChange(callback) {
  const authStore = useAuthStore();

  watch(
    () => authStore.isAuthenticated,
    (newValue, oldValue) => {
      if (isFunction(callback)) {
        callback(newValue, oldValue);
      }
    },
  );
}

export default onAuthChange;
