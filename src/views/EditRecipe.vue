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

export default {
  name: 'EditRecipe',
  created() {
    this.$store.commit('addMenuItems', [
      {
        label: 'Terug naar de lijst',
        target: '/list',
        group: MenuGroup.Recipe,
        level: AuthLevel.Cook,
      },
    ]);
  },
  destroyed() {
    this.$store.commit('removeMenuGroup', MenuGroup.Recipe);
  },
  components: {
    Jigsaw,
    PageMenu,
  },
};
</script>
