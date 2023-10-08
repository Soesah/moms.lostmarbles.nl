import { ParsedMenu, Ingredient, Menu, Meal } from '@/models/menu.model';
import axios, { AxiosStatic } from 'axios';

const STATUS_OK = 200;

interface DataResponse<T> {
  status: boolean;
  data: T;
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
      data: response.data.data,
    };
  }

  // ingredient
  public async createIngredient(
    data: Ingredient,
  ): Promise<DataResponse<Ingredient>> {
    const response = await this.$http.post(`${this.path}/ingredient`, {
      ...data,
      keywords: (
        (Array.isArray(data.keywords) ? data.keywords : [data.keywords]).join(
          ',',
        ) || ''
      )
        .split(',')
        .map((str) => str.trim()),
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
    const response = await this.$http.put(`${this.path}/ingredient`, data);
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

  // meal
  public async createMeal(data: Meal): Promise<DataResponse<Meal>> {
    const response = await this.$http.post(`${this.path}/meal`, data);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async updateMeal(data: Meal): Promise<DataResponse<Meal>> {
    const response = await this.$http.put(`${this.path}/meal`, data);
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
  public async createMenu(data: Menu): Promise<DataResponse<Menu>> {
    const response = await this.$http.post(`${this.path}/meal`, data);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async updateMenu(data: Menu): Promise<DataResponse<Menu>> {
    const response = await this.$http.put(`${this.path}/meal`, data);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: response.data.data,
    };
  }

  public async removeMenu(data: Menu): Promise<DataResponse<boolean>> {
    const response = await this.$http.delete(`${this.path}/meal/${data.id}`);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status,
    };
  }
}
