import Vue from 'vue';
import Vuex from 'vuex';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';
import { User } from '@/models/user.model';
import { Category } from './models/category.model';
import { Recipe } from '@/models/recipe.model';
import { ChangeLog } from '@/models/changes.model';
import { Menu, MenuItem, MenuGroup } from './models/menu.model';
import { createRecipeSpecification } from './specification/recipe.specification';

const userService = new UserService();
const categoryService = new CategoryService();
const recipeService = new RecipeService();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    categories: [],
    recipe: null,
    recipes: [],
    category_id: -1,
    searchValue: '',
    menu: new Menu([
      {
        label: 'Uitloggen',
        target: '/user/logout',
        group: MenuGroup.User,
      },
    ]),
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
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
      state.category_id = category ? category.id : -1;
    },
    setSearch(state, value) {
      state.searchValue = value;
    },
    addMenuItems(state, items: MenuItem[]) {
      state.menu.addItems(...items);
    },
    removeMenuGroup(state, group: MenuGroup) {
      state.menu.removeGroup(group);
    },
  },
  actions: {
    async getUsers({ commit }) {
      const response = await userService.getList();
      commit('setUsers', response.data);
    },
    async getCategories({ commit }) {
      const response = await categoryService.getList();
      commit('setCategories', response.data);
    },
    async getRecipes({ commit }) {
      const response = await recipeService.getList();
      commit('setRecipes', response.data);
    },
    async getNewRecipes() {
      const response = await recipeService.getNewRecipes();
      return response.status ? response.data : [];
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
    async getLatestChange(): Promise<ChangeLog | null> {
      const data = await recipeService.getLatestChange();
      return data.status ? data.data : null;
    },
    async getRecipeChangeLog({}, recipe: Recipe): Promise<ChangeLog[]> {
      const data = await recipeService.getRecipeLatestChanges(recipe);
      return data.status ? data.data : [];
    },
  },
  getters: {
    filteredRecipes: (state): Recipe[] => {
      const spec = createRecipeSpecification(
        state.searchValue,
        state.category_id,
      );
      return state.recipes
        .filter(spec)
        .sort((a: Recipe, b: Recipe) => (a.name > b.name ? 1 : -1));
    },
    categoryName: (state) => (
      category_id: number = state.category_id,
      plural: boolean = true,
    ) => {
      const category = state.categories.find(
        (cat: Category) => cat.id === category_id,
      );
      return category
        ? plural
          ? (category as Category).name_plural
          : (category as Category).name_singular
        : null;
    },
  },
});
