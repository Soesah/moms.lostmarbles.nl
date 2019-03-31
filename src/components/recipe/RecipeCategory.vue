<template>
  <section class="box box--secondary">
    <h2 v-text="title"></h2>
    <ul>
      <li v-for="rec in categoryRecipes" :key="rec.id">
        <i v-if="rec.id === recipe.id" v-text="rec.name"></i>
        <router-link v-else :to="`/recipe/${rec.slug}`" v-text="rec.name"></router-link>
      </li>
    </ul>
    <div class="icon icon-milk"></div>
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'RecipeCategory',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['recipes', 'categories']),
    title() {
      return this.categories.find((c) => c.id === this.recipe.category_id)
        .name_plural;
    },
    categoryRecipes() {
      return this.recipes.filter(
        (r) => r.category_id === this.recipe.category_id,
      );
    },
  },
};
</script>
