<template>
  <div id="app">
    <page-title></page-title>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import PageTitle from '@/components/common/PageTitle.vue';

export default Vue.extend({
  name: 'MomsRecipeApp',
  components: {
    PageTitle,
  },
});
</script>

<style lang="less" src="./css/less/moms.less"></style>
