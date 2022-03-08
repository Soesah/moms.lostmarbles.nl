<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { Actions } from '@/models/store.model';
import Icon from '@/components/common/Icon.vue';

const store = useStore();

const category_id = computed(() => store.state.category_id);
const categories = computed(() => store.state.categories);

onMounted(async () => {
  await store.dispatch(Actions.GetCategories);
});
</script>
<template>
  <section class="box box--secondary">
    <h2>Categoriën</h2>
    <p>Kies een categorie.</p>
    <ul v-if="category_id !== -1">
      <li>
        <router-link to="/list">Alle recepten</router-link>
      </li>
    </ul>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link
          :to="`/list/category/${category.slug}`"
          :class="{ selected: category.id === category_id }"
          v-text="category.name_plural"
        ></router-link>
      </li>
    </ul>
    <Icon name="melon"></Icon>
  </section>
</template>
