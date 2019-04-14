<template>
  <div id="app" :class="{'editor-active': editing}">
    <page-title></page-title>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import PageTitle from '@/components/common/PageTitle.vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'MomsRecipeApp',
  computed: {
    ...mapState(['editing']),
  },
  components: {
    PageTitle,
  },
});
</script>

<style lang="less" src="./css/less/moms.less"></style>
