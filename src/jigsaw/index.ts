import Vue from 'vue';
import Jigsaw from './Jigsaw.vue';
import { Store } from 'vuex';
import { jigsawStore } from './store';

export default {
  install(vue: any, { store }: { store: Store<any> }) {
    vue.component('jigsaw', Jigsaw);

    if (!store) {
      throw new Error(
        'No Vuex store provided. Jigsaw requires a Vuex store to work.',
      );
    }

    store.registerModule('jigsaw', jigsawStore);
  },
};
