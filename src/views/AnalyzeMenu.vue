<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import PageMenu from '@/components/common/PageMenu.vue';
import MenuForm from '@/components/menu/MenuForm.vue';
import { Mutations } from '@/models/store.model';

const store = useStore();

onMounted(() => {
  store.commit(Mutations.AddMenuItems, [
    // {
    //   label: 'Stoppen met bewerken',
    //   target: `/recipe/${route.params.slug}`,
    //   group: MenuGroup.Admin,
    //   level: AuthLevel.Cook,
    // },
    // {
    //   label: 'Terug naar de lijst',
    //   target: '/list',
    //   group: MenuGroup.Admin,
    //   level: AuthLevel.Cook,
    // },
  ]);
});
</script>
<template>
  <main class="page-wide columns">
    <section class="column main-large">
      <MenuForm></MenuForm>
    </section>
  </main>
</template>
