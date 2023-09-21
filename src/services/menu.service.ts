import { ParsedMenu } from '@/models/menu.model';
import axios, { AxiosStatic } from 'axios';

const STATUS_OK = 200;

interface DataResponse<T> {
  status: boolean;
  data: T | string;
}

export class MenuService {
  public $http: AxiosStatic;
  private path: string = '/api/menu';

  constructor() {
    this.$http = axios;
  }

  public async analyze(): Promise<DataResponse<ParsedMenu>> {
    const response = await this.$http.get(`${this.path}/analyze`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data,
    };
  }
}
