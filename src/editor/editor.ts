import { HTTPService } from './services/http.service';
import { SchemaParser } from './schema/schema.parser';

export class Editor {
  private http: HTTPService = new HTTPService();

  constructor(xml: string, schema: string) {
    this.init(xml, schema);
  }

  private async init(xml: string, schema: string) {
    const doc = await this.http.getDocument(xml);
    const def = await this.http.getDocument(schema);

    const parser = new SchemaParser(def);
  }
}
