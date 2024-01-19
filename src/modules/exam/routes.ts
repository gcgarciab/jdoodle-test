import type { RouteRecordRaw } from 'vue-router';

export const examRoutes: RouteRecordRaw[] = [
  {
    path: 'exam-settings',
    name: 'ExamSettings',
    component: () => import('@/modules/exam/views/ExamSettingsView.vue'),
  },
  {
    path: 'practice/:id',
    name: 'ExamPractice',
    component: () => import('@/modules/exam/views/ExamView.vue'),
  },
  {
    path: 'exam/:id',
    name: 'ExamTest',
    component: () => import('@/modules/exam/views/ExamView.vue'),
  },
  {
    path: 'exam-result',
    name: 'ExamResult',
    component: () => import('@/modules/exam/views/ExamResultView.vue'),
  },
];
