<script lang="ts" setup>
import { markRaw, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import {
  ParsedMenuDay,
  ParsedMenu,
  ParsedIngredient,
} from '@/models/menu.model';
import { MenuActions, MenuMutations } from './menu.store';
import { ModalMutations } from '../common/modal/modal.store';
import MealForm from './MealForm.vue';
import IngredientForm from './IngredientForm.vue';

const store = useStore();

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
});

const selectMeal = (meal: ParsedMenuDay) => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(MealForm),
  });
  store.commit(MenuMutations.EditMenu, meal);
};

const selectIngredient = (ingredient: ParsedIngredient) => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(IngredientForm),
  });
  store.commit(MenuMutations.EditIngredient, ingredient);
};
</script>
<template>
  <div class="box" v-if="parsed">
    <h1>Analyze {{ parsed.subject }} {{ parsed.year }}</h1>

    <h2>Menu</h2>
    <ul class="week-menu">
      <li>
        <span>Saturday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.saturday)">{{
          parsed.saturday.meal
        }}</a>
      </li>
      <li>
        <span>Sunday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.sunday)">{{
          parsed.sunday.meal
        }}</a>
      </li>
      <li>
        <span>Monday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.monday)">{{
          parsed.monday.meal
        }}</a>
      </li>
      <li>
        <span>Tuesday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.tuesday)">{{
          parsed.tuesday.meal
        }}</a>
      </li>
      <li>
        <span>Wednesday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.wednesday)">{{
          parsed.wednesday.meal
        }}</a>
      </li>
      <li>
        <span>Thursday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.thursday)">{{
          parsed.thursday.meal
        }}</a>
      </li>
      <li>
        <span>Friday:</span>
        <a href="#" @click.prevent="selectMeal(parsed.friday)">{{
          parsed.friday.meal
        }}</a>
      </li>
    </ul>

    <h2>Kopen</h2>
    <ul class="shopping-list">
      <li v-for="ing in parsed.ingredients" :key="ing.name">
        <a href="#" @click.prevent="selectIngredient(ing)">{{ ing.name }}</a>
      </li>
    </ul>
  </div>
</template>
