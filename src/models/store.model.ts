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
  SetEditUser = 'SetEditUser',
  SetEditing = 'SetEditing',
}

export enum Actions {
  Login = 'Login',
  Logout = 'Logout',
  GetRecipes = 'GetRecipes',
  GetNewRecipes = 'GetNewRecipes',
  GetRecipeBySlug = 'GetRecipeBySlug',
  GetRecipeById = 'GetRecipeById',
  NewRecipe = 'NewRecipe',
  SaveRecipe = 'SaveRecipe',
  RemoveRecipe = 'RemoveRecipe',
  GetCategories = 'GetCategories',
  GetLatestChange = 'GetLatestChange',
  GetUsers = 'GetUsers',
  SaveUser = 'SaveUser',
  AddNote = 'AddNote',
}
