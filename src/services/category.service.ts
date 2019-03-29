import { Category } from '@/models/category.model';
import axios, { AxiosStatic } from 'axios';

interface CategoryResponse {
  status: boolean;
  data: Category[];
}

const STATUS_OK = 200;

export class CategoryService {
  public $http: AxiosStatic;
  private path: string = 'api/category';

  constructor() {
    // set up axios proxy to allow requests
    this.$http = axios;
  }

  public async getList(): Promise<CategoryResponse> {
    const response = await this.$http.get(`${this.path}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? response.data.data : [],
    };
  }
}
