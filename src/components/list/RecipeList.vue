<template>
  <section class="box">
    <h2>{{ categoryName() || 'Recepten'}}<span v-if="searchValue"><i> met {{ searchValue }}</i></span></h2>

    <p v-if="loading">De recepten worden geladen...</p>
    <ol>
      <li v-for="recipe in filteredRecipes" :key="recipe.id">
        <router-link :to="`/recipe/${recipe.slug}`" v-text="recipe.name"></router-link>
      </li>
    </ol>
  </section>
</template>
<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'RecipeList',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(['searchValue']),
    ...mapGetters(['categoryName']),
    ...mapGetters(['filteredRecipes']),
  },
  async created() {
    await this.$store.dispatch('getRecipes');
    this.loading = false;
  },
};
</script>
