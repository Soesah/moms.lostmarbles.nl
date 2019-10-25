<template>
  <section class="box">
    <form @submit.prevent="submit">
      <h2>Inloggen als chef</h2>
      <p
        class="description"
      >Om een recept te kunnen bewerken of toe te voegen moet je eerst inloggen met een wachtwoord.</p>
      <div class="form-item">
        <label for="focus">Wachtwoord</label>
        <input type="text" v-model="user.password" v-focus placeholder="(watchwoord)" />
      </div>
      <div class="form-buttons">
        <label></label>
        <button type="submit">Inloggen</button>
      </div>
    </form>
    <icon name="bowl2"></icon>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import Icon from '@/components/common/Icon.vue';

export default {
  name: 'LoginChef',
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
        type: 'chef',
        auth: this.user,
      });

      if (status) {
        this.$router.push(this.redirect ? this.redirect : '/list');
      }
    },
  },
  components: {
    Icon,
  },
};
</script>
