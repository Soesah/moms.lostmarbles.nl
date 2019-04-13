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
import { MenuGroup } from '@/models/menu.model';
import { mapState } from 'vuex';
import { User } from '@/models/user.model';
import { AuthLevel } from '../models/auth.model';

export default {
  name: 'Admin',
  computed: {
    ...mapState(['edit_user', 'auth']),
  },
  created() {
    this.updateMenu();
    this.$store.dispatch('getUsers');
    this.verifyAddUser();
  },
  watch: {
    auth() {
      this.updateMenu();
    },
    $route() {
      this.verifyAddUser();
    },
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Admin);
  },
  methods: {
    updateMenu() {
      this.$store.commit('removeMenuGroup', MenuGroup.Admin);
      this.$store.commit('addMenuItems', [
        {
          label: 'Gebruiker toevoegen',
          target: '/admin/add-user',
          group: MenuGroup.Admin,
          level: AuthLevel.Admin,
        },
        {
          label: 'Terug naar de lijst',
          target: '/list',
          group: MenuGroup.Admin,
          level: AuthLevel.Cook,
        },
      ]);
    },
    verifyAddUser() {
      if (this.$route.params.action === 'add-user') {
        const newUser = new User({
          id: -1,
        });
        this.$store.commit('setEditUser', newUser);
      }
    },
  },
  components: {
    Users,
    AddUser,
    EditUser,
    PageMenu,
  },
};
</script>
