<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { InputComposable } from '../../recipe/form/input.composable';

interface Names {
  name: string;
  name_variations: string[];
}

const showVariations = ref<boolean>(false);

const { modelValue } = defineProps({
  modelValue: {
    type: Object as PropType<Names>,
    default: () => ({ name: '', name_variations: [] }),
  },
});

const emit = defineEmits(['update:modelValue']);
const { val, update } = InputComposable<Names>(modelValue, emit);
</script>
<template>
  <div class="form-item">
    <label
      ><a href="#" @click.prevent="showVariations = !showVariations"
        >Name</a
      ></label
    >
    <input type="text" v-model="val.name" @change="update" />
  </div>
  <div class="form-item" v-if="showVariations">
    <label>Name Variations</label>
    <input type="text" v-model="val.name_variations" @change="update" />
  </div>
</template>
