<template>
  <section class="box box--secondary" v-if="latestChange">
    <h2>Wijzigingen</h2>
    <p>De laatste wijziging was {{latestChange.date | longDate }}</p>
  </section>
</template>
<script>
import { mapState } from 'vuex';
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
};
</script>
