<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
    <h2 class="text-3xl font-bold mb-6 text-center text-blue-700">
      {{$t('login_title')}}
    </h2>

    <form @submit.prevent="authStore.signIn({email, password})" class="space-y-4">
      <input
        v-model="email"
        type="email"
        :placeholder="$t('email_placeholder')"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        v-model="password"
        type="password"
        :placeholder="$t('password_login_placeholder')"
        class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {{ authStore.loading ? $t('button_signin_loading') : $t('button_signin') }}
      </button>

      <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</p>
    </form>

    <p class="mt-6 text-center text-sm text-gray-500">
      {{$t('no_account')}}
      <router-link to="/auth/signup" class="text-blue-600 hover:underline">
        {{$t('register_link')}}
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
const authStore = useAuthStore();
</script>
