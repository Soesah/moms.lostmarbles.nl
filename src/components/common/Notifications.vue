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
<script>
import { mapState } from 'vuex';

export default {
  name: 'Notifications',
  computed: {
    ...mapState(['notifications']),
  },
  methods: {
    dismiss(uuid) {
      this.$store.commit('dismiss', uuid);
    },
  },
};
</script>
