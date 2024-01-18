import { Quasar } from 'quasar';
import router from './src/router';
import { config } from '@vue/test-utils';
import { server } from './src/mocks/node';
import { createTestingPinia } from '@pinia/testing';
import { afterEach, afterAll, beforeAll } from 'vitest';

config.global.plugins = [
  router,
  Quasar,
  createTestingPinia({ stubActions: false }),
];

// Set global components
config.global.components = {

}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

