<template>
  <div class="editor">
    <editor-toolbar></editor-toolbar>
    <section class="box">
      <editable-content v-if="doc" :xml="doc" :schema="schema"></editable-content>
    </section>
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
  doc: Document | null;
  schema: SchemaDocument | null;
}

export default Vue.extend({
  name: 'Editor',
  props,
  data(): EditorState {
    return {
      doc: null,
      schema: null,
    };
  },
  created() {
    const editor = new Editor(
      'api/editor/xml/recipe.xml',
    );

    setTimeout(() => {
      this.doc = editor.xhtml;
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
