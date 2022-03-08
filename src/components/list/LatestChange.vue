<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Change } from '@/models/changes.model';
import { StoreActions } from '@/store';
import Icon from '@/components/common/Icon.vue';
import { longDate } from '@/components/common/filters/date.filter';

const store = useStore();
const latestChange = ref<Change | null>(null);

onMounted(async () => {
  latestChange.value = await store.dispatch(StoreActions.GetLatestChange);
});
</script>
<template>
  <section class="box box--secondary" v-if="latestChange">
    <h2>Wijzigingen</h2>
    <p>
      {{ latestChange.user }} heeft wijzigingen gemaakt aan
      {{ latestChange.recipe }} op {{ longDate(latestChange.date) }}.
    </p>
    <Icon name="beans"></Icon>
  </section>
</template>
