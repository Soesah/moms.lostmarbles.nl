import { ComplexNode } from '../elements/complex-node';

export class ComplexChoice {
  get nodes(): ComplexNode[] {
    return [];
  }

  public buildXML(document: Document, includeUUIDs: boolean): DocumentFragment {
    const el = document.createDocumentFragment();

    return el;
  }
}
