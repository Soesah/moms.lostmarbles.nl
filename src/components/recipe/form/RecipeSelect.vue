<script lang="ts" setup>
import { PropType } from 'vue';
import { Category } from '@/models/category.model';
import { InputComposable } from './input.composable';

const { modelValue, options } = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<Category[]>,
    default: () => [],
  },
  modelValue: {
    type: Number,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const { val, update } = InputComposable<number>(modelValue, emit);
</script>
<template>
  <div class="form-item">
    <label v-text="label"></label>
    <select v-model="val" @change="update">
      <option
        v-for="cat in options"
        :key="cat.id"
        :value="cat.id"
        v-text="cat.name_singular"
      ></option>
    </select>
  </div>
</template>
