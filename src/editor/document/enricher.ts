import { NodeType } from './document.info';

export const EDITOR_NAMESPACE = 'https://does-not-matter-right-now/editor';

// add a uuid as @xml:editor-id to the node.
export class XMLEnricher {

  public getEnrichedXML(xml: Document): Document {

    this.enrichNode(xml.documentElement);

    return xml;
  }

  private enrichNode(node: Element) {
    if (node.nodeType === NodeType.ELEMENT) {
      node.setAttributeNS(EDITOR_NAMESPACE, 'editor:node-id', 'test');
    }

    node.childNodes.forEach((child: Node) => this.enrichNode(child as Element));
  }
}
