<template>
  <div v-if="usersStore.user" class="flex items-center gap-2 text-sm text-gray-700 bg-amber-100 px-3 py-1 rounded-full shadow hover:shadow-md transition">
    <span>🫂 {{ usersStore.user?.total_hugs }}</span>
    <span class="text-xs text-gray-500">{{ $t('hug_counter_label') }}</span>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/userStore.js";

const usersStore = useUserStore()
</script>
