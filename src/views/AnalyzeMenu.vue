<script lang="ts" setup>
import { ref } from 'vue';
import { ParsedMenuDay } from '@/models/menu.model';
import MenuAnalysis from '@/components/menu/MenuAnalysis.vue';
import MealForm from '@/components/menu/MealForm.vue';
import MealRefForm from '@/components/menu/MealRefForm.vue';
import MenuForm from '@/components/menu/MenuForm.vue';
import IngredientForm from '@/components/menu/IngredientForm.vue';

const meal = ref<ParsedMenuDay>({ meal: '', date: '' });

const selectMeal = (m: ParsedMenuDay) => {
  meal.value = m;
  console.log(m);
};
</script>
<template>
  <main class="page-wide columns">
    <section class="column">
      <MenuAnalysis @select-meal="selectMeal"></MenuAnalysis>
    </section>
    <section class="column">
      <MealForm :parsed="meal"></MealForm>
      <MealRefForm></MealRefForm>
      <MenuForm></MenuForm>
      <IngredientForm></IngredientForm>
    </section>
  </main>
</template>
