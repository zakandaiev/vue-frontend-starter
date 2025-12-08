import { defineStore } from 'pinia';
import { ref } from 'vue';

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
