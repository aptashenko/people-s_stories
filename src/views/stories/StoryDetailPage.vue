<template>
  <div>
    <router-link
      :to="{name: 'stories'}"
      class="flex w-fit items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700"
    >
      <span>
        {{$t('back_button')}}
      </span>
    </router-link>
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div v-if="storiesStore.loading" class="text-gray-500 text-center py-10">
        {{$t('loading_message')}}
      </div>

      <div v-else-if="story">
        <p class="text-gray-900 text-sm md:text-lg leading-relaxed whitespace-pre-line break-words mb-6">
          {{ story.text }}
        </p>

        <div class="flex flex-col justify-end items-center md:flex-row md:justify-between text-sm text-gray-500 mb-4">
          <span class="text-right w-full md:text-center md:w-fit">{{$t('published_label')}} {{ storyDate }}</span>
          <span class="text-right w-full md:text-center md:w-fit">🤗 {{ story.hugs.length || 0 }} {{ story.hugs.length === 1 ? $t('hugs_singular') : $t('hugs_plural') }}</span>
        </div>

        <div class="flex md:flex-row flex-col items-end md:items-center justify-end gap-2 mt-4">
          <button
            @click="addHug"
            :disabled="storiesStore.hugging"
            class="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition-all duration-200"
            :class="[
            storiesStore.hugging
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'text-blue-600 border-blue-600 border-[1px] hover:text-blue-900 hover:border-blue-900'
          ]"
          >
            <span>{{ story.hugged ? $t('already_hugged') : $t('hug_button') }}</span>
          </button>
          <button
            :disabled="true"
            v-tooltip="$t('coming_soon')"
            class="flex items-center gap-2 cursor-not-allowed px-5 py-2 text-sm font-medium rounded-xl transition-all border-[1px] border-transparent duration-200 bg-black/10 text-gray-500"
          >
            <span>
              {{ $t('donate_button') }}
            </span>
          </button>
          <button
            :disabled="true"
            v-tooltip="$t('coming_soon')"
            class="flex items-center gap-2 cursor-not-allowed px-5 py-2 text-sm font-medium rounded-xl transition-all border-[1px] border-transparent duration-200 bg-black/10 text-gray-500"
          >
            <span>
              {{ $t('comments_button') }}
            </span>
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-400">{{$t('story_not_found')}}</div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {useStoriesStore} from "@/stores/storiesStore.js";
import {useRoute} from "vue-router";
import useDateFormatter from "@/composables/useDateFormatter.js";

const story = ref(null);
const storiesStore = useStoriesStore();
const route = useRoute();

const { formatDate } = useDateFormatter();

const storyDate = computed(() => formatDate(story.value.created_at));

onMounted(async () => {
  story.value = await storiesStore.getStory(route.params.id);
})

const addHug = async () => {
  story.value = await storiesStore.addHug(route.params.id);
};
</script>
