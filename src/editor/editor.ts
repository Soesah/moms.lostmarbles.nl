import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';
import { SchemaDocument } from './schema/document.definition';
import { XMLEnricher } from './document/enricher';
import { VNodeRenderer } from './renderer/vnode-renderer';
import { EventEmitter } from './core/event-emitter';
import { CreateElement } from 'vue';
import { ComplexDocument } from './document/complex-document';
import { DOMSelection } from './document/selection';
import { KeyUtil } from './util/key.util';
import { EditTextCommand } from './document/commands/edit-text.command';

export class Editor extends EventEmitter {
  public xml: Document | null = null;
  public document!: ComplexDocument;
  public enrichedXSL: Document | null = null;
  public xhtml: Document | null = null;
  public schema: SchemaDocument = new SchemaDocument();
  public renderer: VNodeRenderer | null = null;

  private selection: DOMSelection = new DOMSelection(null);
  private http: HTTPService = new HTTPService();
  private enricher: XMLEnricher = new XMLEnricher();

  constructor(file: string, stylesheet: string, schema: string) {
    super();
    this.load(file, stylesheet, schema);
  }

  public getXHTML(): Document | null {
    if (this.enrichedXSL && this.xml) {
      const processor = new XSLTProcessor();

      processor.importStylesheet(this.enrichedXSL);
      this.xhtml = processor.transformToDocument(this.xml);

      return this.xhtml;
    } else {
      throw new Error('Error transforming XHTML');
    }
  }

  public getRenderer(h: CreateElement): VNodeRenderer {
    if (this.xml && this.schema) {
      return new VNodeRenderer(h, this.xml, this.schema);
    } else {
      throw new Error('Jigsaw Renderer unabled to initialize');
    }
  }

  public handleSelectionChange(evt: Event) {
    this.selection = new DOMSelection(document.getSelection());
    const id = (this.selection.getNode() as Element).getAttribute('data-editor-node-id');
    if (id) {

      const node = this.document.getComplexNode(id);
      this.emit('changedFocus', node);
    // } else {
    //   this.emit('changedFocus', null);
    }
  }

  public handleDomEvent(evt: KeyboardEvent) {
    const el = evt.currentTarget;
    const key = evt.keyCode;
    const id = (el as Element).getAttribute('data-editor-node-id');
    let command = null;

    if (id) {
      // find complex node
      const node = this.document.getComplexNode(id);
      // find node in XML

      // emit changes focus
      this.emit('changedFocus', node);

      // trigger a command based on the keyCode and the selection
      switch (key) {
        case KeyUtil.EnterKey:
          // split node if possible, split ancestor, or do nothing
          break;
        case KeyUtil.BackspaceKey:
          // merge previous node if possible, merge ancestor, or do nothing
          break;
        case KeyUtil.DeleteKey:
          // merge next node if possible, merge ancestor, or do nothing
          break;
        case KeyUtil.TabKey:
          // move focus to next node
          break;

        default:
          command = new EditTextCommand();
          break;
      }

    }

    if (command && command.modifiesDocument()) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  private async load(file: string, stylesheet: string, schema: string) {
    const xml = await this.http.getDocument(file);
    const xsl = await this.http.getDocument(stylesheet);
    const xsd = await this.http.getDocument(schema);

    // parse the schema
    const parser = new SchemaParser(xsd);
    this.schema = parser.schema;

    // enrich the xml with uuids
    this.xml = this.enricher.getEnrichedXML(xml);

    // create a complex document representation of the xml
    this.document =  new ComplexDocument(xml, this.schema);

    // enrich the xsl to output uuids
    this.enrichedXSL = await this.enrichStylesheet(xsl);
    if (!this.enrichedXSL) {
      throw new Error('Error enriching XSL');
    }

    this.emit('initialized', this.xml);
  }

  private async enrichStylesheet(xsl: Document): Promise<Document> {
    const exsl = await this.http.getDocument('/editor-xsl-transform.xsl');
    const p = new XSLTProcessor();
    p.importStylesheet(exsl);
    return p.transformToDocument(xsl);
  }
}
