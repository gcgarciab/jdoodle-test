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
if (import.meta.env.VITE_NODE_ENV === 'development.local') {
  await worker.start({ onUnhandledRequest: 'bypass' });
}

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, QuasarOptions);

app.mount('#app');