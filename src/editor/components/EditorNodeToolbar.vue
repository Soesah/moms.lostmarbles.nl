<template>
  <nav class="node-toolbar">
    <template v-for="item in path">
      <a href="#" class="toolbar-item" :key="item" @click.prevent>
        <span v-text="item"></span>
      </a>
    </template>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { ComplexNode } from '../document/complex-node';

interface EditorNodeToolbarState {
  path: string[];
}

export default Vue.extend({
  name: 'EditorNodeToolbar',
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data(): EditorNodeToolbarState {
    return {
      path: [],
    };
  },
  created() {
    this.editor.on('changedFocus', (evt: any) => {
      this.path = this.getPathItems(evt.data);
    });
  },
  methods: {
    getPathItems(data: ComplexNode | null): string[] {
      if (data) {
        return data.getPath().map((n) => n.name);
      }
      return [];
    },
    activate(f: string) {
      // console.log(f);
    },
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

.toolbar-item {
  padding: 2px 2px 0;
  text-align: center;
  border-radius: 2px;
  margin: 3px 2px 2px;
  margin-right: 0px;
  color: white;
  background: rgb(87, 123, 156);
  font-size: 14px;
  line-height: 17px;
  text-decoration: none;
  padding: 4px 8px;
}
.toolbar-item:hover {
  opacity: 0.5;
}
</style>
