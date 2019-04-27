import { VNode, CreateElement } from 'vue';
import { SchemaDocument } from '../schema/document.definition';
import { getElementByXpath } from '../util/dom.util';

export class VNodeRenderer {
  private h: CreateElement;
  private xml: Document;
  private schema: SchemaDocument;

  constructor(h: CreateElement, xml: Document, schema: SchemaDocument) {
    this.h = h;
    this.xml = xml;
    this.schema = schema;
  }

  public nodeToVNode(
    node: Element,
    handler: (evt: KeyboardEvent) => {},
  ): VNode {
    const tagName = node.localName;
    const className = node.getAttribute ? node.getAttribute('class') : null;
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

    const children = [...node.childNodes].map((child: ChildNode) => {
      if (child && child.nodeType === 7) {
        const nodeId = child.textContent ? child.textContent : '';
        Object.assign(options.attrs, {
          'data-editor-node-id': nodeId,
        });

        if (nodeId && this.isContentEditable(nodeId)) {
          Object.assign(options.domProps, {
            contentEditable: true,
          });
          Object.assign(options, {
            on: {
              focus: handler,
              keydown: handler,
            },
          });
        }
        return undefined;
      }

      return child.nodeType === 3
        ? child.textContent
        : this.nodeToVNode(child as Element, handler);
    });

    return this.h(tagName, options, children);
  }

  private isContentEditable(nodeId: string): boolean {
    const node = getElementByXpath(this.xml, `//*[@*[. = "${nodeId}"]]`);
    const nodeName = node.nodeName;

    return this.schema.isContentEditable(nodeName);
  }
}
