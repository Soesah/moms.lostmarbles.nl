<script setup lang="ts">
import { Meal } from '@/models/menu.model';
import { useStore } from 'vuex';
import { MenuMutations } from './menu.store';
import MealForm from './MealForm.vue';
import { ModalMutations } from '../common/modal/modal.store';
import { computed, markRaw, ref } from 'vue';
import Autocomplete, { Item } from './form/Autocomplete.vue';

const store = useStore();

const meal_id = ref<number>(-1);

const mealItems = computed<Item[]>(() =>
  store.state.us.meals.map((ing: Meal): Item => {
    return {
      label: ing.name_nl,
      search: `${ing.name_en || ''}, ${ing.name_id || ''}, ${(
        ing.keywords || []
      ).join(',')}`,
      value: ing.id,
    };
  }),
);

const selectMeal = () => {
  const m = store.state.us.meals.find((m: Meal) => m.id === meal_id.value);
  if (m) {
    cancel();
    store.commit(ModalMutations.OpenModal, {
      modal: markRaw(MealForm),
    });
    store.commit(MenuMutations.EditMeal, m);
  }
};

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};
</script>
<template>
  <form class="box box--tertiary box-modal">
    <h2>Select a meal</h2>
    <div class="form-item">
      <label>Meal</label>
      <Autocomplete v-model="meal_id" :items="mealItems" class="large" />
    </div>
    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button type="button" @click.prevent="selectMeal()">Edit</button>
    </div>
  </form>
</template>
