<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { MenuGroup } from '@/models/navigation.model';
import { AuthLevel } from '../models/auth.model';
import PageMenu from '@/components/common/PageMenu.vue';
import LoginChef from '@/components/user/LoginChef.vue';
import LoginAdmin from '@/components/user/LoginAdmin.vue';
import PageTitle from '@/components/common/PageTitle.vue';
import { Mutations } from '@/models/store.model';

const store = useStore();
const route = useRoute();
const type = ref<string>('chef');

onMounted(() => {
  type.value = route.params.type as string;

  store.commit(Mutations.AddMenuItems, [
    {
      label: 'Terug naar de lijst',
      target: '/list',
      group: MenuGroup.Recipe,
      level: AuthLevel.Cook,
    },
  ]);
});

onUnmounted(() => {
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.Recipe);
});
</script>
<template>
  <PageTitle></PageTitle>
  <main class="columns">
    <section class="column main-large">
      <login-chef v-if="type === 'chef'"></login-chef>
      <login-admin v-if="type === 'admin'"></login-admin>
    </section>
    <section class="column">
      <page-menu></page-menu>
    </section>
  </main>
</template>
@/models/navigation.model
