<template>
  <div>
    <div class="form-item">
      <label for="focus">Naam</label>
      <input type="text" placeholder="(naam)" v-model="user.name">
    </div>
    <div class="form-item">
      <label for="focus">Email</label>
      <input type="text" placeholder="(email)" v-model="user.email">
    </div>
    <div class="form-item">
      <label for="focus">Type</label>
      <select v-model.number="user.user_level">
        <option value="0">Kok</option>
        <option value="50">Chef</option>
        <option value="100">Administrator</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserFields',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
