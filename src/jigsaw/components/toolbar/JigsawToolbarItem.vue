<template>
  <div class="jigsaw-toolbar-item">
    <a href="#" class="toolbar-item" @click.prevent="toggleMenu">
      <slot></slot>
    </a>
    <!-- <jigsaw-menu v-if="menuOpen" :items="items"></jigsaw-menu> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

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
  components: {},
});
</script>
<style scoped>
.toolbar-item {
  display: block;
  padding: 2px 2px 2px;
  text-align: center;
  border-radius: 2px;
  margin: 3px 4px 2px;
  margin-right: 0px;
  color: white;
  background: rgb(87, 123, 156);
  font-size: 16px;
  line-height: 17px;
  text-decoration: none;
  padding: 6px;
}
.toolbar-item:hover {
  opacity: 1;
  background: rgb(48, 84, 117);
}
</style>
