<template>
  <section class="box box--secondary">
    <h2>Wijzigingen</h2>
    <ol>
      <li v-for="change in changes" :key="change.id">
        {{ change.date | longDate}}
        <br>
        {{change.user_id}} {{ change.type }} {{ recipe.name}}.
      </li>
      <!--li>
        donderdag 8 november 2012
        <br>Joy heeft een nieuw recept voor Blini's aangemaakt.
      </li-->
    </ol>
    <div class="icon icon-icecream"></div>
  </section>
</template>
<script>
import { longDate } from '@/util/date.util';

export default {
  name: 'RecipeChanges',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      changes: [],
    };
  },
  created() {
    this.update();
  },
  methods: {
    async update() {
      this.changes = await this.$store.dispatch(
        'getRecipeChangeLog',
        this.recipe,
      );
    },
  },
  filters: {
    longDate(date) {
      return longDate(new Date(date));
    },
  },
};
</script>
