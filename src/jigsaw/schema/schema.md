# Schema

Parsing the schema isn't easy. Let's write down what we can say about a simple node.

There is a difference between the schema by itself and a complex node, which is a node in the document, in place, which adheres to the schema.

Once you are handling a node in the document, you want to know if it can `move up`, `move down`, `can be removed`, or if a child `can be inserted` before or after. This will take a lot of calculation, unless you come up with something smarter: a smart model for the node and it schema type.

## Image

- is defined a root element. It has a `complexType`
- has `minOccurs 0` so is optional withing `recipe`. (only infered after usage, so `recipe` has this information)
- implies `maxOccurs 1` so can only occur once within `recipe` (only infered after usage, so `recipe` has this information)
- has attribute `source` which is `required` and thus should always be added. It is a `string`.
- it is in a `sequence` and comes before `title` as the `first node`
- that sequence though belongs to `recipe`.

## Title

- title is defined a root element. It is a `string`
- it is referenced by `recipe`, after `image`

## Recipe

Let's try to put `recipe` in a model:

```JSON
{
  name: "recipe",
  structure: {
    type: "sequence",
    elements: [
      {
        element: "image",
        min: 0,
        max: 1,
      },
      {
        element: "title",
        min: 1,
        max: 1,
      },
      {
        element: "cook",
        min: 0,
        max: 1,
      },
      {
        element: "servings",
        min: 0,
        max: 1,
      },
      {
        element: "preparation-time",
        min: 0,
        max: 1,
      },
      {
        element: "description",
        min: 0,
        max: 1,
      },
      {
        element: "ingredients",
        min: 0,
        max: 1,
      },
      {
        element: "preparation",
        min: 0,
        max: 1,
      },
      {
        element: "notes",
        min: 0,
        max: 1,
      }
    ]
  },
  attributes: [
    {
      name: "slug",
      type: "string",
      required: true,
    },
    {
      name: "servings",
      type: "string",
      required: true,
    },
    {
      name: "preparation_time",
      type: "string",
      required: true,
    },
    {
      name: "category_id",
      type: "integer",
      required: true,
    },
  ]
}
```

Let's try the same thing for `ingredient`:

```JSON
{
  name: "ingredient",
  structure: {
    type: "sequence",
    elements: [
      {
        name: "name",
        min: 1,
        max: 1,
      },
      {
        name: "amount",
        min: 0,
        max: 1,
      },
      {
        name: "remark",
        min: 0,
        max: 1,
      }
    ],
  }
}
```

The `paragraph` is more complex, in the sense that it refers to `text-type`, which contains a `choice` and is `mixed`.

```JSON
{
  name: "paragraph",
  ref: "text-type",
}
```

After parsing the type, we can say

```JSON
{
  name: "paragraph",
  structure: {
    mixed: true,
    type: "choice",
    elements: [
      {
        ref: "inline.abstract",
        min: 0,
        max: Infinity,
      }
    ]
  }
}
```

This still references an abstract, so after parsing that, we get:

```JSON
{
  name: "paragraph",
  structure: {
    mixed: true,
    type: "choice",
    elements: [
      {
        name: "emphasis",
        min: 0,
        max: Infinity,
      },
      {
        name: "strong",
        min: 0,
        max: Infinity,
      },
      {
        name: "underline",
        min: 0,
        max: Infinity,
      },
      {
        name: "superscript",
        min: 0,
        max: Infinity,
      }
    ]
  }
}
```

Which is a little verbose... I don't like the array, it reads differently

```JSON
{
  name: "paragraph",
  structure: {
    mixed: true,
    choice: {
      min: 0,
      max: Infinity,
      elements: [
        {
          name: "emphasis"
        },
        {
          name: "strong"
        },
        {
          name: "underline"
        },
        {
          name: "superscript"
        },
      ]
    }
  }
}
```

That means we can write `ingredient` differently too:

```JSON
{
  name: "ingredient",
  structure: {
    mixed: false,
    sequence: {
      elements: [
        {
          name: "name",
          min: 1,
          max: 1,
        },
        {
          name: "amount",
          min: 0,
          max: 1,
        },
        {
          name: "remark",
          min: 0,
          max: 1,
        }
      ],
    }
  }
}
```

## How to parse

Walk the DOM of the schema, get every element, element reference, attribute, attribute reference, complexType, and more. Then figure out what is what?

Or walk the DOM and parse everything in place, finding out references as you find them?

Parse root elements first...Then parse deeper?
