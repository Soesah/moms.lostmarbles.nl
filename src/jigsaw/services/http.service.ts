import axios from 'axios';
import { parseXMLDocument } from '../util/dom.util';

export class HTTPService {
  public async getDocument(filename: string): Promise<Document> {
    const result = await axios.get(filename);

    return parseXMLDocument(result.data);
  }

  public async getJSON(filename: string): Promise<object> {
    const result = await axios.get(filename);

    return result.data;
  }
}
