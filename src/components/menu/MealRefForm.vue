<script setup lang="ts">
import { useStore } from 'vuex';
import { ModalMutations } from '../common/modal/modal.store';
import { PropType, computed, reactive } from 'vue';
import { Meal, MealRef } from '@/models/menu.model';
import Autocomplete, { Item } from './form/Autocomplete.vue';
import AutocompleteMultiple from './form/AutocompleteMultiple.vue';
import { format } from 'date-fns';
import OutIcon from './icons/OutIcon.vue';
import LeftoversIcon from './icons/LeftoversIcon.vue';
import UndecidedIcon from './icons/UndecidedIcon.vue';
import { MenuMutations } from './menu.store';

const props = defineProps({
  data: {
    type: Object as PropType<MealRef>,
    required: true,
  },
});

const store = useStore();

const mealRef = reactive<MealRef>({ ...props.data });

const combinationIds = reactive<number[]>([]);

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

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};

const formatDate = (date: string): string => {
  const d = new Date(date);

  return format(d, 'EEEE d MMMM yyyy');
};

const submit = () => {
  const day = format(new Date(mealRef.date), 'EEEE').toLowerCase();
  store.commit(MenuMutations.UpdateMenuDay, { day, mealRef });
  cancel();
};
</script>
<template>
  <form class="box box--tertiary" v-if="props.data" @submit.prevent="submit">
    <h2>
      {{ formatDate(props.data.date) }}
    </h2>
    <div class="form-item">
      <label>Meal</label>
      <Autocomplete
        v-model="mealRef.meal_id"
        :items="mealItems"
        class="large"
      />
    </div>
    <div class="form-item">
      <label>Combined with</label>
      <AutocompleteMultiple
        v-model="mealRef.combination_ids"
        :items="mealItems"
      />
    </div>
    <div class="form-item">
      <label>Notes</label>
      <input type="text" v-model="mealRef.notes" />
    </div>
    <div class="form-item">
      <label></label>
      <div class="flex">
        <button
          class="icon-button"
          :class="{ active: mealRef.is_out }"
          title="Eating out"
          @click.prevent="mealRef.is_out = !mealRef.is_out"
        >
          <OutIcon :size="40"></OutIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: mealRef.is_left_overs }"
          title="Left overs"
          @click.prevent="mealRef.is_left_overs = !mealRef.is_left_overs"
        >
          <LeftoversIcon :size="40"></LeftoversIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: mealRef.is_undecided }"
          title="We'll see"
          @click.prevent="mealRef.is_undecided = !mealRef.is_undecided"
        >
          <UndecidedIcon :size="40"></UndecidedIcon>
        </button>
      </div>
    </div>
    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>
