<template>
  <div v-if="val">
    <h3 v-text="label"></h3>
    <div class="labels">
      <div>Hoeveelheid</div>
      <div>Naam</div>
      <div>Opmerking</div>
    </div>
    <template v-for="(ingredient, index) in val">
      <recipe-ingredient-fields v-model="val[index]" :key="index"></recipe-ingredient-fields>
    </template>
    <div class="form-option">
      <button type="button" @click="addIngredient">Ingredient toevoegen</button>
    </div>
  </div>
</template>

<script>
import RecipeIngredientFields from './RecipeIngredientFields';

export default {
  name: 'RecipeFormIngredients',
  data() {
    return {
      val: [],
    };
  },
  created() {
    this.val = this.$attrs.value;
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    update() {
      this.$emit('input', this.val);
    },
    addIngredient() {
      this.val = [
        ...this.val,
        {
          name: '',
        },
      ];
      this.update();
    },
  },
  components: {
    RecipeIngredientFields,
  },
};
</script>
