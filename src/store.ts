import Vue from 'vue';
import Vuex from 'vuex';
import { CategoryService } from './services/category.service';

const categoryService = new CategoryService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    categories: [],
    recipes: [],
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    async getCategories({ commit }) {
      const response = await categoryService.getList();
      commit('setCategories', response.data);
    },
  },
});
