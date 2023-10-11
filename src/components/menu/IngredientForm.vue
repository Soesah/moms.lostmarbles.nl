<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { ModalMutations } from '../common/modal/modal.store';
import { Ingredient, baseIngredient } from '@/models/menu.model';
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
  editIngredient.value.id === -1 ? 'Add' : 'Edit',
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
  await store.dispatch(MenuActions.CreateIngredient, ingredient);
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
