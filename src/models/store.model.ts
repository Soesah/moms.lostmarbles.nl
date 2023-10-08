import { Auth } from './auth.model';
import { Category } from './category.model';
import { MenuItem } from './navigation.model';
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
  SetUsers = 'SetUsers',
  SetEditUser = 'SetEditUser',
  UpdateUser = 'UpdateUser',
  SetEditing = 'SetEditing',
  AddNotification = 'AddNotification',
  DismissNotification = 'DismissNotification',
  SetAuth = 'SetAuth',
  SetCategories = 'SetCategories',
  SetRecipes = 'SetRecipes',
  SetRecipe = 'SetRecipe',
  SelectCategory = 'SelectCategory',
  SetRedirect = 'SetRedirect',
}

export enum Actions {
  Login = 'Login',
  Logout = 'Logout',
  GetAuth = 'GetAuth',
  GetRecipes = 'GetRecipes',
  GetNewRecipes = 'GetNewRecipes',
  GetRecipeBySlug = 'GetRecipeBySlug',
  GetRecipeById = 'GetRecipeById',
  GetRecipeChangeLog = 'GetRecipeChangeLog',
  NewRecipe = 'NewRecipe',
  SaveRecipe = 'SaveRecipe',
  RemoveRecipe = 'RemoveRecipe',
  GetCategories = 'GetCategories',
  SelectCategoryBySlug = 'SelectCategoryBySlug',
  GetLatestChange = 'GetLatestChange',
  GetUsers = 'GetUsers',
  SaveUser = 'SaveUser',
  UpdateUser = 'UpdateUser',
  AddNote = 'AddNote',
  AddNotification = 'AddNotification',
  DismissNotification = 'DismissNotification',
}
