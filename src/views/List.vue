<template>
  <main>
    <search></search>
    <categories></categories>
    <recipe-list></recipe-list>
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
    window.setTimeout(() => this.update(), 250);
  },
  watch: {
    $route() {
      this.update();
    },
  },
  methods: {
    update() {
      const slug = this.$route.params.slug;
      this.$store.dispatch('selectCategoryBySlug', slug);
    },
  },
};
</script>
