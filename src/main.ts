import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';

axios.interceptors.response.use(undefined, (err) => {
  if (err.response.status === 401) {
    document.location.href = '/';
  }
});

createApp(App).use(router).use(store).mount('#app');
