import { EDITOR_NAMESPACE } from '../document/enricher';

export const parseXMLDocument = (contents: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(contents, 'text/xml');
};

export const getElementsByXpath = (doc: Document, xpath: string): Node[] => {
  const result = doc.evaluate(
    xpath,
    doc,
    {
      lookupNamespaceURI: (prefix) => (prefix ? EDITOR_NAMESPACE : ''),
    },
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );

  let item = result.snapshotItem(0);
  let items: Node[] = [item];

  while (items.length < result.snapshotLength) {
    item = result.snapshotItem(items.length);
    items = [...items, item];
  }

  items = items.filter((node) => node);

  if (items.length === 0) {
    throw new Error(`Node not found '${xpath}'`);
  }

  return items;
};

export const getElementByXpath = (doc: Document, xpath: string): Node =>
  getElementsByXpath(doc, xpath)[0];
