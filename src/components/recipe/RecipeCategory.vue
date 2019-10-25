<template>
  <section class="box box--secondary">
    <h2 v-text="title"></h2>
    <ul>
      <li v-for="rec in categoryRecipes" :key="rec.id">
        <i v-if="rec.id === recipe.id" v-text="rec.name"></i>
        <router-link v-else :to="`/recipe/${rec.slug}`" v-text="rec.name"></router-link>
      </li>
    </ul>
    <icon name="milk"></icon>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import Icon from '@/components/common/Icon.vue';

export default {
  name: 'RecipeCategory',
  created() {
    this.$store.dispatch('getCategories');
  },
  computed: {
    ...mapState(['recipe', 'recipes', 'categories']),
    title() {
      return this.categories.length
        ? this.categories.find((c) => c.id === this.recipe.category_id)
            .name_plural
        : '';
    },
    categoryRecipes() {
      return this.recipes.filter(
        (r) => r.category_id === this.recipe.category_id,
      );
    },
  },
  components: {
    Icon,
  },
};
</script>
