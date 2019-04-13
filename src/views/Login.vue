<template>
  <main class="columns">
    <section class="column main">
      <login-chef v-if="type === 'chef'"></login-chef>
      <login-admin v-if="type === 'admin'"></login-admin>
    </section>
    <section class="column">
      <page-menu></page-menu>
    </section>
  </main>
</template>
<script>
import PageMenu from '@/components/common/PageMenu';
import { MenuGroup } from '@/models/menu.model';
import LoginChef from '@/components/user/LoginChef';
import LoginAdmin from '@/components/user/LoginAdmin';
import { AuthLevel } from '../models/auth.model';

export default {
  name: 'Login',
  data() {
    return {
      type: 'chef',
    };
  },
  created() {
    this.type = this.$route.params.type;

    this.$store.commit('addMenuItems', [
      {
        label: 'Terug naar de lijst',
        target: '/list',
        group: MenuGroup.Recipe,
        level: AuthLevel.Cook,
      },
    ]);
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Recipe);
  },
  components: {
    PageMenu,
    LoginChef,
    LoginAdmin,
  },
};
</script>
