import { VNode, CreateElement } from 'vue';
import { SchemaDocument } from '../schema/document.definition';

export class VNodeRenderer {
  private h: CreateElement;
  private schema: SchemaDocument;

  constructor(h: CreateElement, schema: SchemaDocument) {
    this.h = h;
    this.schema = schema;
  }

  public xmlToVNode(xml: Element, handler: (evt: KeyboardEvent) => {}): VNode {
    const tagName = xml.localName;
    const className = xml.getAttribute ? xml.getAttribute('class') : null;
    const classes: any = {};
    if (className) {
      classes[className] = true;
    }

    const options = {
      class: {
        ...classes,
      },
      domProps: {},
      attrs: {},
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

    const children = [...xml.childNodes].map((child: ChildNode) => {
      if (child && child.nodeType === 7) {
        const nodeId = child.textContent ? child.textContent : '';
        Object.assign(options.attrs, {
          'data-editor-node-id': nodeId,
        });
        return undefined;
      }

      return child.nodeType === 3
        ? child.textContent
        : this.xmlToVNode(child as Element, handler);
    });

    return this.h(tagName, options, children);
  }
}
