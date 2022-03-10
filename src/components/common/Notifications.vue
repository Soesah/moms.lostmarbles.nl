<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const notifications = computed(() => store.state.notifications);

const dismiss = (uuid: string) => {
  store.commit('dismiss', uuid);
};
</script>
<template>
  <ul class="notifications" v-if="notifications.length">
    <li
      v-for="notification in notifications"
      :class="'notification ' + notification.type"
      :key="notification.uuid"
    >
      <span v-text="notification.text"></span>
      <button
        type="button"
        class="icon-only"
        @click="dismiss(notification.uuid)"
      >
        <i class="icon icon-close"></i>
      </button>
    </li>
  </ul>
</template>
