<script lang="ts" setup>
import { computed } from 'vue';
import { Recipe } from '@/models/recipe.model';

const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});
const persons = computed(() => {
  return parseInt(recipe.servings, 10) === 1 ? 'persoon' : 'personen';
});
</script>
<template>
  <section class="summary" v-if="recipe.servings || recipe.preparation_time">
    <div class="servings" v-if="recipe.servings">
      <i class="icon icon-restaurant"></i>
      {{ recipe.servings }} {{ persons }}
    </div>
    <div class="preparation-time" v-if="recipe.preparation_time">
      <i class="icon icon-schedule"></i>
      {{ recipe.preparation_time }}
    </div>
  </section>
</template>
