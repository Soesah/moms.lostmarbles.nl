<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Mutations } from '@/models/store.model';
import Icon from '@/components/common/Icon.vue';
import { vFocus } from '@/components/common/directives/focus.directive';

const store = useStore();
const searchValue = ref<string>('');

onMounted(() => {
  searchValue.value = store.state.searchValue;
});

const update = () => {
  store.commit(Mutations.SetSearch, searchValue.value);
};

const clear = () => {
  searchValue.value = '';
  update();
};
</script>
<template>
  <section class="box box--tertiary">
    <form @submit.prevent="update">
      <h2>Zoeken</h2>
      <p>Zoek hier op de naam, een ingrediënt of iets dergelijks</p>
      <div class="form-item">
        <label for="focus">Zoeken</label>
      </div>
      <div class="form-item">
        <input
          type="text"
          name="search"
          v-model="searchValue"
          v-focus="true"
          @input="update"
          placeholder="(ei, boerenkool, kip)"
        />
        <button
          v-if="searchValue !== ''"
          class="search__clear-button icon-only"
          @click="clear()"
        >
          <i class="icon icon-close"></i>
        </button>
      </div>
    </form>
    <Icon name="mushroom"></Icon>
  </section>
</template>
