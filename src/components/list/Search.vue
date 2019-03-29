<template>
  <section class="box box--tertiary">
    <form @submit.prevent="submit">
      <h2>Zoeken</h2>
      <p>U kunt zoeken naar een recept. Type hieronder een waarde.</p>
      <div class="form-item">
        <label for="focus">Zoekwaarde</label>
        <input type="text" name="search" v-model="searchValue" placeholder="(zoekwaarde)">
      </div>
      <div class="form-buttons">
        <button type="submit">Zoeken</button>
      </div>
    </form>
  </section>
</template>
<script>
export default {
  name: 'Search',
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    submit() {
      this.$store.commit('setSearch', this.searchValue);
    },
  },
};
</script>
