<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { User } from '@/models/user.model';
import { StoreActions } from '@/store';
import Icon from '@/components/common/Icon.vue';
import { vFocus } from '@/components/common/directives/focus.directive';

const store = useStore();
const router = useRouter();
const auth = ref<Partial<User>>({ name: '' });
const redirect = store.state.redirect;

const submit = async () => {
  const status = await store.dispatch(StoreActions.Login, {
    type: 'cook',
    auth: auth.value,
  });

  if (status) {
    router.push(redirect ? redirect : '/list');
  }
};
</script>
<template>
  <section class="box box--tertiary">
    <form @submit.prevent="submit">
      <h2>Welkom</h2>
      <p class="description">
        Om gebruik te kunnen maken van Mom's Lost Marbles dient u in te loggen.
      </p>
      <div class="form-item">
        <label for="focus">Naam</label>
        <input
          type="text"
          v-model="auth.name"
          v-focus="true"
          placeholder="(naam)"
        />
      </div>
      <div class="form-buttons">
        <label></label>
        <button type="submit">Inloggen</button>
      </div>
      <p class="description">
        Deze website gaat over en gebruikt
        <i>cookies</i>.
      </p>
    </form>
    <Icon name="bowl2"></Icon>
  </section>
</template>
