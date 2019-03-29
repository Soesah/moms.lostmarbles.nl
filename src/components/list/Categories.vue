<template>
  <section>
    <ul>
      <li v-for="category in categories" :key="category.id" v-text="category.name_singular"></li>
    </ul>
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'Categories',
  computed: {
    ...mapState(['categories']),
  },
  created() {
    this.$store.dispatch('getCategories');
  },
};
</script>
