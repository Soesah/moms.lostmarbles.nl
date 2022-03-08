export enum ChangeType {
  Created = 'created',
  Changed = 'changed',
  AddNote = 'add note',
}

export const changeText = (type: ChangeType, name: string): string => {
  switch (type) {
    case ChangeType.Created:
      return `heeft een nieuw recept voor ${name} gemaakt`;
    case ChangeType.Changed:
      return `heeft wijzigen gemaakt`;
    case ChangeType.AddNote:
      return `heeft een notitie toegevoegd`;
  }
};

export interface ChangeData {
  id: number;
  user: string;
  recipe?: string;
  type: ChangeType;
  date: string;
}

export class Change {
  public id: number;
  public user: string;
  public recipe?: string;
  public type: ChangeType;
  public date: string;

  constructor(data: ChangeData) {
    this.id = data.id;
    this.user = data.user;
    this.recipe = data.recipe;
    this.type = data.type;
    this.date = data.date;
  }
}
