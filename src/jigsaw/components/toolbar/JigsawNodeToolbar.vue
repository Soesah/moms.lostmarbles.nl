<script lang="ts" setup>
import { computed } from 'vue';
import { mapState, useStore } from 'vuex';
import { JigsawEditor } from '../../jigsaw';
import JigsawToolbarItem from './JigsawToolbarItem.vue';

const store = useStore();
const editor = computed<JigsawEditor>(() => store.state.editor);
const context = computed(() => store.state.context);

const path = computed(() => {
  if (context.value) {
    return context.value.getPath().map((n: any) => n.name);
  }
  // return editor.value.getPath().map((n) => n.name);
});

const getPrettyName = (node: string) => {
  return editor.value.nodeConfig.getNodePrettyName(node);
};
// const activate = (f) => {
//   // console.log(f);
// };
</script>
<template>
  <nav class="node-toolbar">
    <JigsawToolbarItem v-for="item in path" :key="item">
      <span v-text="getPrettyName(item)"></span>
    </JigsawToolbarItem>
  </nav>
</template>
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
