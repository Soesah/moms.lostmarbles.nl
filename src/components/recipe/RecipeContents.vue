<template>
  <section class="box recipe">
    <h2 v-text="recipe.name"></h2>
    <recipe-summary :recipe="recipe"></recipe-summary>
    <img class="image" v-if="image" :src="image" align="right" />
    <p class="summary-text">
      <span>
        Een
        <span class="category">{{ category }}</span>
      </span>
      <span v-if="cook" v-text="` van ${cook}`"></span>
      <span v-if="recipe.servings !== '0'" v-text="` voor ${ recipe.servings } ${ persons }`"></span>. Toegevoegd op
      <span class="date">{{ recipe.creation_date | longDate }}.</span>
      <span
        v-if="recipe.preparation_time"
        v-text="` De bereidingstijd bedraagt ${ recipe.preparation_time}.`"
      ></span>
    </p>
    <recipe-ingredients :recipe="recipe"></recipe-ingredients>
    <recipe-steps :recipe="recipe"></recipe-steps>
  </section>
</template>
<script>
import RecipeSummary from '@/components/recipe/RecipeSummary.vue';
import RecipeIngredients from '@/components/recipe/RecipeIngredients.vue';
import RecipeSteps from '@/components/recipe/RecipeSteps.vue';
import { mapState } from 'vuex';

export default {
  name: 'RecipeContents',
  computed: {
    category() {
      const category = this.$store.state.categories.find(
        (cat) => cat.id === this.recipe.category_id,
      );
      if (category) {
        return category.name_singular.toLowerCase();
      }
      return '';
    },
    cook() {
      return this.recipe.cook;
    },
    image() {
      return this.recipe.image ? `/img/recipe_large/${this.recipe.image}` : '';
    },
    persons() {
      return parseInt(this.recipe.servings, 10) === 1 ? 'persoon' : 'personen';
    },
    ...mapState(['recipe']),
  },
  components: {
    RecipeSummary,
    RecipeIngredients,
    RecipeSteps,
  },
};
</script>
