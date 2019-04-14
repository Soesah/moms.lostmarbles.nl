<template>
  <main class="columns">
    <section class="column main">
      <jigsaw xml="/api/editor/xml/recipe.xml" schema="/recipe.xsd" stylesheet="/recipe.xsl"></jigsaw>
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
  },
  created() {
    this.$store.commit('addMenuItems', [
      {
        label: 'Terug naar de lijst',
        target: '/list',
        group: MenuGroup.Admin,
        level: AuthLevel.Cook,
      },
    ]);
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Admin);
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
