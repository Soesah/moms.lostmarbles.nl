<script lang="ts">
import { defineComponent, h } from 'vue';
import { getInlineElements } from '@/util/html.util';

export default defineComponent({
  props: {
    step: {
      type: String,
      required: true,
    },
  },
  render() {
    const contents = getInlineElements(this.step);
    return h('li', [
      ...contents.map((d) =>
        typeof d === 'string' ? d : h(d.tag, [d.contents]),
      ),
    ]);
  },
});
</script>
