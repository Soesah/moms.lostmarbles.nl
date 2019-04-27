<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue';
import { VNodeRenderer } from '@/editor/renderer/vnode-renderer';
import { getElementByXpath } from '@/editor/util/dom.util';

export default Vue.extend({
  name: 'EditableContent',
  props: {
    editor: {
      type: Object,
    },
  },
  render(h: CreateElement) {
    const renderer = this.editor.getRenderer(h);
    const xhtml = this.editor.getXHTML();
    const handler = this.editor.handleDomEvent.bind(this.editor);

    // convert the XHTML output to VNodes so that vue can render them
    return renderer.nodeToVNode(xhtml.documentElement, handler);
  },
  methods: {},
});
</script>

<style scoped>
*[contentEditable='true']:focus {
  outline: none;
  background-color: rgba(255, 250, 205, 0.5);
}
</style>
