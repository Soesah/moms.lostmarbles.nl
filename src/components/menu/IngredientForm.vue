<script lang="ts" setup>
import { PropType, reactive, watch } from 'vue';
import { Ingredient, ParsedMenuDay } from '@/models/menu.model';

const props = defineProps({
  parsed: {
    type: Object as PropType<ParsedMenuDay>,
    required: true,
  },
});

const meal = reactive<Ingredient>({
  id: -1,
  name: '',
  name_variations: [],
  type: '',
  notes: '',
});

watch(
  () => props.parsed,
  (newValue) => {
    console.log(newValue);
    meal.name = newValue.meal;
  },
);
</script>
<template>
  <form class="box box--tertiary">
    <h2>Add an Ingredient</h2>
    <div class="form-item">
      <label>Name</label>
      <input type="text" v-model="meal.name" />
    </div>
    <div class="form-item">
      <label>Name Variations</label>
      <input type="text" />
    </div>
    <div class="form-item">
      <label>Type</label>
      <input type="text" />
    </div>
  </form>
</template>
