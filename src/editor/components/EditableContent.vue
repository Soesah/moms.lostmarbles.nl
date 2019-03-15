<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue';
import { VNodeRenderer } from '@/editor/renderer/renderer';
import { getElementByXpath } from '@/editor/util/dom.util';

export default Vue.extend({
  name: 'EditableContent',
  props: {
    xml: {
      type: Document,
    },
    xhtml: {
      type: Document,
    },
    schema: {
      type: Object,
    },
  },
  render(h: CreateElement) {
    const renderer = new VNodeRenderer(h, this.xml, this.schema);

    return renderer.nodeToVNode(
      this.xhtml.documentElement,
      (this as any).handler,
    );
  },
  methods: {
    handler(evt: KeyboardEvent) {
      const el = evt.target;
      const id = (<Element>el).getAttribute('data-editor-node-id');

      evt.preventDefault();
      evt.stopPropagation();
    },
  },
});
</script>

<style scoped>
*[contentEditable='true']:focus {
  outline: none;
  background-color: rgba(255, 250, 205, 0.5);
}
</style>
