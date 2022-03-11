<script lang="ts" setup>
import { PropType } from 'vue';
import { Ingredient } from '@/models/recipe.model';
import { InputComposable } from './input.composable';

const { index, count, modelValue } = defineProps({
  index: {
    type: Number,
    default: -1,
  },
  count: {
    type: Number,
    default: -1,
  },
  modelValue: {
    type: Object as PropType<Ingredient>,
    default: () => ({ name: '' }),
  },
});

const emit = defineEmits(['update:modelValue', 'move', 'remove']);

const { val, update } = InputComposable<Ingredient>(modelValue, emit);

const removeIngredient = (index: number) => {
  emit('remove', index);
};

const moveUp = (index: number) => {
  emit('move', index, index - 1);
};
const moveDown = (index: number) => {
  emit('move', index, index + 1);
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
    <div class="field-option icon-buttons">
      <button
        type="button"
        class="remove"
        @click="moveUp(index)"
        :disabled="index === 0"
      >
        <i class="icon icon-arrow_up"></i>
      </button>
      <button
        type="button"
        class="remove"
        @click="moveDown(index)"
        :disabled="index === count - 1"
      >
        <i class="icon icon-arrow_down"></i>
      </button>
      <button type="button" class="remove" @click="removeIngredient(index)">
        <i class="icon icon-close"></i>
      </button>
    </div>
  </div>
</template>
