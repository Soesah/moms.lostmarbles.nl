<script setup lang="ts">
import { Ingredient } from '@/models/menu.model';
import { useStore } from 'vuex';
import { MenuMutations } from './menu.store';
import IngredientForm from './IngredientForm.vue';
import { ModalMutations } from '../common/modal/modal.store';
import { computed, markRaw, ref } from 'vue';
import Autocomplete, { Item } from './form/Autocomplete.vue';

const store = useStore();

const ingredient_id = ref<number>(-1);

const ingredientItems = computed<Item[]>(() =>
  store.state.us.ingredients.map((ing: Ingredient): Item => {
    return {
      label: ing.name_nl,
      search: `${ing.name_en || ''}, ${ing.name_id || ''}, ${(
        ing.keywords || []
      ).join(',')}`,
      value: ing.id,
    };
  }),
);

const selectIngredient = () => {
  const m = store.state.us.ingredients.find(
    (m: Ingredient) => m.id === ingredient_id.value,
  );
  if (m) {
    cancel();
    store.commit(ModalMutations.OpenModal, {
      modal: markRaw(IngredientForm),
    });
    store.commit(MenuMutations.EditIngredient, m);
  }
};

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};
</script>
<template>
  <form class="box box--tertiary box-modal">
    <h2>Select a ingredient</h2>
    <div class="form-item">
      <label>Ingredient</label>
      <Autocomplete
        v-model="ingredient_id"
        :items="ingredientItems"
        class="large"
      />
    </div>
    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button type="button" @click.prevent="selectIngredient()">Edit</button>
    </div>
  </form>
</template>
