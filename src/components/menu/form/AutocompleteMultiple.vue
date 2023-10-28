<script lang="ts" setup>
import { PropType, computed, reactive, ref } from 'vue';
import Autocomplete, { Item } from './Autocomplete.vue';

const props = defineProps({
  modelValue: {
    required: false,
    type: Array as PropType<any[]>,
    default: () => [],
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);

const value = reactive<any[]>([...props.modelValue]);
const editableValue = reactive<{ index: number; value: any }>({
  index: -1,
  value: null,
});

const showInput = ref<boolean>(false);

const addItem = () => {
  value.push(-1);
  editValue(-1, value.length);
};
const removeItem = () => {
  value.splice(editableValue.index, 1);

  showInput.value = false;
};
const getLabel = (v: any) =>
  props.items.find((i) => i.value === v)?.label || 'choose';
const editValue = (v: any, index: number) => {
  editableValue.index = index;
  editableValue.value = v;
  showInput.value = true;
};
const update = (v: any) => {
  value[editableValue.index] = v.value;

  showInput.value = false;

  emit('update:modelValue', value);
};
</script>
<template>
  <div class="field-auto-complete-multiple">
    <div class="fake-input">
      <span
        @click.prevent="editValue(item, index)"
        v-for="(item, index) in value"
        >{{ getLabel(item) }}
        <span v-if="index !== value.length - 1">, </span></span
      >
      <button @click.prevent="addItem">+</button>
    </div>
    <div class="input-area">
      <Autocomplete
        @changed="update"
        v-if="showInput"
        v-model="editableValue.value"
        :items="props.items"
        focus
      />
      <button v-if="showInput" @click.prevent="removeItem">-</button>
    </div>
  </div>
</template>
