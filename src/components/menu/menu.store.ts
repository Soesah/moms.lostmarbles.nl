import { Module } from 'vuex';
import { MomsState } from '@/models/store.model';
import { ParsedMenuDay, ParsedIngredient } from '@/models/menu.model';

export interface MenuStore {
  parsedDay: ParsedMenuDay | null;
  parsedIngredient: ParsedIngredient | null;
}

export enum MenuMutations {
  EditMenu = 'us/EditMenu',
  EditIngredient = 'us/EditIngredient',
}

export const stripNamespace = (action: MenuMutations): string =>
  action.replace(/us\//g, '');

export const menuStore: Module<MenuStore, MomsState> = {
  namespaced: true,
  state: {
    parsedDay: null,
    parsedIngredient: null,
  },
  mutations: {
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
};
