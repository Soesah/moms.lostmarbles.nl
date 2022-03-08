<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Recipe } from '@/models/recipe.model';
import { Actions } from '@/models/store.model';
import Icon from '@/components/common/Icon.vue';
import { longDate } from '@/components/common/filters/date.filter';

const store = useStore();
const categoryName = (id: number, plural: boolean) =>
  store.getters.categoryName(id, plural);
const recipes = ref<Recipe[]>([]);

const persons = (recipe: Recipe): string => {
  return parseInt(recipe.servings) === 1 ? 'persoon' : 'personen';
};
const servings = (recipe: Recipe): string => {
  return recipe.servings ? ` voor ${recipe.servings} ${persons(recipe)}` : '';
};

onMounted(async () => {
  await store.dispatch(Actions.GetCategories);
  recipes.value = await store.dispatch(Actions.GetNewRecipes);
});
</script>
<template>
  <section class="box">
    <h2>Nieuwe recepten</h2>
    <ol class="items">
      <li class="item" v-for="recipe in recipes" :key="recipe.id">
        <h4 v-text="recipe.name"></h4>
        <p>
          Een
          <span
            class="category"
            v-text="categoryName(recipe.category_id, false)"
          ></span>
          <span v-if="recipe.cook"> van {{ recipe.cook }}</span>
          <span v-if="recipe.servings">{{ servings(recipe) }}</span
          >. Toegevoegd op
          <span class="date">{{ longDate(recipe.creation_date) }}</span>
        </p>
      </li>
    </ol>
    <Icon name="broccoli"></Icon>
  </section>
</template>
