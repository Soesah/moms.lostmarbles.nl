import { ComplexNode } from '../elements/complex-node';

export class ComplexSequence {
  get nodes(): ComplexNode[] {
    return [];
  }

  public buildXML(document: Document, includeUUIDs: boolean): DocumentFragment {
    const el = document.createDocumentFragment();

    return el;
  }
}
