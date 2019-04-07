<template>
  <section class="box box--tertiary">
    <form @submit.prevent="update">
      <h2>Zoeken</h2>
      <p>Zoek hier op de naam, een ingrediënt of iets dergelijks</p>
      <div class="form-item">
        <label for="focus">Zoeken</label>
        <input
          type="text"
          name="search"
          v-model="searchValue"
          @input="update"
          placeholder="(ei, boerenkool, kip)"
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
