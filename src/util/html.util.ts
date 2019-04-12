export interface InlineElement {
  tag: string;
  contents: string;
}

type InlineElements = string | InlineElement;

const InlineElementType: { [index: string]: string } = {
  emphasis: 'i',
  strong: 'b',
  underline: 'u',
  superscript: 'sup',
};

const isStart = (tag: string): boolean =>
  Object.keys(InlineElementType).includes(tag);

const isEnd = (tag: string): boolean =>
  Object.keys(InlineElementType)
    .map((el) => `/${el}`)
    .includes(tag);

export const getInlineElements = (str: string): InlineElements[] =>
  str.split(/\<|\>/g).reduce((acc: InlineElements[], next: string) => {
    const last = acc[acc.length - 1];
    let node: InlineElements = next;

    if (isStart(next)) {
      // create an inline element
      node = {
        tag: InlineElementType[next],
        contents: '',
      };
      acc = [...acc, node];
    } else if (
      !last ||
      (typeof last !== 'string' && last.contents && !isEnd(node))
    ) {
      // just append the next string
      acc = [...acc, node];
    } else if (last && typeof last !== 'string' && !isEnd(node)) {
      // fill the inline element with the next string
      last.contents = node;
    } // isEnd, do nothing.

    return acc;
  }, []);
