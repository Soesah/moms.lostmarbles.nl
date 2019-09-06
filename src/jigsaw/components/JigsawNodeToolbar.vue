<template>
  <nav class="node-toolbar">
    <jigsaw-toolbar-item v-for="item in path" :key="item">
      <span v-text="getPrettyName(item)"></span>
    </jigsaw-toolbar-item>
  </nav>
</template>
<script>
import Vue from 'vue';
import JigsawToolbarItem from './JigsawToolbarItem.vue';
import { ComplexNode } from '../document/complex-node';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'JigsawNodeToolbar',
  computed: {
    ...mapState('jigsaw', {
      editor: (state) => state.editor,
      context: (state) => state.context,
    }),
    path() {
      if (this.context) {
        return this.context.getPath().map((n) => n.name);
      }
      return this.editor.getPath().map((n) => n.name);
    },
  },
  methods: {
    getPrettyName(node) {
      return this.editor.nodeConfig.getNodePrettyName(node);
    },
    activate(f) {
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
  height: 34px;
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
