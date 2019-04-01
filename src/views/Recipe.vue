<template>
  <section v-if="recipe">
    <recipe-contents :recipe="recipe"></recipe-contents>
    <recipe-changes :recipe="recipe"></recipe-changes>
    <recipe-notes :recipe="recipe"></recipe-notes>
    <recipe-category :recipe="recipe"></recipe-category>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import RecipeChanges from '@/components/recipe/RecipeChanges';
import RecipeContents from '@/components/recipe/RecipeContents';
import RecipeNotes from '@/components/recipe/RecipeNotes';
import RecipeCategory from '@/components/recipe/RecipeCategory';

export default {
  name: 'Recipe',
  computed: {
    ...mapState(['recipe']),
  },
  created() {
    this.update();
  },
  watch: {
    $route() {
      this.update();
      document.body.scrollIntoView = 0;
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
  },
};
</script>
