
import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';

// Import icon libraries
import '@quasar/extras/mdi-v7/mdi-v7.css';
// Import CSS
import 'quasar/dist/quasar.css';
import '@/assets/main.css';

import App from './App.vue';
import router from './router';
import { QuasarOptions } from './plugins';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quasar, QuasarOptions);

app.mount('#app');