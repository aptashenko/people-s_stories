<template>
  <div>
    <TheHeader />
    <main class="p-4 max-w-4xl mx-auto">
      <router-view />
    </main>
    <router-link v-if="route.name !== 'create-story' && userStore.isAuthenticated" :to="{name: 'create-story'}" class="grid place-items-center w-[60px] h-[60px] rounded-full fixed bottom-[20px] right-[20px] bg-black/80 text-[#fff]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </router-link>
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/userStore.js";
const route = useRoute();
const userStore = useUserStore()
</script>
