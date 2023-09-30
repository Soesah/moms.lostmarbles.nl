import { Module } from 'vuex';
import { MomsState } from '@/models/store.model';
import { ParsedMenuDay } from '@/models/menu.model';

export interface MenuStore {
  parsedDay: ParsedMenuDay | null;
}

export enum MenuMutations {
  EditMenu = 'us/EditMenu',
}

export const stripNamespace = (action: MenuMutations): string =>
  action.replace(/us\//g, '');

export const menuStore: Module<MenuStore, MomsState> = {
  namespaced: true,
  state: {
    parsedDay: null,
  },
  mutations: {
    [stripNamespace(MenuMutations.EditMenu)](state, day: ParsedMenuDay) {
      state.parsedDay = day;
    },
  },
};
