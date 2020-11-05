<template>
  <main class="columns">
    <section class="column">
      <search></search>
      <categories></categories>
    </section>
    <section class="column main">
      <recipe-list></recipe-list>
    </section>
    <section class="column">
      <page-menu></page-menu>
    </section>
  </main>
</template>
<script>
import Search from '@/components/list/Search';
import Categories from '@/components/list/Categories';
import RecipeList from '@/components/list/RecipeList';
import PageMenu from '@/components/common/PageMenu';
import { MenuGroup } from '../models/menu.model';
import { AuthLevel } from '../models/auth.model';

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
        level: AuthLevel.Chef,
      },
      {
        label: 'Gebruikers beheren',
        target: '/admin/',
        group: MenuGroup.List,
        level: AuthLevel.Admin,
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
