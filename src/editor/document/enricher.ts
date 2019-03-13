import { NodeType } from './document.info';
import { UUIDUtil } from '../util/uuid.util';

export const EDITOR_NAMESPACE = 'https://does-not-matter-right-now/editor';

// add a uuid as @xml:editor-id to the node.
export class XMLEnricher {

  public getEnrichedXML(xml: Document): Document {
    this.enrichNode(xml.documentElement);

    return xml;
  }

  public getXML(enriched: Document): Document {
    this.cleanEnrichedNode(enriched.documentElement);

    return enriched;
  }

  private enrichNode(node: Element) {
    if (node.nodeType === NodeType.ELEMENT) {
      node.setAttributeNS(EDITOR_NAMESPACE, 'editor:node-id', UUIDUtil.uuid4());
    }

    node.childNodes.forEach((child: Node) => this.enrichNode(child as Element));
  }

  private cleanEnrichedNode(node: Element) {
    if (node.nodeType === NodeType.ELEMENT) {
      node.removeAttributeNS(EDITOR_NAMESPACE, 'node-id');
    }

    node.childNodes.forEach((child: Node) => this.cleanEnrichedNode(child as Element));

  }
}
