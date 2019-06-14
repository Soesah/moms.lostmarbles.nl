import { ComplexNode } from './document/complex-node';

interface JigsawState {
  node: ComplexNode | null;
}


const jigsawState: JigsawState = {
  node: null,
};

export const jigsawStore = {
  namespaced: true,
  state: jigsawState,
  mutations: {
    changeNode(state: JigsawState, node: ComplexNode) {
      state.node = node;
    },
  },
  actions: {

  },
};
