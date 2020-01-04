import { ComplexDocument } from './complex-document';
import { xmlDocument1 } from './complex-document.unit';
import { schemaDocument2 } from '../schema/parser/schema-parser.unit';
import { ComplexNode, ComplexNodes } from './elements/complex-node';
import { parseXMLDocument } from '../util/dom.util';
import { SchemaParser } from '../schema/parser/schema-parser';
import { ComplexAttribute } from './elements/complex-attribute';
import { NodeType } from '../core/info';

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

    let childNode: ComplexNodes;
    beforeEach(() => {
      arrange(xmlDocument1, schemaDocument2);
      childNode = document.root.childNodes[0];
    });

    it('should be a complex node', () => {
      expect(document.root).toBeInstanceOf(ComplexNode);
    });
    it('should have a type', () => {
      expect(document.root.type).toBe(NodeType.ELEMENT);
      expect(childNode.type).toBe(NodeType.ELEMENT);
    });
    it('should have an index of its position within its parent', () => {
      expect(document.root.index).toBe(0);
      expect(childNode.index).toBe(0);
    });
    it('should have a schema reference', () => {
      expect(document.root.schema).toEqual(schema.rootElements[0]);
    });
    it('should add a uuid to the element', () => {
      expect(document.root.uuid).toBeTruthy();
    });
    it('should have access to its parent node', () => {
      expect(document.root.parentNode).toBe(null);
      expect(childNode.parentNode).toBe(document.root);
    });
    it('should contain its child nodes', () => {
      expect(document.root.childNodes.length).toBe(1);
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
    // describe('Schema awareness', () => {
    //   it('should know if it can be removed', () => {
    //     expect(childNode.canBeRemoved()).toBe(false);
    //   });
    // });
  });

  it('provides getXML to return the XML as is', () => {
    expect(document.getXML().documentElement.outerHTML).toEqual(
      `<doc year=\"2020\"><title>Hello World</title></doc>`,
    );
  });
});
