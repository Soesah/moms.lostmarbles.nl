<template>
  <section class="box box--secondary">
    <h2>Categoriën</h2>
    <p>Kies een categorie, of sorteer de recepten op datum of naam.</p>
    <ul>
      <li v-if="category_id !== -1">
        <router-link to="/list">Alle recepten</router-link>
      </li>
      <li v-if="false">
        <router-link to="/list/all">Meer nieuwe recepten</router-link>
      </li>
    </ul>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link
          :to="`/list/category/${category.slug}`"
          :class="{'selected': category.id === category_id}"
          v-text="category.name_plural"
        ></router-link>
      </li>
    </ul>
    <icon name="melon"></icon>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import Icon from '@/components/common/Icon.vue';

export default {
  name: 'Categories',
  computed: {
    ...mapState(['category_id', 'categories']),
  },
  created() {
    this.$store.dispatch('getCategories');
  },
  components: {
    Icon,
  },
};
</script>
