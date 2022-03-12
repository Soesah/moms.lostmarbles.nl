# JigSaw

## Restricted XML Editor

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

## ComplexDocument, Node, Attribute

You want to keep a complex document, node, attribute, for every node in the document. This you keep with the rendered node, or find via the rendered node (uuid). The command (action) is then executed on the node with the complex node, the complex node detailing the schema, any configuration, etc.

The complex node / document can then also be used to power the toolbars and menu. With the node/uuid from the current focus, you can walk up parent nodes, see if children are allowed, if buttons are active, etc.

But it means that the commands modify both the XML as well as the ComplexDocument. This _adds_ a layer of complexity. It would be if the ComplexDocument is _everything_ and you can extract updated XML from it to process for re-rendering or for saving.

## Commands

Commands should be used for everything. When the document changes, the selection/focus changes, the application should react. You should use vuex for application state. So you provide each command with document, state and selection/focus to determine whether or not the command `canExecute`. Buttons execute command and certain key actions `execute` commands. You would rather not instance commands every time. You instance them on the editor, and keep providing them with the info they need, and once more on execute.

You have the Toolbar, NodeToolbar with Menu, and ContextMenu. The toolbar is populated by the config, but also by the context/

### Context

The context provides information about the node. The context really is a complex node.

- can be deleted
- children that can be inserted
- can be moved up/down
- copy
- paste
- parents, and the nodes that can be inserted there. (this should not be shown with the NodeToolbar)
- attribute editor option

## Update node

Perhaps you can let the VNode register a listener on document to update itself....

## How

1. `EditRecipe.vue` instances a Jigsaw Editor. It provides 4 things to Jigsaw:
   - `xml`, a url of where to load the xml file
   - `xsl`, a url of where to load the xsl file
   - `xsd`, a url of where to load the xsd file
   - `config`, a url of where to load the config file for the editor
2. `Jigsaw.vue` uses these four props to instance an `JigsawEditor`
3. `Jigsaw.vue` also provides this editor to the Vuex store and renders the components of the interface:
   - `jigsaw-toolbar` the top toolbar
   - `editable-content` which renders the transformed xml using a `render` function
   - `jigsaw-context-menu` the context menu
   - `jigsaw-node-toolbar` the bottom toolbar
4. `Jigsaw.vue` also connects the `JigsawEditor` to the Vuex store, by reacting to events from the editor.
5. The `JigsawEditor` starts by loading each of the four files.
   - It creates a `ComplexDocument` out of the `xml` and `xsd`
   - It creates a `NodeConfiguration` for the `config`
   - It _transforms_ the loaded `xsl` to enrich it. This is done so the `xsl` with output `node-id` _processing-instructions_ on certain elements in the DOM.
6. The `initialized` event is emitted from the editor. This signals `Jigsaw.vue` to render its child components.
7. `EditableContent.vue`
   - Uses the Vuex state to get the editor
   - The `render` function gets the `VNodeRender` from the editor.
   - It gets the XHTML output from the editor, which is a transformation of the `xml` with the `xsl`.
   - It binds the `selectionChange` event from the DOM document to the editor.
8. The `VNodeRender` provides the `nodeToVNode` method, which used the Vue `CreateElement` function to render the XHTML.
   - It has access the schema from the provided `ComplexDocument`
   - And uses this to create an element with a `tag`, `attributes`, `domProps` and the `on` property to listen to events.
   - `contentEditable` is set to `true` for the element when the schema says the element should be so.
   - The `nodeToVNode` is recursive. It is started with the `documentElement` of the XHTML output.
   - It maps the element's child nodes: The previous transformation to XHTML transformed the `xml` (which was generated from the `ComplexDocument` to include the `editor:node-id` namespaced attributes in the XML) with the enriched `xsl` to output these attributes as the afore-mentioned _processing-instructions_.
   - Each element's _first child_ will therefore be a _processing-instruction_ and this is used to retrieve the node-id in the `nodeToVNode` funtion.
   - Subsequent child elements are either mapped as text, or another `VNode`.
   - The children are part of the elements `VNode` configuration.
   - The recursion thus builds a tree of `VNodes` and this is rendered by Vue.
9. `JigsawToolbar.vue` and `JigsawNodeToolbar.Vue` react to the Vuex store.
   - They pick up on the active element/node and use the config to show.
