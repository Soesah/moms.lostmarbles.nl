import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';
import { SchemaDocument } from './schema/document.definition';

export class Editor {
  public doc: Document = new Document();
  public schema: SchemaDocument = new SchemaDocument();
  private http: HTTPService = new HTTPService();

  constructor(xml: string, schema: string) {
    this.init(xml, schema);
  }

  private async init(xml: string, schema: string) {
    this.doc = await this.http.getDocument(xml);
    const def = await this.http.getDocument(schema);

    const parser = new SchemaParser(def);
    this.schema = parser.schema;
  }
}
