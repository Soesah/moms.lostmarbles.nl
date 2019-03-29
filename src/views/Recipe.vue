<template>
  <section v-if="recipe">
    <recipe-changes :recipe="recipe"></recipe-changes>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import RecipeChanges from '@/components/recipe/RecipeChanges';
import RecipeContents from '@/components/recipe/RecipeContents';
import RecipeNotes from '@/components/recipe/RecipeNotes';

export default {
  name: 'Recipe',
  computed: {
    ...mapState(['recipe']),
  },
  created() {
    const slug = this.$route.params.slug;
    this.$store.dispatch('getRecipeBySlug', slug);
  },
  components: {
    RecipeChanges,
    RecipeContents,
    RecipeNotes,
  },
};
</script>
