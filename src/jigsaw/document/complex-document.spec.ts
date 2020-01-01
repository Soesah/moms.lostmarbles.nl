import { ComplexDocument } from './complex-document';
import { xmlDocument1, xmlDocument1a } from './complex-document.unit';
import { schemaDocument2 } from '../schema/parser/schema-parser.unit';
import { ComplexNode } from './elements/complex-node';
import { parseXMLDocument } from '../util/dom.util';
import { SchemaElement } from '../schema/definition/schema-element';
import { SchemaType } from '../schema/definition/schema-definition';
import { SchemaParser } from '../schema/parser/schema-parser';
import { ComplexAttribute } from './elements/complex-attribute';

describe('Complex Document', () => {
  let document: ComplexDocument;

  const arrange = (xml: string, xsd: string) => {
    const doc = parseXMLDocument(xml);
    const schema = parseXMLDocument(xsd);

    document = new ComplexDocument(doc, schema);
  };

  beforeEach(() => {
    arrange(xmlDocument1, schemaDocument2);
  });

  describe('Traverses the XML document', () => {
    it('should provide a root node', () => {
      arrange(xmlDocument1, schemaDocument2);
      expect(document.root).toBeInstanceOf(ComplexNode);
    });
    xit('should throw an error when the document does not contain uuids', () => {
      expect(() => arrange(xmlDocument1a, schemaDocument2)).toThrowError();
    });
  });
  describe('XSD', () => {
    beforeEach(() => {
      arrange(xmlDocument1, schemaDocument2);
    });

    it('should parse the Schema document', () => {
      expect(document.schema).toBeTruthy();
    });
  });
  describe('Complex Node', () => {
    const parser = new SchemaParser();
    const schema = parser.parse(parseXMLDocument(schemaDocument2));

    it('should have a schema reference', () => {
      expect(document.root.schema).toEqual(schema.rootElements[0]);
    });
    it('should contain its attributes', () => {
      expect(document.root.attributes.length).toBe(1);
      expect(document.root.attributes[0]).toBeInstanceOf(ComplexAttribute);
      expect(document.root.attributes[0].name).toEqual('year');
      expect(document.root.attributes[0].value).toEqual('2020');
      expect(document.root.attributes[0].schema).toEqual(
        schema.rootElements[0].attributes[1],
      );
    });
    it('should contain its child nodes', () => {
      expect(document.root.childNodes.length).toBe(1);
    });
  });

  it('provides getXML to return the XML as is', () => {
    expect(document.getXML().documentElement.outerHTML).toEqual(
      `<doc year=\"2020\"><title>Hello World</title></doc>`,
    );
  });
});
