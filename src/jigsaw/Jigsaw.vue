<template>
  <div class="editor" v-if="ready">
    <editor-toolbar :editor="editor"></editor-toolbar>
    <editable-content :editor="editor"></editable-content>
    <editor-context-menu :editor="editor"></editor-context-menu>
    <editor-node-toolbar :editor="editor"></editor-node-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Editor } from '@/jigsaw/editor.ts';
import EditorToolbar from '@/jigsaw/components/EditorToolbar.vue';
import EditorNodeToolbar from '@/jigsaw/components/EditorNodeToolbar.vue';
import EditableContent from '@/jigsaw/components/EditableContent.vue';
import EditorContextMenu from '@/jigsaw/components/EditorContextMenu.vue';
import { SchemaDocument } from '@/jigsaw/schema/document.definition';

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
  config: {
    type: String,
    required: true,
  },
};

interface JigsawState {
  editor: Editor | null;
  ready: boolean;
}

export default Vue.extend({
  name: 'Jigsaw',
  props,
  data(): JigsawState {
    return {
      editor: null,
      ready: false,
    };
  },
  created() {
    this.editor = new Editor(this.xml, this.stylesheet, this.schema, this.config);

    this.editor.on('initialized', () => {
      this.ready = true;
    });

    this.editor.on('changedFocus', (node) => {
      this.$store.commit('jigsaw/changeNode', node)
    })
  },
  components: {
    EditorToolbar,
    EditorNodeToolbar,
    EditableContent,
    EditorContextMenu,
  },
});
</script>
