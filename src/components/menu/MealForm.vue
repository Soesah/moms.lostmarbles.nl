<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { Meal, ParsedMenuDay, baseMenu } from '@/models/menu.model';
import { ModalMutations } from '../common/modal/modal.store';
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
import WrapIcon from './icons/WrapIcon.vue';
import NameInput from './form/NameInput.vue';

const store = useStore();

const parsed = computed<ParsedMenuDay>(() => store.state.us.parsedDay);
const meal = reactive<Meal>({ ...baseMenu, name: parsed.value.meal });

watch(
  () => parsed,
  (newValue) => {
    Object.assign(meal, { ...baseMenu, name: newValue.value.meal });
  },
  { deep: true },
);

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};
</script>
<template>
  <form class="box box--tertiary box-modal">
    <h2>Add a Meal</h2>
    <NameInput v-model="meal" />
    <div class="form-item">
      <label>Variation of</label>
      <input type="text" v-model="meal.variation_of" />
    </div>
    <div class="form-item">
      <label></label>
      <div>
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
          <button
            class="icon-button"
            :class="{ active: meal.base_wrap }"
            title="Bread"
            @click.prevent="meal.base_wrap = !meal.base_wrap"
          >
            <WrapIcon :size="40"></WrapIcon>
          </button>
        </div>
      </div>
    </div>
    <div class="form-item">
      <label>Ingredients</label>
      <input type="text" v-model="meal.ingredients" />
      <input type="text" v-model="meal.ingredients" />
    </div>

    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button>Save</button>
    </div>
  </form>
</template>
