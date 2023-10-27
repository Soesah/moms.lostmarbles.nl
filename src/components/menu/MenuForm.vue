<script setup lang="ts">
import { computed, markRaw } from 'vue';
import { useStore } from 'vuex';
import { Meal, MealRef, Menu, getMeal } from '@/models/menu.model';
import { ModalMutations } from '../common/modal/modal.store';
import MealRefForm from './MealRefForm.vue';

const store = useStore();

const editMenu = computed<Menu>(() => store.state.us.editMenu);
const meals = computed<Meal[]>(() => store.state.us.meals);

const editDay = (meal: MealRef) => {
  store.commit(ModalMutations.OpenModal, {
    modal: markRaw(MealRefForm),
    data: meal,
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

  if (ref.is_left_overs) {
    meal = `Left overs (${meal.toLowerCase()})`;
  }

  return ref.notes ? `${meal} ${ref.notes}` : meal;
};
</script>
<template>
  <div class="box">
    <h2>Menu</h2>

    <ul class="week-menu" v-if="editMenu">
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
      <li></li>
    </ul>
  </div>
</template>
