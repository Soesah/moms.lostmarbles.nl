<template>
  <section class="box">
    <h2>
      {{ categoryName() || 'Recepten' }}
      <span v-if="searchValue">
        <i>met {{ searchValue }}</i>
      </span>
    </h2>

    <p v-if="loading">De recepten worden geladen...</p>
    <ol>
      <li
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        class="recipe-list-item"
      >
        <i class="star-icon" v-if="isNew(recipe)" />
        <router-link
          :to="`/recipe/${recipe.slug}`"
          v-text="recipe.name"
        ></router-link>
        <router-link
        class="hidden"
          :to="`/recipe/by-id/${recipe.id}`"
          v-text="' by-id'"
        ></router-link>
      </li>
    </ol>
    <icon name="ricebowl"></icon>
  </section>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import Icon from '@/components/common/Icon.vue';
import { MILLISECONDS_IN_DAY } from '@/util/info'

export default {
  name: 'RecipeList',
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState(['searchValue']),
    ...mapGetters(['categoryName']),
    ...mapGetters(['filteredRecipes']),
  },
  methods: {
    isNew(recipe) {
      const THREE_MONTHS = 31 * MILLISECONDS_IN_DAY;
      return Date.parse(recipe.creation_date) > Date.now() - THREE_MONTHS;
    },
  },
  async created() {
    await this.$store.dispatch('getRecipes');
    this.loading = false;
  },
  components: {
    Icon,
  },
};
</script>
<style scoped>
.hidden {
  color: transparent;
  text-decoration: none;
  border:none;
}
</style>
