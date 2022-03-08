<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Recipe } from '@/models/recipe.model';
import { MomsState } from '@/models/store.model';
import { longDate } from '@/components/common/filters/date.filter';

const store = useStore<MomsState>();
const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});
const image = computed(() => {
  return recipe.image ? `/img/recipe_large/${recipe.image}` : '';
});
const persons = computed(() => {
  return parseInt(recipe.servings, 10) === 1 ? 'persoon' : 'personen';
});
const categoryName = (id: number, plural: boolean) =>
  store.getters.categoryName(id, plural);
</script>
<template>
  <img class="image" v-if="image" :src="image" align="right" />
  <p class="summary-text">
    <span>
      Een
      <span class="category">{{
        categoryName(recipe.category_id, false)
      }}</span>
    </span>
    <span v-if="recipe.cook" v-text="` van ${recipe.cook}`"></span>
    <span
      v-if="recipe.servings !== '0'"
      v-text="` voor ${recipe.servings} ${persons}`"
    ></span
    >. Toegevoegd op
    <span class="date">{{ longDate(recipe.creation_date) }}.</span>
    <span
      v-if="recipe.preparation_time"
      v-text="` De bereidingstijd bedraagt ${recipe.preparation_time}.`"
    ></span>
  </p>
</template>
