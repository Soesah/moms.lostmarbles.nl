<template>
  <nav class="toolbar">
    <template v-for="item in items">
      <a
        href="#"
        class="toolbar-item"
        :key="item.label"
        @click.prevent="activate(item.f)"
        v-text="item.label"
      ></a>
    </template>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'EditorToolbar',
  data() {
    return {
      items: [
        {
          label: 'Emphasis',
          f: 'insertEmphasis',
        },
        {
          label: 'Italic',
          f: 'insertItalic',
        },
        {
          label: 'Underline',
          f: 'insertUnderline',
        },
      ],
    };
  },
  methods: {
    activate(f: string) {
      // console.log(f);
    },
  },
});
</script>
<style scoped>
.toolbar {
  box-sizing: border-box;
  display: flex;
  border: solid 1px gray;
  border-bottom-color: black;
  border-right-color: black;
  background-color: lemonchiffon;
  border-radius: 2px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
}
.toolbar-item {
  padding: 4px;
  text-align: center;
  border: solid 1px gray;
  border-bottom-color: black;
  border-right-color: black;
  border-radius: 2px;
  margin: 2px;
  margin-right: 0px;
  color: black;
  text-decoration: none;
}
.toolbar-item:hover {
  color: gray;
}
</style>
