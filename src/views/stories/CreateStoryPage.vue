<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
    <h2 class="text-3xl font-bold mb-4 text-center text-blue-700">
     {{$t('form_title')}}
    </h2>

    <!-- Форма -->
    <form v-if="!success" @submit.prevent="addStory" class="flex flex-col">
      <textarea
        v-model="text"
        rows="6"
        class="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400"
        :placeholder="$t('textarea_placeholder')"
        required
      ></textarea>

      <button
        type="submit"
        class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
       {{$t('submit_button')}}
      </button>
    </form>

    <!-- Успех -->
    <div v-else class="text-center">
      <p class="text-green-600 mt-4 text-lg font-semibold">
        {{$t('moderation_success_message')}}
      </p>
      <router-link
        to="/stories"
        class="bg-blue-600 text-white px-6 py-2 mt-6 inline-block rounded-md hover:bg-blue-700 transition text-sm"
      >
        {{$t('go_to_stories_button')}}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useStoriesStore} from "@/stores/storiesStore.js";

const text = ref('');
const success = ref(false);

const storiesStore = useStoriesStore();

const addStory = async () => {
  try {
    await storiesStore.addStory(text.value);
    success.value = true;
  } catch (error) {
    console.error(error)
  }
}
</script>
