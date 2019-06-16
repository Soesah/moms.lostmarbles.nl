<template>
  <nav class="node-toolbar">
    <jigsaw-toolbar-item v-for="item in path" :key="item">
      <span v-text="getPrettyName(item)"></span>
    </jigsaw-toolbar-item>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import JigsawToolbarItem from './JigsawToolbarItem.vue';
import { ComplexNode } from '../document/complex-node';
import { mapState } from 'vuex';
import { JigsawState } from '../store';

export default Vue.extend({
  name: 'JigsawNodeToolbar',
  computed: {
    ...mapState('jigsaw', {
      editor: (state: JigsawState) => state.editor,
      context: (state: JigsawState) => state.context,
    }),
    path(): string[] {
      if ((this as any).context) {
        return (this as any).context.getPath().map((n: ComplexNode) => n.name);
      }
      return [];
    }
  },
  methods: {
    getPrettyName(node: string): string {
      return (this as any).editor.nodeConfig.getNodePrettyName(node);
    },
    activate(f: string) {
      // console.log(f);
    },
  },
  components: {
    JigsawToolbarItem,
  },
});
</script>
<style scoped lang="less">
.node-toolbar {
  box-sizing: border-box;
  display: flex;
  background-color: rgb(121, 156, 187);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  &:before {
    position: absolute;
    top: 0;
    left: -20px;
    width: calc(100% + 40px);
    content: '';
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: -1;
  }
}

.toolbar-group {
  display: flex;
  margin: 3px 2px 2px;
  padding-right: 2px;
  border: solid 1px rgb(87, 123, 156);
  border-top-color: rgb(142, 177, 204);
  border-left-color: rgb(142, 177, 204);
  border-radius: 2px;
}
</style>
