<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue';
import { VNodeRenderer } from '@/editor/renderer/renderer';

export default Vue.extend({
  name: 'EditorContextMenu',
  props: {
    xml: {
      type: Document,
    },
    schema: {
      type: Object,
    },
  },
  render(h: CreateElement) {
    const renderer = new VNodeRenderer(h, this.schema);

    return renderer.xmlToVNode(this.xml.documentElement, (this as any).handler);
  },
  methods: {
    handler(evt: KeyboardEvent) {
      // console.log(evt.target);
      evt.preventDefault();
      evt.stopPropagation();
    },
  },
});
</script>

<style scoped>
.editable {
  box-sizing: border-box;
  border: dashed 1px gray;
  max-width: 100%;
  height: auto;
  min-height: 200px;
  padding: 8px;
  margin: 4px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
*[contentEditable='true']:focus {
  outline: none;
  background-color: lemonchiffon;
}
</style>
