<template>
  <section class="box box--tertiary">
    <a @click.prevent="close()" class="box__close">𝖷</a>
    <h2>Edit User</h2>
  </section>
</template>
<script>
export default {
  name: 'EditUser',
  methods: {
    close(user) {
      this.$store.commit('setEditUser', null);
    },
  },
};
</script>
