import { ComplexNode } from './document/complex-node';
import { DOMSelection } from './document/selection';
import { Editor } from './editor';

export interface JigsawState {
  editor: Editor | null;
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
    setEditor(state: JigsawState, editor: Editor) {
      state.editor = editor;
    },
    setSelection(state: JigsawState, selection: DOMSelection) {
      state.selection = selection;
    },
    setContext(state: JigsawState, context: ComplexNode) {
      state.context = context;
    },
  },
  actions: {

  },
};
