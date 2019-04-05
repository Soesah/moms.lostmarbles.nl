<template>
  <main class="columns">
    <div class="column">
      <search></search>
      <categories></categories>
    </div>
    <div class="column">
      <recipe-list></recipe-list>
    </div>
    <div class="column">
      <page-menu></page-menu>
    </div>
  </main>
</template>
<script>
import Search from '@/components/list/Search.vue';
import Categories from '@/components/list/Categories.vue';
import RecipeList from '@/components/list/RecipeList.vue';
import PageMenu from '@/components/common/PageMenu.vue';

export default {
  name: 'List',
  components: {
    Search,
    Categories,
    RecipeList,
    PageMenu,
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
