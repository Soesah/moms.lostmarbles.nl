<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import {
  Ingredient,
  ParsedIngredient,
  baseIngredient,
} from '@/models/menu.model';
import { useStore } from 'vuex';

const store = useStore();

const parsed = computed<ParsedIngredient>(
  () => store.state.us.parsedIngredient,
);
const ingredient = reactive<Ingredient>({ ...baseIngredient });

watch(
  () => parsed,
  (newValue) => {
    Object.assign(ingredient, { ...baseIngredient, name: newValue.value.name });
  },
  { deep: true },
);
</script>
<template>
  <form class="box box--tertiary box-modal">
    <h2>Add an Ingredient</h2>
    <div class="form-item">
      <label>Name</label>
      <input type="text" v-model="ingredient.name" />
    </div>
    <div class="form-item">
      <label>Name Variations</label>
      <input type="text" />
    </div>
    <div class="form-item">
      <label>Type</label>
      <input type="text" />
    </div>
    <div class="form-buttons">
      <label></label>
      <button>Cancel</button>
      <button>Save</button>
    </div>
  </form>
</template>
