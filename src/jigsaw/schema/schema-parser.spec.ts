import { SchemaParser } from './schema-parser';
import { schemaDocument2, schemaDocument3 } from './schema-parser.unit';
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
      parser = new SchemaParser(schema);
    });
    it('should parse the schema for elements', () => {
      expect(parser.rootElements.length).toBe(1);
    });
    it('should parse element name', () => {
      expect(parser.rootElements[0].name).toBe('doc');
    });
    it('should parse element type', () => {
      expect(parser.rootElements[0].type).toBe(SchemaType.Complex);
    });
    it('should parse element attributes', () => {
      if (parser.rootElements[0].attributes) {
        expect(parser.rootElements[0].attributes.length).toBe(2);
      } else {
        expect(parser.rootElements[0].attributes).toBeTruthy();
      }
    });
    it('should parse element complex type content', () => {
      expect(parser.rootElements[0].content).toEqual({
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
      parser = new SchemaParser(schema);
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
      expect(parser.rootElements[0].content).toEqual({
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
});
