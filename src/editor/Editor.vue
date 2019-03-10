<template>
  <div class="editor">
    <editor-toolbar></editor-toolbar>
    <div class="editable"></div>
    <editor-context-menu></editor-context-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Editor } from '@/editor/editor.ts';
import EditorToolbar from '@/editor/components/EditorToolbar.vue';
import EditorContextMenu from '@/editor/components/EditorContextMenu.vue';

const props = {
  xml: {
    type: String,
    required: true,
  },
  xsd: {
    type: String,
    required: true,
  },
};

export default Vue.extend({
  name: 'Editor',
  props,
  created() {
    const editor = new Editor(
      'api/editor/xml/recipe.xml',
      'api/editor/xsd/recipe.xsd',
    );
  },
  components: {
    EditorToolbar,
    EditorContextMenu,
  },
});
</script>

<style scoped>
.editable {
  box-sizing: border-box;
  border: dashed 1px black;
  width: 100%;
  height: 200px;
  padding: 8px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
