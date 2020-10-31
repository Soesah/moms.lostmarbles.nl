<template>
  <form class="box" @submit.prevent="submit" v-if="recipe">
    <h2>Recept bewerken</h2>
    <recipe-select
      label="Categorie"
      v-model="updated.category_id"
      :options="categories"
    ></recipe-select>
    <recipe-field label="Titel" v-model="updated.name"></recipe-field>
    <recipe-field label="Kok" v-model="updated.cook"></recipe-field>
    <recipe-field
      label="Bereidingstijd"
      v-model="updated.preparation_time"
    ></recipe-field>
    <recipe-field
      label="Aantal porties"
      v-model="updated.servings"
      type="number"
    ></recipe-field>
    <recipe-form-ingredients
      label="Ingrediënten"
      v-model="updated.ingredients"
    ></recipe-form-ingredients>
    <recipe-form-steps
      label="Voorbereiding"
      v-model="updated.steps"
    ></recipe-form-steps>
    <div class="form-option">
      <button type="submit">Opslaan</button>
      <button v-if="isAdmin" type="button" @click="remove">Remove</button>
      <button type="button" @click="cancel">Stoppen</button>
    </div>
  </form>
</template>

<script>
import RecipeField from './RecipeField';
import RecipeSelect from './RecipeSelect';
import RecipeFormIngredients from './RecipeFormIngredients';
import RecipeFormSteps from './RecipeFormSteps';
import { mapState, mapGetters } from 'vuex';

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
  computed: {
    ...mapState(['categories', 'auth']),
    ...mapGetters(['isAdmin'])
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
    async remove() {
      if(window.confirm('Are you sure you want to remove this recipe')) {
        const ok = await this.$store.dispatch('removeRecipe', this.recipe.id);
        if (ok) {
          this.$route.push('/list')
        }
      }

    }
  },
  components: {
    RecipeField,
    RecipeSelect,
    RecipeFormIngredients,
    RecipeFormSteps,
  },
};
</script>
