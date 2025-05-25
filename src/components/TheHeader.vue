<template>
  <header class="relative md:p-4 border-b">
    <div class="relative z-[10] flex justify-between bg-[#FFF1F2] p-4 md:p-0 items-center border-b-black/10 border-b-[1px] md:border-none">
      <router-link to="/" class="font-bold text-xl">
        {{$t('logo')}}
      </router-link>
      <nav class="hidden md:flex gap-4">
        <hugs-counter />
        <language-switcher />
        <router-link v-if="userStore.isAuthenticated && userStore.isAdmin" to="/admin" class="text-sm flex items-center justify-center" :class="linkClass('/admin')">
          {{$t('nav_admin_panel')}}
        </router-link>
        <router-link to="/stories" class="text-sm flex items-center justify-center" :class="linkClass('/stories')">
          {{$t('nav_stories')}}
        </router-link>
        <router-link v-if="!userStore.isAuthenticated" to="/auth/signin" class="text-sm flex items-center justify-center" :class="linkClass('/auth/signin')">
          {{$t('nav_login')}}
        </router-link>
        <router-link v-if="!userStore.isAuthenticated" to="/auth/signup" class="text-sm flex items-center justify-center" :class="linkClass('/auth/signup')">
          {{$t('nav_signup')}}
        </router-link>
        <router-link v-if="userStore.isAuthenticated" to="/profile" class="text-sm flex items-center justify-center" :class="linkClass('/profile')">
          {{$t('nav_profile')}}
        </router-link>
        <router-link v-if="userStore.isAuthenticated" to="/stories/create" class="text-sm flex items-center justify-center" :class="linkClass('/stories/create')">
          {{$t('nav_create')}}
        </router-link>
        <button v-if="userStore.isAuthenticated" class="text-sm flex items-center justify-center" @click="userStore.logout">
          {{$t('nav_logout')}}
        </button>
      </nav>
      <div class="md:hidden flex items-center gap-4">
        <language-switcher />
        <button class="w-[30px] h-[20px] flex flex-col justify-between" @click="mainStore.toggleBurger">
          <span class="w-full block bg-black h-[3px]" />
          <span class="w-full block bg-black h-[3px]" />
          <span class="w-full block bg-black h-[3px]" />
        </button>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <nav v-if="mainStore.burgerOpened" class="md:hidden flex gap-4 flex-col w-full absolute top-[100%] p-4 bg-white border-b-black/10 border-b-[1px] left-0">
        <router-link v-if="userStore.isAuthenticated && userStore.isAdmin" to="/admin" class="text-sm text-center" :class="linkClass('/admin')">
          {{$t('nav_admin_panel')}}
        </router-link>
        <router-link to="/stories" class="text-sm text-center" :class="linkClass('/stories')">
          {{$t('nav_stories')}}
        </router-link>
        <router-link v-if="!userStore.isAuthenticated" to="/auth/signin" class="text-sm text-center" :class="linkClass('/auth/signin')">
          {{$t('nav_login')}}
        </router-link>
        <router-link v-if="!userStore.isAuthenticated" to="/auth/signup" class="text-sm text-center" :class="linkClass('/auth/signup')">
          {{$t('nav_signup')}}
        </router-link>
        <router-link v-if="userStore.isAuthenticated" to="/profile" class="text-sm text-center" :class="linkClass('/profile')">
          {{$t('nav_profile')}}
        </router-link>
        <router-link v-if="userStore.isAuthenticated" to="/stories/create" class="text-sm text-center" :class="linkClass('/stories/create')">
          {{$t('nav_create')}}
        </router-link>
        <button v-if="userStore.isAuthenticated" class="text-sm text-center" @click="userStore.logout">
          {{$t('nav_logout')}}
        </button>
        <hugs-counter class="w-fit mx-auto" />
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import {useMainStore} from "@/stores/mainStore.js";
import {useRoute} from "vue-router";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import HugsCounter from "@/components/HugsCounter.vue";

const userStore = useUserStore();
const mainStore = useMainStore();

const route = useRoute();

const linkClass = (path) => {
  return [
    'text-sm transition',
    route.path === path
      ? 'text-blue-700 font-semibold underline underline-offset-4'
      : 'text-gray-700 hover:text-blue-600'
  ];
};
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
