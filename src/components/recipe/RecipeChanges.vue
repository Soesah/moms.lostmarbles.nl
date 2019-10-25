<template>
  <section class="box box--secondary" v-if="changes.length">
    <h2>Wijzigingen</h2>
    <ol class="changes">
      <li v-for="change in changes" :key="change.id">
        {{ change.date | longDate }}
        <span v-text="`${change.user}`"></span>
        {{ changeText(change.type, recipe.name) }}.
      </li>
    </ol>
    <icon name="icecream"></icon>
  </section>
</template>
<script>
import Icon from '@/components/common/Icon.vue';
import { mapState } from 'vuex';
export default {
  name: 'RecipeChanges',
  data() {
    return {
      changes: [],
    };
  },
  computed: {
    ...mapState(['recipe']),
  },
  watch: {
    recipe() {
      this.update();
    },
  },
  methods: {
    async update() {
      console.log(
        'updating changes for recipe',
        this.recipe.name,
        this.recipe.id,
      );
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
  components: {
    Icon,
  },
};
</script>
