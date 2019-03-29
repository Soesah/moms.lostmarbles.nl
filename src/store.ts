import Vue from 'vue';
import Vuex from 'vuex';
import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';
import { Recipe } from '@/models/recipe.model';
import { Category } from './models/category.model';

const categoryService = new CategoryService();
const recipeService = new RecipeService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    categories: [],
    recipes: [],
    category_id: null,
    searchValue: '',
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories;
    },
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    selectCategory(state, category) {
      state.category_id = category ? category.id : null;
    },
    setSearch(state, value) {
      state.searchValue = value;
      state.category_id = null;
    },
  },
  actions: {
    async getCategories({ commit }) {
      const response = await categoryService.getList();
      commit('setCategories', response.data);
    },
    async getRecipes({ commit }) {
      const response = await recipeService.getList();
      commit('setRecipes', response.data);
    },
    selectCategoryBySlug({ state, commit }, slug) {
      const category = state.categories.find(
        (cat: Category) => cat.slug === slug,
      );
      commit('selectCategory', category);
    },
  },
  getters: {
    filteredRecipes: (state): Recipe[] => {
      if (state.category_id) {
        return state.recipes.filter(
          (recipe: Recipe) => recipe.category_id === state.category_id,
        );
      } else if (state.searchValue) {
        return state.recipes.filter(
          (recipe: Recipe) =>
            recipe.name
              .toLowerCase()
              .indexOf(state.searchValue.toLowerCase()) !== -1,
        );
      }
      return state.recipes;
    },
  },
});
