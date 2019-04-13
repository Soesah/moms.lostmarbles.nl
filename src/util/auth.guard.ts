import { Route } from 'vue-router';
import { AuthLevel } from '@/models/auth.model';
import store from '@/store';

export const verifyCook = async (to: Route, from: Route, next: any) => {
  const auth = await store.dispatch('getAuth');

  if (auth.level >= AuthLevel.Cook) {
    next();
    return;
  }
  store.commit('setRedirect', to.fullPath);
  next({
    path: '/',
  });
};

export const verifyChef = async (to: Route, from: Route, next: any) => {
  const auth = await store.dispatch('getAuth');

  if (auth.authorizedLevel >= AuthLevel.Chef) {
    next();
    return;
  }

  store.commit('setRedirect', to.fullPath);
  next({
    path: '/user/login/chef',
  });
};

export const verifyAdmin = async (to: Route, from: Route, next: any) => {
  const auth = await store.dispatch('getAuth');

  if (auth.authorizedLevel >= AuthLevel.Admin) {
    next();
    return;
  }

  store.commit('setRedirect', to.fullPath);
  next({
    path: '/user/login/admin',
  });
};

export const logoutUser = async (to: Route, from: Route, next: any) => {
  store.dispatch('logout');
  next({
    path: '/',
  });
};
