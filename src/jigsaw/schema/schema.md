# Schema

Parsing the schema isn't easy. Let's write down what we can say about a simple node.

There is a difference between the schema by itself and a complex node, which is a node in the document, in place, which adheres to the schema.

Once you are handling a node in the document, you want to know if it can `move up`, `move down`, `can be removed`, or if a child `can be inserted` before or after.

## Image

- is defined a root element. It has a `complexType`
- has `minOccurs 0` so is optional withing `recipe`.
- implies `maxOccurs 1` so can only occur once within `recipe`
- has attribute `source` which is `required` and thus should always be added. It is a `string`.
- it is in a `sequence` and comes before `title` as the `first node`
- that sequence though belongs to `recipe`.

## Title

- title is defined a root element. It is a `string`
- it is referenced by `recipe`, after `image`

## Recipe

Let's try to put `recipe` in a model:

```{
  name: 'recipe',
  structure: {
    type: 'sequence',
    [
      {
        element: 'image',
        min: 0,
        max: 1,
      },
      {
        element: 'title',
        min: 1,
        max: 1,
      },
      {
        element: 'cook',
        min: 0,
        max: 1,
      },
      {
        element: 'servings',
        min: 0,
        max: 1,
      },
      {
        element: 'preparation-time',
        min: 0,
        max: 1,
      },
      {
        element: 'description',
        min: 0,
        max: 1,
      },
      {
        element: 'ingredients',
        min: 0,
        max: 1,
      },
      {
        element: 'preparation',
        min: 0,
        max: 1,
      },
      {
        element: 'notes',
        min: 0,
        max: 1,
      }
    ]
  }
  attributes: [
    {
      name: 'slug',
      type: 'string',
      required: true,
    },
    {
      name: 'servings',
      type: 'string',
      required: true,
    },
    {
      name: 'preparation_time',
      type: 'string',
      required: true,
    },
    {
      name: 'category_id',
      type: 'integer',
      required: true,
    },
  ]
}
```
