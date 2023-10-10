<script lang="ts" setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import { Ingredient, Meal, ParsedMenuDay, baseMenu } from '@/models/menu.model';
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
import Autocomplete, { Item } from './form/Autocomplete.vue';
import { MenuActions } from './menu.store';

const store = useStore();

const parsed = computed<ParsedMenuDay>(() => store.state.us.parsedDay);
const ingredientItems = computed<Item[]>(() =>
  store.state.us.ingredients.map((ing: Ingredient): Item => {
    return {
      label: ing.name_nl,
      search: `${ing.name_en || ''}, ${ing.name_id || ''}, ${(
        ing.keywords || []
      ).join(',')}`,
      value: ing.id,
    };
  }),
);
const meal = reactive<Meal>({ ...baseMenu, name_nl: parsed.value.meal });

const addIngredient = () => {
  meal.ingredients.push({
    id: -1,
    amount: '',
    unit: '',
    notes: '',
  });
};

const removeIngredinet = (index: number) => {
  meal.ingredients.splice(index, 1);
};

watch(
  () => parsed,
  (newValue) => {
    Object.assign(meal, {
      ...baseMenu,
      name: newValue.value.meal,
      recipe_urls: newValue.value.urls,
      ingredients: [],
    });
  },
  { deep: true },
);

const cancel = () => {
  store.commit(ModalMutations.CloseModal);
};

const submit = async () => {
  await store.dispatch(MenuActions.CreateMeal, { ...meal, variation_of: 0 });
  cancel();
};
</script>
<template>
  <form class="box box--tertiary box-modal" @submit.prevent="submit">
    <h2>Add a Meal</h2>
    <NameInput v-model="meal" />
    <div class="form-item">
      <label>Variation of</label>
      <input type="text" v-model.number="meal.variation_of" />
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
      <div>
        <ul class="form-items">
          <li
            v-for="(ing, index) in meal.ingredients"
            class="form-item form-multiple"
          >
            <input class="medium right" type="text" v-model="ing.amount" />
            <input class="small" type="text" v-model="ing.unit" />
            <Autocomplete
              v-model="ing.id"
              :items="ingredientItems"
              class="large"
            />
            <input class="large" type="text" v-model="ing.notes" />
            <button type="button" @click.prevent="removeIngredinet(index)">
              x
            </button>
          </li>
        </ul>
        <p><a href="#" @click.prevent="addIngredient()">Add Ingredient</a></p>
      </div>
    </div>

    <div class="form-item">
      <label>Culture</label>
      <input class="large" type="text" v-model="meal.culture" />
    </div>
    <div class="form-item">
      <label>Has leftovers</label>
      <input
        type="checkbox"
        id="completed"
        name="completed"
        :checked="meal.has_left_overs"
        v-model="meal.has_left_overs"
      />
    </div>
    <div class="form-buttons">
      <label></label>
      <button type="button" @click="cancel">Cancel</button>
      <button>Save</button>
    </div>
  </form>
</template>
