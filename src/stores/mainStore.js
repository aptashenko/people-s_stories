import {defineStore} from "pinia";
import {ref} from "vue";

export const useMainStore = defineStore('main', () => {
  const burgerOpened = ref(false);

  const toggleBurger = () => {
    burgerOpened.value = !burgerOpened.value;
  }

  return {
    burgerOpened,
    toggleBurger
  }
});
