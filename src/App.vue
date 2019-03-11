<template>
  <div id="app">
    <editor xml xsd></editor>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Editor from '@/editor/Editor.vue';

export default Vue.extend({
  components: {
    Editor,
  },
});
</script>

<style lang="less" src="./css/less/moms.less"></style>
