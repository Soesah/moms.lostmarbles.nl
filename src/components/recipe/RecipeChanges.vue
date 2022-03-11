<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { Recipe } from '@/models/recipe.model';
import { Change, changeText } from '@/models/changes.model';
import { Actions } from '@/models/store.model';
import Icon from '@/components/common/Icon.vue';
import { longDate } from '@/components/common/filters/date.filter';

const store = useStore();
const { recipe } = defineProps({
  recipe: {
    type: Recipe,
    required: true,
  },
});

const changes = ref<Change[]>([]);

const update = async () => {
  const data = await store.dispatch(Actions.GetRecipeChangeLog, recipe);
  changes.value = data ? data : [];
  store.dispatch(Actions.GetUsers);
};

watch(recipe, update);

onMounted(async () => {
  await update();
});
</script>
<template>
  <section class="box box--secondary" v-if="changes.length">
    <h2>Wijzigingen</h2>
    <ol class="changes">
      <li v-for="change in changes" :key="change.id">
        {{ longDate(change.date) }}
        <span v-text="`${change.user}`"></span>
        {{ changeText(change.type, recipe.name) }}.
      </li>
    </ol>
    <Icon name="icecream"></Icon>
  </section>
</template>
