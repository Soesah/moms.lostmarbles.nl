import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';
import { SchemaDocument } from './schema/document.definition';
import { XMLEnricher } from './document/enricher';

export class Editor {
  public xml: Document = new Document();
  public xhtml: Document = new Document();
  public schema: SchemaDocument = new SchemaDocument();
  private http: HTTPService = new HTTPService();
  private processor: XSLTProcessor = new XSLTProcessor();
  private enricher: XMLEnricher = new XMLEnricher();

  constructor(path: string) {
    this.init(path);
  }

  public getXML() {
    return this.enricher.getXML(this.xml);
  }

  private async init(path: string) {
    const xml = await this.http.getDocument(path);
    const xsd = await this.http.getDocument('./recipe.xsd');
    const xsl = await this.http.getDocument('./recipe.xsl');
    const exsl = await this.http.getDocument('./editor-xsl-transform.xsl');

    this.xml = this.enricher.getEnrichedXML(xml);

    const p = new XSLTProcessor();
    p.importStylesheet(exsl);
    const enrichedXsl = p.transformToDocument(xsl);

    if (!this.xhtml) {
      throw new Error('Error enriching XSL');
    }

    this.processor.importStylesheet(enrichedXsl);
    this.xhtml = this.processor.transformToDocument(this.xml);

    if (!this.xhtml) {
      throw new Error('Error transforming XML');
    }

    const parser = new SchemaParser(xsd);
    this.schema = parser.schema;
  }
}
