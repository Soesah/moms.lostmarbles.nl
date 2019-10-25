<template>
  <img class="box-icon" width="70" :src="img" />
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    img() {
      return `/img/icons/${this.name}.png`;
    },
  },
};
</script>
