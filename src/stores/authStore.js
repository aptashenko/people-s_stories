import { defineStore } from 'pinia'
import {API} from "@/api/index.js";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/userStore.js";
import {ref} from "vue";

export const useAuthStore = defineStore('authStore', () => {
  const router = useRouter();
  const userStore = useUserStore();
  const loading = ref(false);
  const signUp = async (payload) => {
    loading.value = true;
    try {
      const {data} = await API.auth.signUp(payload)
      userStore.setUser(data);
      await router.push({name: 'profile'});
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  const signIn = async (payload) => {
    loading.value = true;

    try {
      const {data} = await API.auth.signIn(payload);
      userStore.setUser(data);
      await router.push({name: 'profile'});
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false;
    }
  }

  return {
    signUp,
    signIn
  }
})
