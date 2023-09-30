<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { ModalInfo, ModalMutations } from './modal.store';

const store = useStore();
const modal = computed<ModalInfo | null>(() => store.state.ms.modal);
const show = ref<boolean>(false);

watch(modal, (modal: ModalInfo | null) => {
  if (modal) {
    show.value = true;
  }
});

const close = () => {
  show.value = false;
  store.commit(ModalMutations.CloseModal);
};
</script>
<template>
  <div class="modal-container" v-if="modal">
    <section class="modal" :class="{ show }">
      <component
        :is="modal.modal"
        @close="close"
        :data="modal.data"
      ></component>
    </section>
  </div>
</template>
