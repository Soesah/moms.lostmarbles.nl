<script lang="ts" setup>
import { Recipe } from '@/models/recipe.model';

defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});
</script>
<template>
  <section class="ingredients">
    <h3>Ingrediënten</h3>
    <ul>
      <li
        class="ingredient"
        v-for="(ingredient, index) in recipe.ingredients"
        :key="index"
      >
        <span
          class="amount"
          v-if="ingredient.amount"
          v-text="ingredient.amount"
        ></span>
        <span class="name" v-text="ingredient.name"></span>
        <span
          class="remark"
          v-if="ingredient.remark"
          v-text="ingredient.remark"
        ></span>
      </li>
    </ul>
  </section>
</template>
