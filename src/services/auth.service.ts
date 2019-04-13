import axios, { AxiosStatic } from 'axios';
import { Auth, defaultAuth, AuthLevel } from '@/models/auth.model';

const STATUS_OK = 200;

interface AuthResponse {
  status: boolean;
  data: Auth;
}

interface LogoutAuthResponse {
  status: boolean;
}

export class AuthService {
  public $http: AxiosStatic;

  private path: string = '/api/auth';
  private auth: Auth = defaultAuth;

  constructor() {
    this.$http = axios;
  }

  public async get(): Promise<AuthResponse> {
    if (this.auth.level === AuthLevel.Guest) {
      try {
        const response = await this.$http.get(this.path);
        const status = response.status === STATUS_OK;
        this.auth = status ? response.data.data : defaultAuth;
        return {
          status,
          data: this.auth,
        };
      } catch (e) {
        return {
          status: true,
          data: this.auth,
        };
      }
    } else {
      return {
        status: true,
        data: this.auth,
      };
    }
  }

  public async login(auth: Auth, type: string): Promise<AuthResponse> {
    const response = await this.$http.post(`${this.path}/login/${type}`, auth);
    const status = response.status === STATUS_OK;

    this.auth = status ? response.data.data : defaultAuth;
    return {
      status,
      data: this.auth,
    };
  }
  public async logout(): Promise<LogoutAuthResponse> {
    const response = await this.$http.get(`${this.path}/logout`);
    const status = response.status === STATUS_OK;
    return {
      status,
    };
  }
}
