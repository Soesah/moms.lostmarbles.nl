<template>
  <section class="box box--secondary" v-if="latestChange">
    <h2>Wijzigingen</h2>
    <p>{{ latestChange.user }} heeft wijzigingen gemaakt aan {{ latestChange.recipe }} op {{latestChange.date | longDate }}.</p>
    <icon name="beans"></icon>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import Icon from '@/components/common/Icon.vue';

export default {
  name: 'LatestChange',
  data() {
    return {
      latestChange: null,
    };
  },
  async created() {
    this.latestChange = await this.$store.dispatch('getLatestChange');
  },
  components: {
    Icon,
  },
};
</script>
