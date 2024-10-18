<script lang="ts" setup>
import { MomsState, Mutations } from '@/models/store.model';
import { onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore<MomsState>();
const cookingMode = ref<boolean>(false);

const toggle = () => {
  cookingMode.value = !cookingMode.value;
  store.commit(Mutations.ToggleNoSleep, cookingMode.value);
};

onUnmounted(() => {
  store.commit(Mutations.ToggleNoSleep, false);
});
</script>
<template>
  <label class="switch">
    <input name="cookingmode" type="checkbox" @change="toggle" />
    <span class="slider round"></span>
  </label>
</template>
