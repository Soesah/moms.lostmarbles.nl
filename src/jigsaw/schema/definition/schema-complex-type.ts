export enum SchemaContentTypes {
  Sequence = 'sequence',
  Choice = 'choice',
  Empty = 'empty',
}

interface SchemaElementOccurance {
  name: string;
  min: number;
  max: number;
}

export const isSchemaElementOccurance = (
  occurance: any,
): occurance is SchemaElementOccurance =>
  (occurance as SchemaElementOccurance).name !== undefined;

export type SchemaComplexTypeStructure =
  | SchemaElementOccurance
  | SchemaComplexType;

export interface SchemaComplexType {
  type: SchemaContentTypes;
  mixed: boolean;
  min: number;
  max: number;
  structure: SchemaComplexTypeStructure[];
}

export const isSchemaChoice = (def: SchemaComplexTypeStructure): boolean =>
  !isSchemaElementOccurance(def) && def.type === SchemaContentTypes.Choice;

export const isSchemaSequence = (def: SchemaComplexTypeStructure): boolean =>
  !isSchemaElementOccurance(def) && def.type === SchemaContentTypes.Sequence;

/*


INGREDIENTs

{
  type: 'sequence',
  mixed: false,
  structure:[
    {
      name: 'ingredient',
      min: 1,
      max; Infinity
    },
  ]
}

SECTION

{
  type: 'sequence',
  mixed: false,
  structure:[
    {
      name: 'title',
    },
    {
      type: 'choice'
      mixed: false,
      min: 1,
      max: inifity,
      structure: [
        {
          name: 'p',
        },
        {
          name: 'list',
        }
      ]
    }
  ]
}

PARAGRAPH

{
  type: 'choice',
  mixed: true,
  min: 1,
  max: inifity,
  structure: [
    {
      name: 'b',
    },
    {
      name: 'i',
    },
    {
      name: 'u',
    }
  ]
}

*/
