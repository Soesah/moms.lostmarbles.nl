<template>
  <section class="columns">
    <div class="column">
      <login></login>
    </div>
    <div class="column">
      <new-recipes></new-recipes>
    </div>
    <div class="column">
      <latest-change></latest-change>
    </div>
  </section>
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
