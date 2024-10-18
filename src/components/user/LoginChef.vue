<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { User } from '@/models/user.model';
import { Actions } from '@/models/store.model';
import Icon from '@/components/common/Icon.vue';
import { vFocus } from '@/components/common/directives/focus.directive';

const store = useStore();
const router = useRouter();
const auth = ref<Partial<User>>({ password: '' });
const redirect = store.state.redirect;

const submit = async () => {
  const status = await store.dispatch(Actions.Login, {
    type: 'chef',
    auth: auth.value,
  });

  if (status) {
    router.push(redirect ? redirect : '/list');
  }
};
</script>
<template>
  <section class="box">
    <form @submit.prevent="submit">
      <h2>Inloggen als chef</h2>
      <p class="description">
        Om een recept te kunnen bewerken of toe te voegen moet je eerst inloggen
        met een wachtwoord.
      </p>
      <div class="form-item">
        <label for="focus">Wachtwoord</label>
        <input
          type="password"
          v-model="auth.password"
          v-focus="true"
          placeholder="(watchwoord)"
        />
      </div>
      <div class="form-buttons">
        <label></label>
        <button type="submit">Inloggen</button>
      </div>
    </form>
    <icon name="bowl2"></icon>
  </section>
</template>
