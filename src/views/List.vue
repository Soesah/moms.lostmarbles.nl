<template>
  <main class="columns">
    <div class="column secondary">
      <search></search>
      <categories></categories>
    </div>
    <div class="column main">
      <recipe-list></recipe-list>
    </div>
  </main>
</template>
<script>
import Search from '@/components/list/Search.vue';
import Categories from '@/components/list/Categories.vue';
import RecipeList from '@/components/list/RecipeList.vue';

export default {
  name: 'List',
  components: {
    Search,
    Categories,
    RecipeList,
  },
  created() {
    this.update();
  },
  watch: {
    $route() {
      this.update();
    },
  },
  methods: {
    async update() {
      const slug = this.$route.params.slug;
      await this.$store.dispatch('selectCategoryBySlug', slug);
    },
  },
};
</script>
