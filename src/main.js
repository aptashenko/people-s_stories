import './assets/main.css';
import 'floating-vue/dist/style.css';
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUserStore } from '@/stores/userStore.js';
import i18n from '@/i18n/index.js';
import { vTooltip } from 'floating-vue'
import Vue3Toastify from 'vue3-toastify';

async function initApp() {
  const app = createApp(App);
  app.use(i18n);
  app.use(createPinia());

  const userStore = useUserStore();
  await userStore.getUserData();

  app.use(Vue3Toastify, { autoClose: 3000 });
  app.directive('tooltip', vTooltip);
  app.use(router);

  app.mount('#app');
}

initApp();
