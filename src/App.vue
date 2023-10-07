<script lang="ts" setup>
import Notifications from '@/components/common/Notifications.vue';
import Modal from '@/components/common/modal/Modal.vue';
</script>
<template>
  <div id="app">
    <!-- :class="{ 'editor-active': editing }" -->
    <RouterView></RouterView>
    <Notifications></Notifications>
    <Modal></Modal>
  </div>
</template>
<style lang="less" src="./css/less/moms.less"></style>
