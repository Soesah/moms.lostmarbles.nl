<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Recipe } from '@/models/recipe.model';
import { Actions } from '@/models/store.model';
import { THREE_MONTHS } from '@/util/info';
import Icon from '@/components/common/Icon.vue';

const store = useStore();
const router = useRouter();
const loading = ref<boolean>(false);

const searchValue = computed(() => store.state.searchValue);
const categoryName = () => store.getters.categoryName();
const filteredRecipes = computed(() => store.getters.filteredRecipes);

const isNew = (recipe: Recipe) => {
  return Date.parse(recipe.creation_date) > Date.now() - THREE_MONTHS;
};

const navigate = (recipe: Recipe, byId: boolean = false) => {
  if (byId) {
    router.push(`/recipe/by-id/${recipe.id}`);
  } else {
    router.push(`/recipe/${recipe.slug}`);
  }
};

onMounted(async () => {
  loading.value = true;
  await store.dispatch(Actions.GetRecipes);
  loading.value = false;
});
</script>
<template>
  <section class="box">
    <h2>
      {{ categoryName() || 'Recepten' }}
      <span v-if="searchValue">
        <i>met {{ searchValue }}</i>
      </span>
    </h2>

    <p v-if="loading">De recepten worden geladen...</p>
    <ol v-else>
      <li
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="recipe-list-item"
      >
        <i class="star-icon" v-if="isNew(recipe)" />
        <span
          class="link"
          @click.shift="navigate(recipe, true)"
          @click.exact="navigate(recipe)"
          v-text="recipe.name"
        ></span>
      </li>
    </ol>
    <Icon name="ricebowl"></Icon>
  </section>
</template>
<style scoped>
.hidden {
  color: transparent;
  text-decoration: none;
  border: none;
}
</style>
