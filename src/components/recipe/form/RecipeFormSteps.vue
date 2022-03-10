<script lang="ts" setup>
import { PropType } from 'vue';
import { Step } from '@/models/recipe.model';
import { InputComposable } from './input.composable';

const { modelValue } = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Object as PropType<Step[]>,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const { val, update } = InputComposable<Step[]>(modelValue, emit);

const addStep = () => {
  val.value = [
    ...val.value,
    {
      contents: '',
    },
  ];
  update();
};
const removeStep = (index: number) => {
  val.value.splice(index, 1);
  update();
};
</script>
<template>
  <div v-if="val">
    <h3 v-text="label"></h3>
    <template v-for="(step, index) in val" :key="index">
      <div class="form-item">
        <label></label>
        <textarea
          v-model="val[index].contents"
          rows="4"
          :placeholder="`Stap ${index + 1}`"
        ></textarea>
        <div class="field-option">
          <button type="button" class="remove" @click="removeStep(index)">
            x
          </button>
        </div>
      </div>
    </template>
    <div class="form-option">
      <button type="button" @click="addStep">Stap toevoegen</button>
    </div>
  </div>
</template>
