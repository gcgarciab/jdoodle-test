import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/modules/auth/views/SignInView.vue'),
  },
];

export default authRoutes;
