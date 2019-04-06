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
import Search from '@/components/list/Search';
import Categories from '@/components/list/Categories';
import RecipeList from '@/components/list/RecipeList';
import PageMenu from '@/components/common/PageMenu';
import { MenuGroup } from '../models/menu.model';

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

    this.$store.commit('addMenuItems', [
      {
        label: 'Nieuw recept toevoegen',
        target: '/recipe/new/edit',
        group: MenuGroup.List,
      },
    ]);
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.List);
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
