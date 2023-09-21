<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { MenuGroup } from '../models/navigation.model';
import { AuthLevel } from '../models/auth.model';
import { Actions, Mutations } from '@/models/store.model';
import Search from '@/components/list/Search.vue';
import Categories from '@/components/list/Categories.vue';
import RecipeList from '@/components/list/RecipeList.vue';
import PageMenu from '@/components/common/PageMenu.vue';
import PageTitle from '@/components/common/PageTitle.vue';

const store = useStore();
const route = useRoute();

const update = async () => {
  const slug = route.params.slug;
  await store.dispatch(Actions.SelectCategoryBySlug, slug);
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
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.List);
});
</script>
<template>
  <PageTitle></PageTitle>
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
../models/navigation.model
