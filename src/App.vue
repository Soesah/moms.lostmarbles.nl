<template>
  <div id="app">
    <jigsaw xml="api/editor/xml/recipe.xml" schema="./recipe.xsd" stylesheet="./recipe.xsl"></jigsaw>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Jigsaw from '@/editor/Jigsaw.vue';

export default Vue.extend({
  components: {
    Jigsaw,
  },
});
</script>

<style lang="less" src="./css/less/moms.less"></style>
