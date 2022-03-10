<script lang="ts" setup>
import { PropType } from 'vue';
import { Ingredient } from '@/models/recipe.model';
import { InputComposable } from './input.composable';
import RecipeIngredientFields from './RecipeIngredientFields.vue';

const { modelValue } = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<Ingredient[]>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const { val, update } = InputComposable<Ingredient[]>(modelValue, emit);

const addIngredient = () => {
  val.value = [
    ...val.value,
    {
      name: '',
    },
  ];
  update();
};
const removeIngredient = (index: number) => {
  val.value.splice(index, 1);
  update();
};
</script>
<template>
  <div v-if="val">
    <h3 v-text="label"></h3>
    <div class="labels">
      <div>Hoeveelheid</div>
      <div>Naam</div>
      <div>Opmerking</div>
    </div>
    <template v-for="(ingredient, index) in val" :key="`ingredient-${index}`">
      <RecipeIngredientFields
        v-model="val[index]"
        :index="index"
        @remove="removeIngredient"
      ></RecipeIngredientFields>
    </template>
    <div class="form-option">
      <button type="button" @click="addIngredient">Ingredient toevoegen</button>
    </div>
  </div>
</template>
