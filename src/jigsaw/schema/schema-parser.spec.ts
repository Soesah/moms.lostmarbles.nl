import { SchemaParser } from './schema-parser';
import {
  schemaDocument2,
  schemaDocument3,
  schemaDocument4,
  schemaDocument5,
  schemaDocument1,
} from './schema-parser.unit';
import { SchemaType } from './definition/schema-definition';
import { SchemaDocument } from './definition/schema-document';

describe('Schema Parser', () => {
  let schema: Document;
  let parser: SchemaParser;
  let document: SchemaDocument;

  const arrange = (source: string) => {
    try {
      const domParser = new DOMParser();
      schema = domParser.parseFromString(source, 'text/xml');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  describe('Simple Schema', () => {
    beforeEach(() => {
      arrange(schemaDocument2);
      parser = new SchemaParser();
      document = parser.parse(schema);
    });
    it('should parse the schema for root elements', () => {
      expect(document.rootElements.length).toBe(1);
    });
    it('should parse the schema for other elements', () => {
      expect(document.elements.length).toBe(2);
    });
    it('should parse element type', () => {
      expect(document.getElement('doc').type).toBe(SchemaType.Complex);
      expect(document.getElement('title').type).toBe(SchemaType.String);
    });
    it('should parse element attributes', () => {
      const docEl = document.getElement('doc');
      if (docEl.attributes) {
        expect(docEl.attributes.length).toBe(2);
        expect(docEl.attributes[0].name).toBe('index');
        expect(docEl.attributes[0].type).toBe(SchemaType.Number);
      } else {
        expect(docEl.attributes).toBeFalsy();
      }
    });
    it('should parse element complex type content', () => {
      expect(document.getElement('doc').complexType).toEqual({
        max: 1,
        min: 1,
        mixed: false,
        structure: [
          {
            max: 1,
            min: 1,
            name: 'title',
          },
        ],
        type: 'sequence',
      });
    });
  });

  describe('Slightly more complex Schema', () => {
    beforeEach(() => {
      arrange(schemaDocument3);
      parser = new SchemaParser();
      document = parser.parse(schema);
    });
    it('should parse the schema for root elements', () => {
      expect(document.rootElements.length).toBe(2);
    });
    it('should parse element type', () => {
      expect(document.getElement('doc').type).toBe(SchemaType.Complex);
      expect(document.getElement('paragraph').type).toBe(SchemaType.String);
    });
    it('should parse element complex type content', () => {
      expect(document.getElement('doc').complexType).toEqual({
        max: 1,
        min: 1,
        mixed: false,
        structure: [
          {
            max: 1,
            min: 1,
            name: 'title',
          },
          {
            max: Infinity,
            min: 1,
            name: 'paragraph',
          },
        ],
        type: 'sequence',
      });
    });
  });

  describe('More complex Schema', () => {
    beforeEach(() => {
      arrange(schemaDocument4);
      parser = new SchemaParser();
      document = parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(document.rootElements.length).toBe(3);
      expect(document.elements.length).toBe(7);
    });
    it('should parse element type', () => {
      expect(document.getElement('doc').type).toBe(SchemaType.Complex);
      expect(document.getElement('paragraph').type).toBe(SchemaType.Complex);
      expect(document.getElement('list').type).toBe(SchemaType.Complex);

      expect(document.getElement('title').type).toBe(SchemaType.String);
      expect(document.getElement('bold').type).toBe(SchemaType.String);
      expect(document.getElement('italic').type).toBe(SchemaType.String);
      expect(document.getElement('item').type).toBe(SchemaType.String);
    });
    it('should parse element complex type content', () => {
      expect(document.getElement('doc').complexType).toEqual({
        max: 1,
        min: 1,
        mixed: false,
        structure: [
          {
            max: 1,
            min: 1,
            name: 'title',
          },
          {
            max: Infinity,
            min: 1,
            mixed: false,
            structure: [
              {
                max: 1,
                min: 1,
                name: 'paragraph',
              },
              {
                max: 1,
                min: 1,
                name: 'list',
              },
            ],
            type: 'choice',
          },
        ],
        type: 'sequence',
      });
    });
  });

  describe('Same Schema, seperately declared complex types', () => {
    beforeEach(() => {
      arrange(schemaDocument5);
      parser = new SchemaParser();
      document = parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(document.rootElements.length).toBe(3);
      expect(document.elements.length).toBe(8);
    });
    it('should parse elements complex type content', () => {
      expect(document.getElement('doc').complexType).toEqual({
        max: 1,
        min: 1,
        mixed: false,
        structure: [
          {
            max: 1,
            min: 1,
            name: 'title',
          },
          {
            max: 1,
            min: 1,
            name: 'introduction',
          },
          {
            max: Infinity,
            min: 1,
            mixed: false,
            structure: [
              {
                max: 1,
                min: 1,
                name: 'paragraph',
              },
              {
                max: 1,
                min: 1,
                name: 'list',
              },
            ],
            type: 'choice',
          },
        ],
        type: 'sequence',
      });
      expect(document.getElement('paragraph').complexType).toEqual({
        max: Infinity,
        min: 1,
        mixed: false,
        structure: [
          {
            max: 1,
            min: 1,
            name: 'bold',
          },
          {
            max: 1,
            min: 1,
            name: 'italic',
          },
        ],
        type: 'choice',
      });
      expect(document.getElement('list').complexType).toEqual({
        max: 1,
        min: 1,
        mixed: false,
        structure: [
          {
            max: Infinity,
            min: 1,
            name: 'item',
          },
        ],
        type: 'sequence',
      });
      // introduction equals paragraph
      expect(document.elements[3].complexType).toEqual(
        document.rootElements[1].complexType,
      );
    });
  });
  describe('Recipe Schema, with abstract elements', () => {
    beforeEach(() => {
      arrange(schemaDocument1);
      parser = new SchemaParser();
      document = parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(document.rootElements.length).toBe(27);
      expect(document.elements.length).toBe(27);
    });
  });
});
