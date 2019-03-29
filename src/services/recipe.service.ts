import { Recipe } from '@/models/recipe.model';
import axios, { AxiosStatic } from 'axios';

interface RecipeResponse {
  status: boolean;
  data: Recipe[];
}

const STATUS_OK = 200;

export class RecipeService {
  public $http: AxiosStatic;
  private path: string = '/api/recipe';

  constructor() {
    this.$http = axios;
  }

  public async getList(): Promise<RecipeResponse> {
    const response = await this.$http.get(`${this.path}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? response.data.data : [],
    };
  }
}
