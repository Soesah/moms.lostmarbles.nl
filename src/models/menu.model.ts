import { AuthLevel } from '@/models/auth.model';

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
