<template>
  <nav class="box box--tertiary">
    <h2>Opties</h2>
    <ul>
      <li v-for="option in menu" :key="`${option.label}-${option.group}`">
        <router-link :to="option.target" v-text="option.label"></router-link>
      </li>
    </ul>
    <icon name="bananas"></icon>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import Icon from '@/components/common/Icon.vue';

export default {
  name: 'PageMenu',
  computed: {
    ...mapState(['menu']),
  },
  components: {
    Icon,
  },
};
</script>
