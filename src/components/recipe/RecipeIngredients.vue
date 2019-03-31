<template>
  <section>
    <h4>Ingrediënten</h4>
    <ul>
      <li class="ingredient" v-for="ingredient in recipe.ingredients" :key="ingredient.name">
        <span class="amount" v-if="ingredient.amount" v-text="ingredient.amount"></span>
        <span class="name" v-text="ingredient.name"></span>
        <template v-if="ingredient.remark">,</template>
        <span class="remark" v-if="ingredient.remark" v-text="ingredient.remark"></span>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'RecipeIngredients',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>
