<template>
  <section class="box box--tertiary">
    <h3>Notities</h3>
    <section class="note" v-for="(note, index) in recipe.notes" :key="index">
      <div class="author" v-text="note.author"></div>
      <p v-for="p in note.paragraph" :key="p" v-text="p"></p>
    </section>
    <!--form
      action="/actions/add-note.php?id=30"
      class="noteform hide"
      id="noteform"
      method="post"
      onsubmit="return comm.sendForm(this, 'addnote')"
    >
      <p class="description">Voeg een notitie toe.</p>
      <div class="form-item">
        <label for="notetext">
          <span class="white">Carl</span>
        </label>
        <textarea
          rows="5"
          id="notetext"
          name="note"
          onfocus="if(this.value = ' ') this.value = '';"
        ></textarea>
      </div>
      <div class="form-buttons">
        <button type="submit">Toevoegen</button>
      </div>
    </form>
    <div id="addnote" class="form-buttons note last-note">
      <button
        type="button"
        onclick="setClass('noteform', 'hide');setClass('addnote', 'hide');setFocus('notetext')"
      >Notitie maken</button>
    </div>
    <div class="icon icon-beans"></div>-->
  </section>
</template>
<script>
export default {
  name: 'RecipesNotes',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
