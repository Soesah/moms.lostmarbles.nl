import axios, { AxiosStatic } from 'axios';
import {
  Recipe,
  Note,
  RecipeData,
  getRecipeBackendData,
} from '@/models/recipe.model';
import { Change } from '@/models/changes.model';

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
  data: Change | null;
}

interface ChangeLogResponse {
  status: boolean;
  data: Change[];
}

interface StatusResponse {
  status: boolean;
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

  public async remove(id: number): Promise<StatusResponse> {
    const response = await this.$http.delete(`${this.path}/${id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
    };
  }

  public async save(recipe: Recipe): Promise<RecipeResponse> {
    const recipeData = getRecipeBackendData(recipe);
    const response = recipe.id
      ? await this.$http.put(`${this.path}/${recipe.id}`, recipeData)
      : await this.$http.post(`${this.path}`, recipeData);

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
      data: status ? new Change(response.data.data) : null,
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

  public async addNote(recipe: Recipe, note: Note): Promise<RecipeResponse> {
    const recipeData = getRecipeBackendData({
      ...recipe,
      notes: [...(recipe.notes || []), note],
    });
    const response = await this.$http.put(
      `${this.path}/${recipe.id}/note`,
      recipeData,
    );

    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? new Recipe(response.data.data) : null,
    };
  }
}
