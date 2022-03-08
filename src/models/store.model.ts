import { Auth } from './auth.model';
import { Category } from './category.model';
import { MenuItem } from './menu.model';
import { Recipe } from './recipe.model';
import { User } from './user.model';
import { Notification } from './notification.model';

export interface MomsState {
  auth: Auth;
  notifications: Notification[];
  redirect: string;
  user: User | null;
  edit_user: User | null;
  users: User[];
  categories: Category[];
  category_id: number;
  searchValue: string;
  recipe: Recipe | null;
  recipes: Recipe[];
  menu: MenuItem[];
  editing: boolean;
}

export enum Mutations {
  AddMenuItems = 'AddMenuItems',
  RemoveMenuGroup = 'RemoveMenuGroup',
  SetSearch = 'SetSearch',
}

export enum Actions {
  Login = 'Login',
  GetRecipes = 'GetRecipes',
  GetNewRecipes = 'GetNewRecipes',
  GetRecipeBySlug = 'GetRecipeBySlug',
  GetRecipeById = 'GetRecipeById',
  GetCategories = 'GetCategories',
  GetLatestChange = 'GetLatestChange',
  AddNote = 'AddNote',
}
