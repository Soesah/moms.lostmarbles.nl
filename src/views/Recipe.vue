<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { Recipe } from '@/models/recipe.model';
import { MenuGroup } from '../models/menu.model';
import { AuthLevel } from '../models/auth.model';
import { Actions, Mutations } from '@/models/store.model';
import RecipeIngredients from '@/components/recipe/RecipeIngredients.vue';
import RecipeChanges from '@/components/recipe/RecipeChanges.vue';
import RecipeCategory from '@/components/recipe/RecipeCategory.vue';
import RecipeContents from '@/components/recipe/RecipeContents.vue';
import RecipeNotes from '@/components/recipe/RecipeNotes.vue';
import PageMenu from '@/components/common/PageMenu.vue';

const store = useStore();
const route = useRoute();
const recipe = computed<Recipe>(() => store.state.recipe);

const update = async () => {
  const slug = route.params.slug;
  const id = route.params.id as string;
  if (slug) {
    await store.dispatch(Actions.GetRecipeBySlug, slug);
  }
  if (id) {
    await store.dispatch(Actions.GetRecipeById, parseInt(id, 10));
  }
  const siteName = 'Moms Lost Marbles';
  document.title = recipe.value
    ? `${recipe.value.name} - ${siteName}`
    : siteName;
  document.body.scrollIntoView();

  store.commit(Mutations.RemoveMenuGroup, MenuGroup.RecipeEdit);
  store.commit(Mutations.AddMenuItems, [
    {
      label: 'Recept bewerken',
      target: route.params.slug
        ? `/recipe/${recipe.value.slug}/edit`
        : `/recipe/by-id/${recipe.value.id}/edit`,
      group: MenuGroup.RecipeEdit,
      level: AuthLevel.Chef,
    },
  ]);
};
watch(route, update);

onMounted(async () => {
  await update();

  store.commit(Mutations.AddMenuItems, [
    {
      label: 'Terug naar de lijst',
      target: '/list',
      group: MenuGroup.Recipe,
      level: AuthLevel.Cook,
    },
  ]);
});

onUnmounted(() => {
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.Recipe);
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.RecipeEdit);
});
</script>
<template>
  <main v-if="recipe" class="columns">
    <section class="column">
      <div class="box">
        <RecipeIngredients :recipe="recipe"></RecipeIngredients>
      </div>
      <RecipeChanges :recipe="recipe"></RecipeChanges>
    </section>
    <section class="column main">
      <RecipeContents :recipe="recipe"></RecipeContents>
      <RecipeCategory :recipe="recipe"></RecipeCategory>
    </section>
    <section class="column">
      <PageMenu></PageMenu>
      <RecipeNotes :recipe="recipe"></RecipeNotes>
    </section>
  </main>
</template>
