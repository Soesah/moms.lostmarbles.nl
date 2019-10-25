<template>
  <section class="box box--tertiary">
    <form @submit.prevent="update">
      <h2>Zoeken</h2>
      <p>Zoek hier op de naam, een ingrediënt of iets dergelijks</p>
      <div class="form-item">
        <label for="focus">Zoeken</label>
        <input
          type="text"
          name="search"
          v-model="searchValue"
          v-focus
          @input="update"
          placeholder="(ei, boerenkool, kip)"
        />
        <button v-if="searchValue !== ''" class="search__clear-button icon-only" @click="clear()">
          <i class="icon icon-close"></i>
        </button>
      </div>
    </form>
    <icon name="mushroom"></icon>
  </section>
</template>
<script>
import Icon from '@/components/common/Icon.vue';
export default {
  name: 'Search',
  data() {
    return {
      searchValue: '',
    };
  },
  created() {
    this.searchValue = this.$store.state.searchValue;
  },
  methods: {
    update() {
      this.$store.commit('setSearch', this.searchValue);
    },
    clear() {
      this.searchValue = '';
      this.update();
    },
  },
  components: {
    Icon,
  },
};
</script>
