import axios, { AxiosStatic } from 'axios';
import { Recipe } from '@/models/recipe.model';
import { ChangeLog } from '@/models/changes.model';

interface RecipeResponse {
  status: boolean;
  data: Recipe | Recipe[];
}

interface ChangeLogResponse {
  status: boolean;
  data: ChangeLog[];
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

  public async getLatestChanges(): Promise<ChangeLogResponse> {
    const response = await this.$http.get(`/api/changes/latest`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? response.data.data : [],
    };
  }

  public async getRecipeLatestChanges(
    recipe: Recipe,
  ): Promise<ChangeLogResponse> {
    const response = await this.$http.get(
      `/api/changes/${recipe.id}/${recipe.category_id}`,
    );
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? response.data.data : [],
    };
  }
}
