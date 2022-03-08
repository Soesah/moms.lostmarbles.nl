<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { MenuGroup } from '../models/menu.model';
import { AuthLevel } from '../models/auth.model';
import { Mutations } from '@/models/store.model';
import Search from '@/components/list/Search.vue';
import Categories from '@/components/list/Categories.vue';
import RecipeList from '@/components/list/RecipeList.vue';
import PageMenu from '@/components/common/PageMenu.vue';

const store = useStore();
const route = useRoute();

const update = async () => {
  const slug = route.params.slug;
  await store.dispatch('selectCategoryBySlug', slug);
};

watch(route, update);

onMounted(async () => {
  await update();

  store.commit(Mutations.AddMenuItems, [
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
});

onUnmounted(() => {
  store.commit('removeMenuGroup', MenuGroup.List);
});
</script>
<template>
  <main class="columns">
    <section class="column">
      <Search></Search>
      <Categories></Categories>
    </section>
    <section class="column main">
      <RecipeList></RecipeList>
    </section>
    <section class="column">
      <PageMenu></PageMenu>
    </section>
  </main>
</template>
