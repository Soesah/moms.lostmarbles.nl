<template>
  <form class="box" @submit.prevent="submit" v-if="recipe">
    <h2>Edit Recipe</h2>
    <recipe-field label="Name" v-model="updated.name"></recipe-field>
    <recipe-field label="Kok" v-model="updated.cook"></recipe-field>
    <recipe-field label="Bereidingstijd" v-model="updated.preparation_time"></recipe-field>
    <recipe-field label="Aantal porties" v-model.number="updated.servings" type="number"></recipe-field>
    <recipe-form-ingredients label="Ingrediënten" v-model="updated.ingredients"></recipe-form-ingredients>
    <recipe-form-steps label="Voorbereiding" v-model="updated.steps"></recipe-form-steps>
    <div class="form-option">
      <button type="submit">Opslaan</button>
      <button type="button" @click="cancel">Stoppen</button>
    </div>
  </form>
</template>

<script>
import RecipeField from './RecipeField';
import RecipeFormIngredients from './RecipeFormIngredients';
import RecipeFormSteps from './RecipeFormSteps';

export default {
  name: 'RecipForm',
  props: {
    recipe: {
      type: Object,
    },
  },
  data() {
    return {
      updated: null,
    };
  },
  created() {
    this.updated = this.recipe;
  },
  methods: {
    submit(evt) {
      this.$emit('updateRecipe', this.updated);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
  components: {
    RecipeField,
    RecipeFormIngredients,
    RecipeFormSteps,
  },
};
</script>
