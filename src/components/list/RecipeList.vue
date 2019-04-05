<template>
  <section class="box">
    <h2>{{ categoryName || 'Recepten'}}</h2>
    <ol>
      <li v-for="recipe in filteredRecipes" :key="recipe.id">
        <router-link :to="`/recipe/${recipe.slug}`" v-text="recipe.name"></router-link>
      </li>
    </ol>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RecipeList',
  computed: {
    ...mapGetters(['categoryName']),
    ...mapGetters(['filteredRecipes']),
  },
  created() {
    this.$store.dispatch('getRecipes');
  },
};
</script>
