import { SchemaParser } from './schema-parser';
import {
  schemaDocument2,
  schemaDocument3,
  schemaDocument4,
  schemaDocument5,
  schemaDocument1,
} from './schema-parser.unit';
import { SchemaType } from './definition/schema-definition';

describe('Schema Parser', () => {
  let schema: Document;
  let parser: SchemaParser;

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
      parser.parse(schema);
    });
    it('should parse the schema for root elements', () => {
      expect(parser.rootElements.length).toBe(1);
    });
    it('should parse the schema for other elements', () => {
      expect(parser.elements.length).toBe(1);
    });
    it('should parse element name', () => {
      expect(parser.rootElements[0].name).toBe('doc');
      expect(parser.elements[0].name).toBe('title');
    });
    it('should parse element type', () => {
      expect(parser.rootElements[0].type).toBe(SchemaType.Complex);
      expect(parser.elements[0].type).toBe(SchemaType.String);
    });
    it('should parse element attributes', () => {
      if (parser.rootElements[0].attributes) {
        expect(parser.rootElements[0].attributes.length).toBe(2);
        expect(parser.rootElements[0].attributes[0].name).toBe('index');
        expect(parser.rootElements[0].attributes[0].type).toBe(
          SchemaType.Number,
        );
      } else {
        expect(parser.rootElements[0].attributes).toBeTruthy();
      }
    });
    it('should parse element complex type content', () => {
      expect(parser.rootElements[0].complexType).toEqual({
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
      parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(parser.rootElements.length).toBe(2);
    });
    it('should parse element name', () => {
      expect(parser.rootElements[0].name).toBe('doc');
      expect(parser.rootElements[1].name).toBe('paragraph');
    });
    it('should parse element type', () => {
      expect(parser.rootElements[0].type).toBe(SchemaType.Complex);
      expect(parser.rootElements[1].type).toBe(SchemaType.String);
    });
    it('should parse element complex type content', () => {
      expect(parser.rootElements[0].complexType).toEqual({
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
      parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(parser.rootElements.length).toBe(3);
      expect(parser.elements.length).toBe(4);
    });
    it('should parse element name', () => {
      expect(parser.rootElements[0].name).toBe('doc');
      expect(parser.rootElements[1].name).toBe('paragraph');
      expect(parser.rootElements[2].name).toBe('list');
      expect(parser.elements[0].name).toBe('title');
      expect(parser.elements[1].name).toBe('bold');
      expect(parser.elements[2].name).toBe('italic');
      expect(parser.elements[3].name).toBe('item');
    });
    it('should parse element type', () => {
      expect(parser.rootElements[0].type).toBe(SchemaType.Complex);
      expect(parser.rootElements[1].type).toBe(SchemaType.Complex);
      expect(parser.rootElements[2].type).toBe(SchemaType.Complex);

      expect(parser.elements[0].type).toBe(SchemaType.String);
      expect(parser.elements[1].type).toBe(SchemaType.String);
      expect(parser.elements[2].type).toBe(SchemaType.String);
      expect(parser.elements[3].type).toBe(SchemaType.String);
    });
    it('should parse element complex type content', () => {
      expect(parser.rootElements[0].complexType).toEqual({
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
      parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(parser.rootElements.length).toBe(3);
      expect(parser.elements.length).toBe(5);
    });
    it('should parse element name', () => {
      expect(parser.rootElements[0].name).toBe('doc');
      expect(parser.rootElements[1].name).toBe('paragraph');
      expect(parser.rootElements[2].name).toBe('list');
      expect(parser.elements[0].name).toBe('title');
      expect(parser.elements[1].name).toBe('bold');
      expect(parser.elements[2].name).toBe('italic');
      expect(parser.elements[3].name).toBe('introduction');
      expect(parser.elements[4].name).toBe('item');
    });
    it('should parse element type', () => {
      expect(parser.rootElements[0].type).toBe(SchemaType.Complex);
      expect(parser.rootElements[1].type).toBe(SchemaType.Complex);
      expect(parser.rootElements[2].type).toBe(SchemaType.Complex);

      expect(parser.elements[0].type).toBe(SchemaType.String);
      expect(parser.elements[1].type).toBe(SchemaType.String);
      expect(parser.elements[2].type).toBe(SchemaType.String);
      expect(parser.elements[3].type).toBe(SchemaType.Complex);
      expect(parser.elements[4].type).toBe(SchemaType.String);
    });
    it('should parse elements complex type content', () => {
      expect(parser.rootElements[0].complexType).toEqual({
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
      expect(parser.rootElements[1].complexType).toEqual({
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
      expect(parser.rootElements[2].complexType).toEqual({
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
      expect(parser.elements[3].complexType).toEqual(
        parser.rootElements[1].complexType,
      );
    });
  });
  describe('Recipe Schema, with abstract elements', () => {
    beforeEach(() => {
      arrange(schemaDocument1);
      parser = new SchemaParser();
      parser.parse(schema);
    });
    it('should parse the schema for elements', () => {
      expect(parser.rootElements.length).toBe(27);
      expect(parser.elements.length).toBe(0);
    });
  });
});
