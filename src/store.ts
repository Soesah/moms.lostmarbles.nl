import Vue from 'vue';
import Vuex from 'vuex';
import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';
import { Recipe } from '@/models/recipe.model';
import { Category } from './models/category.model';
import { ChangeLog } from '@/models/changes.model';

const categoryService = new CategoryService();
const recipeService = new RecipeService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    categories: [],
    recipe: null,
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
    setRecipe(state, recipe) {
      state.recipe = recipe;
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
    async selectCategoryBySlug({ state, commit, dispatch }, slug) {
      await dispatch('getCategories');
      const category = state.categories.find(
        (cat: Category) => cat.slug === slug,
      );
      commit('selectCategory', category);
    },
    async getRecipeBySlug({ state, commit, dispatch }, slug) {
      await dispatch('getCategories');
      await dispatch('getRecipes');
      const found = (state.recipes as Recipe[]).find(
        (rec: Recipe) => rec.slug === slug,
      );
      if (found) {
        const { id, category_id } = found;
        const response = await recipeService.get(id, category_id);
        commit('setRecipe', response.data);
      }
    },
    async getRecipeChangeLog({}, recipe: Recipe): Promise<ChangeLog[]> {
      const data = await recipeService.getRecipeLatestChanges(recipe);
      return data.status ? data.data : [];
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
      return state.recipes.sort((a: Recipe, b: Recipe) =>
        a.name > b.name ? 1 : -1,
      );
    },
  },
});
