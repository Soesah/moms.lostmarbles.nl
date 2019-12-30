export enum SchemaContentType {
  Sequence = 'sequence',
  Choice = 'choice',
  Empty = 'empty',
}

interface SchemaElementOccurance {
  name: string;
  min?: number;
  max?: number;
}

export type SchemaComplexStructure =
  | SchemaElementOccurance
  | SchemaComplexContent;

export interface SchemaComplexContent {
  type: SchemaContentType;
  mixed: boolean;
  min?: number;
  max?: number;
  structure: SchemaComplexStructure[];
}

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
