<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 text-center">
    <h1 class="text-3xl font-bold mb-4"> {{$t('welcome_title')}} <span class="text-blue-600">People's Stories</span></h1>

    <p class="text-gray-700 text-lg mb-6">
      {{ $t('welcome_paragraph') }}
    </p>

    <div class="flex flex-col md:flex-row md:justify-center gap-2">
      <router-link
        to="/stories"
        class="inline-block bg-blue-600 border border-transparent text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {{$t('read_stories_button')}}
      </router-link>

      <router-link
        to="/stories/create"
        class="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
      >
        {{$t('share_story_button')}}
      </router-link>
    </div>

    <div class="mt-10 text-sm text-gray-500">
      {{$t('footer_note')}}
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
