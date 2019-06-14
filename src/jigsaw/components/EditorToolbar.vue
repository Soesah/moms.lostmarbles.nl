<template>
  <nav class="toolbar">
    <template v-for="group in config">
      <div class="toolbar-group" :key="group.name">
        <template v-for="item in group.items">
          <a href="#" class="toolbar-item" :key="item.label" @click.prevent="activate(item.command)">
            <span :class="`icon-${item.icon}`"></span>
          </a>
        </template>
      </div>
    </template>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import { toolbarConfig } from './toolbar.config';

export default Vue.extend({
  name: 'EditorToolbar',
  props: {
    editor: {
      type: Object,
    },
  },
  data() {
    return {
      config: toolbarConfig,
    };
  },
  methods: {
    activate(commandName: string) {
      // console.log(commandName);
    },
  },
});
</script>
<style scoped lang="less">
.toolbar {
  box-sizing: border-box;
  display: flex;
  background-color: rgb(121, 156, 187);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 12px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;

  &:before {
    position: absolute;
    top: 0;
    left: -20px;
    width: calc(100% + 40px);
    content: '';
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    height: 100%;
    z-index: -1;
  }
}

.toolbar-group {
  display: flex;
  margin: 3px 2px 2px;
  padding-right: 2px;
  border: solid 1px rgb(87, 123, 156);
  border-top-color: rgb(142, 177, 204);
  border-left-color: rgb(142, 177, 204);
  border-radius: 2px;
}

.toolbar-item {
  padding: 2px 2px 0;
  text-align: center;
  border-radius: 2px;
  margin: 3px 2px 2px;
  margin-right: 0px;
  color: white;
  background: rgb(87, 123, 156);
  font-size: 17px;
  line-height: 17px;
  text-decoration: none;
}
.toolbar-item:hover {
  opacity: 0.5;
}
</style>
