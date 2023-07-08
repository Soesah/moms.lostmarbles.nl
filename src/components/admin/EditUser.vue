<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { User } from '@/models/user.model';
import { Actions, Mutations } from '@/models/store.model';
import UserFields from './UserFields.vue';

const store = useStore();
const user = ref<User | null>(null);
const edit_user = computed<User>(() => store.state.edit_user);

const update = () => {
  user.value = edit_user.value ? edit_user.value.clone() : null;
};

watch(edit_user, update);
onMounted(() => update);

const close = () => {
  store.commit(Mutations.SetEditUser, null);
};
const submit = () => {
  if (edit_user.value.id === -1) {
    store.dispatch(Actions.SaveUser, user.value);
  } else {
    store.dispatch(Actions.UpdateUser, user.value);
  }
};

const action = computed<string>(() =>
  edit_user.value.id === -1 ? 'toevoegen' : 'wijzigen',
);

const capitalize = (text: string) =>
  `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
</script>
<template>
  <section class="box box--tertiary" v-if="user">
    <a @click.prevent="close()" class="box__close">𝖷</a>
    <form @submit.prevent="submit">
      <h2>Gebruiker {{ action }}</h2>
      <p class="description">Wijzig de details van de gebruiker</p>
      <UserFields :user="user"></UserFields>
      <div class="form-buttons">
        <label></label>
        <button type="submit">{{ capitalize(action) }}</button>
      </div>
    </form>
    <dl>
      <dt>Kok</dt>
      <dd>Een kok kan de recepten alleen lezen.</dd>
      <dt>Chef</dt>
      <dd>Een chef kan de recepten lezen en wijzigen.</dd>
      <dt>Administrator</dt>
      <dd>
        Een administrator kan de recepten lezen en wijzigen en ook de gebruikers
        beheren.
      </dd>
    </dl>
  </section>
</template>
