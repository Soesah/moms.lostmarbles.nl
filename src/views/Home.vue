<template>
  <main class="columns">
    <section class="column">
      <login></login>
    </section>
    <section class="column">
      <new-recipes></new-recipes>
    </section>
    <section class="column">
      <latest-change></latest-change>
    </section>
  </main>
</template>
<script>
import Login from '@/components/user/Login';
import NewRecipes from '@/components/list/NewRecipes';
import LatestChange from '@/components/list/LatestChange';

export default {
  name: 'Home',
  components: {
    Login,
    NewRecipes,
    LatestChange,
  },
};
</script>
