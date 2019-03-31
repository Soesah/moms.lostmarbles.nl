<template>
  <section class="summary" v-if="recipe.servings && recipe.preparation_time">
    <div class="servings" v-if="recipe.servings">
      <div class="icon icon-person"></div>
      {{ recipe.servings }} {{ persons }}
    </div>
    <div class="preparation-time" v-if="recipe.preparation_time">
      <div class="icon icon-clock"></div>
      {{ recipe.preparation_time}}
    </div>
  </section>
</template>
<script>
export default {
  name: 'RecipeSummary',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  computed: {
    persons() {
      return this.recipe.servings === 1 ? 'persoon' : 'personen';
    },
  },
};
</script>
