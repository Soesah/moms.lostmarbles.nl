import axios, { AxiosStatic } from 'axios';
import { User, UserData } from '@/models/user.model';

interface UserListResponse {
  status: boolean;
  data: User[];
}

const STATUS_OK = 200;

export class UserService {
  public $http: AxiosStatic;
  private path: string = '/api/user';

  private users: User[] = [];

  constructor() {
    this.$http = axios;
  }

  public async getList(): Promise<UserListResponse> {
    if (this.users.length) {
      return {
        status: true,
        data: this.users,
      };
    }
    const response = await this.$http.get(`${this.path}`);
    const status = response.status === STATUS_OK;
    if (status) {
      this.users = response.data.data.map((u: UserData) => new User(u));
    }
    return {
      status,
      data: status ? response.data.data.map((u: UserData) => new User(u)) : [],
    };
  }
}
