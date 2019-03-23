import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';
import { SchemaDocument } from './schema/document.definition';
import { XMLEnricher } from './document/enricher';
import { VNodeRenderer } from './renderer/renderer';
import { EventEmitter } from './core/event-emitter';
import { CreateElement } from 'vue';

export class Editor extends EventEmitter {
  public xml: Document | null = null;
  public enrichedXSL: Document | null = null;
  public xhtml: Document | null = null;
  public schema: SchemaDocument | null = null;
  public renderer: VNodeRenderer | null = null;

  private http: HTTPService = new HTTPService();
  private enricher: XMLEnricher = new XMLEnricher();

  constructor(file: string, stylesheet: string, schema: string) {
    super();
    this.load(file, stylesheet, schema);
  }

  public getXHTML(): Document {
    if (this.enrichedXSL && this.xml) {
      const p = new XSLTProcessor();
      p.importStylesheet(this.enrichedXSL);
      return p.transformToDocument(this.xml);
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

  public handleDomEvent(evt: KeyboardEvent) {
    const el = evt.target;
    const id = (el as Element).getAttribute('data-editor-node-id');

    // find node in XML
    // trigger

    evt.preventDefault();
    evt.stopPropagation();
  }

  private async load(file: string, stylesheet: string, schema: string) {
    const xml = await this.http.getDocument(file);
    const xsl = await this.http.getDocument(stylesheet);
    const xsd = await this.http.getDocument(schema);

    const parser = new SchemaParser(xsd);
    this.schema = parser.schema;

    this.xml = this.enricher.getEnrichedXML(xml);

    this.enrichedXSL = await this.enrichStylesheet(xsl);
    if (!this.enrichedXSL) {
      throw new Error('Error enriching XSL');
    }

    this.emit('initialized', this.xml);
  }

  private async enrichStylesheet(xsl: Document): Promise<Document> {
    const exsl = await this.http.getDocument('./editor-xsl-transform.xsl');
    const p = new XSLTProcessor();
    p.importStylesheet(exsl);
    return p.transformToDocument(xsl);
  }
}
