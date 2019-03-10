export const parseXMLDocument = (contents: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(contents, 'text/xml');
};
