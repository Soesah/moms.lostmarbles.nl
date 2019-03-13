<script lang="ts">
import Vue, { CreateElement, VNode } from 'vue';
import { VNodeRenderer } from '@/editor/renderer/renderer';

export default Vue.extend({
  name: 'EditableContent',
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
      evt.preventDefault();
      evt.stopPropagation();
    },
  },
});
</script>

<style scoped>
*[contentEditable='true']:focus {
  outline: none;
  background-color: lemonchiffon;
}
</style>
