<script lang="ts" setup>
import { computed } from 'vue';

const { name } = defineProps({
  name: {
    type: String,
  },
});
const img = computed(() => `/img/icons/${name}.png`);
</script>
<template>
  <img class="box-icon" width="70" :src="img" />
</template>
