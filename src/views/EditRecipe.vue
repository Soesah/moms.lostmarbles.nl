<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { Recipe } from '@/models/recipe.model';
import { AuthLevel } from '../models/auth.model';
import { MenuGroup } from '@/models/menu.model';
import { Actions, Mutations } from '@/models/store.model';
import PageMenu from '@/components/common/PageMenu.vue';
import RecipeForm from '@/components/recipe/form/RecipeForm.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();
const recipe = computed<Recipe>(() => store.state.recipe);

onMounted(() => {
  update();
  store.commit(Mutations.AddMenuItems, [
    {
      label: 'Stoppen met bewerken',
      target: `/recipe/${route.params.slug}`,
      group: MenuGroup.Admin,
      level: AuthLevel.Cook,
    },
    {
      label: 'Terug naar de lijst',
      target: '/list',
      group: MenuGroup.Admin,
      level: AuthLevel.Cook,
    },
  ]);
  store.commit(Mutations.SetEditing, true);
});

onUnmounted(() => {
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.Admin);
  store.commit(Mutations.SetEditing, false);
});

watch(recipe, () => {
  store.commit(Mutations.AddMenuItems, [
    {
      label: 'Terug naar recept',
      target: `/recipe/${recipe.value.slug}`,
      group: MenuGroup.Admin,
      level: AuthLevel.Cook,
    },
  ]);
});

const update = () => {
  const slug = route.params.slug;
  const id = route.params.id;
  if (!slug && !id) {
    store.dispatch(Actions.NewRecipe);
  }
  if (slug) {
    store.dispatch(Actions.GetRecipeBySlug, slug);
  }
  if (id) {
    store.dispatch(Actions.GetRecipeById, id);
  }
  store.dispatch(Actions.GetCategories);
};

const saveRecipe = async (recipe: Recipe) => {
  const update = await store.dispatch(Actions.SaveRecipe, recipe);

  if (update) {
    router.push(`/recipe/${update.slug}`);
  }
};

const cancel = () => {
  router.push(`/recipe/${route.params.slug}`);
};
</script>
<template>
  <main class="columns">
    <section class="column main-large" v-if="recipe">
      <!-- <jigsaw
        :xml="xml"
        schema="/recipe.xsd"
        stylesheet="/recipe.xsl"
        config="/config.json"
        @save="saveRecipe"
      ></jigsaw>-->
      <RecipeForm
        :recipe="recipe"
        @cancel="cancel"
        @updateRecipe="saveRecipe"
      ></RecipeForm>
    </section>
    <section class="column">
      <PageMenu></PageMenu>
    </section>
  </main>
</template>
