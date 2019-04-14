import { AuthLevel } from '@/models/auth.model';

export enum MenuGroup {
  User,
  List,
  Recipe,
  RecipeEdit,
  Admin,
}

export interface MenuItem {
  label: string;
  target: string;
  group: MenuGroup;
  level: AuthLevel;
}
