import { createRouter, createWebHistory } from 'vue-router'
import {useUserStore} from "@/stores/userStore.js";
import {guestOnly, requiresAdmin, requiresAuth} from "@/router/guards.js";
import {useMainStore} from "@/stores/mainStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: () => import('@/views/auth/SignUp.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/auth/signin',
      name: 'signin',
      component: () => import('@/views/auth/SignIn.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/ProfilePage.vue'),
      meta: { requiresAuth: true },
      beforeEnter: (to, from, next) => {
        if (from.name) {
          const usersStore = useUserStore();
          usersStore.getUserData();
        }
        next()
      }
    },
    {
      path: '/stories',
      name: 'stories',
      component: () => import('@/views/stories/StoryListPage.vue')
    },
    {
      path: '/stories/:id',
      name: 'story',
      component: () => import('@/views/stories/StoryDetailPage.vue')
    },
    {
      path: '/stories/create',
      name: 'create-story',
      component: () => import('@/views/stories/CreateStoryPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminDashboardPage.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const mainStore = useMainStore();

  mainStore.burgerOpened = false;

  if (requiresAuth(to, userStore)) {
    return next('/auth/signin');
  }

  if (requiresAdmin(to, userStore)) {
    return next('/');
  }

  if (guestOnly(to, userStore)) {
    return next('/profile');
  }

  next();
});

export default router
