import axios, { AxiosStatic } from 'axios';

const STATUS_OK = 200;

export class MenuService {
  public $http: AxiosStatic;
  private path: string = '/api/menu';

  constructor() {
    this.$http = axios;
  }

  public async upload(data: FormData): Promise<any> {
    const response = await this.$http.post(`${this.path}`, data);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data,
    };
  }
}
