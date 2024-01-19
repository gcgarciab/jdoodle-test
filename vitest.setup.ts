import router from './src/router';
import { config } from '@vue/test-utils';
import { server } from './src/mocks/node';
import { createTestingPinia } from '@pinia/testing';
import { afterEach, afterAll, beforeAll } from 'vitest';

config.global.plugins = [
  router,
  createTestingPinia({ stubActions: false }),
];

const defaultAuthStore = '{"currentUser":"gcgarciab@unal.edu.co","accessToken":"adasdasdasdasd","refreshToken":"adasdasdasdasd"}';
const defaultExamStore = '{"questions":[],"currentIndex":0,"currentLanguage":"typescript","jdoodleToken":"","totalQuestions":5,"examType":null,"examId":null}';

beforeAll(() => {
  // Set stores to localStorage
  localStorage.setItem('authStore', defaultAuthStore);
  localStorage.setItem('examStore', defaultExamStore);

  server.listen();
});

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

