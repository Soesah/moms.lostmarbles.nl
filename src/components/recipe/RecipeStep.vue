
<script>
import { getInlineElements } from '@/util/html.util';

export default {
  name: 'RecipeSteps',
  props: {
    step: {
      type: String,
      required: true,
    },
  },
  render(h) {
    const contents = getInlineElements(this.step);

    console.log(contents);

    return h('li', [
      ...contents.map((d) =>
        typeof d === 'string' ? d : h(d.tag, [d.contents]),
      ),
    ]);
  },
};
</script>
