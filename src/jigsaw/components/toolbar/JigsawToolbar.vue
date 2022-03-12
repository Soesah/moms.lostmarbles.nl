<script lang="ts" setup>
import { computed, ref } from 'vue';
import { toolbarConfig, ToolbarConfig } from '../toolbar.config';
import { mapState, useStore } from 'vuex';
import { JigsawState } from '../../store';

const config = ref<ToolbarConfig>(toolbarConfig);

const store = useStore();
const editor = computed(() => store.state.editor);

const activate = (commandName: string) => {
  // console.log(commandName);
};
</script>
<template>
  <nav class="toolbar">
    <template v-for="group in config" :key="group.name">
      <div class="toolbar-group">
        <template v-for="item in group.items" :key="item.label">
          <a
            href="#"
            class="toolbar-item"
            :title="item.label"
            @click.prevent="activate(item.command)"
          >
            <span :class="`icon-${item.icon}`"></span>
          </a>
        </template>
      </div>
    </template>
  </nav>
</template>
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
  margin: 2px 2px 2px;
  padding-right: 2px;
  border: solid 1px rgb(87, 123, 156);
  border-top-color: rgb(142, 177, 204);
  border-left-color: rgb(142, 177, 204);
}

.toolbar-item {
  padding: 2px 2px 2px;
  text-align: center;
  border-radius: 2px;
  margin: 3px;
  margin-right: 0px;
  color: white;
  background: rgb(87, 123, 156);
  font-size: 20px;
  line-height: 20px;
  text-decoration: none;
}
.toolbar-item:hover {
  opacity: 1;
  background: rgb(48, 84, 117);
}
</style>
