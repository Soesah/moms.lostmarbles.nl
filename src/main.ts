import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
// import jigsaw from './jigsaw';

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    document.location.href = '/';
  }
});

const app = createApp(App)
  .use(router)
  .use(store)
  // .use(jigsaw, { store })
  .mount('#app');
