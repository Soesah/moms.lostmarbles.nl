import axios, { AxiosStatic } from 'axios';
import { User, UserData } from '@/models/user.model';

interface UserResponse {
  status: boolean;
  data: User | null;
}

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

  public async create(user: User): Promise<UserResponse> {
    user.id = this.getNewId();
    const response = await this.$http.post(`${this.path}`, user);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? new User(response.data.data) : null,
    };
  }

  public async update(user: User): Promise<UserResponse> {
    const response = await this.$http.put(`${this.path}/${user.id}`, user);
    const status = response.status === STATUS_OK;
    return {
      status,
      data: status ? new User(response.data.data) : null,
    };
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

  private getNewId(): number {
    return this.users.reduce(
      (id: number, u: User) => (id > u.id ? id : u.id + 1),
      -1,
    );
  }
}
