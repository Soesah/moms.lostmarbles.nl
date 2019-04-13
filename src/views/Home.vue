<template>
  <main class="columns">
    <section class="column">
      <login-cook></login-cook>
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
import LoginCook from '@/components/user/LoginCook';
import NewRecipes from '@/components/list/NewRecipes';
import LatestChange from '@/components/list/LatestChange';

export default {
  name: 'Home',
  components: {
    LoginCook,
    NewRecipes,
    LatestChange,
  },
};
</script>
