import axios from 'axios';
import { parseXMLDocument } from '../util/dom.util';

export class HTTPService {
  public async getDocument(filename: string): Promise<Document> {
    const result = await axios.get(filename);

    return parseXMLDocument(result.data);
  }
}
