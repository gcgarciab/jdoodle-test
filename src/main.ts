import { Quasar } from 'quasar';

// Import icon libraries
import '@quasar/extras/mdi-v7/mdi-v7.css';
// Import CSS
import 'quasar/dist/quasar.css';
import '@/assets/main.css';

import App from './App.vue';
import router from './router';
import { QuasarOptions } from './plugins';

// To start mock server
async function prepareApp() {
  if (import.meta.env.VITE_NODE_ENV === 'development.local') {
    const { worker } = await import('./mocks/browser');
    worker.start({ onUnhandledRequest: 'bypass' });
  }

  return Promise.resolve();
}

const app = createApp(App);

prepareApp().then(() => {
  app.use(createPinia());
  app.use(router);
  app.use(Quasar, QuasarOptions);
  app.mount('#app');
});

