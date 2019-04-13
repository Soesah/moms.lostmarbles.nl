import { Auth, AuthLevel } from '@/models/auth.model';

export enum MenuGroup {
  User,
  List,
  Recipe,
  Admin,
}

export interface MenuItem {
  label: string;
  target: string;
  group: MenuGroup;
  level: AuthLevel;
}

export class Menu {
  public items: MenuItem[] = [];

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  public addItems(auth: Auth, ...items: MenuItem[]) {
    this.items = [
      ...items.filter((item) => item.level <= auth.level),
      ...this.items,
    ];
  }

  public removeGroup(group: MenuGroup) {
    this.items = [...this.items.filter((item) => item.group !== group)];
  }
}
