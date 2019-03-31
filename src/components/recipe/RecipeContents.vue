<template>
  <section class="box recipe">
    <h2 v-text="recipe.name"></h2>
    <recipe-summary :recipe="recipe"></recipe-summary>
    <p class="summary-text">
      <span>
        Een
        <span class="category">{{ category }}</span>
      </span>
      <span>&nbsp;van {{ cook }}</span>
      voor {{ recipe.servings }} personen. Toegevoegd op
      <span
        class="date"
      >{{ recipe.creation_date | longDate }}</span>
      . De bereidingstijd bedraagt {{ recipe.preparation_time}}.
    </p>
    <recipe-ingredients :recipe="recipe"></recipe-ingredients>
  </section>
</template>
<script>
import RecipeSummary from '@/components/recipe/RecipeSummary.vue';
import RecipeIngredients from '@/components/recipe/RecipeIngredients.vue';

export default {
  name: 'RecipeContents',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    category() {
      const cat = this.$store.state.categories.find(
        (cat) => cat.id === this.recipe.category_id,
      );
      if (cat) {
        return cat.name_singular;
      }
      return '';
    },
    cook() {
      return this.recipe.cook;
    },
  },
  components: {
    RecipeSummary,
    RecipeIngredients,
  },
};
</script>
