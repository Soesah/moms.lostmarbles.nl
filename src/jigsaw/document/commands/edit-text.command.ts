import { ComplexDocument } from '../complex-document';
import { ComplexText } from '../elements/complex-text';
import { NodeType } from '../../core/info';

export class EditTextCommand {
  public static command: string = 'EditText';

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
