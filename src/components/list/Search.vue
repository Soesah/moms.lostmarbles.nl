<template>
  <section class="box box--tertiary">
    <form @submit.prevent="update">
      <h2>Zoeken</h2>
      <p>U kunt zoeken naar een recept. Type hieronder een waarde.</p>
      <div class="form-item">
        <label for="focus">Zoekwaarde</label>
        <input
          type="text"
          name="search"
          v-model="searchValue"
          @input="update"
          placeholder="(zoekwaarde)"
        >
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
    update() {
      this.$store.commit('setSearch', this.searchValue);
    },
  },
};
</script>
