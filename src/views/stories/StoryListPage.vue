<template>
  <div class="max-w-3xl mx-auto mt-10 md:p-4">
    <h2 class="text-3xl font-bold mb-6 text-center">
      {{$t('histories_title')}}
    </h2>

    <!-- Загрузка -->
    <div v-if="storiesStore.loading" class="text-gray-500 text-center animate-pulse">
      {{$t('loading_message')}}
    </div>

    <!-- Пусто -->
    <div v-else-if="storiesList.length === 0" class="text-center text-gray-400 italic mt-10">
      {{$t('empty_message') }}
    </div>

    <!-- Истории -->
    <div v-else class="flex flex-col gap-6">
      <div
        v-for="story in storiesList"
        :key="story.id"
        class="bg-white border border-gray-100 shadow-sm hover:shadow-md rounded-xl p-6 transition duration-200 group"
      >
        <router-link :to="`/stories/${story.id}`" class="block">
          <p
            class="text-gray-900 text-base leading-relaxed break-words group-hover:text-blue-600 transition line-clamp-3"
          >
            {{ story.text }}
          </p>

          <div class="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ story.hugs.length || 0 }} {{ story.hugs.length === 1 ? $t('hugs_singular') : $t('hugs_plural') }}
            </span>
            <span class="text-xs">{{ formatDate(story.created_at) }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {useStoriesStore} from "@/stores/storiesStore.js";
import useDateFormatter from "@/composables/useDateFormatter.js";

const storiesList = ref([]);

const storiesStore = useStoriesStore();

onMounted(async () => {
  storiesList.value = await storiesStore.getAllApproved()
});

const { formatDate } = useDateFormatter();

</script>
