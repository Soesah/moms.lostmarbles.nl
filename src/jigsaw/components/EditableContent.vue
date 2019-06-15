<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue';
import { VNodeRenderer } from '@/jigsaw/renderer/vnode-renderer';
import { getElementByXpath } from '@/jigsaw/util/dom.util';
import { mapState } from 'vuex';
import { JigsawState } from '../store';

export default Vue.extend({
  name: 'EditableContent',
  computed: {
    ...mapState('jigsaw', {
      editor: (state: JigsawState) => state.editor,
    }),
  },
  render(h: CreateElement) {
    const renderer = this.editor.getRenderer(h);
    const xhtml = this.editor.getXHTML();
    const handler = this.editor.handleDomEvent.bind(this.editor);

    // bind to selection change
    document.addEventListener(
      'selectionchange',
      this.editor.handleSelectionChange.bind(this.editor),
    );

    // convert the XHTML output to VNodes so that vue can render them
    return renderer.nodeToVNode(xhtml.documentElement, handler, null);
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
