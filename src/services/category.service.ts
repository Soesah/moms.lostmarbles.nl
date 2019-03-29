import axios, { AxiosStatic } from 'axios';
import { Category } from '@/models/category.model';

interface CategoryResponse {
  status: boolean;
  data: Category[];
}

const STATUS_OK = 200;

export class CategoryService {
  public $http: AxiosStatic;
  private path: string = '/api/category';

  private categories: Category[] = [];

  constructor() {
    this.$http = axios;
  }

  public async getList(): Promise<CategoryResponse> {
    if (this.categories.length) {
      return {
        status: true,
        data: this.categories,
      };
    }
    const response = await this.$http.get(`${this.path}`);
    const status = response.status === STATUS_OK;
    if (status) {
      this.categories = response.data.data;
    }
    return {
      status,
      data: status ? response.data.data : [],
    };
  }
}
