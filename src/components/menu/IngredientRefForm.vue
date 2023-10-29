<script setup lang="ts">
import { useStore } from 'vuex';
import { ModalMutations } from '../common/modal/modal.store';
import { PropType, computed, reactive } from 'vue';
import { Meal, IngredientRef } from '@/models/menu.model';
import Autocomplete, { Item } from './form/Autocomplete.vue';
import { MenuMutations } from './menu.store';
import Autosuggest from './form/Autosuggest.vue';

const props = defineProps({
  data: {
    type: Object as PropType<{ index: number; ref: IngredientRef }>,
    required: true,
  },
});

const store = useStore();

const ingredientRef = reactive<IngredientRef>({ ...props.data.ref });

const ingredientItems = computed<Item[]>(() =>
  store.state.us.ingredients.map((ing: Meal): Item => {
    return {
      label: ing.name_nl,
      search: `${ing.name_en || ''}, ${ing.name_id || ''}, ${(
        ing.keywords || []
      ).join(',')}`,
      value: ing.id,
    };
  }),
);

const unitItems: Item[] = [
  { label: 'stuks', value: 'x' },
  { label: 'gram', value: 'gr' },
  { label: 'kilogram', value: 'kg' },
  { label: 'liter', value: 'l' },
  { label: 'deciliter', value: 'dl' },
  { label: 'milliliter', value: 'ml' },
  { label: 'blik', value: 'blik' },
];

const notesSuggestions: string[] = ['van Dirk', 'groen', 'klein'];

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};

const submit = () => {
  store.commit(MenuMutations.UpdateMenuShoppingList, {
    index: props.data.index,
    ingredientRef,
  });
  cancel();
};
</script>
<template>
  <form
    class="box box--tertiary box-modal"
    v-if="props.data"
    @submit.prevent="submit"
  >
    <h2>Choose ingredient</h2>
    <div class="form-item">
      <label>Ingredient</label>
      <Autocomplete
        v-model="ingredientRef.id"
        :items="ingredientItems"
        class="large"
      />
    </div>
    <div class="form-item">
      <label>Amount</label>
      <input type="text" class="small" v-model="ingredientRef.amount" />
    </div>
    <div class="form-item">
      <label>Unit</label>
      <Autocomplete
        v-model="ingredientRef.unit"
        :items="unitItems"
        class="small"
      />
    </div>
    <div class="form-item">
      <label>Notes</label>
      <Autosuggest v-model="ingredientRef.notes" :items="notesSuggestions" />
    </div>
    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>
