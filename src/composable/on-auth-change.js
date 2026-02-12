import { useAuthStore } from '@/store';
import { watch } from 'vue';

function onAuthChange(callback) {
  const authStore = useAuthStore();

  watch(
    () => authStore.isAuthenticated,
    (newValue, oldValue) => {
      if (typeof callback === 'function') {
        callback(newValue, oldValue);
      }
    },
  );
}

export default onAuthChange;
