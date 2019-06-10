# Editors

## SXE (Simple XML Editor)

- The goal is to keep the structure, WYSIWYG is not.
- So we parse the XSD and create an internal schema saying
    - which parents
    - which children
    - which siblings
    - repeatable or not
    - text or not
    - more
- This would allow us to know _what_ to do with a node when it is
    - split
    - removed
    - created
    - moved
- I mentioning splitting first, because I am thinking of a somewhat WYSIWYG rendering
    - Have a mapping of XML node-names to HTML node-names to know how to render the XML
    - The cursor will be in the DOM at one point, this will correspond to a position in the XML
    - Certain actions can then be performed
        - Delete
        - Typing
        - Backspace
        - Enter
        - Up, Down, Left, Right
        - Tab
        - And Ctrl, Shift, and Alt versions of those
    - This means we perform an action in the XML, and update the cursor position in the DOM.


- Parse Schema
- Parse XML
- Create renderer
- RenderNode
- UpdateNode


### ComplexDocument, Node, Attribute

You want to keep a complex document, node, attribute, for every node in the document. This you keep with the rendered node, or find via the rendered node (uuid). The command (action) is then executed on the node with the complex node, the complex node detailing the schema, any configuration, etc.

The complex node / document can then also be used to power the toolbars and menu. With the node/uuid from the current focus, you can walk up parent nodes, see if children are allowed, if buttons are active, etc.

But it means that the commands modify both the XML as well as the ComplexDocument. This _adds_ a layer of complexity. It would be if the ComplexDocument is _everything_ and you can extract updated XML from it to process for re-rendering or for saving.

## SMDE (Simple MarkDown Editor)

- the goal is to convert html to markdown when editing, and back when rendering
- the downside is that editing something like an ingredient happens in multiple parts, which have to be multiple editors
- steps likewise would be multiple editors
- you allow a limited set of inline-elements
- you build custom code to press `enter` for a new step, ingredient, `amount` or `remark`... which is a mess. It would be too much custom code.
