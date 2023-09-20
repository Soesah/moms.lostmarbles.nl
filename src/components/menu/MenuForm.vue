<script lang="ts" setup>
import { Actions } from '@/models/store.model';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const file = ref<HTMLInputElement | null>(null);
const content = ref<string>('');

const submit = async () => {
  const data = new FormData();

  if (file.value !== null) {
    const f = file.value?.files ? file.value?.files[0] : null;
    data.append('file', f!);

    const response = await store.dispatch(Actions.UploadMenuEmail, data);

    content.value = response.data;
  }
};
</script>
<template>
  <div class="box">
    <h1>Menu</h1>

    <form @submit.prevent="submit">
      <div class="form-item">
        <label>Upload a menu</label>
        <input type="file" name="file" ref="file" accept=".eml" />
      </div>
      <pre>
        {{ content }}
      </pre>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
