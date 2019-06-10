import { ComplexDocument } from '../complex-document';
import { ComplexText } from '../complex-text';
import { NodeType } from '../document.info';

export class EditTextCommand {

  public execute(node: ComplexText, _: ComplexDocument, contents: string) {
    node.value = contents;
  }

  public canExecute(context: ComplexText): boolean {
    return context.type === NodeType.TEXT;
  }

  public modifiesDocument(): boolean {
    return false;
  }
}
