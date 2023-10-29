<script setup lang="ts">
import { computed, markRaw, watch } from 'vue';
import { useStore } from 'vuex';
import {
  IngredientRef,
  Meal,
  MealRef,
  Menu,
  NEW_ITEM_ID,
} from '@/models/menu.model';
import { ModalMutations } from '../common/modal/modal.store';
import MealRefForm from './MealRefForm.vue';
import IngredientRefForm from './IngredientRefForm.vue';
import { MenuActions, MenuMutations } from './menu.store';

const store = useStore();

const editMenu = computed<Menu>(() => store.state.us.editMenu);
const meals = computed<Meal[]>(() => store.state.us.meals);
const ingredients = computed<Meal[]>(() => store.state.us.ingredients);

watch(
  () => editMenu.value,
  (v) => {
    if (v.id === NEW_ITEM_ID) {
      store.dispatch(MenuActions.GetMenu, { year: v.year, week: v.week });
    }
  },
);

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

const addIngredient = () => {
  store.commit(MenuMutations.UpdateMenuShoppingList, {
    index: editMenu.value.shopping_list.length,
    ingredientRef: { id: -1 },
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
    meal = meal ? `${meal}, ${other.toLowerCase()}` : other;
  }

  if (ref.is_left_overs) {
    meal = `Left overs ${meal.toLowerCase()}`;
  }

  if (ref.is_out) {
    meal = `Eating out ${meal.toLowerCase()}`;
  }

  if (ref.is_undecided) {
    meal = `We'll see ${meal.toLowerCase()}`;
  }

  return ref.notes ? `${meal} ${ref.notes}` : meal || 'unknown';
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

  return ref.notes ? `${ingredient} (${ref.notes})` : ingredient || 'unknown';
};

const save = async () => {
  await store.dispatch(MenuActions.CreateMenu, editMenu.value);
};
</script>
<template>
  <div class="box" v-if="editMenu">
    <h2>Menu week {{ editMenu.week }} - {{ editMenu.year }}</h2>
    <button class="box-option secondary" @click.prevent="save()">
      {{ editMenu.id === -1 ? 'Save' : 'Update' }}
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
      <li>
        <a href="#" @click.prevent="addIngredient()">Add item</a>
      </li>
    </ul>
  </div>
</template>
