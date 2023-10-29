<script setup lang="ts">
import { PropType, reactive } from 'vue';

const props = defineProps({
  modelValue: {
    required: true,
    type: Array as PropType<string[]>,
    default: [],
  },
});
const emit = defineEmits(['update:modelValue']);

const urls = reactive<string[]>(props.modelValue);

const addUrl = () => {
  urls.push('');
  update();
};

const removeUrl = (index: number) => {
  urls.splice(index, 1);
  update();
};

const update = () => {
  emit('update:modelValue', urls);
};
</script>
<template>
  <div class="field-urls">
    <div class="field-url" v-for="(_, index) in urls">
      <input type="text" v-model="urls[index]" @change="update" />
      <button @click.stop.prevent="removeUrl(index)">-</button>
    </div>
    <p>
      <a href="#" @click.stop.prevent="addUrl()">Add url</a>
    </p>
  </div>
</template>
