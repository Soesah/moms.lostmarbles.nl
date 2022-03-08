<script lang="ts" setup>
import PageTitle from '@/components/common/PageTitle.vue';
import Notifications from '@/components/common/Notifications.vue';
</script>
<template>
  <div id="app">
    <!-- :class="{ 'editor-active': editing }" -->
    <PageTitle></PageTitle>
    <RouterView></RouterView>
    <Notifications></Notifications>
  </div>
</template>
<style lang="less" src="./css/less/moms.less"></style>
