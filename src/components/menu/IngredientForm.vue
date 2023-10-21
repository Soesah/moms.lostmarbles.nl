<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { ModalMutations } from '../common/modal/modal.store';
import { Ingredient, NEW_ITEM_ID, baseIngredient } from '@/models/menu.model';
import NameInput from './form/NameInput.vue';
import { MenuActions } from './menu.store';

const store = useStore();

const editIngredient = computed<Ingredient>(
  () => store.state.us.editIngredient,
);
const ingredient = reactive<Ingredient>({
  ...baseIngredient,
  ...editIngredient.value,
});

const action = computed<string>(() =>
  ingredient.id === NEW_ITEM_ID ? 'Add' : 'Edit',
);

watch(
  () => editIngredient,
  (newValue) => {
    Object.assign(ingredient, { ...baseIngredient, ...newValue.value });
  },
  { deep: true },
);

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};

const submit = async () => {
  if (ingredient.id !== NEW_ITEM_ID) {
    await store.dispatch(MenuActions.UpdateIngredient, ingredient);
  } else {
    await store.dispatch(MenuActions.CreateIngredient, ingredient);
  }
  cancel();
};
</script>
<template>
  <form class="box box--tertiary box-modal" @submit.prevent="submit">
    <h2>{{ action }} an Ingredient</h2>
    <NameInput v-model="ingredient" />
    <div class="form-item">
      <label>Type</label>
      <input type="text" v-model="ingredient.type" />
    </div>
    <div class="form-item">
      <label>Notes</label>
      <input type="text" v-model="ingredient.notes" />
    </div>
    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </form>
</template>
