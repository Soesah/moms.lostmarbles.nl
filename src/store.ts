import { createStore, ActionContext } from 'vuex';
import { MomsState, Actions, Mutations } from './models/store.model';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';
import { User } from '@/models/user.model';
import {
  delays,
  Notification,
  NotificationType,
} from '@/models/notification.model';
import { Category } from './models/category.model';
import { Recipe, NoteData } from '@/models/recipe.model';
import { Change } from '@/models/changes.model';
import { MenuItem, MenuGroup } from './models/menu.model';
import { createRecipeSpecification } from './specification/recipe.specification';
import { Auth, AuthLevel, defaultAuth } from '@/models/auth.model';
import { UUIDUtil } from './util/uuid.util';

const authService = new AuthService();
const userService = new UserService();
const categoryService = new CategoryService();
const recipeService = new RecipeService();

type Context = ActionContext<MomsState, MomsState>;

export default createStore<MomsState>({
  state: {
    auth: defaultAuth,
    notifications: [],
    redirect: '',
    user: null,
    edit_user: null,
    users: [],
    categories: [],
    category_id: -1,
    recipe: null,
    recipes: [],
    searchValue: '',
    menu: [
      {
        label: 'Uitloggen',
        target: '/user/logout',
        group: MenuGroup.User,
        level: AuthLevel.Cook,
      },
    ],
    editing: false,
  },
  mutations: {
    setAuth(state: MomsState, auth: Auth) {
      state.auth = auth;
    },
    setRedirect(state: MomsState, redirect: string) {
      state.redirect = redirect;
    },
    setUsers(state: MomsState, users: User[]) {
      state.users = users;
    },
    updateUser(state: MomsState, user: User) {
      const index = state.users.findIndex((u: User) => u.id === user.id);
      state.users.splice(index, 1, user);
    },
    [Mutations.SetEditUser](state: MomsState, user: User) {
      state.edit_user = user;
    },
    setCategories(state: MomsState, categories: Category[]) {
      state.categories = categories;
    },
    setRecipes(state: MomsState, recipes: Recipe[]) {
      state.recipes = recipes;
    },
    setRecipe(state: MomsState, recipe: Recipe) {
      state.recipe = recipe;
    },
    selectCategory(state: MomsState, category: Category) {
      state.category_id = category ? category.id : -1;
    },
    [Mutations.SetSearch](state: MomsState, value: string) {
      state.searchValue = value;
    },
    [Mutations.AddMenuItems](state: MomsState, items: MenuItem[]) {
      state.menu = [
        ...items.filter((item) => item.level <= state.auth.level),
        ...state.menu,
      ];
    },
    [Mutations.RemoveMenuGroup](state: MomsState, group: MenuGroup) {
      state.menu = [...state.menu.filter((item) => item.group !== group)];
    },
    [Mutations.SetEditing](state: MomsState, editing: boolean) {
      state.editing = editing;
    },
    notify(state: MomsState, notification: Notification) {
      state.notifications = [...state.notifications, notification];
    },
    dismiss(state: MomsState, uuid: string) {
      state.notifications = [
        ...state.notifications.filter((n) => n.uuid !== uuid),
      ];
    },
  },
  actions: {
    async [Actions.GetUsers]({ commit }: Context) {
      const response = await userService.getList();
      commit('setUsers', response.data);
    },
    async getAuth({ commit }: Context): Promise<Auth> {
      const response = await authService.get();

      commit('setAuth', response.data);

      return response.data;
    },
    async [Actions.Login](
      { commit }: Context,
      { type, auth }: { type: string; auth: Auth },
    ): Promise<boolean> {
      const response = await authService.login(auth, type);

      commit('setAuth', response.data);

      return response.status;
    },
    async [Actions.Logout]({ commit }: Context) {
      console.log('logout');
      await authService.logout();

      commit('setAuth', defaultAuth);
    },
    async [Actions.SaveUser]({ commit, dispatch }: Context, user: User) {
      dispatch('notify', {
        type: NotificationType.Info,
        text: 'Bezig met opslaan...',
      });
      const response = await userService.update(user);
      if (response.status) {
        dispatch('notify', {
          type: NotificationType.Success,
          text: 'Gebruiker opgeslagen',
        });
        commit('updateUser', response.data);
      }
      commit(Mutations.SetEditUser, null);
    },
    async [Actions.GetCategories]({ commit }: Context) {
      const response = await categoryService.getList();
      commit('setCategories', response.data);
    },
    async [Actions.GetRecipes]({ commit }: Context, force = false) {
      const response = await recipeService.getList(force);
      commit('setRecipes', response.data);
    },
    async [Actions.GetNewRecipes]() {
      const response = await recipeService.getNewRecipes();
      return response.status ? response.data : [];
    },
    async selectCategoryBySlug(
      { state, commit, dispatch }: Context,
      slug: string,
    ) {
      await dispatch(Actions.GetCategories);
      const category = state.categories.find(
        (cat: Category) => cat.slug === slug,
      );
      commit('selectCategory', category);
    },
    async [Actions.NewRecipe]({ commit }: Context) {
      commit('setRecipe', {
        id: null,
        category_id: 6,
        name: '',
        slug: '',
        cook: '',
        preparation_time: '',
        servings: '',
        ingredients: [],
        steps: [],
        creation_date: new Date().toISOString(),
        modification_date: new Date().toISOString(),
        notes: [],
      });
    },
    async [Actions.GetRecipeBySlug](
      { state, commit, dispatch }: Context,
      slug: string,
    ) {
      await dispatch(Actions.GetRecipes);
      const found = (state.recipes as Recipe[]).find(
        (rec: Recipe) => rec.slug === slug,
      );
      if (found) {
        const { id } = found;
        const response = await recipeService.get(id);
        commit('setRecipe', response.data);
      }
    },
    async [Actions.GetRecipeById](
      { state, commit, dispatch }: Context,
      urlID: number,
    ) {
      await dispatch(Actions.GetRecipes);
      const found = (state.recipes as Recipe[]).find(
        (rec: Recipe) => rec.id === urlID,
      );
      if (found) {
        const { id } = found;
        const response = await recipeService.get(id);
        commit('setRecipe', response.data);
      }
    },
    async [Actions.RemoveRecipe](_: Context, id: number): Promise<boolean> {
      const data = await recipeService.remove(id);
      return data.status ? true : false;
    },
    async [Actions.GetLatestChange](): Promise<Change | null> {
      const data = await recipeService.getLatestChange();
      return data.status ? data.data : null;
    },
    async getRecipeChangeLog({}, recipe: Recipe): Promise<Change[]> {
      const data = await recipeService.getRecipeLatestChanges(recipe);
      return data.status ? data.data : [];
    },
    async [Actions.SaveRecipe]({ dispatch }: Context, recipe: Recipe) {
      dispatch('notify', {
        type: NotificationType.Info,
        text: 'Bezig met opslaan...',
      });
      const data = await recipeService.save(recipe);
      if (data.status) {
        dispatch('notify', {
          type: NotificationType.Success,
          text: 'Recept opgeslagen',
        });
        dispatch(Actions.GetRecipes, true);
      } else {
        dispatch('notify', {
          type: NotificationType.Error,
          text: data.data,
        });
      }

      return data.status ? data.data : null;
    },
    async [Actions.AddNote](
      { state, dispatch, commit }: Context,
      d: NoteData,
    ): Promise<boolean> {
      const author = state.auth.name;
      dispatch('notify', {
        type: NotificationType.Info,
        text: 'Bezig met opslaan...',
      });
      const data = await recipeService.addNote(d.recipe, { ...d.note, author });
      dispatch('notify', {
        type: NotificationType.Success,
        text: 'Notitie toegevoegd',
      });
      if (data.status) {
        commit('setRecipe', data.data);
      }
      return data.status;
    },
    notify({ commit, dispatch }: Context, notification: Notification) {
      const uuid = UUIDUtil.uuid4();
      commit('notify', { ...notification, uuid });
      dispatch('dismiss', {
        uuid,
        text: notification.text,
        delay: delays[notification.type],
      });
    },
    dismiss({ commit }: Context, data: { uuid: string; delay: number }) {
      setTimeout(() => {
        commit('dismiss', data.uuid);
      }, data.delay);
    },
  },
  getters: {
    filteredRecipes: (state: MomsState): Recipe[] => {
      const spec = createRecipeSpecification(
        state.searchValue,
        state.category_id,
      );
      return state.recipes
        .filter(spec)
        .sort((a: Recipe, b: Recipe) => (a.name > b.name ? 1 : -1));
    },
    categoryName:
      (state: MomsState) =>
      (category_id: number = state.category_id, plural: boolean = true) => {
        const category = state.categories.find(
          (cat: Category) => cat.id === category_id,
        );
        return category
          ? plural
            ? (category as Category).name_plural
            : (category as Category).name_singular
          : null;
      },
    isAdmin: (state: MomsState): boolean => {
      return state.auth.level === AuthLevel.Admin;
    },
    isChef: (state: MomsState): boolean => {
      return state.auth.level === AuthLevel.Chef;
    },
  },
});
