import { ref } from 'vue';
import { defineStore } from 'pinia';

const useDummyStore = defineStore('dummyStore', () => {
  const dummyVariable = ref(null);

  function dummyFunction() {
    return dummyVariable.value.toString().toUppercase();
  }

  return {
    dummyVariable,
    dummyFunction,
  };
});

export default useDummyStore;
