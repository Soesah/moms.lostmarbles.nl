<template>
  <main class="columns">
    <section class="column main-large" v-if="recipe">
      <!-- <jigsaw
        :xml="xml"
        schema="/recipe.xsd"
        stylesheet="/recipe.xsl"
        config="/config.json"
        @save="saveRecipe"
      ></jigsaw>-->
      <recipe-form :recipe="recipe" @cancel="cancel" @updateRecipe="saveRecipe"></recipe-form>
    </section>
    <section class="column">
      <page-menu></page-menu>
    </section>
  </main>
</template>
<script>
import PageMenu from '@/components/common/PageMenu';
import RecipeForm from '@/components/recipe/form/RecipeForm.vue';
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
    this.update();
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
  methods: {
    update() {
      const slug = this.$route.params.slug;
      const id = this.$route.params.id;
      if (!slug && !id) {
        this.$store.dispatch('newRecipe');
      }
      if (slug) {
        this.$store.dispatch('getRecipeBySlug', slug);
      }
      if (id) {
        this.$store.dispatch('getRecipeById', id);
      }
      this.$store.dispatch('getCategories');
    },
    async saveRecipe(recipe) {
      const update = await this.$store.dispatch('saveRecipe', recipe);

      if (update) {
        this.$router.push(`/recipe/${update.slug}`);
      }
    },
    cancel() {
      this.$router.push(`/recipe/${this.$route.params.slug}`);
    },
  },
  components: {
    PageMenu,
    RecipeForm,
  },
};
</script>
