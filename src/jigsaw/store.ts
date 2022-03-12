import { ComplexNode } from './document/elements/complex-node';
import { DOMSelection } from './selection/selection';
import { JigsawEditor } from './jigsaw';
import { InjectionKey } from 'vue';
import { Store } from 'vuex';

export interface JigsawState {
  editor: JigsawEditor | null;
  selection: DOMSelection | null;
  context: ComplexNode | null;
}

const jigsawState: JigsawState = {
  editor: null,
  selection: null,
  context: null,
};

export enum Mutations {
  SetEditor = 'SetEditor',
  SetSelection = 'SetSelection',
  SetContext = 'SetContext',
}

export const key: InjectionKey<Store<JigsawState>> = Symbol();

export const jigsawStore = {
  namespaced: true,
  state: jigsawState,
  mutations: {
    [Mutations.SetEditor](state: JigsawState, editor: JigsawEditor) {
      state.editor = editor;
    },
    [Mutations.SetSelection](state: JigsawState, selection: DOMSelection) {
      state.selection = selection;
    },
    [Mutations.SetContext](state: JigsawState, context: ComplexNode) {
      state.context = context;
    },
  },
  actions: {},
};
