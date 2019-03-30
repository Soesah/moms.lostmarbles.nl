<template>
  <section class="box recipe">
    <h2 v-text="recipe.name"></h2>
    <div class="servings">
      <div class="icon icon-person"></div>
      {{ recipe.servings }}
    </div>
    <div class="preparation-time">
      <div class="icon icon-clock"></div>
      {{ recipe.preparation_time}}
    </div>
    <p class="summary-text">
      <span>
        Een
        <span class="category">{{ category }}</span>
      </span>
      <span>van {{ recipe.cook }}</span>
      voor {{ recipe.servings }} personen. Toegevoegd op
      <span
        class="date"
      >{{ recipe.creation_date }}</span>
      . De bereidingstijd bedraagt {{ recipe.preparation_time}}.
    </p>
  </section>
</template>
<script>
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
        (cat) => cat.category_id === this.recipe.category_id,
      );
      console.log(cat);
      if (cat) {
        return cat.name_singular;
      }
      return '';
    },
  },
};
</script>
