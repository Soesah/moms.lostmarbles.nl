export interface UserData {
  id: number;
  name: string;
  email: string;
  last_login_date: string;
  user_level: number;
}

export class User {
  public id: number;
  public name: string;
  public email: string;
  public last_login_date: string;
  public user_level: number;

  constructor(data: UserData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.last_login_date = data.last_login_date;
    this.user_level = data.user_level;
  }
}
