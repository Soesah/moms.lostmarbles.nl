<template>
  <section class="box box--tertiary">
    <form @submit.prevent="submit">
      <h2>Welkom</h2>
      <p class="description">Om gebruik te kunnen maken van Mom's Lost Marbles dient u in te loggen.</p>
      <div class="form-item">
        <label for="focus">Naam</label>
        <input type="text" v-model="user.name" v-focus placeholder="(naam)" />
      </div>
      <!-- <div class="form-item">
        <label></label>
        <input
          type="checkbox"
          id="remember"
          v-model="remember"
          name="remember"
          value="remember"
          class="checkbox"
        >
        <label for="remember">Onthouden</label>
      </div>-->
      <div class="form-buttons">
        <label></label>
        <button type="submit">Inloggen</button>
      </div>
      <p class="description">
        Deze website gaat over en gebruikt
        <i>cookies</i>.
        <!--Door 'onthouden' aan te vinken stopt u uw hand in de koekjestrommel.-->
      </p>
    </form>
    <icon name="bowl2"></icon>
  </section>
</template>
<script>
import Icon from '@/components/common/Icon.vue';
import { mapState } from 'vuex';
export default {
  name: 'LoginCook',
  data() {
    return {
      user: {
        name: '',
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
        type: 'cook',
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
