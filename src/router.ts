import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Admin from '@/views/Admin.vue';
import Home from '@/views/Home.vue';
import List from '@/views/List.vue';
import Recipe from '@/views/Recipe.vue';
import EditRecipe from '@/views/EditRecipe.vue';
import {
  verifyCook,
  verifyChef,
  verifyAdmin,
  logoutUser,
} from '@/util/auth.guard';

export default createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/list',
      beforeEnter: verifyCook,
      component: List,
    },
    {
      path: '/list/search/:value',
      beforeEnter: verifyCook,
      component: List,
    },
    {
      path: '/list/category/:slug',
      beforeEnter: verifyCook,
      component: List,
    },
    // {
    //   path: '/recipe/new/edit',
    //   beforeEnter: verifyChef,
    //   component: EditRecipe,
    // },
    // {
    //   path: '/recipe/by-id/:id',
    //   beforeEnter: verifyCook,
    //   component: Recipe,
    // },
    // {
    //   path: '/recipe/by-id/:id/edit',
    //   beforeEnter: verifyCook,
    //   component: EditRecipe,
    // },
    // {
    //   path: '/recipe/:slug',
    //   beforeEnter: verifyCook,
    //   component: Recipe,
    // },
    // {
    //   path: '/recipe/:slug/edit',
    //   beforeEnter: verifyChef,
    //   component: EditRecipe,
    // },
    // {
    //   path: '/admin',
    //   beforeEnter: verifyAdmin,
    //   component: Admin,
    // },
    // {
    //   path: '/admin/:action',
    //   beforeEnter: verifyAdmin,
    //   component: Admin,
    // },
    // {
    //   path: '/user/login/:type',
    //   beforeEnter: verifyCook,
    //   component: Login,
    // },
    {
      path: '/user/logout',
      redirect: '/user/logout',
      beforeEnter: logoutUser,
    },
  ],
});
