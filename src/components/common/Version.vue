<script setup lang="ts">
import versionInfo from '@/version.json';
import { Version } from '@/models/version.model';
import { computed } from 'vue';

const v = new Version(versionInfo);
const version = computed(() => `Version ${v.version}`);
</script>
<template>
  <span class="version" v-text="version"></span>
</template>
