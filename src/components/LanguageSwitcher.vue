<template>
  <div class="relative inline-block">
    <select
      v-model="currentLocale"
      @change="switchLanguage"
      :disabled="loading"
      class="border appearance-none border-gray-300 hover:bg-black/5 cursor-pointer rounded-md text-sm p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      :class="{'bg-black/5': loading}"
    >
      <option
        v-for="(label, code) in languages"
        :key="code"
        :value="code"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import {useUserStore} from "@/stores/userStore.js";

const { locale } = useI18n();
const usersStore = useUserStore();

const languages = {
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
  fr: 'Français'
};

const loading = ref(false);

const currentLocale = ref(localStorage.getItem('locale') || 'en');

const switchLanguage = async () => {
  locale.value = currentLocale.value;
  localStorage.setItem('locale', currentLocale.value);
  if (usersStore.isAuthenticated) {
    loading.value = true;
    try {
      await usersStore.updateProfile({locale: locale.value});
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false;
    }
  }
};

watch(locale, (newValue) => {
  currentLocale.value = newValue
})
</script>
