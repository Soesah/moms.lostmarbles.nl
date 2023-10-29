<script lang="ts" setup>
import { computed, onMounted, PropType, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    required: true,
    default: '',
  },
  items: {
    type: Array as PropType<string[]>,
    required: true,
  },
  focus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'changed']);

// the selected item, used to show label on blur
const item = ref<string>(props.modelValue);

const input = ref<any>(null);
const open = ref<boolean>(false);
const focusIndex = ref<number>(0);

const itemsFiltered = computed<string[]>(() => {
  return props.items.filter((v) =>
    v.toLowerCase().includes(item.value.toLowerCase()),
  );
});

const openClass = computed<string>(() =>
  open.value && item.value && itemsFiltered.value.length
    ? 'field-auto-suggest-open'
    : '',
);

const update = () => {
  emit('update:modelValue', item.value);
};

const toggleList = () => {
  open.value = !open.value;
  focusIndex.value =
    open.value && item.value
      ? itemsFiltered.value.findIndex((i) => i === item.value)
      : -1;
};

const close = () => {
  open.value = false;
};

const blur = () => {
  // prevent the blur from closing before a choose function has had time to work
  setTimeout(() => close(), 250);
};

const choose = () => {
  if (open.value) {
    chooseItem(focusIndex.value);
  }
};

const chooseItem = (index: number) => {
  const i = itemsFiltered.value[index];
  item.value = i;

  emit('changed', i);
  update();
  close();
};

const focusClass = (index: number) => {
  return index === focusIndex.value ? 'choice-focus' : '';
};

const next = () => {
  if (!open.value) {
    toggleList();
    return;
  }
  focusIndex.value++;
  if (focusIndex.value > itemsFiltered.value.length - 1) {
    focusIndex.value = 0;
  }
};

const previous = () => {
  focusIndex.value--;
  if (focusIndex.value < 0) {
    focusIndex.value = itemsFiltered.value.length - 1;
  }
};

onMounted(() => {
  if (props.focus) {
    input.value.focus();
  }
});
</script>
<template>
  <div :class="'field-auto-suggest ' + openClass">
    <input
      class="visible"
      type="text"
      ref="input"
      v-model="item"
      @focus="open = true"
      @change="update"
      @blur="blur"
      @keydown.prevent.esc="close"
      @keydown.prevent.enter="choose"
      @keydown.prevent.up="previous"
      @keydown.prevent.down="next"
    />
    <ul class="list" v-if="open && itemsFiltered.length && item.length > 0">
      <li
        v-for="(item, index) in itemsFiltered"
        :class="focusClass(index)"
        :value="item"
        v-text="item"
        :key="item"
        @click.stop.prevent="chooseItem(index)"
      ></li>
    </ul>
  </div>
</template>
