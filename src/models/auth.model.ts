export enum AuthLevel {
  Guest = -1, // nothing
  Cook = 0, // read
  Chef = 50, // edit
  Admin = 100, // edit and manage users
}

export interface Auth {
  type?: string;
  name: string;
  password?: string;
  level: AuthLevel;
  authorizedLevel: AuthLevel;
}

export const defaultAuth = {
  name: '',
  level: AuthLevel.Guest,
  authorizedLevel: AuthLevel.Guest,
};
