import { ComplexNode } from './document/elements/complex-node';
import { DOMSelection } from './selection/selection';
import { JigsawEditor } from './jigsaw';

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

export const jigsawStore = {
  namespaced: true,
  state: jigsawState,
  mutations: {
    setEditor(state: JigsawState, editor: JigsawEditor) {
      state.editor = editor;
    },
    setSelection(state: JigsawState, selection: DOMSelection) {
      state.selection = selection;
    },
    setContext(state: JigsawState, context: ComplexNode) {
      state.context = context;
    },
  },
  actions: {},
};
