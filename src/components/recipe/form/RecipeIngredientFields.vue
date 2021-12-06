<template>
  <div class="form-item form-multiple">
    <label></label>
    <input
      type="text"
      placeholder="Hoeveelheid"
      v-model="val.amount"
      @change="update"
    />
    <input type="text" placeholder="Naam" v-model="val.name" @change="update" />
    <input
      type="text"
      placeholder="Opmerking"
      v-model="val.remark"
      @change="update"
    />
    <div class="field-option">
      <button type="button" class="remove" @click="removeIngredient(index)">
        x
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeIngredientsFields',
  props: {
    index: {
      type: Number,
    },
  },
  created() {
    this.val = this.$attrs.value;
  },
  methods: {
    update() {
      this.$emit('input', this.val);
    },
    removeIngredient() {
      this.$emit('remove', this.index);
    },
  },
};
</script>
