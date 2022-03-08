<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { MenuGroup } from '@/models/menu.model';
import { User } from '@/models/user.model';
import { AuthLevel } from '../models/auth.model';
import { Actions, Mutations } from '@/models/store.model';
import Users from '@/components/admin/Users.vue';
import AddUser from '@/components/admin/AddUser.vue';
import EditUser from '@/components/admin/EditUser.vue';
import PageMenu from '@/components/common/PageMenu.vue';

const store = useStore();
const route = useRoute();

const verifyAddUser = () => {
  if (route.params.action === 'add-user') {
    const newUser = new User({
      id: -1,
      name: '',
      email: '',
      last_login_date: '',
      user_level: 0,
    });
    store.commit(Mutations.SetEditUser, newUser);
  }
};

const updateMenu = () => {
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.Admin);
  store.commit(Mutations.AddMenuItems, [
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
};

const edit_user = computed(() => store.state.edit_user);
const auth = computed(() => store.state.auth);

onMounted(() => {
  updateMenu();
  store.dispatch(Actions.GetUsers);
  verifyAddUser();
});

watch(auth, updateMenu);
watch(route, verifyAddUser);

onUnmounted(() => {
  store.commit(Mutations.RemoveMenuGroup, MenuGroup.Admin);
});
</script>
<template>
  <main class="columns">
    <section class="column main">
      <Users></Users>
    </section>
    <section class="column">
      <PageMenu></PageMenu>
      <EditUser v-if="edit_user"></EditUser>
    </section>
  </main>
</template>
