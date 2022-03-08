<script lang="ts" setup>
import { Recipe } from '@/models/recipe.model';
import RecipeInfo from '@/components/recipe/RecipeInfo.vue';
import RecipeSummary from '@/components/recipe/RecipeSummary.vue';
import RecipeSteps from '@/components/recipe/RecipeSteps.vue';

const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});
</script>
<template>
  <section class="box recipe">
    <h2 v-text="recipe.name"></h2>
    <RecipeInfo :recipe="recipe"></RecipeInfo>
    <RecipeSummary :recipe="recipe"></RecipeSummary>
    <RecipeSteps :recipe="recipe"></RecipeSteps>
  </section>
</template>
