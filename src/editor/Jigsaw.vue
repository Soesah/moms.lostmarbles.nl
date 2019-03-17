<template>
  <div class="editor" v-if="ready">
    <editor-toolbar :editor="editor"></editor-toolbar>
    <editable-content :editor="editor"></editable-content>
    <editor-context-menu :editor="editor"></editor-context-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Editor } from '@/editor/editor.ts';
import EditorToolbar from '@/editor/components/EditorToolbar.vue';
import EditableContent from '@/editor/components/EditableContent.vue';
import EditorContextMenu from '@/editor/components/EditorContextMenu.vue';
import { SchemaDocument } from '@/editor/schema/document.definition';

const props = {
  xml: {
    type: String,
    required: true,
  },
  stylesheet: {
    type: String,
    required: true,
  },
  schema: {
    type: String,
    required: true,
  },
};

interface EditorState {
  editor: Editor | null;
  ready: boolean;
}

export default Vue.extend({
  name: 'Jigsaw',
  props,
  data(): EditorState {
    return {
      editor: null,
      ready: false,
    };
  },
  created() {
    this.editor = new Editor(this.xml, this.stylesheet, this.schema);

    this.editor.on('initialized', (evt) => {
      this.ready = true;
    });
  },
  components: {
    EditorToolbar,
    EditableContent,
    EditorContextMenu,
  },
});
</script>
