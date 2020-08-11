<template>
  <div v-if="val">
    <h3 v-text="label"></h3>
    <template v-for="(step, index) in val">
      <div class="form-item" :key="index">
        <label></label>
        <textarea
          v-model="val[index].contents"
          rows="4"
          :placeholder="`Stap ${index + 1}`"
        ></textarea>
      </div>
    </template>
    <div class="form-option">
      <button type="button" @click="addStep">Stap toevoegen</button>
    </div>
  </div>
</template>

<script>
import RecipeIngredientFields from './RecipeIngredientFields';

export default {
  name: 'RecipeFormIngredients',
  data() {
    return {
      val: [],
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
    addStep() {
      this.val = [
        ...this.val,
        {
          name: '',
        },
      ];
      this.update();
    },
  },
  components: {
    RecipeIngredientFields,
  },
};
</script>
