<template>
  <section class="box box--tertiary" v-if="user">
    <a @click.prevent="close()" class="box__close">𝖷</a>
    <form @submit.prevent="submit">
      <h2>Gebruiker wijzigen</h2>
      <p class="description">Wijzig de details van de gebruiker</p>
      <user-fields :user="user"></user-fields>
      <div class="form-buttons">
        <label></label>
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
import UserFields from '@/components/admin/UserFields';

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
  created() {
    this.update();
  },
  watch: {
    edit_user() {
      this.update();
    },
  },
  methods: {
    update() {
      this.user = this.edit_user.clone();
    },
    close(user) {
      this.$store.commit('setEditUser', null);
    },
    submit() {
      this.$store.dispatch('saveUser', this.user);
    },
  },
  components: {
    UserFields,
  },
};
</script>
