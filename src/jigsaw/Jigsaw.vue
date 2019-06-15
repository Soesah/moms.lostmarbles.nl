<template>
  <div class="editor" v-if="ready">
    <jigsaw-toolbar :editor="editor"></jigsaw-toolbar>
    <editable-content :editor="editor"></editable-content>
    <jigsaw-context-menu :editor="editor"></jigsaw-context-menu>
    <jigsaw-node-toolbar :editor="editor"></jigsaw-node-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Editor } from '@/jigsaw/editor.ts';
import JigsawToolbar from '@/jigsaw/components/JigsawToolbar.vue';
import JigsawNodeToolbar from '@/jigsaw/components/JigsawNodeToolbar.vue';
import EditableContent from '@/jigsaw/components/EditableContent.vue';
import JigsawContextMenu from '@/jigsaw/components/JigsawContextMenu.vue';
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
    JigsawToolbar,
    JigsawNodeToolbar,
    EditableContent,
    JigsawContextMenu,
  },
});
</script>
