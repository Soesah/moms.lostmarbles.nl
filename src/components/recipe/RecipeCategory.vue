<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Recipe } from '@/models/recipe.model';
import { Actions } from '@/models/store.model';
import Icon from '@/components/common/Icon.vue';

const store = useStore();
const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});
const categoryRecipes = computed<Recipe[]>(() =>
  store.state.recipes.filter(
    (r: Recipe) => r.category_id === recipe.category_id,
  ),
);

const categoryName = (id: number, plural: boolean) =>
  store.getters.categoryName(id, plural);

onMounted(async () => {
  await store.dispatch(Actions.GetCategories);
});
</script>
<template>
  <section class="box box--secondary">
    <h2
      v-text="categoryName(recipe.category_id, categoryRecipes.length > 1)"
    ></h2>
    <ul>
      <li v-for="rec in categoryRecipes" :key="rec.id">
        <i v-if="rec.id === recipe.id" v-text="rec.name"></i>
        <router-link
          v-else
          :to="`/recipe/${rec.slug}`"
          v-text="rec.name"
        ></router-link>
      </li>
    </ul>
    <icon name="milk"></icon>
  </section>
</template>
