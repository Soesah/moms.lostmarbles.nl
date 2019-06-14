import { VNode, CreateElement } from 'vue';
import { SchemaDocument } from '../schema/document.definition';
import { getElementByXpath } from '../util/dom.util';
import { NodeType } from '../document/document.info';
import { ComplexDocument } from '../document/complex-document';

export class VNodeRenderer {
  private h: CreateElement;
  private xml: Document;
  private schema: SchemaDocument;

  constructor(h: CreateElement, document: ComplexDocument) {
    this.h = h;
    this.xml = document.getXML(true);
    this.schema = document.schema;
  }

  public nodeToVNode(
    node: Element,
    handler: (evt: KeyboardEvent) => {},
    parent: null | Element,
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
      on: {},
    };

    const children = [...node.childNodes]
      .map((child: ChildNode) => {
        if (child && child.nodeType === NodeType.PROCESSING_INSTRUCTION) {
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
                keydown: handler,
              },
            });
          }
          return undefined;
        }

        return child.nodeType === NodeType.TEXT
          ? child.textContent
          : this.nodeToVNode(child as Element, handler, node);
      })
      .filter((n) => n);


    return this.h(tagName, options, children);
  }

  private isContentEditable(nodeId: string): boolean {
    const node = getElementByXpath(this.xml, `//*[@*[. = "${nodeId}"]]`);
    const nodeName = node.nodeName;

    return this.schema.isContentEditable(nodeName);
  }
}
