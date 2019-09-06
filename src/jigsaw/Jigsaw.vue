<template>
  <div class="editor" v-if="ready">
    <jigsaw-toolbar></jigsaw-toolbar>
    <editable-content></editable-content>
    <jigsaw-context-menu></jigsaw-context-menu>
    <jigsaw-node-toolbar></jigsaw-node-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { JigsawEditor } from '@/jigsaw/jigsaw-editor.ts';
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
  ready: boolean;
}

export default Vue.extend({
  name: 'Jigsaw',
  props,
  data(): JigsawState {
    return {
      ready: false,
    };
  },
  created() {
    const editor = new JigsawEditor(
      this.xml,
      this.stylesheet,
      this.schema,
      this.config,
    );

    // set the editor in the store
    this.$store.commit('jigsaw/setEditor', editor);

    editor.on('initialized', () => {
      this.ready = true;
    });

    editor.on('changedSelection', (selection) => {
      this.$store.commit('jigsaw/setSelection', selection);
    });
    editor.on('changedFocus', (evt) => {
      this.$store.commit('jigsaw/setContext', evt.data);
    });
  },
  components: {
    JigsawToolbar,
    JigsawNodeToolbar,
    EditableContent,
    JigsawContextMenu,
  },
});
</script>
