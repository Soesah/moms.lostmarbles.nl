import Axios from 'axios';
import { parseXMLDocument } from '../util/dom.util';

export class HTTPService {
  public async getDocument(filename: string): Promise<Document> {
    const result = await Axios.get(filename);

    return parseXMLDocument(result.data);
  }
}
