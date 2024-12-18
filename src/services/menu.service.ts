import {
  ParsedMenu,
  Ingredient,
  Menu,
  Meal,
  cleanMenu,
} from '@/models/menu.model';
import axios, { AxiosStatic } from 'axios';

const STATUS_OK = 200;

interface DataResponse<T> {
  status: boolean;
  data: T;
}

const getKeyWords = (data: { keywords: string | string[] }): string[] =>
  (Array.isArray(data.keywords) ? data.keywords : [data.keywords])
    .join(',')
    .split(',')
    .map((str) => str.trim())
    .filter((str) => !!str);

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
      data: response.data.data,
    };
  }

  public async analyzed(id: number): Promise<DataResponse<ParsedMenu>> {
    const response = await this.$http.put(`${this.path}/analyze/${id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async getIngredients(): Promise<DataResponse<Ingredient[]>> {
    const response = await this.$http.get(`${this.path}/ingredient`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  // ingredient
  public async createIngredient(
    data: Ingredient,
  ): Promise<DataResponse<Ingredient>> {
    const response = await this.$http.post(`${this.path}/ingredient`, {
      ...data,
      keywords: getKeyWords(data),
    });
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async updateIngredient(
    data: Ingredient,
  ): Promise<DataResponse<Ingredient>> {
    const response = await this.$http.put(`${this.path}/ingredient`, {
      ...data,
      keywords: getKeyWords(data),
    });
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async removeIngredient(
    data: Ingredient,
  ): Promise<DataResponse<boolean>> {
    const response = await this.$http.delete(
      `${this.path}/ingredient/${data.id}`,
    );
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status,
    };
  }

  public async getMeals(): Promise<DataResponse<Meal[]>> {
    const response = await this.$http.get(`${this.path}/meal`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  // meal
  public async createMeal(data: Meal): Promise<DataResponse<Meal>> {
    const response = await this.$http.post(`${this.path}/meal`, {
      ...data,
      keywords: getKeyWords(data),
    });
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async updateMeal(data: Meal): Promise<DataResponse<Meal>> {
    const response = await this.$http.put(`${this.path}/meal`, {
      ...data,
      keywords: getKeyWords(data),
    });
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async removeMeal(data: Meal): Promise<DataResponse<boolean>> {
    const response = await this.$http.delete(`${this.path}/meal/${data.id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status,
    };
  }

  // menu
  public async getMenu(
    year: number,
    week: number,
  ): Promise<DataResponse<Menu>> {
    const response = await this.$http.get(`${this.path}/${year}/${week}`);
    const status = response?.status === STATUS_OK;
    return {
      status,
      data: response?.data.data,
    };
  }

  public async createMenu(data: Menu): Promise<DataResponse<Menu>> {
    const response = await this.$http.post(`${this.path}`, cleanMenu(data));
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async updateMenu(data: Menu): Promise<DataResponse<Menu>> {
    const response = await this.$http.put(`${this.path}`, cleanMenu(data));
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async removeMenu(data: Menu): Promise<DataResponse<boolean>> {
    const response = await this.$http.delete(`${this.path}/${data.id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status,
    };
  }
}
