<template>
  <section class="preparation">
    <h3>Bereidingswijze</h3>
    <ol>
      <recipe-step
        class="step"
        v-for="(step, index) in recipe.steps"
        :key="index"
        :step="step.contents"
      ></recipe-step>
    </ol>
  </section>
</template>
<script>
import RecipeStep from '@/components/recipe/RecipeStep.vue';

export default {
  name: 'RecipeSteps',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  components: {
    RecipeStep,
  },
};
</script>
