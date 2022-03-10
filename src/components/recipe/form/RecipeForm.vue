<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Recipe } from '@/models/recipe.model';
import RecipeField from './RecipeField.vue';
import RecipeSelect from './RecipeSelect.vue';
import RecipeFormIngredients from './RecipeFormIngredients.vue';
import RecipeFormSteps from './RecipeFormSteps.vue';
import { Actions } from '@/models/store.model';

const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});

const store = useStore();
const router = useRouter();
const updated = ref<Recipe | null>(null);
const categories = computed(() => store.state.categories);
const isAdmin = computed(() => store.getters.isAdmin);
const emit = defineEmits(['updateRecipe', 'cancel']);

onMounted(() => {
  updated.value = recipe;
});

const submit = () => {
  emit('updateRecipe', updated.value);
};

const cancel = () => {
  emit('cancel');
};

const remove = async () => {
  if (window.confirm('Are you sure you want to remove this recipe')) {
    const ok = await store.dispatch(Actions.RemoveRecipe, recipe.id);
    if (ok) {
      router.push('/list');
    }
  }
};
</script>
<template>
  <form class="box" @submit.prevent="submit" v-if="recipe && updated">
    <h2>Recept bewerken</h2>
    <RecipeSelect
      label="Categorie"
      v-model="updated.category_id"
      :options="categories"
    ></RecipeSelect>
    <RecipeField label="Titel" v-model="updated.name"></RecipeField>
    <RecipeField label="Kok" v-model="updated.cook"></RecipeField>
    <RecipeField
      label="Bereidingstijd"
      v-model="updated.preparation_time"
    ></RecipeField>
    <RecipeField
      label="Aantal porties"
      v-model="updated.servings"
      type="number"
    ></RecipeField>
    <RecipeFormIngredients
      label="Ingrediënten"
      v-model="updated.ingredients"
    ></RecipeFormIngredients>
    <RecipeFormSteps
      label="Voorbereiding"
      v-model="updated.steps"
    ></RecipeFormSteps>
    <div class="form-option">
      <button type="submit">Opslaan</button>
      <button v-if="isAdmin" type="button" @click="remove">Remove</button>
      <button type="button" @click="cancel">Stoppen</button>
    </div>
  </form>
</template>
