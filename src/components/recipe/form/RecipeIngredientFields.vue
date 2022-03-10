<script lang="ts" setup>
import { PropType } from 'vue';
import { Ingredient } from '@/models/recipe.model';
import { InputComposable } from './input.composable';

const { index, modelValue } = defineProps({
  index: {
    type: Number,
    default: -1,
  },
  modelValue: {
    type: Object as PropType<Ingredient>,
    default: () => ({ name: '' }),
  },
});

const emit = defineEmits(['update:modelValue', 'remove']);

const { val, update } = InputComposable<Ingredient>(modelValue, emit);

const removeIngredient = (index: number) => {
  emit('remove', index);
};
</script>
<template>
  <div class="form-item form-multiple">
    <label></label>
    <input
      type="text"
      placeholder="Hoeveelheid"
      v-model="val.amount"
      @change="update"
    />
    <input type="text" placeholder="Naam" v-model="val.name" @change="update" />
    <input
      type="text"
      placeholder="Opmerking"
      v-model="val.remark"
      @change="update"
    />
    <div class="field-option">
      <button type="button" class="remove" @click="removeIngredient(index)">
        x
      </button>
    </div>
  </div>
</template>
