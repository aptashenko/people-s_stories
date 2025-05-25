import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {API} from "@/api/index.js";
import {useRouter} from "vue-router";
import i18n from "@/i18n/index.js";
import router from "@/router/index.js";

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || null);
  const loading = ref(false);
  const initialized = ref(false);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value.role === 'admin');

  const getUserData = async () => {
    loading.value = true;

    if (!token.value) {
      initialized.value = true;
      return;
    }

    try {
      const { data } = await API.user.getUser();
      setUser(data)
    } catch (error) {
      logout();
      console.error(error)
    } finally {
      loading.value = false;
      initialized.value = true;
    }
  }

  const getAllUsers = async () => {
    loading.value = true;
    try {
      const { data } = await API.user.getAllUsers();
      return data.users
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false;
    }
  }

  const updateProfile = async (payload) => {
    loading.value = true;
    try {
      const { data } = await API.user.updateProfile(payload);
      setUser({user: data.data})
    } catch (error) {
      logout();
      console.error(error)
    } finally {
      loading.value = false;
    }
  }

  const switchUsersRole = async (payload) => {
    loading.value = true;
    try {
      await API.user.switchRole(payload);
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false;
    }
  }

  function setUser(data) {
    user.value = data.user;
    if (data.user.locale) {
      localStorage.setItem('locale', data.user.locale);
      i18n.global.locale.value = data.user.locale;
    }
    if (data.access_token) {
      token.value = data.access_token;
      localStorage.setItem('token', data.access_token);
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    initialized.value = true;
    localStorage.removeItem('token');
    router.push('/auth/signin');
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    switchUsersRole,
    getUserData,
    getAllUsers,
    setUser,
    logout,
    updateProfile,
    isAdmin
  };
});
