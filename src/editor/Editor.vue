<template>
  <div class="editor">
    <editor-toolbar></editor-toolbar>
    <editable-content v-if="xmlDocument" :xml="xmlDocument" :xhtml="xhtml" :schema="schema"></editable-content>
    <editor-context-menu></editor-context-menu>
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
  xsd: {
    type: String,
    required: true,
  },
};

interface EditorState {
  xmlDocument: Document | null;
  xhtml: Document | null;
  schema: SchemaDocument | null;
}

export default Vue.extend({
  name: 'Editor',
  props,
  data(): EditorState {
    return {
      xmlDocument: null,
      xhtml: null,
      schema: null,
    };
  },
  created() {
    const editor = new Editor('api/editor/xml/recipe.xml');

    setTimeout(() => {
      this.xmlDocument = editor.xml;
      this.xhtml = editor.xhtml;
      this.schema = editor.schema;
    }, 100);
  },
  components: {
    EditorToolbar,
    EditableContent,
    EditorContextMenu,
  },
});
</script>
