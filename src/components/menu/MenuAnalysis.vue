<script lang="ts" setup>
import { computed, markRaw, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {
  ParsedMenuDay,
  ParsedMenu,
  ParsedIngredient,
  Ingredient,
  Meal,
  NEW_ITEM_ID,
} from '@/models/menu.model';
import { MenuActions, MenuMutations } from './menu.store';
import { ModalMutations } from '../common/modal/modal.store';
import MealForm from './MealForm.vue';
import IngredientForm from './IngredientForm.vue';

const store = useStore();

const ingredients = computed<Ingredient[]>(() => store.state.us.ingredients);
const meals = computed<Meal[]>(() => store.state.us.meals);

const parsed = ref<ParsedMenu>({
  id: -1,
  subject: '',
  file: '',
  date: '',
  year: -1,
  week: -1,
  saturday: { meal: '', date: '' },
  sunday: { meal: '', date: '' },
  monday: { meal: '', date: '' },
  tuesday: { meal: '', date: '' },
  wednesday: { meal: '', date: '' },
  thursday: { meal: '', date: '' },
  friday: { meal: '', date: '' },
  ingredients: [],
  next_week: '',
  analyzed: false,
});

const emit = defineEmits(['selectMeal']);

onMounted(async () => {
  const d = await store.dispatch(MenuActions.AnalyzeMenu);
  parsed.value = d;

  await store.dispatch(MenuActions.GetIngredients);
  await store.dispatch(MenuActions.GetMeals);
});

const updateAnalyzed = async (id: number) => {
  await store.dispatch(MenuActions.UpdateAnalyzedMenu, id);

  const d = await store.dispatch(MenuActions.AnalyzeMenu);
  parsed.value = d;
};

const selectMeal = (meal: ParsedMenuDay) => {
  const stored = getMeal(meal.meal);

  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(MealForm),
  });
  store.commit(
    MenuMutations.EditMeal,
    stored || { name_nl: meal.meal, recipe_urls: meal.urls },
  );
};

const selectIngredient = (ingredient: ParsedIngredient) => {
  const stored = getIngredient(ingredient.name);
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

const matches = (haystack: string, needle: string = ''): boolean => {
  const n = needle.toLocaleLowerCase();
  const s = haystack.toLocaleLowerCase();

  return !!s && !!n && (s.startsWith(n) || s.includes(n));
};

const getIngredient = (name: string): Ingredient | null => {
  let ing = null;

  for (let index = 0; index < ingredients.value.length; index++) {
    const item = ingredients.value[index];

    if (
      matches(name, item.name_nl) ||
      matches(name, item.name_en) ||
      matches(name, item.name_id) ||
      (item.keywords || []).some((v) => matches(name, v))
    ) {
      ing = item;
    }
  }

  return ing;
};

const getMeal = (name: string): Meal | null => {
  let meal = null;

  for (let index = 0; index < meals.value.length; index++) {
    const item = meals.value[index];

    if (
      matches(name, item.name_nl) ||
      matches(name, item.name_en) ||
      matches(name, item.name_id) ||
      (item.keywords || []).some((v) => matches(name, v))
    ) {
      meal = item;
    }
  }

  return meal;
};

const isStoredIngredient = (name: string): boolean => !!getIngredient(name);
const isStoredMeal = (name: string): boolean => !!getMeal(name);

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
    <h1>Analyze {{ parsed.subject }} {{ parsed.year }}</h1>
    <button class="secondary" @click.prevent="updateAnalyzed(parsed.id)">
      Update
    </button>
    <h2>Menu</h2>
    <ul class="week-menu">
      <li v-for="day in days" :key="day">
        <span>{{ capitalize(day) }}:</span>
        <a href="#" @click.prevent="selectMeal(parsed[day])">{{
          parsed[day].meal
        }}</a>
        &nbsp;<span v-if="isStoredMeal(parsed[day].meal)">✔</span>
      </li>
    </ul>
    <p>
      <a href="#" @click.prevent="addMeal()">Add meal</a>
    </p>
    <h2>Kopen</h2>
    <ul class="shopping-list">
      <li v-for="ing in parsed.ingredients" :key="ing.name">
        <a href="#" @click.prevent="selectIngredient(ing)"
          >{{ ing.name }} <span v-if="isStoredIngredient(ing.name)">✔</span></a
        >
      </li>
    </ul>
    <p>
      <a href="#" @click.prevent="addIngredient()">Add ingredient</a>
    </p>
  </div>
</template>
