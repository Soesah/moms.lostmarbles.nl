<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/models/store.model';
import { ParsedMenu } from '@/models/menu.model';

const store = useStore();

const parsed = ref<ParsedMenu>();

onMounted(async () => {
  const d = await store.dispatch(Actions.AnalyzeMenu);

  parsed.value = d.data.data;
});

const submit = () => {};
</script>
<template>
  <div class="box" v-if="parsed">
    <h1>Analyze {{ parsed.subject }} {{ parsed.year }}</h1>

    <h2>Menu</h2>
    <ul>
      <li><i>Saturday</i>: {{ parsed.saturday.meal }}</li>
      <li><i>Sunday</i>: {{ parsed.sunday.meal }}</li>
      <li><i>Monday</i>: {{ parsed.monday.meal }}</li>
      <li><i>Tuesday</i>: {{ parsed.tuesday.meal }}</li>
      <li><i>Wednesday</i>: {{ parsed.wednesday.meal }}</li>
      <li><i>Thursday</i>: {{ parsed.thursday.meal }}</li>
      <li><i>Friday</i>: {{ parsed.friday.meal }}</li>
    </ul>

    <h2>Kopen</h2>
    <ul>
      <li v-for="ing in parsed.ingredients" :key="ing.name">{{ ing.name }}</li>
    </ul>
  </div>
</template>
