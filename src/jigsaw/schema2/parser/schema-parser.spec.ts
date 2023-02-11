import { SchemaParser } from './schema-parser';
// test files
import {
  schemaNamelessElement,
  schemaNoTypeElement,
  schemaEmptyComplexType,
  schemaNamelessAttribute,
  schemaNoTypeAttribute,
  schemaNoCustomTypeAttribute,
} from './test/schema-0-errors.unit';
import { schemaWithOnlyAttribute } from './test/schema-1-attributes.unit';
import { simpleSchema } from './test/schema-2-single-root.unit';
import { schemaDocumentWithRefs } from './test/schema-3-refs.unit';
import { schemaWithChoice } from './test/schema-4-choice.unit';
import { schemaWithTypeRefs } from './test/schema-5-type-refs.unit';
import { schemaWithAbstracts } from './test/schema-6-abstracts.unit';
import { schemaWithExtension } from './test/schema-7-extension.unit';
import { schemaRecipe } from './test/schema-8-recipe.unit';

import { SchemaChoice } from '../definition/schema-choice';
import { SchemaElement } from '../definition/schema-element';
import { SchemaDocument } from '../schema-document';
import {
  SchemaElementType,
  SchemaAttributeUse,
  SchemaAttributeType,
} from '../definition/schema.info';
import { SchemaSequence } from '../definition/schema-sequence';

describe('Schema Parser', () => {
  let sourceDocument: Document;
  let parser: SchemaParser;
  let schema: SchemaDocument;

  const arrange = (source: string) => {
    try {
      const domParser = new DOMParser();
      sourceDocument = domParser.parseFromString(source, 'text/xml');
    } catch (e: any) {
      throw new Error(`Failed to parse schema parser source ${e.message}`);
    }
  };

  describe('Errors', () => {
    it('should throw an error for a nameless element', () => {
      arrange(schemaNamelessElement);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse element without name',
      );
    });

    it('should throw an error for a typeless element', () => {
      arrange(schemaNoTypeElement);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse type for element "doc"',
      );
    });

    it('should throw an error for a nameless attribute', () => {
      arrange(schemaNamelessAttribute);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse attribute without name',
      );
    });

    it('should throw an error for a typeless attribute', () => {
      arrange(schemaNoTypeAttribute);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse type for attribute "test"',
      );
    });

    it('should throw an error for a custom simpleType attribute', () => {
      arrange(schemaNoCustomTypeAttribute);
      parser = new SchemaParser(sourceDocument);

      expect(() => parser.parse()).toThrow(
        'Could not parse custom simpleType for attribute "test"',
      );
    });
  });

  describe('Schema with an empty element', () => {
    beforeEach(() => {
      arrange(schemaEmptyComplexType);
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

  describe('Schema with an empty element, but with attributes', () => {
    beforeEach(() => {
      arrange(schemaWithOnlyAttribute);
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

    it(`should parse the doc attribute correctly`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.attributes.length).toBe(1);
      expect(docEl.attributes[0].name).toBe('date');
      expect(docEl.attributes[0].type).toBe(SchemaAttributeType.Date);
      expect(docEl.attributes[0].use).toBe(SchemaAttributeUse.Optional);
    });
  });

  describe('Schema with sequence', () => {
    beforeEach(() => {
      arrange(simpleSchema);
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
      expect(docEl.attributes[0].type).toBe(SchemaAttributeType.Integer);
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

  describe('Schema with references', () => {
    beforeEach(() => {
      arrange(schemaDocumentWithRefs);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema for root elements', () => {
      expect(schema.rootElements.length).toBe(2);
    });

    it(`should parse the doc element's type`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.type).toBe(SchemaElementType.ComplexTypeSequence);
    });

    it(`should parse the doc element's attributes`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.attributes.length).toBe(2);
      expect(docEl.attributes[0].name).toBe('year');
      expect(docEl.attributes[0].type).toBe(SchemaAttributeType.Integer);
      expect(docEl.attributes[0].use).toBe(SchemaAttributeUse.Required);
      expect(docEl.attributes[1].name).toBe('date');
      expect(docEl.attributes[1].type).toBe(SchemaAttributeType.Date);
      expect(docEl.attributes[1].use).toBe(SchemaAttributeUse.Optional);
    });

    it(`should parse the doc element's complex type`, () => {
      const complexType = schema.getElement('doc').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.elements.length).toBe(2);
      expect(complexType.elements[0].name).toBe('title');
      if (complexType.type !== SchemaElementType.ComplexTypeSequence) {
        throw new Error('Testing wrong schema');
      }
      expect((complexType as SchemaSequence).elements[0].element.type).toBe(
        SchemaElementType.String,
      );
      expect((complexType as SchemaSequence).elements[0].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[0].maxOccurs).toBe(1);
      expect(complexType.elements[1].name).toBe('paragraph');
      expect((complexType as SchemaSequence).elements[1].element.type).toBe(
        SchemaElementType.String,
      );
      expect((complexType as SchemaSequence).elements[1].minOccurs).toBe(0);
      expect((complexType as SchemaSequence).elements[1].maxOccurs).toBe(
        Infinity,
      );
    });
  });

  describe('Schema with choice', () => {
    beforeEach(() => {
      arrange(schemaWithChoice);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema for root elements', () => {
      expect(schema.rootElements.length).toBe(3);
    });

    it(`should parse the doc element's type`, () => {
      const docEl = schema.getElement('doc');
      expect(docEl.type).toBe(SchemaElementType.ComplexTypeSequence);
    });

    it(`should parse the doc element's complex type`, () => {
      const complexType = schema.getElement('doc').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.isMixed).toEqual(false);
      expect(complexType.elements.length).toBe(2);
      expect(complexType.elements[0].name).toBe('title');
      if (complexType.type !== SchemaElementType.ComplexTypeSequence) {
        throw new Error('Testing wrong schema');
      }
      expect((complexType as SchemaSequence).elements[0].element.type).toBe(
        SchemaElementType.String,
      );
      expect((complexType as SchemaSequence).elements[0].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[0].maxOccurs).toBe(1);
      expect(complexType.elements[1].name).toBe('choice');
      expect((complexType as SchemaSequence).elements[1].element.type).toBe(
        SchemaElementType.ComplexTypeChoice,
      );
      expect((complexType as SchemaSequence).elements[1].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[1].maxOccurs).toBe(
        Infinity,
      );
    });

    it(`should parse the paragraph element's complex type`, () => {
      const complexType = schema.getElement('paragraph').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeChoice);
      expect(complexType.isMixed).toEqual(true);
      expect(complexType.elements.length).toBe(2);
    });

    it(`should parse the list element's complex type`, () => {
      const complexType = schema.getElement('list').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.isMixed).toEqual(false);
      expect(complexType.elements.length).toBe(1);
    });
  });

  describe('Schema with type references', () => {
    beforeEach(() => {
      arrange(schemaWithTypeRefs);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema for root elements', () => {
      expect(schema.rootElements.length).toBe(3);
    });
    it(`should parse the doc element's complex type`, () => {
      const complexType = schema.getElement('doc').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.isMixed).toEqual(false);
      expect(complexType.elements.length).toBe(3);
      if (complexType.type !== SchemaElementType.ComplexTypeSequence) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.elements[0].name).toBe('title');
      expect((complexType as SchemaSequence).elements[0].element.type).toBe(
        SchemaElementType.String,
      );
      expect((complexType as SchemaSequence).elements[0].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[0].maxOccurs).toBe(1);

      expect(complexType.elements[1].name).toBe('introduction');
      const introductionElement = (complexType as SchemaSequence).elements[1]
        .element as SchemaElement;
      expect(introductionElement.type).toBe(
        SchemaElementType.ComplexTypeChoice,
      );
      expect((introductionElement.complexType as SchemaChoice).isMixed).toEqual(
        true,
      );
      expect(
        (introductionElement.complexType as SchemaChoice).elements.length,
      ).toBe(2);
      expect((complexType as SchemaSequence).elements[1].minOccurs).toBe(0);
      expect((complexType as SchemaSequence).elements[1].maxOccurs).toBe(1);

      expect(complexType.elements[2].name).toBe('choice');
      expect((complexType as SchemaSequence).elements[2].element.type).toBe(
        SchemaElementType.ComplexTypeChoice,
      );
      expect((complexType as SchemaSequence).elements[2].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[2].maxOccurs).toBe(
        Infinity,
      );
    });

    it(`should parse the paragraph element's complex type`, () => {
      const complexType = schema.getElement('paragraph').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeChoice);
      expect(complexType.isMixed).toEqual(true);
      expect(complexType.elements.length).toBe(2);
    });

    it(`should parse the list element's complex type`, () => {
      const complexType = schema.getElement('list').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.isMixed).toEqual(false);
      expect(complexType.elements.length).toBe(1);
    });
  });

  describe('Schema with abstract elements', () => {
    beforeEach(() => {
      arrange(schemaWithAbstracts);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema for root elements', () => {
      expect(schema.rootElements.length).toBe(1);
    });

    it(`should parse the doc element's complex type`, () => {
      const complexType = schema.getElement('doc').complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.type).toEqual(SchemaElementType.ComplexTypeSequence);
      expect(complexType.isMixed).toEqual(false);
      expect(complexType.elements.length).toBe(3);

      expect(complexType.elements[0].name).toBe('title');
      expect((complexType as SchemaSequence).elements[0].element.type).toBe(
        SchemaElementType.String,
      );
      expect((complexType as SchemaSequence).elements[0].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[0].maxOccurs).toBe(1);

      expect(complexType.elements[1].name).toBe('introduction');
      expect((complexType as SchemaSequence).elements[1].element.type).toBe(
        SchemaElementType.ComplexTypeChoice,
      );
      expect((complexType as SchemaSequence).elements[1].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[1].maxOccurs).toBe(1);

      expect(complexType.elements[2].name).toBe('choice');
      expect((complexType as SchemaSequence).elements[2].element.type).toBe(
        SchemaElementType.ComplexTypeChoice,
      );
      expect((complexType as SchemaSequence).elements[2].minOccurs).toBe(1);
      expect((complexType as SchemaSequence).elements[2].maxOccurs).toBe(
        Infinity,
      );
      expect(
        ((complexType as SchemaSequence).elements[2].element as SchemaChoice)
          .elements.length,
      ).toBe(2);
    });

    it(`should parse the introduction element's complex type`, () => {
      const introduction = schema.getElement('doc').getElement('introduction');
      if (!introduction) {
        throw new Error('Testing wrong schema');
      }
      const complexType = (introduction as SchemaElement).complexType;
      if (!complexType) {
        throw new Error('Testing wrong schema');
      }
      expect(complexType.isMixed).toEqual(true);
      expect(complexType.elements.length).toBe(2);
      expect(complexType.elements[0].name).toBe('bold');
      expect((complexType as SchemaChoice).elements[0].type).toBe(
        SchemaElementType.String,
      );
      expect(complexType.elements[1].name).toBe('italic');
      expect((complexType as SchemaChoice).elements[1].type).toBe(
        SchemaElementType.String,
      );
    });
  });

  describe('Recipe schema with complexContent and extension', () => {
    beforeEach(() => {
      arrange(schemaWithExtension);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema correctly', () => {
      expect(schema.rootElements.length).toBe(2);
    });

    it('should parse the author element correctly', () => {
      const element = schema.getElement('author');

      expect(element.type).toEqual(SchemaElementType.ComplexContent);
      expect(element.complexType?.elements.length).toEqual(2);
      expect(element.attributes.length).toEqual(1);
    });
  });

  xdescribe('Recipe schema with recurring structures', () => {
    beforeEach(() => {
      arrange(schemaRecipe);
      parser = new SchemaParser(sourceDocument);
      schema = parser.parse();
    });

    it('should parse the schema correctly', () => {
      expect(schema.rootElements.length).toBe(1);
    });
  });
});
