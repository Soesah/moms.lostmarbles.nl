<script lang="ts" setup>
import MenuForm from '@/components/menu/MenuForm.vue';
</script>
<template>
  <main class="page-wide columns">
    <section class="column">
      <p>Menu</p>
      <p>Edit option</p>
      <Menu></Menu>
    </section>
    <section class="column">
      <MenuForm></MenuForm>
    </section>
  </main>
</template>
