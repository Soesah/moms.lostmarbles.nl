import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';
import { SchemaDocument } from './schema/document.definition';
import { XMLEnricher } from './document/enricher';

export class Editor {
  public doc: Document = new Document();
  public xhtml: Document = new Document();
  public schema: SchemaDocument = new SchemaDocument();
  private http: HTTPService = new HTTPService();
  private processor: XSLTProcessor = new XSLTProcessor();
  private enricher: XMLEnricher = new XMLEnricher();

  constructor(path: string) {
    this.init(path);
  }

  private async init(path: string) {
    const xml = await this.http.getDocument(path);
    const xsd = await this.http.getDocument('./recipe.xsd');
    const xsl = await this.http.getDocument('./recipe.xsl');

    this.doc = this.enricher.getEnrichedXML(xml);
    this.processor.importStylesheet(xsl);

    this.xhtml = this.processor.transformToDocument(this.doc);

    const parser = new SchemaParser(xsd);
    this.schema = parser.schema;
  }
}
