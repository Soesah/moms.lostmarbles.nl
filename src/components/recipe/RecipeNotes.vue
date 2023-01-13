<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { Recipe } from '@/models/recipe.model';
import { Actions } from '@/models/store.model';

const store = useStore();
const recipe = computed<Recipe>(() => store.state.recipe);

const showForm = ref<boolean>(false);
const note = ref({
  author: '',
  paragraph: '',
});

const addNote = async () => {
  if (note.value.paragraph.length === 0) {
    return;
  }
  const result = await store.dispatch(Actions.AddNote, {
    recipe: recipe.value,
    note: { ...note.value, paragraph: note.value.paragraph.split('\n') },
  });

  if (result) {
    note.value = {
      author: '',
      paragraph: '',
    };
    showForm.value = false;
  }
};
</script>
<template>
  <section class="box box--tertiary">
    <h3>Notities voor {{ recipe.name }}</h3>
    <p v-if="!recipe.notes">Geen notities...</p>
    <section class="note" v-for="(note, index) in recipe.notes" :key="index">
      <div class="author" v-text="note.author"></div>
      <p v-for="p in note.paragraph" :key="p" v-text="p"></p>
    </section>
    <form
      class="noteform"
      :class="{ hidden: !showForm }"
      id="noteform"
      method="post"
      @submit.prevent="addNote"
    >
      <p class="description">Voeg een notitie toe.</p>
      <div class="form-item">
        <label for="notetext">
          <span class="white">Notitie</span>
        </label>
        <textarea
          rows="5"
          id="notetext"
          name="note"
          v-model="note.paragraph"
        ></textarea>
      </div>
      <div class="form-buttons">
        <button type="submit">Toevoegen</button>
      </div>
    </form>
    <div id="addnote" class="form-buttons note last-note" v-show="!showForm">
      <button type="button" @click="showForm = true">Notitie maken</button>
    </div>
    <div class="icon icon-beans"></div>
  </section>
</template>
