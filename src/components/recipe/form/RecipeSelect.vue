<template>
  <div class="form-item">
    <label v-text="label"></label>
    <select :type="type" v-model="val" @change="update">
      <option
        v-for="cat in options"
        :key="cat.id"
        :value="cat.id"
        v-text="cat.name_singular"
      ></option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'RecipeSelect',
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
    options: {
      type: Array,
      default: [],
    },
  },
  methods: {
    update() {
      this.$emit('input', this.val);
    },
  },
};
</script>
