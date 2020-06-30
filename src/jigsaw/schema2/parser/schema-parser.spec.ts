import { SchemaParser } from './schema-parser';
import {
  schemaDocument2,
  schemaDocument2a,
  schemaDocument2b,
  schemaDocument2c,
} from './schema-parser.unit';
import { SchemaDocument } from '../schema-document';
import { SchemaElementType } from '../definition/schema.info';
import { SchemaSequence } from '../definition/schema-sequence';

describe('Schema Parser', () => {
  let sourceDocument: Document;
  let parser: SchemaParser;
  let schema: SchemaDocument;

  const arrange = (source: string) => {
    try {
      const domParser = new DOMParser();
      sourceDocument = domParser.parseFromString(source, 'text/xml');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  describe('Errors', () => {
    it('should throw an error for a nameless element', () => {
      arrange(schemaDocument2a);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse element without name',
      );
    });
    it('should throw an error for a typeless element', () => {
      arrange(schemaDocument2b);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse type for element "doc"',
      );
    });
  });
  describe('Simplest Schema', () => {
    beforeEach(() => {
      arrange(schemaDocument2c);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema for root elements', () => {
      expect(schema.rootElements.length).toBe(1);
    });

    it(`should parse the doc element's type`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.type).toBe(SchemaElementType.Empty);
    });
  });

  describe('Simple Schema', () => {
    beforeEach(() => {
      arrange(schemaDocument2);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema for root elements', () => {
      expect(schema.rootElements.length).toBe(1);
    });

    it(`should parse the doc element's type`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.type).toBe(SchemaElementType.ComplexTypeSequence);
    });

    it(`should parse the doc element's attributes`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.attributes.length).toBe(2);
      expect(docEl.attributes[0].name).toBe('index');
      expect(docEl.attributes[0].type).toBe(SchemaElementType.Integer);
    });

    it(`should parse the doc element's complex type`, () => {
      const complexType = schema.getElement('doc').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.elements.length).toBe(1);
      expect(complexType.elements[0].name).toBe('title');
      if (complexType.type !== SchemaElementType.ComplexTypeSequence) {
        throw new Error('Testing wrong schema');
      }
      expect((complexType as SchemaSequence).elements[0].element.type).toBe(
        SchemaElementType.String,
      );
      expect((complexType as SchemaSequence).elements[0].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[0].maxOccurs).toBe(1);
    });
  });
});
