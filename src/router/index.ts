import { useAuthStore } from '@/stores';
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
      children: [
        {
          path: 'exam-settings',
          name: 'ExamSettings',
          component: () => import('@/views/ExamSettingsView.vue'),
        },
        {
          path: 'practice/:id',
          name: 'ExamPractice',
          component: () => import('@/views/ExamView.vue'),
        },
        {
          path: 'exam/:id',
          name: 'ExamTest',
          component: () => import('@/views/ExamView.vue'),
        },
        {
          path: 'exam-result',
          name: 'ExamResult',
          component: () => import('@/views/ExamResultView.vue'),
        },
      ],
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: () => import('@/views/SignInView.vue'),
    },
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
