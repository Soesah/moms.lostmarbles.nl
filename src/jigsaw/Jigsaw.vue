<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Mutations } from './store';
import { JigsawEditor } from './jigsaw';
import JigsawToolbar from '@/jigsaw/components/toolbar/JigsawToolbar.vue';
import EditableContent from '@/jigsaw/components/EditableContent.vue';
import JigsawContextMenu from '@/jigsaw/components/menu/JigsawContextMenu.vue';
import JigsawNodeToolbar from '@/jigsaw/components/toolbar/JigsawNodeToolbar.vue';
import { EditorEvent } from './core/event-emitter';

const { xml, stylesheet, schema, config } = defineProps({
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
});

const ready = ref<boolean>(true);

const editor = new JigsawEditor(
  xml as string,
  stylesheet as string,
  schema as string,
  config as string,
);

editor.on('initialized', () => {
  ready.value = true;
});

const store = useStore();

store.commit(`jigsaw/${[Mutations.SetEditor]}`, editor);

editor.on('changedSelection', (selection: EditorEvent) => {
  store.commit(`jigsaw/${[Mutations.SetSelection]}`, selection);
});
editor.on('changedFocus', (evt: EditorEvent) => {
  store.commit(`jigsaw/${[Mutations.SetContext]}`, evt.data);
});
</script>
<template>
  <div class="editor" v-if="ready">
    <JigsawToolbar></JigsawToolbar>
    <EditableContent></EditableContent>
    <JigsawContextMenu></JigsawContextMenu>
    <JigsawNodeToolbar></JigsawNodeToolbar>
  </div>
</template>
