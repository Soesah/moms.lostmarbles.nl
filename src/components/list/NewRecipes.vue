<template>
  <section class="box">
    <h2>Nieuwe recepten</h2>
    <ol class="items">
      <li class="item" v-for="recipe in recipes" :key="recipe.id">
        <h4 v-text="recipe.name"></h4>
        <p>
          Een
          <span class="category" v-text="categoryName(recipe.category_id, false)"></span>
          <span v-if="recipe.cook">van {{ recipe.cook }}</span>
          <span v-if="recipe.servings">{{ servings(recipe) }}</span>. Toegevoegd op
          <span class="date">{{ recipe.creation_date | longDate }}</span>
        </p>
      </li>
    </ol>
    <!--p class="rsslink">
        <a href="/rss/new-recipes">
          <span class="icon icon-rss"></span>
          <span class="rss-text">Volg de nieuwe recepten</span>
        </a>
    </p-->
    <icon name="broccoli"></icon>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
import Icon from '@/components/common/Icon.vue';

export default {
  name: 'NewRecipes',
  data() {
    return {
      recipes: [],
    };
  },
  computed: {
    ...mapGetters(['categoryName']),
  },
  async created() {
    await this.$store.dispatch('getCategories');
    this.recipes = await this.$store.dispatch('getNewRecipes');
  },
  methods: {
    servings(recipe) {
      return recipe.servings
        ? ` voor ${recipe.servings} ${this.persons(recipe)}`
        : '';
    },
    persons(recipe) {
      return recipe.servings === 1 ? 'persoon' : 'personen';
    },
  },
  components: {
    Icon,
  },
};
</script>
