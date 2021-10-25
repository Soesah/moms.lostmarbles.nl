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
        <div class="field-option">
          <button type="button" class="remove" @click="removeStep(index)">
            x
          </button>
        </div>
      </div>
    </template>
    <div class="form-option">
      <button type="button" @click="addStep">Stap toevoegen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeFormSteps',
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
    removeStep(index) {
      this.val.splice(index, 1);
      this.update();
    },
  },
};
</script>
