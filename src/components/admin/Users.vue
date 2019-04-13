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
          <div>{{ user.last_login_date | date }}</div>
          <div>{{ userType(user.user_level) }}</div>
        </a>
      </li>
    </ul>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import { AuthLevel } from '../../models/auth.model';

export default {
  name: 'Users',
  computed: {
    ...mapState(['users']),
  },
  methods: {
    userType(level) {
      switch (level) {
        case AuthLevel.Cook:
          return 'Gast Gebruiker';
        case AuthLevel.Chef:
          return 'Gebruiker';
        case AuthLevel.Admin:
          return 'Administrator';
      }
    },
    choose(user) {
      if (this.$route.params.action) {
        this.$router.push('/admin');
      }
      this.$store.commit('setEditUser', user);
    },
  },
};
</script>
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
