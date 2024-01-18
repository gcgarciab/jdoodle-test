import { useAuthStore } from '@/stores';
import { examRoutes } from '@/modules/exam/routes';
import { authRoutes } from '@/modules/auth/routes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { requiresAuth: true },
      redirect: { name: 'ExamSettings' },
      component: () => import('@/views/HomeView.vue'),
      children: [...examRoutes],
    },
    ...authRoutes
  ]
});

/**
 * Check if 'accessToken' esists and to allow routing,
 * if not ... User will be redirected to 'SignIn' route.
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.accessToken.length) {
      next({ name: 'SignIn' });
      return;
    }
  }

  next();
});

export default router;
