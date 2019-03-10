import { VNode, CreateElement } from 'vue';
import { SchemaDocument } from '../schema/document.definition';

export interface RendererConfig {
  [index: string]: string;
}

export class VNodeRenderer {
  private h: CreateElement;
  private schema: SchemaDocument;
  private config: RendererConfig;

  constructor(
    h: CreateElement,
    schema: SchemaDocument,
    config: RendererConfig,
  ) {
    this.h = h;
    this.schema = schema;
    this.config = config;
  }

  public xmlToVNode(xml: Element, handler: (evt: KeyboardEvent) => {}): VNode {
    const tagName = this.config[xml.localName];
    const options = {
      class: {
        editable: tagName === 'section',
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
