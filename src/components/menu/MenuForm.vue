<script setup lang="ts">
import { computed, markRaw } from 'vue';
import { useStore } from 'vuex';
import {
  IngredientRef,
  Meal,
  MealRef,
  Menu,
  getMeal,
} from '@/models/menu.model';
import { ModalMutations } from '../common/modal/modal.store';
import MealRefForm from './MealRefForm.vue';
import IngredientRefForm from './IngredientRefForm.vue';

const store = useStore();

const editMenu = computed<Menu>(() => store.state.us.editMenu);
const meals = computed<Meal[]>(() => store.state.us.meals);
const ingredients = computed<Meal[]>(() => store.state.us.ingredients);

const editDay = (meal: MealRef) => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(MealRefForm),
    data: meal,
  });
};

const editIngredient = (index: number, ref: IngredientRef) => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(IngredientRefForm),
    data: { index, ref },
  });
};

const getMealName = (ref: MealRef): string => {
  let meal = '';

  for (let index = 0; index < meals.value.length; index++) {
    const m = meals.value[index];

    if (m.id === ref.meal_id) {
      meal = m.name_nl;
    }
  }

  if (ref.combination_ids) {
    const other = ref.combination_ids
      .map((v) => meals.value.find((i) => i.id === v)?.name_nl)
      .join(', ');
    meal = meal ? `${meal}, ${other}` : other;
  }

  if (ref.is_left_overs) {
    meal = `Left overs ${meal.toLowerCase()}`;
  }

  return ref.notes ? `${meal} ${ref.notes}` : meal;
};

const getIngredientName = (ref: IngredientRef): string => {
  let ingredient = '';

  for (let index = 0; index < ingredients.value.length; index++) {
    const m = ingredients.value[index];

    if (m.id === ref.id) {
      ingredient = m.name_nl;
    }
  }

  if (ref.unit && ref.amount) {
    ingredient = `${ref.amount} ${ref.unit} ${ingredient.toLowerCase()}`;
  } else if (ref.amount) {
    ingredient = `${ref.amount} ${ingredient.toLowerCase()}`;
  }

  return ref.notes ? `${ref.notes} ${ingredient}` : ingredient;
};

const updateMenu = async () => {};
</script>
<template>
  <div class="box" v-if="editMenu">
    <h2>Menu week {{ editMenu.week }} - {{ editMenu.year }}</h2>
    <button class="box-option secondary" @click.prevent="updateMenu()">
      Save
    </button>
    <ul class="week-menu">
      <li>
        <span>Saturday: </span
        ><a href="#" @click.prevent="editDay(editMenu.saturday)">{{
          getMealName(editMenu.saturday)
        }}</a>
      </li>
      <li>
        <span>Sunday: </span
        ><a href="#" @click.prevent="editDay(editMenu.sunday)">{{
          getMealName(editMenu.sunday)
        }}</a>
      </li>
      <li>
        <span>Monday: </span
        ><a href="#" @click.prevent="editDay(editMenu.monday)">{{
          getMealName(editMenu.monday)
        }}</a>
      </li>
      <li>
        <span>Tuesday: </span
        ><a href="#" @click.prevent="editDay(editMenu.tuesday)">{{
          getMealName(editMenu.tuesday)
        }}</a>
      </li>
      <li>
        <span>Wednesday: </span
        ><a href="#" @click.prevent="editDay(editMenu.wednesday)">{{
          getMealName(editMenu.wednesday)
        }}</a>
      </li>
      <li>
        <span>Thursday: </span
        ><a href="#" @click.prevent="editDay(editMenu.thursday)">{{
          getMealName(editMenu.thursday)
        }}</a>
      </li>
      <li>
        <span>Friday: </span
        ><a href="#" @click.prevent="editDay(editMenu.friday)">{{
          getMealName(editMenu.friday)
        }}</a>
      </li>
    </ul>
    <h3>Shopping</h3>
    <ul class="shopping-list">
      <li v-for="(ref, index) in editMenu.shopping_list">
        <a href="#" @click.prevent="editIngredient(index, ref)">{{
          getIngredientName(ref)
        }}</a>
      </li>
    </ul>
  </div>
</template>
