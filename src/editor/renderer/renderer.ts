import { VNode, CreateElement } from 'vue';
import { SchemaDocument } from '../schema/document.definition';

export class VNodeRenderer {
  private h: CreateElement;
  private schema: SchemaDocument;

  constructor(
    h: CreateElement,
    schema: SchemaDocument,
  ) {
    this.h = h;
    this.schema = schema;
  }

  public xmlToVNode(xml: Element, handler: (evt: KeyboardEvent) => {}): VNode {
    const tagName = xml.localName;
    const options = {
      class: {
        editable: xml.parentNode instanceof Document,
      },
      domProps: {},
    };
    if (this.schema.isContentEditable(xml.localName)) {
      Object.assign(options.domProps, {
        contentEditable: true,
      });
      Object.assign(options, {
        on: {
          keydown: handler,
        },
      });
    }

    const children = [...xml.childNodes].map((child: ChildNode) =>
      child.nodeType === 3
        ? child.textContent
        : this.xmlToVNode(child as Element, handler),
    );

    return this.h(tagName, options, children);
  }
}
