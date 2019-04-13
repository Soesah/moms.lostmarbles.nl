export enum AuthLevel {
  Guest = -1, // nothing
  Cook = 0, // read
  Chef = 50, // edit
  Admin = 100, // edit and manage users
}

export interface Auth {
  name: string;
  level: AuthLevel;
}

export const defaultAuth = {
  name: '',
  level: AuthLevel.Guest,
};

export interface AdminAuth {
  password: string;
  level: AuthLevel;
}
