export enum MenuGroup {
  User,
  Recipe,
}

export interface MenuItemData {
  label: string;
  target: string;
  group: MenuGroup;
}

export class MenuItem {
  public label: string;
  public target: string;
  public group: MenuGroup;

  constructor(data: MenuItemData) {
    this.label = data.label;
    this.target = data.target;
    this.group = data.group;
  }
}

export class Menu {
  public items: MenuItem[] = [];

  constructor(items: MenuItem[]) {
    this.addItems(...items);
  }

  public addItems(...items: MenuItem[]) {
    this.items = [...this.items, ...items];
  }

  public removeGroup(group: MenuGroup) {
    this.items = [...this.items.filter((item) => item.group !== group)];
  }
}
