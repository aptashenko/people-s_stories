<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
    <h2 class="text-3xl font-bold text-center text-blue-700 mb-6">
      {{$t('profile_title')}}
    </h2>

    <div v-if="usersStore.loading" class="text-gray-500 text-center">
      {{$t('loading_message')}}
    </div>

    <form v-else @submit.prevent="updateProfile" class="space-y-5">
      <!-- Email -->
      <div v-if="usersStore.user">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{$t('email_label')}}
        </label>
        <input
          v-model="usersStore.user.email"
          type="email"
          class="w-full p-3 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
          readonly
        />
      </div>

      <!-- Имя -->
      <div v-if="usersStore.user">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{$t('name_label')}}
        </label>
        <input
          v-model="usersStore.user.name"
          type="text"
          :placeholder="$t('name_placeholder')"
          class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <!-- Город -->
      <div v-if="usersStore.user">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          {{$t('city_label')}}
        </label>
        <input
          v-model="usersStore.user.city"
          type="text"
          :placeholder="$t('city_placeholder')"
          class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <!-- Кнопка -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition text-sm font-semibold"
      >
        {{$t('save_button')}}
      </button>

      <!-- Сообщение -->
      <p v-if="success" class="text-green-600 text-center mt-3">
        {{$t('success_message')}}
      </p>
    </form>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/userStore.js";
import {onMounted, ref} from "vue";
const usersStore = useUserStore();
const success = ref(false);

const updateProfile = async () => {
  success.value = false;
  try {
    await usersStore.updateProfile({name: usersStore.user.name, city: usersStore.user.city});
    success.value = true;
  } catch (err) {
    console.error(err)
  }
};

onMounted(() => {

})
</script>
