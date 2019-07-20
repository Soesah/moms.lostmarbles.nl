<template>
  <div class="jigsaw-toolbar-item">
    <a href="#" class="toolbar-item" @click.prevent="toggleMenu">
      <slot></slot>
    </a>
    <jigsaw-menu v-if="menuOpen" :items="items"></jigsaw-menu>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import JigsawMenu from './JigsawMenu.vue';

export default Vue.extend({
  name: 'JigsawToolbarItem',

  data() {
    return {
      menuOpen: false,
      items: [],
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
  components: {
    JigsawMenu,
  },
});
</script>
<style scoped>
.toolbar-item {
  padding: 2px 2px 0;
  text-align: center;
  border-radius: 2px;
  margin: 3px 2px 2px;
  margin-right: 0px;
  color: white;
  background: rgb(87, 123, 156);
  font-size: 14px;
  line-height: 17px;
  text-decoration: none;
  padding: 4px 8px;
}
.toolbar-item:hover {
  opacity: 0.5;
}
</style>
