<template>
  <main class="columns">
    <section class="column main">
      <users></users>
    </section>
    <section class="column">
      <page-menu></page-menu>
      <add-user v-if="edit_user && edit_user.id === -1"></add-user>
      <edit-user v-if="edit_user && edit_user.id !== -1"></edit-user>
    </section>
  </main>
</template>
<script>
import Users from '@/components/admin/Users';
import AddUser from '@/components/admin/AddUser';
import EditUser from '@/components/admin/EditUser';
import PageMenu from '@/components/common/PageMenu';
import { MenuGroup } from '../models/menu.model';
import { mapState } from 'vuex';

export default {
  name: 'Admin',
  computed: {
    ...mapState(['edit_user']),
  },
  created() {
    this.$store.commit('addMenuItems', [
      {
        label: 'Gebruiker toevoegen',
        target: '/admin/add-user',
        group: MenuGroup.Admin,
      },
      {
        label: 'Terug naar de lijst',
        target: '/list',
        group: MenuGroup.Recipe,
      },
    ]);
    this.$store.dispatch('getUsers');
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Admin);
    this.$store.commit('removeMenuGroup', MenuGroup.Recipe);
  },
  components: {
    Users,
    AddUser,
    EditUser,
    PageMenu,
  },
};
</script>
