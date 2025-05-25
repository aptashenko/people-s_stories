<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center text-green-700">
      {{$t('registration_title')}}
    </h2>

    <form @submit.prevent="authStore.signUp({email, password, locale})" class="space-y-4">
      <input
        v-model="email"
        type="email"
        :placeholder="$t('email_placeholder')"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />
      <input
        v-model="password"
        type="password"
        :placeholder="$t('password_placeholder')"
        minlength="6"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />

      <select
        v-model="locale"
        class="w-full p-3 border appearance-none cursor-pointer hover:bg-black/5 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="uk">Українська</option>
        <option value="fr">Français</option>
      </select>

      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-50"
      >
        {{ authStore.loading ? $t('button_create_loading') : $t('button_create') }}
      </button>

      <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</p>
    </form>

    <p class="mt-6 text-center text-sm text-gray-500">
      {{$t('already_have_account')}}
      <router-link to="/auth/signin" class="text-green-600 hover:underline">
        {{$t('login_link')}}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from "@/stores/authStore.js";
const email = ref('');
const password = ref('');
const error = ref('');
const locale = ref(localStorage.getItem('locale') || 'en');
const authStore = useAuthStore();
</script>
