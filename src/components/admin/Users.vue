<template>
  <section class="box box--secondary">
    <h2>Gebruikers</h2>

    <ul class="items">
      <li v-for="user in users" :key="user.id" class="item">
        <a class="user" @click.prevent="choose(user)">
          <div>{{ user.name }}</div>
          <div>{{ user.last_login_date | date }}</div>
          <div>{{ userType(user.user_level) }}</div>
        </a>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import { UserLevel } from '../../models/user.model';

export default {
  name: 'Users',
  computed: {
    ...mapState(['users']),
  },
  methods: {
    userType(level) {
      switch (level) {
        case UserLevel.Guest:
          return 'Gast Gebruiker';
        case UserLevel.User:
          return 'Gebruiker';
        case UserLevel.Admin:
          return 'Administrator';
      }
    },
    choose(user) {
      this.$store.commit('setEditUser', user);
    },
  },
};
</script>
<style lang="less">
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
