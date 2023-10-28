<script lang="ts" setup>
import MenuAnalysis from '@/components/menu/MenuAnalysis.vue';
import MealRefForm from '@/components/menu/MealRefForm.vue';
import MenuForm from '@/components/menu/MenuForm.vue';
</script>
<template>
  <main class="page-wide columns">
    <section class="column">
      <MenuAnalysis></MenuAnalysis>
    </section>
    <section class="column">
      <MenuForm></MenuForm>
    </section>
  </main>
</template>
