<script lang="ts">
import { defineComponent } from 'vue';
import { JigsawState } from '../store';
import { mapState } from 'vuex';
import { JigsawEditor } from '../jigsaw';

export default defineComponent({
  name: 'EditableContent',
  computed: {
    ...mapState('jigsaw', {
      editor: (state) => (state as JigsawState).editor as JigsawEditor,
    }),
  },
  render(h: any) {
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
