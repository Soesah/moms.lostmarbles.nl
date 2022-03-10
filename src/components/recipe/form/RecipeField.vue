<script lang="ts" setup>
import { InputComposable } from './input.composable';

const { modelValue } = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const { val, update } = InputComposable<string>(modelValue, emit);
</script>
<template>
  <div class="form-item">
    <label v-text="label"></label>
    <input :type="type" v-model="val" :placeholder="label" @input="update" />
  </div>
</template>
