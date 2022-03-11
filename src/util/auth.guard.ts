import { RouteLocationNormalized } from 'vue-router';
import store from '@/store';
import { AuthLevel } from '@/models/auth.model';
import { Actions, Mutations } from '@/models/store.model';

export const verifyCook = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: any,
) => {
  const auth = await store.dispatch(Actions.GetAuth);

  if (auth.level >= AuthLevel.Cook) {
    next();
    return;
  }
  store.commit(Mutations.SetRedirect, to.fullPath);
  next({
    path: '/',
  });
};

export const verifyChef = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: any,
) => {
  const auth = await store.dispatch(Actions.GetAuth);

  if (auth.authorizedLevel >= AuthLevel.Chef) {
    next();
    return;
  }

  store.commit(Mutations.SetRedirect, to.fullPath);
  next({
    path: '/user/login/chef',
  });
};

export const verifyAdmin = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: any,
) => {
  const auth = await store.dispatch(Actions.GetAuth);

  if (auth.authorizedLevel >= AuthLevel.Admin) {
    next();
    return;
  }

  store.commit(Mutations.SetRedirect, to.fullPath);
  next({
    path: '/user/login/admin',
  });
};

export const logoutUser = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: any,
) => {
  store.dispatch(Actions.Logout);
  next({
    path: '/',
  });
};
