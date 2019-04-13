<template>
  <section class="box">
    <form @submit.prevent="submit">
      <h2>Inloggen als administrator</h2>
      <p
        class="description"
      >Om gebruikers te kunnen beheren moet je eerst inloggen met een wachtwoord.</p>
      <div class="form-item">
        <label for="focus">Wachtwoord</label>
        <input type="text" v-model="user.password" v-focus placeholder="(watchwoord)">
      </div>
      <div class="form-buttons">
        <label></label>
        <button type="submit">Inloggen</button>
      </div>
    </form>
  </section>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'LoginAdmin',
  data() {
    return {
      user: {
        password: '',
      },
      // remember: false,
    };
  },
  computed: {
    ...mapState(['redirect']),
  },
  methods: {
    async submit() {
      const status = await this.$store.dispatch('login', {
        type: 'admin',
        auth: this.user,
      });

      if (status) {
        this.$router.push(this.redirect ? this.redirect : '/list');
      }
    },
  },
};
</script>
