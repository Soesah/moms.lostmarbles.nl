<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Icon from '@/components/common/Icon.vue';

const store = useStore();
const menu = computed(() => store.state.menu);
</script>
<template>
  <nav class="box box--tertiary">
    <h2>Opties</h2>
    <ul>
      <li v-for="option in menu" :key="`${option.label}-${option.group}`">
        <router-link :to="option.target" v-text="option.label"></router-link>
      </li>
    </ul>
    <icon name="bananas"></icon>
  </nav>
</template>
