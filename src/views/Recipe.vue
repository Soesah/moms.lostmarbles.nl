<template>
  <main v-if="recipe" class="columns">
    <section class="column main">
      <recipe-contents></recipe-contents>
      <recipe-category></recipe-category>
    </section>
    <section class="column">
      <page-menu></page-menu>
      <recipe-changes></recipe-changes>
      <recipe-notes></recipe-notes>
    </section>
  </main>
</template>
<script>
import { mapState } from 'vuex';
import RecipeChanges from '@/components/recipe/RecipeChanges';
import RecipeContents from '@/components/recipe/RecipeContents';
import RecipeNotes from '@/components/recipe/RecipeNotes';
import RecipeCategory from '@/components/recipe/RecipeCategory';
import PageMenu from '@/components/common/PageMenu';
import { MenuGroup } from '../models/menu.model';
import { AuthLevel } from '../models/auth.model';

export default {
  name: 'Recipe',
  computed: {
    ...mapState(['recipe']),
  },
  created() {
    this.update();

    this.$store.commit('addMenuItems', [
      {
        label: 'Terug naar de lijst',
        target: '/list',
        group: MenuGroup.Recipe,
        level: AuthLevel.Cook,
      },
    ]);
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Recipe);
    this.$store.commit('removeMenuGroup', MenuGroup.RecipeEdit);
  },
  watch: {
    $route() {
      this.update();
    },
    recipe(recipe) {
      const siteName = 'Moms Lost Marbles';
      document.title = recipe ? `${recipe.name} - ${siteName}` : siteName;
      document.body.scrollIntoView();

      this.$store.commit('removeMenuGroup', MenuGroup.RecipeEdit);
      this.$store.commit('addMenuItems', [
        {
          label: 'Recept bewerken',
          target: `/recipe/${this.recipe.slug}/edit`,
          group: MenuGroup.RecipeEdit,
          level: AuthLevel.Chef,
        },
      ]);
    },
  },
  methods: {
    update() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('getRecipeBySlug', slug);
    },
  },
  components: {
    RecipeChanges,
    RecipeContents,
    RecipeNotes,
    RecipeCategory,
    PageMenu,
  },
};
</script>
