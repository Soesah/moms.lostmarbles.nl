<template>
  <div class="form-item form-multiple">
    <label></label>
    <input type="text" v-model="val.amount" @change="update" />
    <input type="text" v-model="val.name" @change="update" />
    <input type="text" v-model="val.remark" @change="update" />
  </div>
</template>

<script>
export default {
  name: 'RecipeField',
  data() {
    return {
      val: {
        name: '',
      },
    };
  },
  created() {
    this.val = this.$attrs.value;
  },
  methods: {
    update() {
      this.$emit('input', this.val);
    },
  },
};
</script>
