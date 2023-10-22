import { ActionContext, Module } from 'vuex';
import { MomsState } from '@/models/store.model';
import { Ingredient, Meal, Menu } from '@/models/menu.model';
import { MenuService } from '@/services/menu.service';

export interface MenuStore {
  meals: Meal[];
  editMeal: Meal | null;
  ingredients: Ingredient[];
  editIngredient: Ingredient | null;
}

export enum MenuMutations {
  SetIngredients = 'us/SetIngredients',
  SetMeals = 'us/SetMeals',
  EditMeal = 'us/EditMeal',
  EditIngredient = 'us/EditIngredient',
}

export enum MenuActions {
  AnalyzeMenu = 'us/AnalyzeMenu',
  UpdateAnalyzedMenu = 'us/UpdateAnalyzedMenu',
  GetIngredients = 'us/GetIngredients',
  CreateIngredient = 'us/CreateIngredient',
  UpdateIngredient = 'us/UpdateIngredient',
  RemoveIngredient = 'us/RemoveIngredient',
  GetMeals = 'us/GetMeals',
  CreateMeal = 'us/CreateMeal',
  UpdateMeal = 'us/UpdateMeal',
  RemoveMeal = 'us/RemoveMeal',
  CreateMenu = 'us/CreateMenu',
  UpdateMenu = 'us/UpdateMenu',
  RemoveMenu = 'us/RemoveMenu',
}

const menuService = new MenuService();

type Context = ActionContext<MenuStore, MomsState>;

export const stripNamespace = (action: MenuMutations | MenuActions): string =>
  action.replace(/us\//g, '');

export const menuStore: Module<MenuStore, MomsState> = {
  namespaced: true,
  state: {
    ingredients: [],
    meals: [],
    editMeal: null,
    editIngredient: null,
  },
  mutations: {
    [stripNamespace(MenuMutations.SetIngredients)](
      state,
      ingredients: Ingredient[],
    ) {
      state.ingredients = ingredients;
    },
    [stripNamespace(MenuMutations.SetMeals)](state, meals: Meal[]) {
      state.meals = meals;
    },
    [stripNamespace(MenuMutations.EditMeal)](state, meal: Meal) {
      state.editMeal = meal;
    },
    [stripNamespace(MenuMutations.EditIngredient)](
      state,
      ingredient: Ingredient,
    ) {
      state.editIngredient = ingredient;
    },
  },
  actions: {
    async [stripNamespace(MenuActions.AnalyzeMenu)]({}: Context) {
      const response = await menuService.analyze();
      return response.data;
    },
    async [stripNamespace(MenuActions.UpdateAnalyzedMenu)](
      {}: Context,
      id: number,
    ) {
      const response = await menuService.analyzed(id);
      return response.data;
    },
    async [stripNamespace(MenuActions.GetIngredients)]({ commit }: Context) {
      const response = await menuService.getIngredients();
      commit(stripNamespace(MenuMutations.SetIngredients), response.data);
      return response.data;
    },
    async [stripNamespace(MenuActions.CreateIngredient)](
      { dispatch }: Context,
      data: Ingredient,
    ): Promise<Ingredient> {
      const response = await menuService.createIngredient(data);

      // re-fetch ingredients
      dispatch(stripNamespace(MenuActions.GetIngredients));
      return response.data;
    },
    async [stripNamespace(MenuActions.UpdateIngredient)](
      {}: Context,
      data: Ingredient,
    ): Promise<Ingredient> {
      const response = await menuService.updateIngredient(data);
      return response.data;
    },
    async [stripNamespace(MenuActions.RemoveIngredient)](
      {}: Context,
      data: Ingredient,
    ): Promise<boolean> {
      const response = await menuService.removeIngredient(data);
      return response.data;
    },
    async [stripNamespace(MenuActions.GetMeals)]({ commit }: Context) {
      const response = await menuService.getMeals();
      commit(stripNamespace(MenuMutations.SetMeals), response.data);
      return response.data;
    },
    async [stripNamespace(MenuActions.CreateMeal)](
      { dispatch }: Context,
      data: Meal,
    ): Promise<Meal> {
      const response = await menuService.createMeal(data);
      // re-fetch meals
      dispatch(stripNamespace(MenuActions.GetMeals));
      return response.data;
    },
    async [stripNamespace(MenuActions.UpdateMeal)](
      {}: Context,
      data: Meal,
    ): Promise<Meal> {
      const response = await menuService.updateMeal(data);
      return response.data;
    },
    async [stripNamespace(MenuActions.RemoveMeal)](
      {}: Context,
      data: Meal,
    ): Promise<boolean> {
      const response = await menuService.removeMeal(data);
      return response.data;
    },
    async [stripNamespace(MenuActions.CreateMenu)](
      {}: Context,
      data: Menu,
    ): Promise<Menu> {
      const response = await menuService.createMenu(data);
      return response.data;
    },
    async [stripNamespace(MenuActions.UpdateMenu)](
      {}: Context,
      data: Menu,
    ): Promise<Menu> {
      const response = await menuService.updateMenu(data);
      return response.data;
    },
    async [stripNamespace(MenuActions.RemoveMenu)](
      {}: Context,
      data: Menu,
    ): Promise<boolean> {
      const response = await menuService.removeMenu(data);
      return response.data;
    },
  },
};
