import Vue, { VueConstructor } from 'vue';
import Jigsaw from './Jigsaw.vue';
import { Store } from 'vuex';
import { jigsawStore } from './store';

export default {
  install(vue: VueConstructor<Vue>, { store }: { store: Store<any> }) {

    vue.component('jigsaw', Jigsaw);
    store.registerModule('jigsaw', jigsawStore);

  },
};
