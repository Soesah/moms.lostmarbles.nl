<template>
  <section class="box box--tertiary">
    <h3>Notities</h3>
    <p v-if="!recipe.notes">Geen notities...</p>
    <section class="note" v-for="(note, index) in recipe.notes" :key="index">
      <div class="author" v-text="note.author"></div>
      <p v-for="p in note.paragraph" :key="p" v-text="p"></p>
    </section>
    <form
      class="noteform" :class="{ hidden: !showForm }"
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
      <button
        type="button"

        @click="showForm = true"
      >Notitie maken</button>
    </div>
    <div class="icon icon-beans"></div>
  </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'RecipesNotes',
  data: () => {
    return {
      showForm: false,
      note: {
        author: '',
        paragraph: ''
      }
    }
  },
  computed: {
    ...mapState(['recipe']),
  },
  methods: {
    async addNote() {
      if (this.note.paragraph.length === 0) {
        return;
      }
      const result = await this.$store.dispatch('addNote', {
          recipe: this.recipe,
          note: {...this.note, paragraph: this.note.paragraph.split('\n')}
        });

      if (result) {
        this.note = {
          author: '',
          paragraph: ''
        }
        this.showForm = false;
      }
    }
  }
};
</script>
