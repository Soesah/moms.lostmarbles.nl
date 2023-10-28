<script lang="ts" setup>
import { computed, onMounted, PropType, ref, watch } from 'vue';

export interface Item {
  label: string;
  search?: string;
  value: string | any;
}

const props = defineProps({
  modelValue: {
    required: true,
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

// the selected item, used to show label on blur
const item = ref<any>(
  props.items.find((v) => v.value === props.modelValue) || null,
);
// the displayed search value
const search = ref<string>(
  props.items.find((v) => v.value === props.modelValue)?.label || '',
);

watch(
  props,
  () => {
    item.value = props.items.find((v) => v.value === props.modelValue) || null;
    search.value =
      props.items.find((v) => v.value === props.modelValue)?.label || '';
  },
  { deep: true },
);

const open = ref<boolean>(false);
const focusIndex = ref<number>(0);

const itemsFiltered = computed<Item[]>(() => {
  return props.items.filter((v) =>
    `${v.label} ${v.search} ${v.value}`
      .toLowerCase()
      .includes(search.value.toLowerCase()),
  );
});

const openClass = computed<string>(() =>
  open.value && search.value && itemsFiltered.value.length
    ? 'field-auto-complete-open'
    : '',
);

const setItem = () => {
  item.value = props.items.find((i) => i.value === props.modelValue);
};

const update = () => {
  emit('update:modelValue', item.value.value);
};

const toggleList = () => {
  open.value = !open.value;
  focusIndex.value =
    open.value && item.value
      ? itemsFiltered.value.findIndex((i) => i.value === item.value.value)
      : -1;
};

const close = () => {
  open.value = false;
};
const clear = () => {
  item.value = null;
  emit('update:modelValue', '');
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
  search.value = i.label;
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
  setItem();
});
</script>
<template>
  <div :class="'field-auto-complete ' + openClass">
    <input
      class="visible"
      type="text"
      v-model="search"
      @focus="open = true"
      @blur="blur"
      @keydown.backspace="clear"
      @keydown.prevent.esc="close"
      @keydown.prevent.enter="choose"
      @keydown.prevent.up="previous"
      @keydown.prevent.down="next"
    />
    <ul class="list" v-if="open && itemsFiltered.length && search.length > 1">
      <li
        v-for="(item, index) in itemsFiltered"
        :class="focusClass(index)"
        :value="item.value"
        v-text="item.label"
        :key="item.label"
        @click.stop.prevent="chooseItem(index)"
      ></li>
    </ul>
  </div>
</template>
