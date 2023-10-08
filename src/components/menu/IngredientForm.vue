<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { ModalMutations } from '../common/modal/modal.store';
import {
  Ingredient,
  ParsedIngredient,
  baseIngredient,
} from '@/models/menu.model';
import NameInput from './form/NameInput.vue';
import { MenuActions } from './menu.store';

const store = useStore();

const parsed = computed<ParsedIngredient>(
  () => store.state.us.parsedIngredient,
);
const ingredient = reactive<Ingredient>({
  ...baseIngredient,
  name_nl: parsed.value.name,
});

watch(
  () => parsed,
  (newValue) => {
    Object.assign(ingredient, { ...baseIngredient, name: newValue.value.name });
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
    <h2>Add an Ingredient</h2>
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
