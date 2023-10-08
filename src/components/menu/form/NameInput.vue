<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { InputComposable } from '../../recipe/form/input.composable';

interface Names {
  name_nl: string;
  name_en?: string;
  name_id?: string;
  keywords: string[];
}

const showVariations = ref<boolean>(false);

const { modelValue } = defineProps({
  modelValue: {
    type: Object as PropType<Names>,
    default: () => ({ name_nl: '', name_en: '', name_id: '', keywords: [] }),
  },
});

const emit = defineEmits(['update:modelValue']);
const { val, update } = InputComposable<Names>(modelValue, emit);
</script>
<template>
  <div class="form-item">
    <label
      ><a href="#" @click.prevent="showVariations = !showVariations"
        >Name (Nederlands)</a
      ></label
    >
    <input type="text" v-model="val.name_nl" @change="update" />
  </div>
  <template v-if="showVariations">
    <div class="form-item">
      <label>Name (English)</label>
      <input type="text" v-model="val.name_en" @change="update" />
    </div>
    <div class="form-item">
      <label>Name (Indonesian)</label>
      <input type="text" v-model="val.name_id" @change="update" />
    </div>
    <div class="form-item">
      <label>Keywords</label>
      <input type="text" v-model="val.keywords" @change="update" />
    </div>
  </template>
</template>
