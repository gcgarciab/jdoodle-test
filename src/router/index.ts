import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/UserExamView.vue'),
    },
    {
      path: '/sigin',
      name: 'SingIn',
      component: () => import('@/views/SignInView.vue'),
    },
  ]
});

export default router
