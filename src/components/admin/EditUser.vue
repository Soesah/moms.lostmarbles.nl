<template>
  <section class="box box--tertiary" v-if="user">
    <a @click.prevent="close()" class="box__close">𝖷</a>
    <form @submit.prevent="submit">
      <h2>Edit User</h2>
      <p class="description">Wijzig de details van de gebruiker</p>
      <div class="form-item">
        <label for="focus">Naam</label>
        <input type="text" placeholder="(naam)" v-model="user.name">
      </div>
      <div class="form-item">
        <label for="focus">Email</label>
        <input type="text" placeholder="(email)" v-model="user.email">
      </div>
      <div class="form-item">
        <label for="focus">Type</label>
        <select v-model="user.user_level">
          <option value="0">Gast Gebruiker</option>
          <option value="50">Gebruiker</option>
          <option value="100">Administrator</option>
        </select>
      </div>
      <div class="form-buttons">
        <button type="submit">Wijzigen</button>
      </div>
    </form>
    <dl>
      <dt>Gast Gebruiker</dt>
      <dd>Een gast gebruiker kan de recepten alleen lezen.</dd>
      <dt>Gebruiker</dt>
      <dd>Een gebruiker kan de recepten lezen en wijzigen.</dd>
      <dt>Administrator</dt>
      <dd>Een administrator kan de recepten lezen en wijzigen en ook de gebruikers beheren.</dd>
    </dl>
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'EditUser',
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapState(['edit_user']),
  },
  watch: {
    edit_user(value) {
      this.user = value.clone();
    },
  },
  methods: {
    close(user) {
      this.$store.commit('setEditUser', null);
    },
    submit() {
      this.$store.dispatch('saveUser', this.user);
    },
  },
};
</script>
