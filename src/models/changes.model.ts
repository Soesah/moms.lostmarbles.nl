export interface ChangeLogData {
  id: number;
  user_id: number;
  recipe_id: number;
  type: string;
  date: string;
}

export class ChangeLog {
  public id: number;
  public user_id: number;
  public recipe_id: number;
  public type: string;
  public date: string;

  constructor(data: ChangeLogData) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.recipe_id = data.recipe_id;
    this.type = data.type;
    this.date = data.date;
  }
}
