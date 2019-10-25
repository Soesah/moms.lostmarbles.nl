export enum ChangeType {
  Created = 'created',
  Changed = 'changed',
  AddNote = 'addnote',
}

export interface ChangeData {
  user: string;
  recipe?: string;
  type: ChangeType;
  date: string;
}

export class Change {
  public user: string;
  public recipe?: string;
  public type: string;
  public date: string;

  constructor(data: ChangeData) {
    this.user = data.user;
    this.recipe = data.recipe;
    this.type = data.type;
    this.date = data.date;
  }
}
