import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  longDateFilter,
  dateFilter,
} from '@/components/common/filters/longDate.filter';

Vue.config.productionTip = false;

Vue.filter('longDate', longDateFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
