<template>
  <div class="max-w-5xl mx-auto mt-10 p-6">
    <h2 class="text-3xl font-bold mb-8 text-blue-700 text-center">
      {{$t('admin_title')}}
    </h2>

    <!-- Загрузка -->
    <div v-if="storiesStore.loading" class="text-center text-gray-500 mb-8">
      {{$t('loading_message')}}
    </div>

    <!-- Истории на модерации -->
    <section v-else>
      <h3 class="text-xl font-semibold mb-4 text-gray-800">
        {{$t('moderation_title')}}
      </h3>

      <div v-if="unapproved.length === 0" class="text-gray-400 mb-6 italic">
        {{$t('no_stories_message')}}
      </div>

      <div
        v-for="story in unapproved"
        :key="story.id"
        class="p-5 bg-white border border-gray-200 rounded-xl shadow-sm mb-5"
      >
        <p class="text-gray-800 whitespace-pre-line break-words mb-4">{{ story.text }}</p>
        <div class="flex gap-3">
          <button
            @click="approveStory(story.id)"
            class="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            {{ $t('approve_button') }}
          </button>
          <button
            @click="deleteStory(story.id)"
            class="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            {{$t('delete_button')}}
          </button>
        </div>
      </div>
    </section>

    <!-- Пользователи -->
    <section class="mt-12">
      <h3 class="text-xl font-semibold mb-4 text-gray-800">
        {{$t('users_title')}}
      </h3>

      <div
        v-for="user in users"
        :key="user.id"
        class="flex items-center justify-between border-b border-gray-100 py-3"
      >
        <div>
          <p class="text-xs md:text-sm text-gray-800 font-medium">{{ user.email }}</p>
          <p class="text-xs md:text-sm text-gray-500">
            {{ user.name || '—' }} / {{ user.city || '—' }}
          </p>
        </div>

        <select
          v-model="user.role"
          @change="switchRole(user.id, user.role)"
          class="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-300"
        >
          <option value="user">
            {{$t('user_role_option')}}
          </option>
          <option value="admin">
            {{$t('admin_role_option')}}
          </option>
        </select>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {useStoriesStore} from "@/stores/storiesStore.js";
import {useUserStore} from "@/stores/userStore.js";

const unapproved = ref([]);
const users = ref([]);

const storiesStore = useStoriesStore();
const usersStore = useUserStore();

const fetchAdminData = async () => {
  try {
    const [unapprovedStories, userList] = await Promise.all([
      storiesStore.getAllUnapproved(),
      usersStore.getAllUsers()
    ]);

    unapproved.value = unapprovedStories || [];
    users.value = userList || [];
  } catch (err) {
    console.error('Ошибка загрузки админ-данных:', err);
  }
};


const approveStory = async (id) => {
  await storiesStore.approveStory(id);
  unapproved.value = await storiesStore.getAllUnapproved();
};

const deleteStory = async (id) => {
  await storiesStore.deleteStory(id);
  unapproved.value = await storiesStore.getAllUnapproved();
};

const switchRole = async (id, role) => {
  await usersStore.switchUsersRole({id, role})
};

onMounted(fetchAdminData);
</script>
