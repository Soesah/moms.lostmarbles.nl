<template>
  <div class="form-item">
    <label v-text="label"></label>
    <input :type="type" v-model="val" @change="update" />
  </div>
</template>

<script>
export default {
  name: 'RecipeField',
  data() {
    return {
      val: '',
    };
  },
  created() {
    this.val = this.$attrs.value;
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    update() {
      this.$emit('input', this.val);
    },
  },
};
</script>
