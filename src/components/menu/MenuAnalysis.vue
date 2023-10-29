<script lang="ts" setup>
import { computed, markRaw, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import {
  ParsedMenuDay,
  ParsedMenu,
  ParsedIngredient,
  Ingredient,
  Meal,
  NEW_ITEM_ID,
  getIngredient,
  getMeal,
} from '@/models/menu.model';
import { MenuActions, MenuMutations } from './menu.store';
import { ModalMutations } from '../common/modal/modal.store';
import MealForm from './MealForm.vue';
import IngredientForm from './IngredientForm.vue';

const store = useStore();

const ingredients = computed<Ingredient[]>(() => store.state.us.ingredients);
const meals = computed<Meal[]>(() => store.state.us.meals);

const parsed = computed<ParsedMenu>(() => store.state.us.parsedMenu);

const emit = defineEmits(['selectMeal']);

onMounted(async () => {
  await store.dispatch(MenuActions.GetIngredients);
  await store.dispatch(MenuActions.GetMeals);
  await store.dispatch(MenuActions.AnalyzeMenu);
});

const updateAnalyzed = async (id: number) => {
  await store.dispatch(MenuActions.UpdateAnalyzedMenu, id);
};

const selectMeal = (meal: ParsedMenuDay) => {
  const stored = getMeal(meal.meal, meals.value);

  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(MealForm),
  });
  store.commit(
    MenuMutations.EditMeal,
    stored || { name_nl: meal.meal, recipe_urls: meal.urls },
  );
};

const selectIngredient = (ingredient: ParsedIngredient) => {
  const stored = getIngredient(ingredient.name, ingredients.value);
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(IngredientForm),
  });
  store.commit(
    MenuMutations.EditIngredient,
    stored || { name_nl: ingredient.name },
  );
};

const addIngredient = () => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(IngredientForm),
  });
  store.commit(MenuMutations.EditIngredient, { id: NEW_ITEM_ID, name_nl: '' });
};

const addMeal = () => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(MealForm),
  });
  store.commit(MenuMutations.EditMeal, { id: NEW_ITEM_ID, name_nl: '' });
};

const isStoredIngredient = (name: string): boolean =>
  !!getIngredient(name, ingredients.value);
const isStoredMeal = (name: string): boolean => !!getMeal(name, meals.value);

const days: (
  | 'saturday'
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
)[] = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

const capitalize = (str: string) =>
  `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`;
</script>
<template>
  <div class="box" v-if="parsed">
    <h1>Analyze {{ parsed.subject }} - {{ parsed.year }}</h1>
    <div class="box-option">
      <button class="secondary" @click.prevent="updateAnalyzed(parsed.id)">
        Update
      </button>
      <p>
        <a href="#" @click.prevent="addMeal()">Add meal</a>
      </p>
      <p>
        <a href="#" @click.prevent="addIngredient()">Add ingredient</a>
      </p>
    </div>
    <ul class="week-menu">
      <li v-for="day in days" :key="day">
        <span>{{ capitalize(day) }}:</span>
        <a href="#" @click.prevent="selectMeal(parsed[day])">{{
          parsed[day].meal
        }}</a>
        &nbsp;<span v-if="isStoredMeal(parsed[day].meal)">✔</span>
      </li>
    </ul>

    <h2>Kopen</h2>
    <ul class="shopping-list">
      <li v-for="ing in parsed.ingredients" :key="ing.name">
        <a href="#" @click.prevent="selectIngredient(ing)"
          >{{ ing.name }} <span v-if="isStoredIngredient(ing.name)">✔</span></a
        >
      </li>
    </ul>
  </div>
</template>
