<template>
  <main class="columns">
    <section class="column main" v-if="xml">
      <jigsaw :xml="xml" schema="/recipe.xsd" stylesheet="/recipe.xsl"></jigsaw>
    </section>
    <section class="column">
      <page-menu></page-menu>
    </section>
  </main>
</template>
<script>
import Jigsaw from '@/editor/Jigsaw';
import PageMenu from '@/components/common/PageMenu';
import { MenuGroup } from '@/models/menu.model';
import { AuthLevel } from '../models/auth.model';
import { mapState } from 'vuex';

export default {
  name: 'EditRecipe',
  computed: {
    ...mapState(['recipe']),
    xml() {
      if (this.recipe) {
        return `/api/recipe/${this.recipe.id}/${this.recipe.category_id}/xml`;
      }

      return '';
    },
  },
  created() {
    this.$store.commit('addMenuItems', [
      {
        label: 'Stoppen met bewerken',
        target: `/recipe/${this.$route.params.slug}`,
        group: MenuGroup.Admin,
        level: AuthLevel.Cook,
      },
      {
        label: 'Terug naar de lijst',
        target: '/list',
        group: MenuGroup.Admin,
        level: AuthLevel.Cook,
      },
    ]);
    this.$store.commit('toggleEditing', true);
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Admin);
    this.$store.commit('toggleEditing', false);
  },
  watch: {
    recipe() {
      this.$store.commit('addMenuItems', [
        {
          label: 'Terug naar recept',
          target: `/recipe/${this.recipe.slug}`,
          group: MenuGroup.Admin,
          level: AuthLevel.Cook,
        },
      ]);
    },
  },
  components: {
    Jigsaw,
    PageMenu,
  },
};
</script>
