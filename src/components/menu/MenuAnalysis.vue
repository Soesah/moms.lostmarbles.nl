<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/models/store.model';
import { ParsedMenuDay, ParsedMenu } from '@/models/menu.model';

const store = useStore();

const parsed = ref<ParsedMenu>({
  id: -1,
  subject: '',
  file: '',
  date: '',
  year: -1,
  week: -1,
  saturday: { meal: '', date: '' },
  sunday: { meal: '', date: '' },
  monday: { meal: '', date: '' },
  tuesday: { meal: '', date: '' },
  wednesday: { meal: '', date: '' },
  thursday: { meal: '', date: '' },
  friday: { meal: '', date: '' },
  ingredients: [],
  next_week: '',
  analyzed: false,
});

const emit = defineEmits(['selectMeal']);

onMounted(async () => {
  const d = await store.dispatch(Actions.AnalyzeMenu);

  parsed.value = d;
});

const selectMeal = (meal: ParsedMenuDay) => {
  emit('selectMeal', meal);
};
</script>
<template>
  <div class="box" v-if="parsed">
    <h1>Analyze {{ parsed.subject }} {{ parsed.year }}</h1>

    <h2>Menu</h2>
    <ul>
      <li>
        <i>Saturday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.saturday)">{{
          parsed.saturday.meal
        }}</a>
      </li>
      <li>
        <i>Sunday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.sunday)">{{
          parsed.sunday.meal
        }}</a>
      </li>
      <li>
        <i>Monday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.monday)">{{
          parsed.monday.meal
        }}</a>
      </li>
      <li>
        <i>Tuesday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.tuesday)">{{
          parsed.tuesday.meal
        }}</a>
      </li>
      <li>
        <i>Wednesday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.wednesday)">{{
          parsed.wednesday.meal
        }}</a>
      </li>
      <li>
        <i>Thursday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.thursday)">{{
          parsed.thursday.meal
        }}</a>
      </li>
      <li>
        <i>Friday</i>:
        <a href="#" @click.prevent="selectMeal(parsed.friday)">{{
          parsed.friday.meal
        }}</a>
      </li>
    </ul>

    <h2>Kopen</h2>
    <ul>
      <li v-for="ing in parsed.ingredients" :key="ing.name">{{ ing.name }}</li>
    </ul>
  </div>
</template>
