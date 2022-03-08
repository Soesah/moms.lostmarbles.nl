<script lang="ts" setup>
import RecipeStep from '@/components/recipe/RecipeStep.vue';
import { Recipe } from '@/models/recipe.model';

defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});
</script>
<template>
  <section class="preparation">
    <h3>Bereidingswijze</h3>
    <ol>
      <RecipeStep
        class="step"
        v-for="(step, index) in recipe.steps"
        :key="index"
        :step="step.contents"
      />
    </ol>
  </section>
</template>
