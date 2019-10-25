<template>
  <section class="box box--secondary" v-if="changes">
    <h2>Wijzigingen</h2>
    <ol class="changes">
      <li v-for="change in changes" :key="change.id">
        {{ change.date | longDate }}
        <span v-text="`${change.user}`"></span>
        {{ changeText(change.type, recipe.name) }}.
      </li>
    </ol>
    <div class="icon icon-icecream"></div>
  </section>
</template>
<script>
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
  watch: {
    $route() {
      this.update();
    },
  },
  methods: {
    async update() {
      this.changes = await this.$store.dispatch(
        'getRecipeChangeLog',
        this.recipe,
      );
      this.$store.dispatch('getUsers');
    },
    changeText(type, name) {
      switch (type) {
        case 'changed':
          return `heeft wijzigen gemaakt`;
        case 'created':
          return `heeft een nieuw recept voor ${name} gemaakt`;
        case 'add note':
          return `heeft een notitie toegevoegd`;
      }
    },
  },
};
</script>
