import { NodeType } from '../core/info';

export class DOMSelection {
  private range: Range;

  constructor(selection: Selection | null) {
    this.range = document.createRange();

    if (selection && selection.anchorNode) {
      this.range.setStart(selection.anchorNode, selection.anchorOffset);
      this.range.setEnd(
        selection.focusNode ? selection.focusNode : selection.anchorNode,
        selection.focusOffset,
      );
    }
  }

  public isCollapsed(): boolean {
    return this.range.collapsed;
  }

  public isAtStart(): boolean {
    return this.range.startOffset === 0 && this.isCollapsed();
  }

  public isAtEnd(): boolean {
    return this.range.startOffset === 0 && this.isCollapsed();
  }

  public getNode(): Node {
    let node = this.range.commonAncestorContainer;
    if (node.nodeType === NodeType.TEXT && node.parentNode) {
      node = node.parentNode;
    }
    return node;
  }
}

/*
SELECTION EVENT
bubbles: false
cancelBubble: false
cancelable: false
composed: false
currentTarget: null
defaultPrevented: false
eventPhase: 0
isTrusted: true
path: (2) [document, Window]
returnValue: true
srcElement: document
target: document
timeStamp: 945114.2099999706
type: "selectionchange"
__proto__: Event


SELECTION
anchorNode: text
anchorOffset: 6
baseNode: text
baseOffset: 6
extentNode: text
extentOffset: 6
focusNode: text
focusOffset: 6
isCollapsed: true
rangeCount: 1
type: "Caret"

RANGE
collapsed: true
commonAncestorContainer: document
endContainer: document
endOffset: 0
startContainer: document
startOffset: 0
*/
