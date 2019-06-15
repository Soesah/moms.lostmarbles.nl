<template>
  <div class="jigsaw-toolbar-item">
    <slot></slot>
    <jigsaw-menu :items="items"></jigsaw-menu>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import JigsawMenu from './JigsawMenu.vue';

  export default Vue.extend({
    name: "JigsawToolbarItem",

    data() {
      return {
        items: [],
      }
    },
    components: {
      JigsawMenu
    }
  })
</script>
<style scoped>

</style>
