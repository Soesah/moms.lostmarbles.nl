import axios, { AxiosStatic } from 'axios';
import { Recipe, RecipeData } from '@/models/recipe.model';
import { ChangeLog } from '@/models/changes.model';

interface RecipeResponse {
  status: boolean;
  data: Recipe | null;
}

interface RecipeListResponse {
  status: boolean;
  data: Recipe[];
}

interface ChangeResponse {
  status: boolean;
  data: ChangeLog | null;
}

interface ChangeLogResponse {
  status: boolean;
  data: ChangeLog[];
}

const STATUS_OK = 200;

export class RecipeService {
  public $http: AxiosStatic;
  private path: string = '/api/recipe';

  private recipes: Recipe[] = [];

  constructor() {
    this.$http = axios;
  }

  public async get(id: number): Promise<RecipeResponse> {
    const response = await this.$http.get(`${this.path}/${id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? new Recipe(response.data.data) : null,
    };
  }

  public async save(recipe: Recipe): Promise<RecipeResponse> {
    const response = await this.$http.post(
      `${this.path}/${recipe.id}/${recipe.category_id}`,
      recipe,
    );
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? new Recipe(response.data.data) : null,
    };
  }

  public async getList(): Promise<RecipeListResponse> {
    if (this.recipes.length) {
      return {
        status: true,
        data: this.recipes,
      };
    }
    const response = await this.$http.get(`${this.path}`);
    const status = response.status === STATUS_OK;
    if (status) {
      this.recipes = response.data.data;
    }
    return {
      status,
      data: status
        ? response.data.data.map((d: RecipeData) => new Recipe(d))
        : [],
    };
  }

  public async getNewRecipes(): Promise<RecipeListResponse> {
    const response = await this.$http.get(`${this.path}/new`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status
        ? response.data.data.map((d: RecipeData) => new Recipe(d))
        : [],
    };
  }

  public async getLatestChange(): Promise<ChangeResponse> {
    const response = await this.$http.get(`/api/changes/latest`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? new ChangeLog(response.data.data) : null,
    };
  }

  public async getRecipeLatestChanges(
    recipe: Recipe,
  ): Promise<ChangeLogResponse> {
    const response = await this.$http.get(`/api/changes/${recipe.id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? response.data.data : [],
    };
  }
}
