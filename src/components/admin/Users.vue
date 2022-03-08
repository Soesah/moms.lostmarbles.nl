<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { AuthLevel } from '../../models/auth.model';
import { User } from '@/models/user.model';
import { date } from '@/components/common/filters/date.filter';
import { Mutations } from '@/models/store.model';

const store = useStore();
const route = useRoute();
const router = useRouter();

const users = computed(() => store.state.users);

const userType = (level: AuthLevel) => {
  switch (level) {
    case AuthLevel.Chef:
      return 'Chef';
    case AuthLevel.Admin:
      return 'Administrator';
    case AuthLevel.Cook:
    default:
      return 'Kok';
  }
};
const choose = (user: User) => {
  if (route.params.action) {
    router.push('/admin');
  }
  store.commit(Mutations.SetEditUser, user);
};
</script>
<template>
  <section class="box box--secondary">
    <h2>Gebruikers</h2>
    <ul class="items">
      <li class="item header">
        <div>Naam</div>
        <div>Laatste inlog datum</div>
        <div>Type</div>
      </li>
      <li v-for="user in users" :key="user.id" class="item">
        <a class="user" @click.prevent="choose(user)">
          <div>{{ user.name }}</div>
          <div>{{ date(user.last_login_date) }}</div>
          <div>{{ userType(user.user_level) }}</div>
        </a>
      </li>
    </ul>
  </section>
</template>
<style lang="less">
.header {
  display: flex;
  font-size: 1.1em;

  div {
    width: 100%;
  }
}

.user {
  border: none;
  display: flex;
  cursor: pointer;

  div {
    width: 100%;
  }

  &:hover {
    border: none;
  }
}
</style>
