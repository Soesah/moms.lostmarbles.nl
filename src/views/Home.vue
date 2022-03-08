<script lang="ts" setup>
import LoginCook from '@/components/user/LoginCook.vue';
import NewRecipes from '@/components/list/NewRecipes.vue';
import LatestChange from '@/components/list/LatestChange.vue';
</script>
<template>
  <main class="columns">
    <section class="column">
      <LoginCook></LoginCook>
    </section>
    <section class="column">
      <NewRecipes></NewRecipes>
    </section>
    <section class="column">
      <LatestChange></LatestChange>
    </section>
  </main>
</template>
