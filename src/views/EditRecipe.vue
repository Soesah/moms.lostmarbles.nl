<template>
  <section>
    <jigsaw xml="api/editor/xml/recipe.xml" schema="./recipe.xsd" stylesheet="./recipe.xsl"></jigsaw>
  </section>
</template>
<script>
import Jigsaw from '@/editor/Jigsaw.vue';

export default {
  name: 'EditRecipe',
  components: {
    Jigsaw,
  },
};
</script>
