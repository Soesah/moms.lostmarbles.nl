import { ActionContext, Module } from 'vuex';
import { MomsState } from '@/models/store.model';
import { ParsedMenuDay, ParsedIngredient } from '@/models/menu.model';
import { Ingredient, Meal, Menu } from '@/models/menu.model';
import { MenuService } from '@/services/menu.service';

export interface MenuStore {
  ingredients: Ingredient[];
  parsedDay: ParsedMenuDay | null;
  parsedIngredient: ParsedIngredient | null;
}

export enum MenuMutations {
  SetIngredients = 'us/SetIngredients',
  EditMenu = 'us/EditMenu',
  EditIngredient = 'us/EditIngredient',
}

export enum MenuActions {
  AnalyzeMenu = 'us/AnalyzeMenu',
  GetIngredients = 'us/GetIngredients',
  CreateIngredient = 'us/CreateIngredient',
  UpdateIngredient = 'us/UpdateIngredient',
  RemoveIngredient = 'us/RemoveIngredient',
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
    parsedDay: null,
    parsedIngredient: null,
  },
  mutations: {
    [stripNamespace(MenuMutations.SetIngredients)](
      state,
      ingredients: Ingredient[],
    ) {
      state.ingredients = ingredients;
    },
    [stripNamespace(MenuMutations.EditMenu)](state, meal: ParsedMenuDay) {
      state.parsedDay = meal;
    },
    [stripNamespace(MenuMutations.EditIngredient)](
      state,
      ingredient: ParsedIngredient,
    ) {
      state.parsedIngredient = ingredient;
    },
  },
  actions: {
    async [stripNamespace(MenuActions.AnalyzeMenu)]({}: Context) {
      const response = await menuService.analyze();
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
    async [stripNamespace(MenuActions.CreateMeal)](
      {}: Context,
      data: Meal,
    ): Promise<Meal> {
      const response = await menuService.createMeal(data);
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
