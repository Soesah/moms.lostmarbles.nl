import { ComplexDocument } from './complex-document';
import { xmlDocument1, xmlDocument2 } from './complex-document.unit';
import {
  schemaDocument2,
  schemaDocument5,
} from '../schema/parser/schema-parser.unit';
import { ComplexNode, ComplexNodes } from './elements/complex-node';
import { parseXMLDocument } from '../util/dom.util';
import { SchemaParser } from '../schema/parser/schema-parser';
import { ComplexAttribute } from './elements/complex-attribute';
import { NodeType } from '../core/info';
import { isElement, isText } from './elements/complex-node-base';

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

    it('should provide getXML to return the XML as is', () => {
      expect(document.getXML().documentElement.outerHTML).toEqual(
        `<doc year=\"2020\"><title>Hello World</title></doc>`,
      );
    });
    describe('And complex nodes', () => {
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
    });
  });

  describe('Complex Node can use the schema', () => {
    const parser = new SchemaParser();
    const schema = parser.parse(parseXMLDocument(schemaDocument5));
    let childNode: ComplexNodes;
    let childNode2: ComplexNodes;
    let lastChild: ComplexNodes;

    beforeEach(() => {
      arrange(xmlDocument2, schemaDocument5);
      childNode = document.root.firstElementChild;
      childNode2 = document.root.childNodes[3];
      lastChild = document.root.lastChild;
    });

    it('should contain the Schema document', () => {
      expect(document.schema).toBeTruthy();
    });

    it('should tell if the root node can be removed', () => {
      expect(document.root.canBeRemoved()).toBe(false);
    });

    it('should tell if the title node can be removed', () => {
      expect(childNode.canBeRemoved()).toBe(false);
    });

    it('should tell if the introduction node can be removed', () => {
      expect(childNode2.canBeRemoved()).toBe(true);
    });

    it('should tell if the text from the title node can be removed', () => {
      if (isElement(childNode)) {
        expect(childNode.firstChild.canBeRemoved()).toBe(true);
      } else {
        expect(true).toBeFalsy();
      }
    });

    fit('should tell if the first paragraph node can be removed', () => {
      expect(document.root.elementChildNodes[2].canBeRemoved()).toBe(true);
    });

    fit('should tell if the last paragraph node can be removed', () => {
      expect(document.root.elementChildNodes[3].canBeRemoved()).toBe(true);
    });
  });
});
