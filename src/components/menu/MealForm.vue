<script lang="ts" setup>
import { PropType, reactive, watch } from 'vue';
import { Meal, ParsedMenuDay, baseMenu } from '@/models/menu.model';
import BeefIcon from './icons/BeefIcon.vue';
import BreadIcon from './icons/BreadIcon.vue';
import ChickenIcon from './icons/ChickenIcon.vue';
import FishIcon from './icons/FishIcon.vue';
import NoodlesIcon from './icons/NoodlesIcon.vue';
import PastaIcon from './icons/PastaIcon.vue';
import PorkIcon from './icons/PorkIcon.vue';
import PotatoIcon from './icons/PotatoIcon.vue';
import RiceIcon from './icons/RiceIcon.vue';
import VegetarianIcon from './icons/VegetarianIcon.vue';

const props = defineProps({
  parsed: {
    type: Object as PropType<ParsedMenuDay>,
    required: true,
  },
});

const meal = reactive<Meal>({ ...baseMenu });

watch(
  () => props.parsed,
  (newValue) => {
    console.log(newValue);
    Object.assign(meal, { ...baseMenu, name: newValue.meal });
  },
);
</script>
<template>
  <form class="box box--tertiary">
    <h2>Add a Meal</h2>
    <div class="form-item">
      <label>Name</label>
      <input type="text" v-model="meal.name" />
    </div>
    <div class="form-item">
      <label>Name Variations</label>
      <input type="text" />
    </div>
    <div>
      <label></label>
      <div class="flex">
        <button
          class="icon-button"
          :class="{ active: meal.type_chicken }"
          title="Chicken"
          @click.prevent="meal.type_chicken = !meal.type_chicken"
        >
          <ChickenIcon :size="40"></ChickenIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.type_beef }"
          title="Beef"
          @click.prevent="meal.type_beef = !meal.type_beef"
        >
          <BeefIcon :size="40"></BeefIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.type_pork }"
          title="Pork"
          @click.prevent="meal.type_pork = !meal.type_pork"
        >
          <PorkIcon :size="40"></PorkIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.type_fish }"
          title="Fish"
          @click.prevent="meal.type_fish = !meal.type_fish"
        >
          <FishIcon :size="40"></FishIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.type_vegetarian }"
          title="Vegetarian"
          @click.prevent="meal.type_vegetarian = !meal.type_vegetarian"
        >
          <VegetarianIcon :size="40"></VegetarianIcon>
        </button>
      </div>
      <div class="flex">
        <button
          class="icon-button"
          :class="{ active: meal.base_rice }"
          title="Rice"
          @click.prevent="meal.base_rice = !meal.base_rice"
        >
          <RiceIcon :size="40"></RiceIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.base_potatoes }"
          title="Potato"
          @click.prevent="meal.base_potatoes = !meal.base_potatoes"
        >
          <PotatoIcon :size="40"></PotatoIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.base_noodles }"
          title="Noodles"
          @click.prevent="meal.base_noodles = !meal.base_noodles"
        >
          <NoodlesIcon :size="40"></NoodlesIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.base_pasta }"
          title="Pasta"
          @click.prevent="meal.base_pasta = !meal.base_pasta"
        >
          <PastaIcon :size="40"></PastaIcon>
        </button>
        <button
          class="icon-button"
          :class="{ active: meal.base_bread }"
          title="Bread"
          @click.prevent="meal.base_bread = !meal.base_bread"
        >
          <BreadIcon :size="40"></BreadIcon>
        </button>
      </div>
    </div>
  </form>
</template>